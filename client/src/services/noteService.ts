import { Note, CreateNoteInput, UpdateNoteInput } from '@/types/note';
import { safeFetch, processApiError } from '@/utils/api';

// Use a consistent API URL that respects CORS
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const NoteService = {
  // Get all notes
  getNotes: async (page = 1, limit = 10): Promise<{ notes: Note[], hasMore: boolean }> => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('Not authenticated');

      const data = await safeFetch(`${API_BASE_URL}/notes?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      return {
        notes: data.notes || [],
        hasMore: data.hasMore || false
      };
    } catch (error) {
      console.error('Error getting notes:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },

  // Create new note
  createNote: async (input: CreateNoteInput): Promise<Note> => {
    try {
      const token = sessionStorage.getItem('accessToken'); 
      if (!token) throw new Error('Not authenticated');

      return await safeFetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: input.title.trim(),
          content: input.content || ""
        })
      });
    } catch (error) {
      console.error('Error creating note:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },

  // Update note
  updateNote: async (input: UpdateNoteInput): Promise<Note> => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('Not authenticated');

      return await safeFetch(`${API_BASE_URL}/notes/${input.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: input.title?.trim(),
          content: input.content || ""
        })
      });
    } catch (error) {
      console.error('Error updating note:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },

  // Delete note
  deleteNote: async (id: string): Promise<void> => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('Not authenticated');

      await safeFetch(`${API_BASE_URL}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  },
  
  // Get single note
  getNote: async (id: string): Promise<Note> => {
    try {
      const token = sessionStorage.getItem('accessToken');
      if (!token) throw new Error('Not authenticated');

      return await safeFetch(`${API_BASE_URL}/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.error('Error getting note:', error);
      // Just rethrow the error - our safeFetch already standardizes error messages
      throw error;
    }
  }
};
