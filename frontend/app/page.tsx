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
import { Climate_Crisis } from "next/font/google";


const climateCrisis = Climate_Crisis({subsets: ['latin']});

export default function Home() {
    return (
        <div className="min-h-screen flex-col flex items-center justify-center">
            <h1 className={climateCrisis.className + " text-6xl font-extrabold mb-8 text-primary"}>
                Lokum Meet
            </h1>
            <Card className="w-full max-w-md shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center">
                    <CardHeader>
                        Witaj! Wybierz opcję aby kontynuować
                    </CardHeader>
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
                            className="w-full h-12 text-lg border-2 border-primary text-primary hover:text-white hover:bg-alt-primary hover:border-0 transition-all duration-200 shadow-sm hover:shadow-md"
                            size="lg"
                        >
                            Zarejestruj się
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
