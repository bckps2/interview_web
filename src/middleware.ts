import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const sessionCookie = request.cookies.get(".AspNetCore.Session");
    const isAuthenticated = sessionCookie != null ? sessionCookie.value.length > 0 : false;

    // Si el usuario no está autenticado, redirigirlo a /login
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Configura las rutas protegidas
export const config = {
    matcher: ["/profile/:path*", "/dashboard/:path*"], // Añade aquí las rutas protegidas
};