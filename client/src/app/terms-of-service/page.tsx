import React from "react";

export default function TermsOfServicePage() {
    return (
        <main className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">
                By using Snapshot Notes, you agree to the following terms and
                conditions. Please read them carefully.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-2">Use of Service</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>You must be at least 13 years old to use this service.</li>
                <li>
                    You are responsible for maintaining the security of your
                    account.
                </li>
                <li>
                    Do not use Snapshot Notes for unlawful or harmful
                    activities.
                </li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2">Content</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>You retain ownership of your notes and content.</li>
                <li>
                    We reserve the right to remove content that violates our
                    policies or the law.
                </li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2">Disclaimer</h2>
            <p className="mb-4">
                Snapshot Notes is provided as-is without warranties of any kind.
                We are not liable for any damages or data loss.
            </p>
            <p className="text-sm text-gray-500 mt-8">
                Last updated: May 24, 2025
            </p>
        </main>
    );
}
