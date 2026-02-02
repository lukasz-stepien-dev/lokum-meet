"use server"

import {cookies} from "next/headers";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import {NextResponse} from "next/server";
import proxy from "@/proxy";

export async function GET() {
    const cookieStore = await cookies()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `JSESSIONID=${cookieStore.get("JSESSIONID")?.value}`
        }
    });

    cookieStore.set("JSESSIONID", "", { maxAge: 0 })
    cookieStore.set("XSRF_TOKEN", "", { maxAge: 0 })

    return NextResponse.redirect(process.env.NEXT_PUBLIC_API_URL ?? "");
}