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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const userPreferences = [
    { id: "sport", label: "Sport", icon: "⚽" },
    { id: "movies", label: "Movies", icon: "🎬" },
    { id: "music", label: "Music", icon: "🎵" },
];

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Jan Kowalski",
        email: "jan.kowalski@example.com",
        birthDate: "1995-05-15",
        bio: "Miłośnik sportu i muzyki. Uwielbiam poznawać nowych ludzi na różnych wydarzeniach.",
        location: "Warszawa",
    });
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const sanitizeInput = (value: string) => {
        return value
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
            .replace(/<[^>]+>/g, "")
            .replace(/javascript:/gi, "")
            .replace(/on\w+\s*=/gi, "")
            .trim();
    };

    const validateField = (field: string, value: string) => {
        const sanitized = sanitizeInput(value);

        switch (field) {
            case "name":
                if (sanitized.length < 2)
                    return "Imię musi mieć minimum 2 znaki";
                if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/.test(sanitized))
                    return "Imię może zawierać tylko litery";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized))
                    return "Nieprawidłowy format email";
                break;
            case "location":
                if (sanitized.length > 50)
                    return "Lokalizacja nie może przekraczać 50 znaków";
                break;
            case "bio":
                if (sanitized.length > 500)
                    return "Bio nie może przekraczać 500 znaków";
                break;
        }
        return null;
    };

    const handleChange = (field: string, value: string) => {
        const sanitizedValue = sanitizeInput(value);
        const error = validateField(field, sanitizedValue);

        if (!error) {
            setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
        }
    };

    const handleSave = () => {
        setMessage({ type: "success", text: "Profil został zaktualizowany!" });
        setIsEditing(false);
        setTimeout(() => setMessage(null), 3000);
    };

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 relative">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-primary mb-2">
                            Mój Profil
                        </h1>
                        <p className="text-lg text-gray-600">
                            Zarządzaj swoimi danymi i preferencjami
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
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl text-primary">
                                    Informacje osobiste
                                </CardTitle>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    {isEditing ? "Anuluj" : "Edytuj"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src="" alt={formData.name} />
                                    <AvatarFallback className="text-2xl">
                                        {getInitials(formData.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Imię i nazwisko</Label>
                                {isEditing ? (
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleChange("name", e.target.value)
                                        }
                                        className="focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-gray-700">
                                        {formData.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                {isEditing ? (
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
                                        className="focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-gray-700">
                                        {formData.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birthDate">
                                    Data urodzenia
                                </Label>
                                {isEditing ? (
                                    <Input
                                        id="birthDate"
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(e) =>
                                            handleChange(
                                                "birthDate",
                                                e.target.value
                                            )
                                        }
                                        className="focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-gray-700">
                                        {new Date(
                                            formData.birthDate
                                        ).toLocaleDateString("pl-PL")}{" "}
                                        ({calculateAge(formData.birthDate)} lat)
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Lokalizacja</Label>
                                {isEditing ? (
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) =>
                                            handleChange(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        className="focus:ring-2 focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <p className="text-gray-700">
                                        {formData.location}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">O mnie</Label>
                                {isEditing ? (
                                    <textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) =>
                                            handleChange("bio", e.target.value)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                        rows={3}
                                    />
                                ) : (
                                    <p className="text-gray-700">
                                        {formData.bio}
                                    </p>
                                )}
                            </div>

                            {isEditing && (
                                <Button
                                    onClick={handleSave}
                                    className="w-full bg-secondary hover:bg-secondary/90 text-white"
                                >
                                    Zapisz zmiany
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">
                                    Moje preferencje
                                </CardTitle>
                                <CardDescription>
                                    Twoje ulubione kategorie wydarzeń
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {userPreferences.map((pref) => (
                                        <div
                                            key={pref.id}
                                            className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg"
                                        >
                                            <span className="text-2xl">
                                                {pref.icon}
                                            </span>
                                            <span className="text-sm font-medium text-primary">
                                                {pref.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/preferences">
                                    <Button
                                        variant="outline"
                                        className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white"
                                    >
                                        Zmień preferencje
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">
                                    Statystyki
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Wydarzenia w których uczestniczę:
                                    </span>
                                    <span className="font-semibold text-primary">
                                        8
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Utworzone wydarzenia:
                                    </span>
                                    <span className="font-semibold text-primary">
                                        3
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Znajomi:
                                    </span>
                                    <span className="font-semibold text-primary">
                                        24
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
