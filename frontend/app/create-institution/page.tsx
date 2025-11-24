"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { institutionsApiClient } from "@/lib/api";
import { InstitutionCategory } from "@/types/api";
import { ApiError } from "@/lib/fetch";
import { sanitizeInput, validateEmail, validateUrl } from "@/lib/utils";

export default function CreateInstitutionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "OTHER" as InstitutionCategory,
        description: "",
        logoUrl: "",
        websiteUrl: "",
    });

    const handleChange = (field: string, value: string) => {
        let sanitizedValue = value;
        if (field !== "logoUrl" && field !== "websiteUrl") {
            sanitizedValue = sanitizeInput(value);
        }
        setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Validation
        if (!validateEmail(formData.email)) {
            setMessage({
                type: "error",
                text: "Nieprawidłowy adres email",
            });
            setIsLoading(false);
            return;
        }

        if (formData.websiteUrl && !validateUrl(formData.websiteUrl)) {
            setMessage({
                type: "error",
                text: "Nieprawidłowy adres URL strony internetowej",
            });
            setIsLoading(false);
            return;
        }

        if (formData.logoUrl && !validateUrl(formData.logoUrl)) {
            setMessage({
                type: "error",
                text: "Nieprawidłowy adres URL logo",
            });
            setIsLoading(false);
            return;
        }

        try {
            const institutionData = {
                name: formData.name,
                email: formData.email,
                category: formData.category,
                description: formData.description || undefined,
                logoUrl: formData.logoUrl || undefined,
                websiteUrl: formData.websiteUrl || undefined,
            };

            await institutionsApiClient.create(institutionData);

            setMessage({
                type: "success",
                text: "Instytucja została utworzona pomyślnie! Oczekuje na weryfikację.",
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        } catch (error) {
            if (error instanceof ApiError) {
                const errorMessage =
                    typeof error.details === "string"
                        ? error.details
                        : JSON.stringify(error.details);
                setMessage({
                    type: "error",
                    text: `Błąd: ${errorMessage}`,
                });
            } else {
                setMessage({
                    type: "error",
                    text: "Wystąpił błąd podczas tworzenia instytucji.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-3xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">
                            Dodaj nową instytucję
                        </CardTitle>
                        <CardDescription>
                            Wypełnij poniższy formularz aby dodać instytucję. Wymaga zatwierdzenia przez administratora.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {message && (
                            <div
                                className={`mb-4 p-3 rounded-md text-sm ${
                                    message.type === "success"
                                        ? "bg-secondary/10 text-secondary border border-secondary/20"
                                        : "bg-red-50 text-red-600 border border-red-200"
                                }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nazwa instytucji *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Np. Akademia Sportowa Warszawa"
                                    value={formData.name}
                                    onChange={(e) =>
                                        handleChange("name", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="kontakt@instytucja.pl"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleChange("email", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategoria *</Label>
                                    <select
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) =>
                                            handleChange("category", e.target.value)
                                        }
                                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                        required
                                    >
                                        <option value="SCHOOL">Szkoła</option>
                                        <option value="UNIVERSITY">Uniwersytet</option>
                                        <option value="NGO">Organizacja Pozarządowa</option>
                                        <option value="SPORTS_CLUB">Klub Sportowy</option>
                                        <option value="CULTURAL_CENTER">Centrum Kultury</option>
                                        <option value="LIBRARY">Biblioteka</option>
                                        <option value="OTHER">Inne</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Opis</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Opisz instytucję..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleChange("description", e.target.value)
                                    }
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="websiteUrl">Strona internetowa</Label>
                                <Input
                                    id="websiteUrl"
                                    type="url"
                                    placeholder="https://www.instytucja.pl"
                                    value={formData.websiteUrl}
                                    onChange={(e) =>
                                        handleChange("websiteUrl", e.target.value)
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logoUrl">URL logo</Label>
                                <Input
                                    id="logoUrl"
                                    type="url"
                                    placeholder="https://www.instytucja.pl/logo.png"
                                    value={formData.logoUrl}
                                    onChange={(e) =>
                                        handleChange("logoUrl", e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                                >
                                    {isLoading ? "Dodawanie..." : "Dodaj instytucję"}
                                </Button>
                                <Link href="/dashboard" className="flex-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                                    >
                                        Anuluj
                                    </Button>
                                </Link>
                            </div>

                            <p className="text-sm text-gray-500 text-center">
                                * Wymagane pola<br />
                                Instytucja zostanie poddana weryfikacji przez administratora przed zatwierdzeniem.
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

