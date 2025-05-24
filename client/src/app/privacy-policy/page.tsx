import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
    title: "Privacy Policy | Snapshot Notes",
    description:
        "Learn about how Snapshot Notes handles your personal information and protects your privacy.",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto py-12 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    Privacy Policy
                </h1>

                <div className="space-y-8">
                    <section>
                        <p className="mb-4 text-lg">
                            At Snapshot Notes, we value your privacy and are
                            committed to protecting your personal data. This
                            Privacy Policy explains how we collect, use, and
                            safeguard your information when you use our service.
                        </p>
                        <p className="mb-4">
                            We collect only the minimum information necessary to
                            provide our services. We do not sell or share your
                            personal data with third parties except as described
                            in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Information We Collect
                        </h2>
                        <h3 className="text-xl font-medium mt-4 mb-2">
                            Personal Information
                        </h3>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>
                                Email address (for account creation and
                                communication)
                            </li>
                            <li>Name (to personalize your experience)</li>
                            <li>Profile information you choose to provide</li>
                        </ul>

                        <h3 className="text-xl font-medium mt-4 mb-2">
                            Content Information
                        </h3>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>
                                Notes and content you create, upload, or store
                                within the app
                            </li>
                            <li>Files you attach to your notes</li>
                        </ul>

                        <h3 className="text-xl font-medium mt-4 mb-2">
                            Usage Information
                        </h3>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>
                                Log data (IP address, browser type, pages
                                visited)
                            </li>
                            <li>Device information (type, operating system)</li>
                            <li>Feature usage patterns (anonymized)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            How We Use Your Information
                        </h2>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>To create and maintain your account</li>
                            <li>
                                To provide, improve, and develop our services
                            </li>
                            <li>To personalize your experience</li>
                            <li>
                                To communicate with you about account-related
                                matters
                            </li>
                            <li>
                                To ensure the security of our platform and
                                prevent abuse
                            </li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Data Retention
                        </h2>
                        <p className="mb-4">
                            We retain your personal information for as long as
                            necessary to provide you with our services. If you
                            delete your account, we will delete or anonymize
                            your personal information within 30 days, unless we
                            are legally required to retain it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Your Rights
                        </h2>
                        <p className="mb-4">
                            Depending on your location, you may have the
                            following rights regarding your data:
                        </p>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>Access to your personal information</li>
                            <li>Correction of inaccurate or incomplete data</li>
                            <li>Deletion of your personal information</li>
                            <li>Restriction of processing of your data</li>
                            <li>
                                Data portability (receiving your data in a
                                structured format)
                            </li>
                            <li>Objection to processing of your data</li>
                        </ul>
                        <p className="mb-4">
                            To exercise these rights, please contact us at{" "}
                            <a
                                href="mailto:support@snapshotnotes.com"
                                className="text-blue-600 dark:text-blue-400 underline"
                            >
                                support@snapshotnotes.com
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Security
                        </h2>
                        <p className="mb-4">
                            We implement appropriate technical and
                            organizational measures to protect your personal
                            information. However, no method of transmission over
                            the Internet or electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Changes to This Policy
                        </h2>
                        <p className="mb-4">
                            We may update this Privacy Policy from time to time.
                            We will notify you of any changes by posting the new
                            Privacy Policy on this page and updating the "Last
                            Updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Contact Us
                        </h2>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy,
                            please contact us at{" "}
                            <a
                                href="mailto:support@snapshotnotes.com"
                                className="text-blue-600 dark:text-blue-400 underline"
                            >
                                support@snapshotnotes.com
                            </a>
                            .
                        </p>
                    </section>

                    <div className="mt-12 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last updated: May 24, 2025
                        </p>
                        <p className="text-sm mt-2">
                            <Link
                                href="/terms"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View our Terms of Service
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
