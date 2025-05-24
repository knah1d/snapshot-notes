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

      // If we have images, use FormData
      if (input.images && input.images.length > 0) {
        const formData = new FormData();
        formData.append('title', input.title);
        formData.append('content', input.content || "");
        
        if (input.tags && input.tags.length > 0) {
          formData.append('tags', JSON.stringify(input.tags));
        } else {
          formData.append('tags', JSON.stringify([]));
        }
        
        // Enhanced logging for debugging
        console.log(`Uploading ${input.images.length} images:`, 
          input.images.map(img => ({name: img.name, type: img.type, size: img.size}))
        );
        
        // Append each image to the FormData
        input.images.forEach((image, index) => {
          formData.append('images', image);
          console.log(`Added image ${index}: ${image.name}, type: ${image.type}, size: ${image.size}B`);
        });

        console.log('API URL:', `${API_BASE_URL}/notes`);
        console.log('Token available:', !!token);
        
        try {
          const response = await fetch(`${API_BASE_URL}/notes`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
              // Do NOT set Content-Type for FormData, browser will set it with boundary
            },
            body: formData,
            credentials: 'include'
          });
          
          console.log('Upload response status:', response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Upload error response:', errorText);
            throw new Error(`Upload failed: ${response.status} ${errorText}`);
          }
          
          const data = await response.json();
          console.log('Upload success:', data);
          return data;
        } catch (uploadError) {
          console.error('Upload request error:', uploadError);
          throw uploadError;
        }
      } else {
        // If no images, use JSON
        return await safeFetch(`${API_BASE_URL}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: input.title.trim(),
            content: input.content || "",
            tags: input.tags || []
          })
        });
      }
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
      if (!token) {
        // If not authenticated, prepare to redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        //throw new Error('Not authenticated');
      }

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
      if (!token) {
        // If not authenticated, prepare to redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        //throw new Error('Not authenticated');
      }

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
