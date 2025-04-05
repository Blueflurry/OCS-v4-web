"use client";
import React from "react";
// import Link from "next/link";
import styles from "./PrivacyPolicy.module.scss";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";
import { useRouter } from "next/navigation";

// export const metadata = {
//     title: "Privacy Policy | OneClick Stays",
//     description:
//         "Learn how OneClick Stays collects, uses, and protects your personal information.",
// };

const PrivacyPolicyPage = () => {
    const router = useRouter();
    const onClick = () => {
        router.push("/");
    };

    return (
        <div className={styles.policyPage}>
            <div className={styles.header}>
                <BackButton />
                <h1>Privacy Policy</h1>
                <p className={styles.lastUpdated}>
                    Last Updated: April 5, 2025
                </p>
            </div>

            <div className={styles.content}>
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        At OneClick Stays, we value your privacy and are
                        committed to protecting your personal information. This
                        Privacy Policy explains how we collect, use, disclose,
                        and safeguard your information when you use our website,
                        mobile application, or services.
                    </p>
                    <p>
                        By accessing or using OneClick Stays, you consent to the
                        practices described in this Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <h3>2.1 Information You Provide</h3>
                    <p>
                        We may collect the following types of information that
                        you voluntarily provide to us:
                    </p>
                    <ul>
                        <li>
                            <strong>Personal Information:</strong> Name, email
                            address, phone number, and profile picture.
                        </li>
                        <li>
                            <strong>Account Information:</strong> Username,
                            password, and account preferences.
                        </li>
                        <li>
                            <strong>Booking Information:</strong> Travel dates,
                            guest details, special requests, and accommodation
                            preferences.
                        </li>
                        <li>
                            <strong>Payment Information:</strong> Credit card
                            details, billing address, and transaction history.
                        </li>
                        <li>
                            <strong>Communication:</strong> Messages, reviews,
                            and feedback submitted through our platform.
                        </li>
                    </ul>

                    <h3>2.2 Information Automatically Collected</h3>
                    <p>
                        When you use our platform, we may automatically collect
                        certain information, including:
                    </p>
                    <ul>
                        <li>
                            <strong>Device Information:</strong> IP address,
                            device type, operating system, and browser type.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> Pages viewed, features
                            used, search queries, click data, and interaction
                            with our platform.
                        </li>
                        <li>
                            <strong>Location Data:</strong> General location
                            based on IP address or more precise location if you
                            enable location services.
                        </li>
                        <li>
                            <strong>Cookies and Similar Technologies:</strong>{" "}
                            Information collected through cookies, web beacons,
                            and similar technologies.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>
                        We use the information we collect for various purposes,
                        including to:
                    </p>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process bookings and payments</li>
                        <li>
                            Facilitate communication between users and Partners
                        </li>
                        <li>
                            Send booking confirmations, updates, and support
                            messages
                        </li>
                        <li>
                            Personalize your experience and provide tailored
                            content
                        </li>
                        <li>
                            Conduct analytics and research to improve our
                            platform
                        </li>
                        <li>
                            Detect, prevent, and address technical issues,
                            fraud, or illegal activities
                        </li>
                        <li>Comply with legal obligations</li>
                        <li>
                            Send marketing communications (with your consent)
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>4. Information Sharing and Disclosure</h2>
                    <p>We may share your information with:</p>
                    <ul>
                        <li>
                            <strong>Partners:</strong> We share necessary
                            booking information with the Partners providing your
                            accommodation.
                        </li>
                        <li>
                            <strong>Service Providers:</strong> Third-party
                            vendors who perform services on our behalf, such as
                            payment processing, data analysis, email delivery,
                            and customer service.
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> We may disclose
                            information if required by law, regulation, legal
                            process, or governmental request.
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> In the event of
                            a merger, acquisition, or sale of assets, your
                            information may be transferred as part of the
                            transaction.
                        </li>
                        <li>
                            <strong>With Your Consent:</strong> We may share
                            information with third parties when you have given
                            your consent to do so.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>5. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational
                        measures to protect your personal information against
                        unauthorized access, alteration, disclosure, or
                        destruction. However, no method of transmission over the
                        Internet or electronic storage is 100% secure, and we
                        cannot guarantee absolute security.
                    </p>
                </section>

                <section>
                    <h2>6. Your Rights and Choices</h2>
                    <p>
                        Depending on your location, you may have certain rights
                        regarding your personal information, including:
                    </p>
                    <ul>
                        <li>
                            Accessing, correcting, or deleting your personal
                            information
                        </li>
                        <li>
                            Restricting or objecting to our use of your personal
                            information
                        </li>
                        <li>
                            Receiving a copy of your personal information in a
                            structured, machine-readable format
                        </li>
                        <li>
                            Withdrawing consent at any time (where processing is
                            based on consent)
                        </li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us using the
                        information provided in the "Contact Us" section.
                    </p>
                </section>

                <section>
                    <h2>7. Cookies and Similar Technologies</h2>
                    <p>
                        We use cookies and similar technologies to enhance your
                        experience, analyze usage patterns, and deliver
                        personalized content. You can control cookies through
                        your browser settings and other tools. However,
                        disabling cookies may limit your ability to use certain
                        features of our platform.
                    </p>
                </section>

                <section>
                    <h2>8. Children's Privacy</h2>
                    <p>
                        Our services are not directed to individuals under the
                        age of 18, and we do not knowingly collect personal
                        information from children. If you believe we have
                        inadvertently collected information from a child, please
                        contact us to have it removed.
                    </p>
                </section>

                <section>
                    <h2>9. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and processed in
                        countries other than the one in which you reside. These
                        countries may have different data protection laws. We
                        will take appropriate measures to ensure your
                        information remains protected in accordance with this
                        Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2>10. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time to
                        reflect changes in our practices or legal requirements.
                        We will notify you of any material changes by posting
                        the updated Privacy Policy on our platform or by other
                        appropriate means.
                    </p>
                </section>

                <section>
                    <h2>11. Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or requests
                        regarding this Privacy Policy or our privacy practices,
                        please contact us at:
                    </p>
                    <p>
                        Email: privacy@oneclickstays.com
                        <br />
                        Phone: +91 1234567890
                        <br />
                        Address: OneClick Stays, 123 Digital Avenue, Bangalore,
                        Karnataka, India
                    </p>
                </section>
            </div>
            <Footer btnText="Back to Home" onClick={onClick} />
        </div>
    );
};

export default PrivacyPolicyPage;
