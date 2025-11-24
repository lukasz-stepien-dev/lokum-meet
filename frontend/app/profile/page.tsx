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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { authApi } from "@/lib/api/auth";
import { UserDTO } from "@/types/api";
import { ApiError } from "@/lib/fetch";
import { sanitizeInput, getInitials, formatDate } from "@/lib/utils";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserDTO | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        avatarUrl: "",
    });
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setIsLoading(true);
        try {
            const userData = await authApi.getProfile();
            setUser(userData);
            setFormData({
                username: userData.username,
                bio: userData.bio || "",
                avatarUrl: userData.avatarUrl || "",
            });
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.status === 401) {
                    // Redirect to login if not authenticated
                    router.push("/login");
                } else {
                    setMessage({
                        type: "error",
                        text: "Błąd podczas ładowania profilu",
                    });
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const validateField = (field: string, value: string) => {
        const sanitized = sanitizeInput(value);

        switch (field) {
            case "username":
                if (sanitized.length < 2)
                    return "Nazwa musi mieć minimum 2 znaki";
                if (sanitized.length > 50)
                    return "Nazwa nie może przekraczać 50 znaków";
                break;
            case "bio":
                if (sanitized.length > 500)
                    return "Bio nie może przekraczać 500 znaków";
                break;
        }
        return null;
    };

    const handleChange = (field: string, value: string) => {
        const sanitizedValue = field === "avatarUrl" ? value : sanitizeInput(value);
        const error = validateField(field, sanitizedValue);

        if (!error || field === "bio") {
            setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            const updatedUser = await authApi.updateProfile({
                username: formData.username,
                bio: formData.bio || undefined,
                avatarUrl: formData.avatarUrl || undefined,
            });

            setUser(updatedUser);
            setMessage({ type: "success", text: "Profil został zaktualizowany!" });
            setIsEditing(false);
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            if (error instanceof ApiError) {
                const errorMessage = typeof error.details === 'string'
                    ? error.details
                    : JSON.stringify(error.details);
                setMessage({
                    type: "error",
                    text: `Błąd: ${errorMessage}`,
                });
            } else {
                setMessage({
                    type: "error",
                    text: "Wystąpił błąd podczas aktualizacji profilu.",
                });
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4 flex items-center justify-center">
                <p className="text-lg text-gray-600">Ładowanie profilu...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4 flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="p-6 text-center">
                        <p className="text-lg text-gray-600 mb-4">Nie można załadować profilu</p>
                        <Link href="/login">
                            <Button>Zaloguj się</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

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
                                {!isEditing && (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="outline"
                                        size="sm"
                                        className="border-primary text-primary hover:bg-primary hover:text-white"
                                    >
                                        Edytuj
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center">
                                <Avatar className="w-24 h-24">
                                    <AvatarFallback className="text-2xl">
                                        {getInitials(user.username)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Nazwa użytkownika</Label>
                                    {isEditing ? (
                                        <Input
                                            id="username"
                                            value={formData.username}
                                            onChange={(e) =>
                                                handleChange("username", e.target.value)
                                            }
                                        />
                                    ) : (
                                        <p className="text-base">{user.username}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <p className="text-base text-gray-600">{user.email}</p>
                                    <p className="text-xs text-gray-500">
                                        Email nie może być zmieniony
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birthDate">Data urodzenia</Label>
                                    <p className="text-base">
                                        {formatDate(user.birthDate)} ({user.age} lat)
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    {isEditing ? (
                                        <Textarea
                                            id="bio"
                                            value={formData.bio}
                                            onChange={(e) =>
                                                handleChange("bio", e.target.value)
                                            }
                                            rows={4}
                                            placeholder="Opowiedz coś o sobie..."
                                        />
                                    ) : (
                                        <p className="text-base text-gray-600">
                                            {user.bio || "Brak opisu"}
                                        </p>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="space-y-2">
                                        <Label htmlFor="avatarUrl">URL avatara</Label>
                                        <Input
                                            id="avatarUrl"
                                            type="url"
                                            value={formData.avatarUrl}
                                            onChange={(e) =>
                                                handleChange("avatarUrl", e.target.value)
                                            }
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <div className="flex gap-2 pt-4">
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                                    >
                                        {isSaving ? "Zapisywanie..." : "Zapisz zmiany"}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setFormData({
                                                username: user.username,
                                                bio: user.bio || "",
                                                avatarUrl: user.avatarUrl || "",
                                            });
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Anuluj
                                    </Button>
                                </div>
                            )}

                            <Separator />

                            <div className="space-y-2">
                                <p className="text-sm text-gray-500">
                                    Konto utworzone: {formatDate(user.createdAt)}
                                </p>
                                {user.isVerified && (
                                    <p className="text-sm text-green-600">✓ Konto zweryfikowane</p>
                                )}
                                {user.userRoles && user.userRoles.length > 0 && (
                                    <p className="text-sm text-gray-500">
                                        Role: {user.userRoles.map(role => role.replace('ROLE_', '')).join(', ')}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">
                                Szybkie linki
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/create-event">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    <span className="mr-2">➕</span>
                                    Utwórz wydarzenie
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    <span className="mr-2">📅</span>
                                    Przeglądaj wydarzenia
                                </Button>
                            </Link>
                            <Link href="/create-institution">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    <span className="mr-2">🏢</span>
                                    Dodaj instytucję
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

