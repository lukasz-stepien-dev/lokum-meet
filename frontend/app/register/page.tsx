"use client";

import {useState} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {registerUser} from "@/app/api/auth/[...nextauth]/route";
import {fetchFromApi} from "@/lib/fetch";
import {login} from "@/app/actions/auth";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        birthDate: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Calculate max birth date (13 years ago from today)
    const getMaxBirthDate = () => {
        const today = new Date();
        const maxDate = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
        );
        return maxDate.toISOString().split("T")[0];
    };

    // Calculate min birth date (reasonable limit - 100 years ago)
    const getMinBirthDate = () => {
        const today = new Date();
        const minDate = new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate()
        );
        return minDate.toISOString().split("T")[0];
    };

    const validateBirthDate = (birthDate: string) => {
        if (!birthDate) return false;

        const inputDate = new Date(birthDate);
        const today = new Date();
        const minAge = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
        );
        const maxAge = new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate()
        );

        return inputDate <= minAge && inputDate >= maxAge;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Hasła nie są identyczne!" });
            setIsLoading(false);
            return;
        }

        if (!validateBirthDate(formData.birthDate)) {
            setMessage({
                type: "error",
                text: "Musisz mieć ukończone 13 lat aby się zarejestrować!",
            });
            setIsLoading(false);
            return;
        }

        try {
            await registerUser({
                username: formData.name,
                email: formData.email,
                passwordHash: formData.password,
                birthDate: formData.birthDate,
                bio: "",
                avatarUrl: "",
                age: new Date().getFullYear() - new Date(formData.birthDate).getFullYear(),
            })

            // Logowanie - bezpośrednie wywołanie backendu
            const loginResponse: string = await fetchFromApi('/auth/generateToken', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.email,
                    password: formData.password
                })
            });

            await login(loginResponse);

            setMessage({ type: "success", text: "Rejestracja zakończona sukcesem!" });
            setTimeout(() => window.location.href = "/dashboard", 1500);

        } catch (e) {
            setMessage({
                type: "error",
                text: `Błąd podczas rejestracji: ${(e as Error).message}`,
            });
        } finally {
            setIsLoading(false);
        }
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

                        <div className="space-y-2">
                            <Label htmlFor="birthDate">Data urodzenia</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) =>
                                    handleChange("birthDate", e.target.value)
                                }
                                min={getMinBirthDate()}
                                max={getMaxBirthDate()}
                                required
                                className="focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <p className="text-xs text-gray-500">
                                Minimalny wiek: 13 lat
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-secondary hover:bg-secondary/90 text-white transition-colors disabled:opacity-50"
                        >
                            {isLoading ? "Rejestrowanie..." : "Zarejestruj się"}
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
                                className="text-sm text-primary hover:text-alt-primary font-medium underline transition-colors"
                            >
                                Zaloguj się
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
