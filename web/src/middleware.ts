import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./auth";
import type { Role } from "./generated/prisma";

// Configuration for different page types
const ROUTE_CONFIG = {
  authRequired: [
    "/aprender",
    "/dashboard",
    "/perfil",
    "/settings",
  ],
  
  // Pages that require ADMIN or SUPER_ADMIN role
  adminRequired: [
    "/admin/**",
  ],
  
  redirectIfAuth: [
    "/login",
    "/cadastro",
  ],
  
  // Special routes with custom logic
  specialRoutes: [
    "/admin", // Special handling for /admin route
  ]
};

// Helper function to check if path matches any pattern
function matchesAnyPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    if (pattern.endsWith('**')) {
      const basePattern = pattern.slice(0, -2);
      return pathname.startsWith(basePattern);
    }
    return pathname === pattern || pathname.startsWith(pattern + '/');
  });
}

function hasRequiredRole(userRole: Role | undefined, requiredRoles: Role[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method; // Pegamos o método (GET, POST, etc)
  
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const userRole = session?.user?.role as Role | undefined;
  const isAuthenticated = !!session?.user;

  console.log("🚨 O MIDDLEWARE LEU O CARGO COMO:", userRole);

 // --- PROTEÇÃO DA API ---
if (pathname.startsWith("/api")) {

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/upload")) {
    return NextResponse.next();
  }

  if (method === "GET") return NextResponse.next();

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Acesso negado. Faça login." }, { status: 401 });
    }

    const routesAdmin = ["/api/produtos", "/api/categorias", "/api/compras/"]; 
    const isEditingRoute = routesAdmin.some(route => pathname.startsWith(route));

    if (isEditingRoute && method !== "GET" && !hasRequiredRole(userRole, ["ADMIN", "SUPER_ADMIN"])) {

        if (pathname === "/api/compras" && method === "POST") {
            return NextResponse.next();
        }

        if (pathname.includes("/status") && method === "PATCH" ) {
          return NextResponse.next();
        }
        
        return NextResponse.json({ success: false, message: "Acesso restrito a administradores." }, { status: 403 });
    }

    return NextResponse.next();
  }

  if (matchesAnyPattern(pathname, ROUTE_CONFIG.authRequired)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};