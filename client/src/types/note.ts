export interface Note {
  id: string;
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  images?: File[];
  tags?: string[];
}

export interface UpdateNoteInput extends Partial<CreateNoteInput> {
  id: string;
  imagesToDelete?: string[];
}
