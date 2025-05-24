import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
    title: "Terms of Service | Snapshot Notes",
    description:
        "The terms and conditions governing your use of Snapshot Notes.",
};

export default function TermsOfServicePage() {
    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto py-12 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    Terms of Service
                </h1>

                <div className="space-y-8">
                    <section>
                        <p className="mb-4 text-lg">
                            Welcome to Snapshot Notes. By accessing or using our
                            service, you agree to be bound by these Terms of
                            Service ("Terms"). Please read them carefully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            1. Acceptance of Terms
                        </h2>
                        <p className="mb-4">
                            By accessing or using Snapshot Notes, you agree to
                            be bound by these Terms and our Privacy Policy. If
                            you do not agree to these Terms, you may not use our
                            service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            2. Eligibility
                        </h2>
                        <p className="mb-4">
                            You must be at least 13 years old to use Snapshot
                            Notes. By using our service, you represent and
                            warrant that you meet this eligibility requirement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            3. User Accounts
                        </h2>
                        <p className="mb-4">
                            To use certain features of Snapshot Notes, you must
                            create an account. You agree to:
                        </p>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>
                                Provide accurate and complete information when
                                creating your account
                            </li>
                            <li>
                                Maintain the security of your account
                                credentials
                            </li>
                            <li>
                                Be responsible for all activities that occur
                                under your account
                            </li>
                            <li>
                                Notify us immediately of any unauthorized use of
                                your account
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            4. User Content
                        </h2>
                        <p className="mb-4">
                            You retain ownership of the content you create,
                            upload, or store on Snapshot Notes. By using our
                            service, you grant us a non-exclusive, worldwide,
                            royalty-free license to host, store, and use your
                            content solely for the purpose of providing and
                            improving our service.
                        </p>
                        <p className="mb-4">
                            You are solely responsible for your content and you
                            agree not to post or transmit content that:
                        </p>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>Violates any applicable law or regulation</li>
                            <li>
                                Infringes on the intellectual property rights of
                                others
                            </li>
                            <li>
                                Contains viruses, malware, or other harmful code
                            </li>
                            <li>Harasses, threatens, or intimidates others</li>
                            <li>
                                Promotes violence, discrimination, or illegal
                                activities
                            </li>
                        </ul>
                        <p className="mb-4">
                            We reserve the right to remove any content that
                            violates these Terms or that we find objectionable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            5. Service Changes and Availability
                        </h2>
                        <p className="mb-4">
                            We reserve the right to modify, suspend, or
                            discontinue any part of Snapshot Notes at any time,
                            with or without notice. We will not be liable to you
                            or any third party for any such modifications,
                            suspensions, or discontinuations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            6. Intellectual Property
                        </h2>
                        <p className="mb-4">
                            Snapshot Notes and its content, features, and
                            functionality are owned by us and are protected by
                            intellectual property laws. You may not copy,
                            modify, distribute, sell, or lease any part of our
                            service without our prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            7. Disclaimer of Warranties
                        </h2>
                        <p className="mb-4">
                            SNAPSHOT NOTES IS PROVIDED "AS IS" AND "AS
                            AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
                            EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED
                            BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT
                            NOT LIMITED TO IMPLIED WARRANTIES OF
                            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                            AND NON-INFRINGEMENT.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            8. Limitation of Liability
                        </h2>
                        <p className="mb-4">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT
                            SHALL SNAPSHOT NOTES, ITS DIRECTORS, EMPLOYEES,
                            PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE
                            FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                            CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                            WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
                            GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
                            FROM:
                        </p>
                        <ul className="list-disc ml-8 mb-4 space-y-2">
                            <li>
                                Your access to or use of or inability to access
                                or use the service
                            </li>
                            <li>
                                Any conduct or content of any third party on the
                                service
                            </li>
                            <li>Any content obtained from the service</li>
                            <li>
                                Unauthorized access, use, or alteration of your
                                transmissions or content
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            9. Changes to Terms
                        </h2>
                        <p className="mb-4">
                            We reserve the right to modify these Terms at any
                            time. If we make material changes to these Terms, we
                            will notify you by email or by posting a notice on
                            our website. Your continued use of Snapshot Notes
                            after such modification constitutes your acceptance
                            of the modified Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            10. Governing Law
                        </h2>
                        <p className="mb-4">
                            These Terms shall be governed by and construed in
                            accordance with the laws of the jurisdiction in
                            which Snapshot Notes is based, without regard to its
                            conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            11. Contact Information
                        </h2>
                        <p className="mb-4">
                            If you have any questions about these Terms, please
                            contact us at{" "}
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
                                href="/privacy"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                View our Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
