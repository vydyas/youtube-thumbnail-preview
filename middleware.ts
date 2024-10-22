import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)", // Add this line
  "/(.*)", // This allows all routes to be public, adjust as needed
]);

export default clerkMiddleware((auth, req, evt) => {
  if (publicRoutes(req)) {
    return;
  }
  // If the route is not public, Clerk will handle authentication
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
