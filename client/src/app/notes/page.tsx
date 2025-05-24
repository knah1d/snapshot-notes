"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientNoteCard from "@/components/ClientNoteCard";
import NewNoteButton from "@/components/NewNoteButton";
import ErrorMessage from "@/components/ErrorMessage";
import { NoteService } from "@/services/noteService";
import { AuthService } from "@/services/authService";
import type { Note } from "@/types/note";

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Create a state to track note refresh trigger
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Function to trigger notes refresh that can be passed to child components
    const refreshNotes = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    useEffect(() => {
        if (!AuthService.isAuthenticated()) {
            router.push("/auth/login");
            return;
        }

        const loadNotes = async () => {
            try {
                setIsLoading(true);
                const result = await NoteService.getNotes();
                setNotes(result.notes);
                setError(null);
            } catch (e) {
                console.error("Error loading notes:", e);

                if (e instanceof Error) {
                    if (
                        e.message.includes("Network error") ||
                        e.message.includes("Failed to fetch")
                    ) {
                        setError(
                            "Network error. Please check your internet connection and try again."
                        );
                    } else if (e.message.includes("timeout")) {
                        setError(
                            "Request timed out. The server is taking too long to respond. Please try again later."
                        );
                    } else if (e.message.includes("Not authenticated")) {
                        setError(
                            "Your session has expired. Please log in again."
                        );
                        // Redirect to login after a short delay
                        setTimeout(() => {
                            router.push("/auth/login");
                        }, 2000);
                    } else {
                        setError(
                            e.message ||
                                "Failed to load notes. Please try again."
                        );
                    }
                } else {
                    setError("Failed to load notes. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadNotes();
    }, [router, refreshTrigger]);

    const handleRetry = () => {
        setError(null);
        refreshNotes();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            My Notes
                        </h1>

                        <div className="flex gap-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    placeholder="Search notes..."
                                    className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                />
                            </div>

                            <NewNoteButton onNoteCreated={refreshNotes} />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <ErrorMessage
                                message={error}
                                onRetry={handleRetry}
                                className="inline-block max-w-lg"
                            />
                            <button
                                onClick={handleRetry}
                                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Retry
                            </button>
                        </div>
                    ) : notes.length === 0 ? (
                        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                            <p>
                                No notes yet. Create your first note to get
                                started!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map((note) => (
                                <ClientNoteCard
                                    key={note.id}
                                    id={note.id}
                                    title={note.title}
                                    content={note.content}
                                    createdAt={note.createdAt}
                                    tags={note.tags || []}
                                    images={note.images || []}
                                    onUpdate={refreshNotes}
                                    onDelete={refreshNotes}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
