import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes that require authentication
// Add your app's protected routes here
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/api/user(.*)",
  "/api/checkout(.*)",
  // Add more protected routes as needed
]);

// Define public routes that should bypass authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/features(.*)",
  "/pricing(.*)",
  "/legal(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/stripe-webhook(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that match the protected pattern
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
