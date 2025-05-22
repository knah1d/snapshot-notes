'use client';

import fetch from 'cross-fetch';

/**
 * Utility functions for handling API and network errors
 */

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
export const safeFetch = async (url: string, options: RequestInit = {}) => {
  try {
    // Add default headers if not provided
    const headers = {
      'Content-Type': 'application/json',
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
