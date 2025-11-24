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
import { login } from "@/app/actions/auth";
import { authApi } from "@/lib/api";
import { ApiError } from "@/lib/fetch";
import { sanitizeInput } from "@/lib/utils";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const handleEmailChange = (value: string) => {
        const sanitizedValue = sanitizeInput(value);
        setEmail(sanitizedValue);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const response = await authApi.login({
                username: email,
                password: password,
            });

            await login(response.token);

            setMessage({ type: "success", text: "Zalogowano pomyślnie!" });
            setTimeout(() => (window.location.href = "/dashboard"), 500);
        } catch (error) {
            if (error instanceof ApiError) {
                setMessage({
                    type: "error",
                    text: error.status === 401
                        ? "Nieprawidłowy email lub hasło."
                        : "Wystąpił błąd podczas logowania.",
                });
            } else {
                setMessage({
                    type: "error",
                    text: "Wystąpił błąd podczas logowania.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        Zaloguj się
                    </CardTitle>
                    <CardDescription>
                        Wprowadź swoje dane aby się zalogować
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nazwa@email.com"
                                value={email}
                                onChange={(e) =>
                                    handleEmailChange(e.target.value)
                                }
                                required
                                className="focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Hasło</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-alt-primary transition-colors disabled:opacity-50"
                        >
                            {isLoading ? "Logowanie..." : "Zaloguj się"}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <Separator className="my-4" />
                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Nie masz konta?{" "}
                            </span>
                            <Link
                                href="/register"
                                className="text-sm text-primary hover:text-alt-primary font-medium underline transition-colors"
                            >
                                Zarejestruj się
                            </Link>
                        </div>
                        <div className="text-center mt-2">
                            <Link
                                href="/"
                                className="text-sm text-primary hover:text-alt-primary underline transition-colors"
                            >
                                ← Powrót do strony głównej
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
