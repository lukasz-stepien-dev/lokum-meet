"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { eventsApiClient, eventAttendeesApiClient } from "@/lib/api";
import { EventDTO, EventAttendee } from "@/types/api";
import { ApiError } from "@/lib/fetch";
import { formatDate, formatTime, getCategoryLabel, getInitials } from "@/lib/utils";

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = parseInt(params.id as string);

    const [event, setEvent] = useState<EventDTO | null>(null);
    const [attendees, setAttendees] = useState<EventAttendee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isJoining, setIsJoining] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    useEffect(() => {
        loadEventData();
    }, [eventId]);

    const loadEventData = async () => {
        setIsLoading(true);
        try {
            const [eventData, attendeesData] = await Promise.all([
                eventsApiClient.getById(eventId),
                eventAttendeesApiClient.getEventAttendees(eventId)
            ]);
            setEvent(eventData);
            setAttendees(attendeesData);
        } catch (error) {
            if (error instanceof ApiError) {
                setMessage({
                    type: "error",
                    text: "Nie znaleziono wydarzenia",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleJoinEvent = async () => {
        if (!event) return;

        setIsJoining(true);
        try {
            await eventAttendeesApiClient.join(eventId);
            setMessage({
                type: "success",
                text: `Pomyślnie dołączono do wydarzenia: ${event.title}`,
            });
            // Reload data
            loadEventData();
        } catch (error) {
            if (error instanceof ApiError) {
                setMessage({
                    type: "error",
                    text: typeof error.details === 'string' ? error.details : "Błąd podczas dołączania do wydarzenia",
                });
            }
        } finally {
            setIsJoining(false);
        }
    };

    const handleLeaveEvent = async () => {
        if (!event) return;

        setIsLeaving(true);
        try {
            await eventAttendeesApiClient.leave(eventId);
            setMessage({
                type: "success",
                text: "Pomyślnie opuszczono wydarzenie",
            });
            // Reload data
            loadEventData();
        } catch (error) {
            if (error instanceof ApiError) {
                setMessage({
                    type: "error",
                    text: typeof error.details === 'string' ? error.details : "Błąd podczas opuszczania wydarzenia",
                });
            }
        } finally {
            setIsLeaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4 flex items-center justify-center">
                <p className="text-lg text-gray-600">Ładowanie...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4 flex items-center justify-center">
                <Card className="max-w-md">
                    <CardContent className="p-6 text-center">
                        <p className="text-lg text-gray-600 mb-4">Nie znaleziono wydarzenia</p>
                        <Link href="/dashboard">
                            <Button>Wróć do dashboardu</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const isEventFull = event.currentCapacity >= event.maxCapacity;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/10 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <Link href="/dashboard">
                        <Button variant="outline" size="sm">
                            ← Wróć do wydarzeń
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

                <Card className="shadow-lg">
                    {event.imageUrl && (
                        <div className="w-full h-64 md:h-96 overflow-hidden rounded-t-xl">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-3xl font-bold text-primary">
                                {event.title}
                            </CardTitle>
                            <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full whitespace-nowrap">
                                {getCategoryLabel(event.category)}
                            </span>
                        </div>
                        <CardDescription className="text-base">
                            {event.description}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📅</span>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-500">Data</p>
                                        <p className="text-base">{formatDate(event.dateEvent)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🕐</span>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-500">Godzina</p>
                                        <p className="text-base">
                                            {formatTime(event.startTime)} - {formatTime(event.endTime)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📍</span>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-500">Lokalizacja</p>
                                        <p className="text-base">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">👥</span>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-500">Uczestnicy</p>
                                        <p className="text-base">
                                            {event.currentCapacity} / {event.maxCapacity}
                                        </p>
                                        {isEventFull && (
                                            <span className="text-sm text-red-500">Brak wolnych miejsc</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🎯</span>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-500">Wiek</p>
                                        <p className="text-base">
                                            {event.minAge} - {event.maxAge} lat
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">👤</span>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-500">Organizator</p>
                                        <p className="text-base">{event.createdByUsername}</p>
                                        {event.approvedInstitutionName && (
                                            <p className="text-sm text-gray-500">
                                                {event.approvedInstitutionName}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {attendees.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-lg mb-4">
                                    Uczestnicy ({attendees.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {attendees.map((attendee) => (
                                        <div
                                            key={attendee.id}
                                            className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                                        >
                                            <Avatar className="w-6 h-6">
                                                <AvatarFallback className="text-xs">
                                                    {getInitials(attendee.username)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{attendee.username}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Separator />

                        <div className="flex gap-4">
                            {isEventFull ? (
                                <Button
                                    disabled
                                    className="flex-1 bg-gray-400 text-gray-600 cursor-not-allowed"
                                >
                                    Brak wolnych miejsc
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleJoinEvent}
                                        disabled={isJoining}
                                        className="flex-1 bg-secondary hover:bg-secondary/90 text-white"
                                    >
                                        {isJoining ? "Dołączanie..." : "Dołącz do wydarzenia"}
                                    </Button>
                                    <Button
                                        onClick={handleLeaveEvent}
                                        disabled={isLeaving}
                                        variant="outline"
                                        className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    >
                                        {isLeaving ? "Opuszczanie..." : "Opuść wydarzenie"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

