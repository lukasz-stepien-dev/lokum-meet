import "server-only"
import {cookies} from "next/headers";
import {User} from "@/src/types/User";


export async function getUser(): Promise<User | null> {
    const cookieStore = await cookies();
    try {
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            method: "GET",
            headers: {
                "Cookie": `JSESSIONID=${cookieStore.get("JSESSIONID")?.value}`
            },
            cache: "no-store",
        });

        if (!authResponse.ok) {
            return null;
        }

        const text = await authResponse.text();
        if (!text) {
            return null;
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

export const verifySession = async () => {
    const cookieStore = await cookies();

    if (cookieStore.has("JSESSIONID") && cookieStore.get("JSESSIONID")?.value != "") {
        const user = await getUser();
        return user && user.id && !user.banned;
    }

    return false;
}

