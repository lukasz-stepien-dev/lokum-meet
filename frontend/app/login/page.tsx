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

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", { email, password });
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nazwa@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            className="w-full bg-primary hover:bg-alt-primary transition-colors"
                        >
                            Zaloguj się
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
                                className="text-sm text-primary hover:text-alt-primary font-medium underline"
                            >
                                Zarejestruj się
                            </Link>
                        </div>
                        <div className="text-center mt-2">
                            <Link
                                href="/"
                                className="text-sm text-accent hover:text-primary underline"
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
