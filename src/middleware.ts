import { auth } from "@/src/auth";
import { apiAuthPrefix, authRoutes, privateRoutes } from "@/src/routes";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const currentPath = req.nextUrl.pathname;
  console.log("Route: ", req.nextUrl.pathname);

  const isPrivateRoute = privateRoutes.includes(currentPath);
  const isAuthRoute = authRoutes.includes(currentPath);
  const isApiAuthRoute = currentPath.startsWith(apiAuthPrefix);

  console.log(isAuthRoute, isLoggedIn);
  if (isApiAuthRoute) {
    return;
  }

  if (!isPrivateRoute && !isAuthRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (!isLoggedIn && isPrivateRoute) {
    let callbackUrl = currentPath;

    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl),
    );
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
