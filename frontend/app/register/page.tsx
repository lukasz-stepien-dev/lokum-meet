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

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Hasła nie są identyczne!");
            return;
        }
        console.log("Register:", formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                        Zarejestruj się
                    </CardTitle>
                    <CardDescription>
                        Utwórz nowe konto aby korzystać z aplikacji
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Imię i nazwisko</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Imie Nazwisko"
                                value={formData.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                required
                                className="focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nazwa@email.com"
                                value={formData.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
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
                                value={formData.password}
                                onChange={(e) =>
                                    handleChange("password", e.target.value)
                                }
                                required
                                className="focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Potwierdź hasło
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleChange(
                                        "confirmPassword",
                                        e.target.value
                                    )
                                }
                                required
                                className="focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-secondary hover:bg-secondary/90 text-white transition-colors"
                        >
                            Zarejestruj się
                        </Button>
                    </form>

                    <div className="mt-6">
                        <Separator className="my-4" />
                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Masz już konto?{" "}
                            </span>
                            <Link
                                href="/login"
                                className="text-sm text-primary hover:text-alt-primary font-medium underline"
                            >
                                Zaloguj się
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
