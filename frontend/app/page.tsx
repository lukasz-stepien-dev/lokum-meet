import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-accent/20">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                    <CardTitle className="text-4xl font-bold text-primary mb-2">
                        Lokum Meet
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                        Witaj! Wybierz opcję aby kontynuować
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-3">
                    <Link href="/login" className="w-full">
                        <Button
                            className="w-full h-12 text-lg bg-primary hover:bg-alt-primary text-white transition-all duration-200 shadow-md hover:shadow-lg"
                            size="lg"
                        >
                            Zaloguj się
                        </Button>
                    </Link>

                    <div className="flex items-center space-x-2 mt-6">
                        <Separator className="flex-1 bg-gray-300" />
                        <span className="text-sm text-gray-400 px-2">lub</span>
                        <Separator className="flex-1 bg-gray-300" />
                    </div>

                    <Link href="/register" className="w-full">
                        <Button
                            variant="outline"
                            className="w-full h-12 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                            size="lg"
                        >
                            Zarejestruj się
                        </Button>
                    </Link>

                    <div className="text-center mt-4">
                        <Link
                            href="/preferences"
                            className="text-sm text-accent hover:text-primary underline transition-colors duration-200 font-medium block mb-2"
                        >
                            Ustaw preferencje wydarzeń
                        </Link>
                        <Link
                            href="/create-institution"
                            className="text-sm text-primary hover:text-alt-primary underline transition-colors duration-200 font-medium"
                        >
                            Utwórz instytucję
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
