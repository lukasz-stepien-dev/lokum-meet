import {NextRequest, NextResponse} from "next/server";
import {verifySession} from "@/src/data-access-layer";
import {cookies} from "next/headers";

export { auth as proxy } from "@/auth"

const publicRoutes = ["/public"]

export default async function proxy(req: NextRequest) {
    const path= req.nextUrl.pathname;
    const isPublicRoute = path === "/" || publicRoutes.some(route => {
        return path.startsWith(route);
    })

    const isAuth = await verifySession();

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const isProtectedRoute = !publicRoutes.includes(path);
    if (isProtectedRoute && !isAuth) {
        const cookieStore = await cookies();
        console.warn("User not authenticated or banned. Removing session cookie.");
        cookieStore.delete("JSESSIONID");
        cookieStore.delete("XSRF_TOKEN");

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|icons|favicon.ico|public|.*\\.png$).*)'],
}