// src/services/noteService.ts
import axios, { type AxiosInstance } from "axios";
import type { Note, NoteCreateInput} from "../types/note";

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

const api: AxiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study",
  headers: { Authorization: `Bearer ${NOTEHUB_TOKEN}` },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteWithUser extends Note {
  userId: string;
}


// запит для отримання колекції нотаток
export async function fetchNotes(search: string, page: number): Promise<NotesResponse> {
  const params = { perPage: 12, search, page, sortBy: "created" };
  const { data } = await api.get<NotesResponse>("/api/notes", { params });
  return data;
}

// запит для створення нової нотатки
export async function createNote(input: NoteCreateInput): Promise<Note> {
  const { data } = await api.post<Note>("/api/notes", input);
  return data;
}

//запит для видалення нотатки
export async function deleteNote(id: string): Promise<NoteWithUser> {
  const { data } = await api.delete<NoteWithUser>(`/api/notes/${id}`);
  return data;
}


//запит за одною нотаткою
export async function fetchNoteById(id: string) {
    const { data } = await api.get<NoteWithUser>(`/api/notes/${id}`);
  return data;
} 