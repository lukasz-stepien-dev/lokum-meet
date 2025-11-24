"use client";

import { useState, useEffect } from "react";
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
import { eventsApiClient, institutionsApiClient } from "@/lib/api";
import { EventCategory, InstitutionDTO } from "@/types/api";
import { ApiError } from "@/lib/fetch";
import { sanitizeInput } from "@/lib/utils";

export default function CreateEventPage() {
    const router = useRouter();
    const [institutions, setInstitutions] = useState<InstitutionDTO[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        dateEvent: "",
        startTime: "",
        endTime: "",
        maxCapacity: 10,
        category: "SOCIAL" as EventCategory,
        imageUrl: "",
        approvedInstitutionId: "",
        minAge: 13,
        maxAge: 150,
    });

    useEffect(() => {
        loadInstitutions();
    }, []);

    const loadInstitutions = async () => {
        try {
            const data = await institutionsApiClient.getVerified();
            setInstitutions(data);
        } catch (error) {
            console.error("Failed to load institutions", error);
        }
    };

    const handleChange = (
        field: string,
        value: string | number
    ) => {
        let sanitizedValue = value;
        if (typeof value === "string" && field !== "imageUrl") {
            sanitizedValue = sanitizeInput(value);
        }
        setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            // Combine date and time
            const startDateTime = `${formData.dateEvent}T${formData.startTime}:00`;
            const endDateTime = `${formData.dateEvent}T${formData.endTime}:00`;

            const eventData = {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                dateEvent: formData.dateEvent,
                startTime: startDateTime,
                endTime: endDateTime,
                maxCapacity: formData.maxCapacity,
                category: formData.category,
                imageUrl: formData.imageUrl || undefined,
                approvedInstitutionId: formData.approvedInstitutionId
                    ? parseInt(formData.approvedInstitutionId)
                    : undefined,
                minAge: formData.minAge,
                maxAge: formData.maxAge,
            };

            await eventsApiClient.create(eventData);

            setMessage({
                type: "success",
                text: "Wydarzenie zostało utworzone pomyślnie!",
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
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
                    text: "Wystąpił błąd podczas tworzenia wydarzenia.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-3xl mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">
                            Utwórz nowe wydarzenie
                        </CardTitle>
                        <CardDescription>
                            Wypełnij poniższy formularz aby utworzyć wydarzenie
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
                                <Label htmlFor="title">Tytuł wydarzenia *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Np. Turniej Piłki Nożnej"
                                    value={formData.title}
                                    onChange={(e) =>
                                        handleChange("title", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Opis *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Opisz wydarzenie..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleChange("description", e.target.value)
                                    }
                                    required
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Lokalizacja *</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        placeholder="Np. Park Centralny"
                                        value={formData.location}
                                        onChange={(e) =>
                                            handleChange("location", e.target.value)
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
                                        <option value="SPORTS">Sport</option>
                                        <option value="FILM_CLUB">Klub Filmowy</option>
                                        <option value="HOBBY_GROUP">Grupa Hobbystyczna</option>
                                        <option value="STUDY_CIRCLE">Koło Naukowe</option>
                                        <option value="SOCIAL">Spotkanie Towarzyskie</option>
                                        <option value="OTHER">Inne</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dateEvent">Data *</Label>
                                    <Input
                                        id="dateEvent"
                                        type="date"
                                        value={formData.dateEvent}
                                        onChange={(e) =>
                                            handleChange("dateEvent", e.target.value)
                                        }
                                        min={getTomorrowDate()}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="startTime">Godzina rozpoczęcia *</Label>
                                    <Input
                                        id="startTime"
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) =>
                                            handleChange("startTime", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endTime">Godzina zakończenia *</Label>
                                    <Input
                                        id="endTime"
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) =>
                                            handleChange("endTime", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="maxCapacity">Maksymalna liczba uczestników *</Label>
                                    <Input
                                        id="maxCapacity"
                                        type="number"
                                        min="1"
                                        max="1000"
                                        value={formData.maxCapacity}
                                        onChange={(e) =>
                                            handleChange("maxCapacity", parseInt(e.target.value))
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="minAge">Minimalny wiek</Label>
                                    <Input
                                        id="minAge"
                                        type="number"
                                        min="0"
                                        max="150"
                                        value={formData.minAge}
                                        onChange={(e) =>
                                            handleChange("minAge", parseInt(e.target.value))
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="maxAge">Maksymalny wiek</Label>
                                    <Input
                                        id="maxAge"
                                        type="number"
                                        min="0"
                                        max="150"
                                        value={formData.maxAge}
                                        onChange={(e) =>
                                            handleChange("maxAge", parseInt(e.target.value))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">URL obrazu (opcjonalnie)</Label>
                                <Input
                                    id="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.imageUrl}
                                    onChange={(e) =>
                                        handleChange("imageUrl", e.target.value)
                                    }
                                />
                            </div>

                            {institutions.length > 0 && (
                                <div className="space-y-2">
                                    <Label htmlFor="approvedInstitutionId">
                                        Instytucja (opcjonalnie)
                                    </Label>
                                    <select
                                        id="approvedInstitutionId"
                                        value={formData.approvedInstitutionId}
                                        onChange={(e) =>
                                            handleChange("approvedInstitutionId", e.target.value)
                                        }
                                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                    >
                                        <option value="">Brak</option>
                                        {institutions.map((inst) => (
                                            <option key={inst.id} value={inst.id}>
                                                {inst.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                                >
                                    {isLoading ? "Tworzenie..." : "Utwórz wydarzenie"}
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
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

