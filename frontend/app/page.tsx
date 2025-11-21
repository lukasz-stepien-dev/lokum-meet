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
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary">
                        Locum Meet
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Witaj! Wybierz opcję aby kontynuować
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Link href="/login" className="w-full">
                        <Button
                            className="w-full h-12 text-lg bg-primary hover:bg-alt-primary transition-colors"
                            size="lg"
                        >
                            Zaloguj się
                        </Button>
                    </Link>

                    <div className="flex items-center space-x-2 mt-3">
                        <Separator className="flex-1" />
                        <span className="text-sm text-gray-500">lub</span>
                        <Separator className="flex-1" />
                    </div>

                    <Link href="/register" className="w-full">
                        <Button
                            variant="outline"
                            className="w-full h-12 text-lg border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            size="lg"
                        >
                            Zarejestruj się
                        </Button>
                    </Link>

                    <div className="text-center mt-4">
                        <Link
                            href="/preferences"
                            className="text-sm text-primary hover:text-alt-primary underline transition-colors"
                        >
                            Ustaw preferencje wydarzeń
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
