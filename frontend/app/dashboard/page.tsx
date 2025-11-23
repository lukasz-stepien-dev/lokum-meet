"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
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
import {isNotAuthenticated, logout} from "@/app/actions/auth";
import {redirect} from "next/navigation";
import {router} from "next/client";

const sampleEvents = [
    {
        id: 1,
        title: "Turniej Piłki Nożnej",
        category: "Sport",
        date: "2024-02-15",
        description:
            "Przyjdź i weź udział w turnieju piłki nożnej dla wszystkich poziomów zaawansowania. Czekają nagrody!",
        image: "/api/placeholder/400/200",
        categoryIcon: "⚽",
    },
    {
        id: 2,
        title: "Wieczór Filmowy",
        category: "Movies",
        date: "2024-02-18",
        description:
            "Oglądanie najlepszych filmów roku w towarzystwie innych kinomaniaków. Popcorn zapewniony!",
        image: "/api/placeholder/400/200",
        categoryIcon: "🎬",
    },
    {
        id: 3,
        title: "Spotkanie Fotografów",
        category: "Hobby",
        date: "2024-02-20",
        description:
            "Warsztaty fotograficzne i wymiana doświadczeń między miłośnikami fotografii.",
        image: "/api/placeholder/400/200",
        categoryIcon: "🎨",
    },
    {
        id: 4,
        title: "Koncert Jazzowy",
        category: "Music",
        date: "2024-02-22",
        description:
            "Wieczór pełen najlepszego jazzu w wykonaniu lokalnych artystów.",
        image: "/api/placeholder/400/200",
        categoryIcon: "🎵",
    },
    {
        id: 5,
        title: "Piknik w Parku",
        category: "Social",
        date: "2024-02-25",
        description:
            "Wspólny piknik w parku miejskim. Przynieś koc i dobre humory!",
        image: "/api/placeholder/400/200",
        categoryIcon: "🎉",
    },
];

export default function DashboardPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const categories = ["all", "Sport", "Movies", "Hobby", "Music", "Social"]; //kategorie na sztywno (póki co)

    useEffect(() => {
        isNotAuthenticated().then(isNotAuthenticated => {
            isNotAuthenticated && redirect("/");
        })
    }, []);

    const filteredEvents =
        selectedCategory === "all"
            ? sampleEvents
            : sampleEvents.filter(
                  (event) => event.category === selectedCategory
              );

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleLogout = async () => {
        await logout();
        console.log("Logging out...");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 relative">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-primary mb-2">
                            Dashboard Wydarzeń
                        </h1>
                        <p className="text-lg text-gray-600">
                            Odkryj interesujące wydarzenia w Twojej okolicy
                        </p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="absolute top-0 right-0 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    >
                        Wyloguj się
                    </Button>
                </div>

                <div className="mb-8 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={
                                selectedCategory === category
                                    ? "default"
                                    : "outline"
                            }
                            className={`${
                                selectedCategory === category
                                    ? "bg-primary text-white"
                                    : "border-primary text-primary hover:bg-primary hover:text-white"
                            } transition-colors`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category === "all" ? "Wszystkie" : category}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Card
                            key={event.id}
                            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                        >
                            <div className="relative h-48 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span className="text-6xl">
                                        {event.categoryIcon}
                                    </span>
                                </div>
                            </div>

                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-xl text-primary line-clamp-2">
                                        {event.title}
                                    </CardTitle>
                                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                        {event.category}
                                    </span>
                                </div>
                                <CardDescription className="text-sm text-gray-500">
                                    📅 {formatDate(event.date)}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="flex gap-2">
                                    <Button
                                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                                        size="sm"
                                    >
                                        Dołącz
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-primary text-primary hover:bg-primary hover:text-white"
                                        size="sm"
                                    >
                                        Szczegóły
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Brak wydarzeń w wybranej kategorii
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
