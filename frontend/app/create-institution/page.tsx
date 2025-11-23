"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Toggle } from "@/components/ui/toggle";

const institutionTypes = [
    { id: "restaurant", label: "Restauracja", icon: "🍽️" },
    { id: "hotel", label: "Hotel", icon: "🏨" },
    { id: "gym", label: "Siłownia", icon: "💪" },
    { id: "cinema", label: "Kino", icon: "🎬" },
    { id: "museum", label: "Muzeum", icon: "🏛️" },
    { id: "club", label: "Klub", icon: "🎉" },
    { id: "park", label: "Park", icon: "🌳" },
    { id: "theater", label: "Teatr", icon: "🎭" },
];

export default function CreateInstitutionPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        phone: "",
        email: "",
        website: "",
        openingHours: "",
        capacity: "",
        type: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Nazwa instytucji jest wymagana";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Nazwa musi mieć minimum 3 znaki";
        } else if (formData.name.trim().length > 100) {
            newErrors.name = "Nazwa nie może przekraczać 100 znaków";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Adres jest wymagany";
        } else if (formData.address.trim().length < 5) {
            newErrors.address = "Adres musi mieć minimum 5 znaków";
        }

        if (!formData.city.trim()) {
            newErrors.city = "Miasto jest wymagane";
        } else if (formData.city.trim().length < 2) {
            newErrors.city = "Nazwa miasta musi mieć minimum 2 znaki";
        }

        if (!formData.type) {
            newErrors.type = "Typ instytucji jest wymagany";
        }

        if (formData.email && !isValidEmail(formData.email)) {
            newErrors.email = "Nieprawidłowy format email";
        }

        if (formData.phone && !isValidPhone(formData.phone)) {
            newErrors.phone = "Nieprawidłowy format numeru telefonu";
        }

        if (formData.website && !isValidUrl(formData.website)) {
            newErrors.website = "Nieprawidłowy format URL";
        }

        if (
            formData.capacity &&
            (parseInt(formData.capacity) < 1 ||
                parseInt(formData.capacity) > 10000)
        ) {
            newErrors.capacity = "Pojemność musi być między 1 a 10000";
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = "Opis nie może przekraczać 500 znaków";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhone = (phone: string) => {
        return /^[\+]?[\d\s\-\(\)]{9,15}$/.test(phone);
    };

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const sanitizeInput = (value: string) => {
        return value.replace(
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            ""
        );
    };

    const handleChange = (field: string, value: string) => {
        const sanitizedValue = sanitizeInput(value);
        setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleTypeSelect = (type: string) => {
        setFormData((prev) => ({ ...prev, type }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (!validateForm()) {
            setMessage({ type: "error", text: "Popraw błędy w formularzu!" });
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setMessage({
                type: "success",
                text: "Instytucja została utworzona pomyślnie!",
            });
            setIsLoading(false);
            // Reset form
            setFormData({
                name: "",
                description: "",
                address: "",
                city: "",
                phone: "",
                email: "",
                website: "",
                openingHours: "",
                capacity: "",
                type: "",
            });
            setErrors({});
        }, 1000);
    };

    const selectedType = institutionTypes.find(
        (type) => type.id === formData.type
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 relative">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-primary mb-2">
                            Utwórz nową instytucję
                        </h1>
                        <p className="text-lg text-gray-600">
                            Dodaj swoją instytucję do naszej platformy
                        </p>
                    </div>
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="absolute top-0 right-0 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            ← Dashboard
                        </Button>
                    </Link>
                </div>

                {message && (
                    <div
                        className={`mb-6 p-3 rounded-md text-sm ${
                            message.type === "success"
                                ? "bg-secondary/10 text-secondary border border-secondary/20"
                                : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">
                                Podstawowe informacje
                            </CardTitle>
                            <CardDescription>
                                Podaj główne dane o instytucji
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Nazwa instytucji *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleChange("name", e.target.value)
                                        }
                                        placeholder="np. Restauracja Pod Kasztanami"
                                        required
                                        maxLength={100}
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.name ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Opis</Label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            handleChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Krótki opis instytucji..."
                                        maxLength={500}
                                        className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.description
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                        rows={3}
                                    />
                                    <p className="text-sm text-gray-500">
                                        {formData.description.length}/500 znaków
                                    </p>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Adres *</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) =>
                                            handleChange(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        placeholder="ul. Przykładowa 123"
                                        required
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.address
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">Miasto *</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) =>
                                            handleChange("city", e.target.value)
                                        }
                                        placeholder="Warszawa"
                                        required
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.city ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-sm">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefon</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            handleChange(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        placeholder="+48 123 456 789"
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.phone ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        placeholder="kontakt@example.com"
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.email ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="website">
                                        Strona internetowa
                                    </Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) =>
                                            handleChange(
                                                "website",
                                                e.target.value
                                            )
                                        }
                                        placeholder="https://example.com"
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.website
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.website && (
                                        <p className="text-red-500 text-sm">
                                            {errors.website}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="openingHours">
                                        Godziny otwarcia
                                    </Label>
                                    <Input
                                        id="openingHours"
                                        value={formData.openingHours}
                                        onChange={(e) =>
                                            handleChange(
                                                "openingHours",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Pn-Pt 9:00-18:00"
                                        className="focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="capacity">
                                        Pojemność (osoby)
                                    </Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        min="1"
                                        max="10000"
                                        value={formData.capacity}
                                        onChange={(e) =>
                                            handleChange(
                                                "capacity",
                                                e.target.value
                                            )
                                        }
                                        placeholder="100"
                                        className={`focus:ring-2 focus:ring-primary focus:border-primary ${
                                            errors.capacity
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.capacity && (
                                        <p className="text-red-500 text-sm">
                                            {errors.capacity}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">
                                Typ instytucji *
                            </CardTitle>
                            <CardDescription>
                                Wybierz kategorię, która najlepiej opisuje Twoją
                                instytucję
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {institutionTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        className="flex flex-col items-center"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleTypeSelect(type.id)
                                            }
                                            className={`w-full h-20 flex flex-col items-center justify-center space-y-1 border-2 rounded-md transition-all duration-200 ${
                                                formData.type === type.id
                                                    ? "bg-primary text-white border-primary shadow-md"
                                                    : "bg-white text-primary border-gray-300 hover:border-primary hover:bg-primary/10"
                                            }`}
                                        >
                                            <span className="text-2xl">
                                                {type.icon}
                                            </span>
                                            <span className="text-sm font-medium">
                                                {type.label}
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {selectedType && (
                                <div className="p-3 bg-primary/5 rounded-lg mb-6">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-2xl">
                                            {selectedType.icon}
                                        </span>
                                        <div>
                                            <p className="font-medium text-primary">
                                                Wybrano: {selectedType.label}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Typ instytucji został wybrany
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {errors.type && (
                                <p className="text-red-500 text-sm mb-4">
                                    {errors.type}
                                </p>
                            )}

                            <Button
                                onClick={handleSubmit}
                                disabled={
                                    !formData.name ||
                                    !formData.address ||
                                    !formData.city ||
                                    !formData.type ||
                                    isLoading
                                }
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white disabled:bg-gray-300 transition-colors"
                            >
                                {isLoading
                                    ? "Tworzenie..."
                                    : "Utwórz instytucję"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
