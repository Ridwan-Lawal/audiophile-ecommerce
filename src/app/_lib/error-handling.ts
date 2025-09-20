import { PostgrestError } from "@supabase/supabase-js";
import { AuthError } from "next-auth";

export function logFullErrorInDevMode(error: AuthError) {
  console.log({
    name: error.name,
    cause: error.cause,
    stack: error.stack,
    type: error.type,
    message: error.message,
  });
}

export function logSupabaseErrorInDevMode(error: PostgrestError) {
  console.log({
    name: error.name,
    cause: error.cause,
    stack: error.stack,
    message: error.message,
  });
}

export function getUserErrorMesageForGet(error: PostgrestError | Error) {
  // Check if it's a PostgrestError with code
  if ("code" in error && error.code) {
    switch (error.code) {
      case "PGRST116": // No rows returned
        return "We couldn't find what you're looking for. Please try again.";

      case "23505": // Unique constraint violation
        return "This information is already in use. Please try something different.";

      case "42501": // RLS policy violation
        return "Sorry, you don't have permission to access this content.";

      case "PGRST301": // Connection timeout
        return "Taking longer than usual. Please check your connection and try again.";

      case "23503": // Foreign key violation
        return "Something went wrong. Please try again or contact support.";

      case "23502": // Not null violation
        return "Please fill in all required information.";

      default:
        return "Something went wrong on our end. Please try again.";
    }
  }

  // Handle common error messages
  if (error.message) {
    if (error.message.includes("network")) {
      return "Connection issue detected. Please check your internet and try again.";
    }

    if (error.message.includes("timeout")) {
      return "Request timed out. Please try again.";
    }

    if (error.message.includes("JSON")) {
      return "Data format issue. Please refresh the page and try again.";
    }
  }

  // Generic fallback
  return "Oops! Something unexpected happened. Please try again.";
}

// INSERT ERROR HANDLER
export function getUserErrorMessageForInsert(error: PostgrestError | Error) {
  // Check if it's a PostgrestError with code
  if ("code" in error && error.code) {
    switch (error.code) {
      case "23505": // Unique constraint violation
        if (error.details?.includes("email")) {
          return "This email address is already registered. Please use a different email.";
        }
        if (error.details?.includes("username")) {
          return "This username is already taken. Please choose a different one.";
        }
        return "This item already exists. Please use different information.";

      case "23503": // Foreign key violation
        return "Cannot create this item due to invalid reference. Please check your data.";

      case "23502": // Not null violation
        return "Required information is missing. Please fill in all required fields.";

      case "23514": // Check constraint violation
        return "Invalid data provided. Please check your input values.";

      case "42501": // RLS policy violation
        return "You don't have permission to create this item.";

      case "PGRST301": // Connection timeout
        return "Taking longer than usual. Please check your connection and try again.";

      case "22001": // String data too long
        return "Some of your text is too long. Please shorten it and try again.";

      case "22003": // Numeric value out of range
        return "One of your numbers is too large or too small.";

      case "22P02": // Invalid text representation
        return "Invalid data format provided. Please check your input.";

      default:
        return "Failed to create the item. Please try again.";
    }
  }

  // Handle common error messages
  if (error.message) {
    if (error.message.includes("duplicate key")) {
      return "This item already exists. Please use different information.";
    }

    if (error.message.includes("network")) {
      return "Connection issue detected. Please check your internet and try again.";
    }

    if (error.message.includes("timeout")) {
      return "Request timed out. Please try again.";
    }

    if (error.message.includes("JSON")) {
      return "Data format issue. Please refresh the page and try again.";
    }

    if (
      error.message.includes("JWT") ||
      error.message.includes("unauthorized")
    ) {
      return "Your session has expired. Please sign in again.";
    }
  }

  // Generic fallback
  return "Failed to create the item. Please try again.";
}

// UPDATE ERROR HANDLER
export function getUserErrorMessageForUpdate(error: PostgrestError | Error) {
  // Check if it's a PostgrestError with code
  if ("code" in error && error.code) {
    switch (error.code) {
      case "PGRST116": // No rows returned
        return "Item not found or no changes were made.";

      case "23505": // Unique constraint violation
        if (error.details?.includes("email")) {
          return "This email address is already in use. Please use a different email.";
        }
        if (error.details?.includes("username")) {
          return "This username is already taken. Please choose a different one.";
        }
        return "Cannot update because this would create a duplicate.";

      case "23503": // Foreign key violation
        return "Cannot update due to related data. Please check references.";

      case "23502": // Not null violation
        return "Cannot remove required information. Please fill in all required fields.";

      case "23514": // Check constraint violation
        return "Invalid data provided. Please check your input values.";

      case "42501": // RLS policy violation
        return "You don't have permission to update this item.";

      case "PGRST301": // Connection timeout
        return "Taking longer than usual. Please check your connection and try again.";

      case "22001": // String data too long
        return "Some of your text is too long. Please shorten it and try again.";

      case "22003": // Numeric value out of range
        return "One of your numbers is too large or too small.";

      case "22P02": // Invalid text representation
        return "Invalid data format provided. Please check your input.";

      default:
        return "Failed to update the item. Please try again.";
    }
  }

  // Handle common error messages
  if (error.message) {
    if (error.message.includes("duplicate key")) {
      return "Cannot update because this would create a duplicate.";
    }

    if (error.message.includes("network")) {
      return "Connection issue detected. Please check your internet and try again.";
    }

    if (error.message.includes("timeout")) {
      return "Request timed out. Please try again.";
    }

    if (error.message.includes("JSON")) {
      return "Data format issue. Please refresh the page and try again.";
    }

    if (
      error.message.includes("JWT") ||
      error.message.includes("unauthorized")
    ) {
      return "Your session has expired. Please sign in again.";
    }

    if (error.message.includes("no rows")) {
      return "Item not found or no changes were made.";
    }
  }

  // Generic fallback
  return "Failed to update the item. Please try again.";
}

// DELETE ERROR HANDLER
export function getUserErrorMessageForDelete(error: PostgrestError | Error) {
  // Check if it's a PostgrestError with code
  if ("code" in error && error.code) {
    switch (error.code) {
      case "PGRST116": // No rows returned
        return "Item not found or already deleted.";

      case "23503": // Foreign key violation (cannot delete due to references)
        return "Cannot delete this item because it's being used elsewhere. Remove related items first.";

      case "42501": // RLS policy violation
        return "You don't have permission to delete this item.";

      case "PGRST301": // Connection timeout
        return "Taking longer than usual. Please check your connection and try again.";

      default:
        return "Failed to delete the item. Please try again.";
    }
  }

  // Handle common error messages
  if (error.message) {
    if (error.message.includes("violates foreign key")) {
      return "Cannot delete this item because it's being used elsewhere. Remove related items first.";
    }

    if (error.message.includes("network")) {
      return "Connection issue detected. Please check your internet and try again.";
    }

    if (error.message.includes("timeout")) {
      return "Request timed out. Please try again.";
    }

    if (error.message.includes("JSON")) {
      return "Data format issue. Please refresh the page and try again.";
    }

    if (
      error.message.includes("JWT") ||
      error.message.includes("unauthorized")
    ) {
      return "Your session has expired. Please sign in again.";
    }

    if (error.message.includes("no rows")) {
      return "Item not found or already deleted.";
    }
  }

  // Generic fallback
  return "Failed to delete the item. Please try again.";
}
