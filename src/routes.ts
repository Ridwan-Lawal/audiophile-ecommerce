/**
 * These routes are private and should be accessed only by logged in users
 * @type {string[]}
 */
export const privateRoutes = ["/checkout"];

/**
 * An array of routes that should only be accessed by unauthenticated users.
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/signup",
  "/verifyemail",
  "/forgotpassword",
  "/resetpassword",
];

/**
 * A prefix for the api auth routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after successful sign in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
