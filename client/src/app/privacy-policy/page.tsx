import React from "react";

export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-2xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">
                Your privacy is important to us. Snapshot Notes collects only
                the minimum information necessary to provide our services. We do
                not sell or share your personal data with third parties except
                as required by law or to provide our core functionality.
            </p>
            <h2 className="text-xl font-semibold mt-8 mb-2">
                Information We Collect
            </h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Email address and name for account creation</li>
                <li>Notes and content you create within the app</li>
                <li>Basic usage analytics (non-identifiable)</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2">
                How We Use Your Information
            </h2>
            <ul className="list-disc ml-6 mb-4">
                <li>To provide and improve our note-taking service</li>
                <li>To communicate with you about your account</li>
                <li>To ensure security and prevent abuse</li>
            </ul>
            <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
            <p className="mb-4">
                You may request deletion of your account and data at any time.
                For questions, contact us at{" "}
                <a
                    href="mailto:support@snapshotnotes.com"
                    className="text-blue-600 underline"
                >
                    support@snapshotnotes.com
                </a>
                .
            </p>
            <p className="text-sm text-gray-500 mt-8">
                Last updated: May 24, 2025
            </p>
        </main>
    );
}
