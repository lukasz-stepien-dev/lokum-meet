"use server";

import {cookies} from "next/headers";

export async function login(authToken: string) {
    const cookieStore = await cookies()
    cookieStore.set("authToken", authToken, {path: "/"});
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("authToken");
}

export async function isNotAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies()
    return cookieStore.get("authToken") === undefined;
}