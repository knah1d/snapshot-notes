"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProfileForm from "@/components/ProfileForm";
import { AuthService } from "@/services/authService";
import { UserData } from "@/types/auth";

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<UserData>({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        initials: "JD",
        createdAt: new Date().toISOString(),
        stats: {
            totalNotes: 0,
            recentNotes: 0,
        },
        preferences: {
            darkMode: false,
            notificationEnabled: true,
        },
    });
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Check if user is authenticated
                if (!AuthService.isAuthenticated()) {
                    router.push("/auth/login");
                    return;
                }

                // Get user data
                const user = AuthService.getCurrentUser();
                if (!user) {
                    router.push("/auth/login");
                    return;
                }

                // Fetch latest stats
                const stats = await AuthService.getUserStats();

                setUserData({
                    ...user,
                    stats: {
                        totalNotes: stats.count,
                        recentNotes: stats.recentCount,
                    },
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = () => {
        AuthService.logout();
        router.push("/");
    };

    const handleProfileUpdate = (updatedData: UserData) => {
        setUserData(updatedData);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Profile
                        </h1>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="text-red-600 hover:bg-red-50 border-red-300 dark:text-red-400 dark:hover:bg-red-900/20 dark:border-red-800"
                        >
                            Logout
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <Card className="text-center p-8">
                                <div className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-4xl font-bold text-white">
                                        {userData.initials}
                                    </span>
                                </div>
                                <h2 className="text-xl font-semibold mb-1">
                                    {userData.firstName} {userData.lastName}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {userData.email}
                                </p>
                                <div className="space-y-2">
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Total Notes
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {userData.stats?.totalNotes || 0}
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Recent Notes
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                            {userData.stats?.recentNotes || 0}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Main content */}
                        <div className="md:col-span-2 space-y-6">
                            <ProfileForm
                                userData={userData}
                                onUpdate={handleProfileUpdate}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
