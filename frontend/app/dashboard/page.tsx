"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { logout } from "@/app/actions/auth";
import { eventsApiClient, eventAttendeesApiClient } from "@/lib/api";
import { EventDTO, EventCategory } from "@/types/api";
import { ApiError } from "@/lib/fetch";
import { formatDate, getCategoryLabel } from "@/lib/utils";

const categoryIcons: Record<EventCategory, string> = {
    SPORTS: "⚽",
    FILM_CLUB: "🎬",
    HOBBY_GROUP: "🎨",
    STUDY_CIRCLE: "📚",
    SOCIAL: "🎉",
    OTHER: "🌟"
};

export default function DashboardPage() {
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const categories: Array<EventCategory | "all"> = [
        "all",
        "SPORTS",
        "FILM_CLUB",
        "HOBBY_GROUP",
        "STUDY_CIRCLE",
        "SOCIAL",
        "OTHER"
    ];

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        setIsLoading(true);
        try {
            const data = await eventsApiClient.getUpcoming();
            setEvents(data);
        } catch (error) {
            if (error instanceof ApiError) {
                setMessage({
                    type: "error",
                    text: "Błąd podczas ładowania wydarzeń",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const filteredEvents =
        selectedCategory === "all"
            ? events
            : events.filter((event) => event.category === selectedCategory);

    const handleLogout = async () => {
        await logout();
        window.location.href = "/";
    };

    const isEventFull = (event: EventDTO) => {
        return event.currentCapacity >= event.maxCapacity;
    };

    const handleJoinEvent = async (eventId: number, eventTitle: string) => {
        try {
            await eventAttendeesApiClient.join(eventId);
            setMessage({
                type: "success",
                text: `Pomyślnie dołączono do wydarzenia: ${eventTitle}`,
            });
            // Reload events to update capacity
            loadEvents();
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            if (error instanceof ApiError) {
                setMessage({
                    type: "error",
                    text: error.details as string || "Błąd podczas dołączania do wydarzenia",
                });
            }
        }
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
                    <div className="absolute top-0 right-0 flex gap-2">
                        <Link href="/profile">
                            <Button
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                Profil
                            </Button>
                        </Link>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                            Wyloguj się
                        </Button>
                    </div>
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
                            {category === "all" ? "Wszystkie" : getCategoryLabel(category)}
                        </Button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Ładowanie wydarzeń...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <Card
                                key={event.id}
                                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="relative h-48 bg-gray-200">
                                    {event.imageUrl ? (
                                        <img
                                            src={event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                            <span className="text-6xl">
                                                {categoryIcons[event.category]}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-xl text-primary line-clamp-2">
                                            {event.title}
                                        </CardTitle>
                                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                            {getCategoryLabel(event.category)}
                                        </span>
                                    </div>
                                    <CardDescription className="text-sm text-gray-500">
                                        📅 {formatDate(event.dateEvent)}
                                        <br />
                                        👥 {event.currentCapacity}/{event.maxCapacity} uczestników
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {event.description}
                                    </p>

                                    <div className="flex gap-2">
                                        {isEventFull(event) ? (
                                            <Button
                                                disabled
                                                className="flex-1 bg-gray-400 text-gray-600 cursor-not-allowed"
                                                size="sm"
                                            >
                                                Brak miejsc
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    handleJoinEvent(event.id, event.title)
                                                }
                                                className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                                                size="sm"
                                            >
                                                Dołącz
                                            </Button>
                                        )}
                                        <Link href={`/event/${event.id}`}>
                                            <Button
                                                variant="outline"
                                                className="border-primary text-primary hover:bg-primary hover:text-white"
                                                size="sm"
                                            >
                                                Szczegóły
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {!isLoading && filteredEvents.length === 0 && (
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
