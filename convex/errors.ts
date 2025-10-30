import { ConvexError } from "convex/values";

export function throwAuthError(message: string = "Authentication required") {
  throw new ConvexError(message);
}

export function throwUnauthorizedError(message: string = "Unauthorized") {
  throw new ConvexError(message);
}

export function throwNotFoundError(resource: string) {
  throw new ConvexError(`${resource} not found`);
}
