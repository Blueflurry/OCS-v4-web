"use client";
import React from "react";
import Link from "next/link";
import styles from "./Terms.module.scss";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";
import { useRouter } from "next/navigation";

// export const metadata = {
//     title: "Terms and Conditions | OneClick Stays",
//     description:
//         "Terms and conditions for using OneClick Stays luxury accommodation booking services.",
// };

const TermsPage = () => {
    const router = useRouter();
    const onClick = () => {
        router.push("/");
    };
    return (
        <div className={styles.termsPage}>
            <div className={styles.header}>
                <BackButton />
                <h1>Terms and Conditions</h1>
                <p className={styles.lastUpdated}>
                    Last Updated: April 5, 2025
                </p>
            </div>

            <div className={styles.content}>
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to OneClick Stays. These Terms and Conditions
                        govern your use of the OneClick Stays website, mobile
                        applications, and services. By accessing or using
                        OneClick Stays, you agree to be bound by these Terms.
                    </p>
                    <p>
                        OneClick Stays provides a platform for users to
                        discover, book, and pay for luxury accommodations in
                        India, managed by our partner hospitality companies.
                    </p>
                </section>

                <section>
                    <h2>2. Definitions</h2>
                    <p>
                        <strong>"OneClick Stays"</strong> refers to our company,
                        website, mobile applications, and services.
                    </p>
                    <p>
                        <strong>"Partners"</strong> refers to the stay
                        management companies that list their properties on our
                        platform.
                    </p>
                    <p>
                        <strong>"Users"</strong> or <strong>"Guests"</strong>{" "}
                        refers to individuals who browse, book, or stay at
                        accommodations listed on OneClick Stays.
                    </p>
                    <p>
                        <strong>"Stays"</strong> refers to the accommodations
                        listed on our platform.
                    </p>
                    <p>
                        <strong>"Add-Ons"</strong> refers to additional services
                        that can be purchased with a booking.
                    </p>
                </section>

                <section>
                    <h2>3. Account Registration</h2>
                    <p>
                        Users may be required to create an account to access
                        certain features of OneClick Stays. You are responsible
                        for maintaining the confidentiality of your account
                        information and for all activities that occur under your
                        account.
                    </p>
                    <p>
                        You agree to provide accurate, current, and complete
                        information during registration and to update such
                        information to keep it accurate, current, and complete.
                    </p>
                </section>

                <section>
                    <h2>4. Booking and Payments</h2>
                    <p>
                        When you book a stay through OneClick Stays, you enter
                        into a direct agreement with the Partner offering the
                        accommodation.
                    </p>
                    <p>
                        Payment for bookings is processed through our secure
                        payment gateway, Razorpay. By making a payment, you
                        agree to Razorpay's terms of service.
                    </p>
                    <p>
                        Prices displayed include the base rate for the
                        accommodation. Additional charges such as GST, service
                        charges, or add-ons may apply and will be clearly
                        communicated before booking confirmation.
                    </p>
                </section>

                <section>
                    <h2>5. Cancellations and Refunds</h2>
                    <p>
                        Cancellation policies vary by property and will be
                        clearly displayed before booking. Please refer to our{" "}
                        <Link href="/refund-policy">Refund Policy</Link> for
                        detailed information.
                    </p>
                </section>

                <section>
                    <h2>6. User Conduct</h2>
                    <p>
                        Users must comply with all applicable laws and
                        regulations and respect the properties they book.
                        Prohibited activities include but are not limited to:
                    </p>
                    <ul>
                        <li>Using the property for illegal purposes</li>
                        <li>Causing damage to the property or its contents</li>
                        <li>Exceeding the maximum guest capacity</li>
                        <li>Disturbing neighbors or other guests</li>
                        <li>Hosting events without prior permission</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Intellectual Property</h2>
                    <p>
                        All content on OneClick Stays, including text, graphics,
                        logos, images, and software, is the property of OneClick
                        Stays or its content suppliers and is protected by
                        copyright and intellectual property laws.
                    </p>
                </section>

                <section>
                    <h2>8. Limitation of Liability</h2>
                    <p>
                        OneClick Stays acts as an intermediary between Users and
                        Partners. While we strive to ensure accurate listings
                        and quality accommodations, we are not responsible for
                        the condition of properties, the services provided by
                        Partners, or any incidents that may occur during your
                        stay.
                    </p>
                    <p>
                        To the maximum extent permitted by law, OneClick Stays
                        shall not be liable for any indirect, incidental,
                        special, consequential, or punitive damages resulting
                        from your use of or inability to use our services.
                    </p>
                </section>

                <section>
                    <h2>9. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold harmless OneClick Stays,
                        its affiliates, officers, directors, employees, and
                        agents from any claims, losses, liabilities, damages,
                        expenses, or costs arising from your use of our services
                        or violation of these Terms.
                    </p>
                </section>

                <section>
                    <h2>10. Modifications to Terms</h2>
                    <p>
                        OneClick Stays reserves the right to modify these Terms
                        at any time. We will notify users of significant changes
                        through our website or by email. Your continued use of
                        OneClick Stays after such modifications constitutes your
                        acceptance of the updated Terms.
                    </p>
                </section>

                <section>
                    <h2>11. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in
                        accordance with the laws of India. Any disputes arising
                        under these Terms shall be subject to the exclusive
                        jurisdiction of the courts in India.
                    </p>
                </section>

                <section>
                    <h2>12. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms, please
                        contact us at:
                    </p>
                    <p>
                        Email: support@oneclickstays.com
                        <br />
                        Phone: +91 1234567890
                    </p>
                </section>
            </div>
            <Footer btnText="Back to Home" onClick={onClick} />
        </div>
    );
};

export default TermsPage;
