"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sampleEvents = [
    {
        id: 1,
        title: "Turniej Piłki Nożnej",
        category: "Sport",
        date: "2024-02-15",
        time: "14:00",
        description:
            "Przyjdź i weź udział w turnieju piłki nożnej dla wszystkich poziomów zaawansowania. Czekają nagrody!",
        fullDescription:
            "Zapraszamy na wielki turniej piłki nożnej, który odbędzie się na boisku miejskim. Turniej jest otwarty dla wszystkich poziomów zaawansowania - od początkujących po zaawansowanych graczy. Przewidziane są nagrody dla zwycięzców oraz pamiątkowe medale dla wszystkich uczestników. W trakcie wydarzenia będzie dostępne catering z napojami i przekąskami.",
        image: "/api/placeholder/600/300",
        categoryIcon: "⚽",
        location: "Boisko miejskie, ul. Sportowa 15",
        organizer: "Klub Sportowy Warszawa",
        maxParticipants: 32,
        currentParticipants: 18,
        price: "Bezpłatne",
        requirements: ["Sportowe obuwie", "Strój sportowy", "Bidon z wodą"],
    },
    {
        id: 2,
        title: "Wieczór Filmowy",
        category: "Movies",
        date: "2024-02-18",
        time: "19:00",
        description:
            "Oglądanie najlepszych filmów roku w towarzystwie innych kinomaniaków. Popcorn zapewniony!",
        fullDescription:
            "Wieczór filmowy z najlepszymi produkcjami tego roku. Będziemy oglądać wybrane przez społeczność filmy w przytulnej atmosferze. Zapewniamy popcorn, napoje i wygodne miejsca. To świetna okazja do poznania innych miłośników kina i dyskusji o filmach.",
        image: "/api/placeholder/600/300",
        categoryIcon: "🎬",
        location: "Kino Kultura, ul. Filmowa 8",
        organizer: "Stowarzyszenie Kinomaniaków",
        maxParticipants: 50,
        currentParticipants: 35,
        price: "20 PLN",
        requirements: ["Bilet", "Maska (opcjonalnie)"],
    },
];

export default function EventDetailsPage() {
    const params = useParams();
    const eventId = parseInt(params.id as string);
    const [isJoined, setIsJoined] = useState(false);
    const [event, setEvent] = useState(
        sampleEvents.find((e) => e.id === eventId)
    );
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4 flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="p-6 text-center">
                        <h1 className="text-2xl font-bold text-primary mb-4">
                            Wydarzenie nie znalezione
                        </h1>
                        <Link href="/dashboard">
                            <Button className="bg-primary hover:bg-alt-primary text-white">
                                Powrót do Dashboard
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleJoinEvent = () => {
        if (isEventPast()) {
            setMessage({
                type: "error",
                text: "Nie można dołączyć do zakończonego wydarzenia",
            });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        const wasJoined = isJoined;
        setIsJoined(!isJoined);

        if (!wasJoined) {
            setEvent((prev) =>
                prev
                    ? {
                          ...prev,
                          currentParticipants: prev.currentParticipants + 1,
                      }
                    : prev
            );
            setMessage({
                type: "success",
                text: `Pomyślnie dołączono do wydarzenia: ${event?.title}`,
            });
        } else {
            setEvent((prev) =>
                prev
                    ? {
                          ...prev,
                          currentParticipants: prev.currentParticipants - 1,
                      }
                    : prev
            );
            setMessage({
                type: "success",
                text: `Opuszczono wydarzenie: ${event?.title}`,
            });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    const isEventPast = () => {
        if (!event) return true;
        const today = new Date();
        const eventDate = new Date(event.date);
        today.setHours(0, 0, 0, 0);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < today;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                            ← Powrót do Dashboard
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-lg">
                            <div className="relative h-64 bg-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-8xl">
                                        {event.categoryIcon}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4 bg-accent/20 text-accent px-3 py-1 rounded-full">
                                    {event.category}
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-3xl text-primary">
                                    {event.title}
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    📅 {formatDate(event.date)} o {event.time}
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">
                                    Opis wydarzenia
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">
                                    {event.fullDescription}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">
                                    Wymagania
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {event.requirements.map((req, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center space-x-2"
                                        >
                                            <span className="text-secondary">
                                                ✓
                                            </span>
                                            <span className="text-gray-700">
                                                {req}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">
                                    Szczegóły
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        Lokalizacja:
                                    </p>
                                    <p className="text-gray-600">
                                        {event.location}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        Organizator:
                                    </p>
                                    <p className="text-gray-600">
                                        {event.organizer}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        Cena:
                                    </p>
                                    <p className="text-secondary font-semibold">
                                        {event.price}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        Uczestnicy:
                                    </p>
                                    <p className="text-gray-600">
                                        {event.currentParticipants} /{" "}
                                        {event.maxParticipants}
                                    </p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-secondary h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${
                                                    (event.currentParticipants /
                                                        event.maxParticipants) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardContent className="p-6">
                                {isEventPast() ? (
                                    <div className="text-center">
                                        <Button
                                            disabled
                                            className="w-full h-12 text-lg bg-gray-400 text-gray-600 cursor-not-allowed"
                                        >
                                            Wydarzenie zakończone
                                        </Button>
                                        <p className="text-center text-sm text-gray-500 mt-2">
                                            To wydarzenie już się odbyło
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleJoinEvent}
                                            disabled={
                                                !isJoined &&
                                                event.currentParticipants >=
                                                    event.maxParticipants
                                            }
                                            className={`w-full h-12 text-lg transition-colors ${
                                                isJoined
                                                    ? "bg-red-500 hover:bg-red-600 text-white"
                                                    : "bg-secondary hover:bg-secondary/90 text-white"
                                            }`}
                                        >
                                            {isJoined
                                                ? "Opuść wydarzenie"
                                                : event.currentParticipants >=
                                                  event.maxParticipants
                                                ? "Pełne"
                                                : "Dołącz do wydarzenia"}
                                        </Button>

                                        {isJoined && (
                                            <p className="text-center text-sm text-secondary mt-2">
                                                ✓ Zapisano na wydarzenie
                                            </p>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
