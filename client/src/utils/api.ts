'use client';

import fetch from 'cross-fetch';

/**
 * Utility functions for handling API and network errors
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Refresh the access token using the refresh token stored in cookies
 * @returns boolean indicating if refresh was successful
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'GET',
      credentials: 'include', // Include cookies
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    
    // Store the new access token
    if (data.token) {
      sessionStorage.setItem('accessToken', data.token);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};

/**
 * Process and format API errors for consistent error handling
 * @param error The error caught in try/catch blocks
 * @returns A standardized error message suitable for display to users
 */
export const processApiError = (error: unknown): string => {
  // If it's already an Error object, use its message but apply standardized formatting
  if (error instanceof Error) {
    // Network errors
    if (
      error.message.includes('Failed to fetch') || 
      error.message.includes('Network error') ||
      error.message.includes('Network request failed') ||
      error.message.includes('NetworkError') ||
      error.message.includes('network error')
    ) {
      return 'Network error. Please check your internet connection and try again.';
    }
    
    // AbortError - request timeout
    if (error.name === 'AbortError') {
      return 'Request timed out. Please try again.';
    }
    
    // Authentication errors
    if (
      error.message.includes('unauthorized') || 
      error.message.includes('Unauthorized') ||
      error.message.includes('not authenticated') ||
      error.message.includes('Not authenticated')
    ) {
      return 'Authentication error. Please log in again.';
    }
    
    // Return the actual error message from the API if available
    return error.message;
  }
  
  // For unknown error types
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Make a fetch request with proper error handling and timeout
 * @param url API URL
 * @param options Fetch API options
 * @returns Response data
 */
export const safeFetch = async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    // Add default headers if not provided and if body is not FormData
    const headers = {
      ...(!(options.body instanceof FormData) && {'Content-Type': 'application/json'}),
      ...options.headers,
    };

    // Create an AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      // Make the fetch request with the abort signal
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
        credentials: 'include',
      });

      // Clear the timeout
      clearTimeout(timeoutId);

      // If the response is not ok, throw an error
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Check if the error is due to an expired token
        if (response.status === 401 && (errorData.error?.includes('expired') || errorData.error?.includes('invalid'))) {
          // Try to refresh the token
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            // If token was refreshed successfully, retry the original request
            const newOptions = { ...options };
            
            // Update the Authorization header with the new token if it exists
            if (newOptions.headers && typeof newOptions.headers === 'object') {
              const token = sessionStorage.getItem('accessToken');
              if (token) {
                (newOptions.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
              }
            }
            
            // Retry the request with the new token
            return safeFetch(url, newOptions);
          }
        }
        
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      // Parse and return the JSON response
      return await response.json();
    } catch (fetchError) {
      // Clear the timeout if there was a fetch error
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    if (error instanceof Error) {
      // Only create a new error if we need to clarify/standardize the message
      if (error.name === 'AbortError') {
        // Standardize timeout error message
        error.message = 'Request timed out. Please try again.';
      } else if (
        error.message.includes('Failed to fetch') ||
        error.message.includes('Network error') ||
        error.message.includes('NetworkError')
      ) {
        // Standardize network error message
        error.message = 'Network error. Please check your internet connection and try again.';
      }
    }
    throw error;
  }
};
