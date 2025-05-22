# Utility Functions

This directory contains utility functions for the Snapshot Notes application.

## API Utilities

The `api.ts` file provides utilities for working with API requests and error handling.

### safeFetch

A wrapper around the fetch API that handles common error scenarios including:

-   Network errors
-   Timeouts
-   Authentication errors
-   JSON parsing errors

```typescript
import { safeFetch } from "@/utils/api";

// Example usage
try {
    const data = await safeFetch("/api/endpoint", {
        method: "POST",
        body: JSON.stringify({ key: "value" }),
    });
    // Handle successful response
} catch (error) {
    // Error is already formatted with a user-friendly message
    console.error(error.message);
}
```

### processApiError

A utility function to standardize error messages from various error sources.

```typescript
import { processApiError } from "@/utils/api";

try {
    // API call
} catch (error) {
    const errorMessage = processApiError(error);
    console.error(errorMessage);
    // Display to user
}
```

## Error Handling Best Practices

1. Use the `safeFetch` utility for all API calls
2. Avoid creating new Error objects when rethrowing errors
3. Use the `ErrorMessage` component to display errors to users
4. Include retry mechanisms when appropriate
5. Handle network, timeout, and authentication errors separately
6. Log errors to console for debugging
