"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import {isNotAuthenticated} from "@/app/actions/auth";
import {redirect} from "next/navigation";

const eventCategories = [
    { id: "sport", label: "Sport", icon: "⚽" },
    { id: "social", label: "Social", icon: "🎉" },
    { id: "hobby", label: "Hobby", icon: "🎨" },
    { id: "movies", label: "Movies", icon: "🎬" },
    { id: "music", label: "Music", icon: "🎵" },
    { id: "food", label: "Food & Dining", icon: "🍽️" },
    { id: "outdoor", label: "Outdoor", icon: "🏔️" },
    { id: "technology", label: "Technology", icon: "💻" },
    { id: "books", label: "Books & Reading", icon: "📚" },
    { id: "fitness", label: "Fitness", icon: "💪" },
    { id: "travel", label: "Travel", icon: "✈️" },
    { id: "gaming", label: "Gaming", icon: "🎮" },
];

export default function PreferencesPage() {
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    useEffect(() => {
        isNotAuthenticated().then(isNotAuthenticated => {
            isNotAuthenticated && redirect("/");
        })
    }, []);

    const togglePreference = (categoryId: string) => {
        setSelectedPreferences((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setMessage(null);

        // Simulate API call
        setTimeout(() => {
            if (selectedPreferences.length > 0) {
                setMessage({
                    type: "success",
                    text: `Zapisano ${selectedPreferences.length} preferencji!`,
                });
            } else {
                setMessage({
                    type: "error",
                    text: "Wybierz przynajmniej jedną kategorię.",
                });
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        Wybierz swoje zainteresowania
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Zaznacz kategorie wydarzeń, które Cię interesują
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {message && (
                        <div
                            className={`p-3 rounded-md text-sm ${
                                message.type === "success"
                                    ? "bg-secondary/10 text-secondary border border-secondary/20"
                                    : "bg-red-50 text-red-600 border border-red-200"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {eventCategories.map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col items-center space-y-2"
                            >
                                <Toggle
                                    pressed={selectedPreferences.includes(
                                        category.id
                                    )}
                                    onPressedChange={() =>
                                        togglePreference(category.id)
                                    }
                                    className={`h-20 w-full flex flex-col items-center justify-center space-y-1 border-2 transition-all duration-200 ${
                                        selectedPreferences.includes(
                                            category.id
                                        )
                                            ? "bg-primary text-white border-primary shadow-md"
                                            : "bg-white text-primary border-gray-300 hover:border-primary hover:bg-primary/10"
                                    }`}
                                >
                                    <span className="text-2xl">
                                        {category.icon}
                                    </span>
                                    <span className="text-sm font-medium">
                                        {category.label}
                                    </span>
                                </Toggle>
                            </div>
                        ))}
                    </div>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Wybrano: {selectedPreferences.length} kategorii
                    </div>

                    <div className="space-y-3 pt-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                selectedPreferences.length === 0 || isLoading
                            }
                            className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white disabled:bg-gray-300 transition-colors"
                        >
                            {isLoading
                                ? "Zapisywanie..."
                                : "Zapisz preferencje"}
                        </Button>

                        <div className="text-center">
                            <Link
                                href="/"
                                className="text-sm text-primary hover:text-alt-primary underline transition-colors"
                            >
                                ← Pomiń na razie
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
