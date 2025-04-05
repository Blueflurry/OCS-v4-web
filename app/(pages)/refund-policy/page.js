"use client";

import React from "react";
import Link from "next/link";
import styles from "./RefundPolicy.module.scss";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";
import { useRouter } from "next/navigation";

// export const metadata = {
//     title: "Refund Policy | OneClick Stays",
//     description:
//         "OneClick Stays refund and cancellation policy for luxury accommodation bookings.",
// };

const RefundPolicyPage = () => {
    const router = useRouter();
    const onClick = () => {
        router.push("/");
    };
    return (
        <div className={styles.policyPage}>
            <div className={styles.header}>
                <BackButton />
                <h1>Refund Policy</h1>
                <p className={styles.lastUpdated}>
                    Last Updated: April 5, 2025
                </p>
            </div>

            <div className={styles.content}>
                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        This Refund Policy outlines the terms and conditions
                        regarding cancellations and refunds for bookings made
                        through OneClick Stays. We understand that plans can
                        change, and we aim to provide clear and fair policies
                        regarding refunds.
                    </p>
                    <p>
                        Please note that while this policy provides general
                        guidelines, specific properties may have their own
                        cancellation terms which will be clearly displayed
                        during the booking process.
                    </p>
                </section>

                <section>
                    <h2>2. Standard Cancellation Policy</h2>
                    <p>
                        Our standard cancellation policy applies to most
                        properties listed on OneClick Stays, unless otherwise
                        specified on the property listing:
                    </p>

                    <div className={styles.refundTable}>
                        <div className={styles.tableHeader}>
                            <div className={styles.timeColumn}>
                                Time before Check-in
                            </div>
                            <div className={styles.refundColumn}>
                                Refund Amount
                            </div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.timeColumn}>
                                More than 30 days
                            </div>
                            <div className={styles.refundColumn}>
                                100% refund (minus processing fees)
                            </div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.timeColumn}>15-30 days</div>
                            <div className={styles.refundColumn}>
                                75% refund
                            </div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.timeColumn}>7-14 days</div>
                            <div className={styles.refundColumn}>
                                50% refund
                            </div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.timeColumn}>3-6 days</div>
                            <div className={styles.refundColumn}>
                                25% refund
                            </div>
                        </div>
                        <div className={styles.tableRow}>
                            <div className={styles.timeColumn}>
                                Less than 3 days
                            </div>
                            <div className={styles.refundColumn}>No refund</div>
                        </div>
                    </div>

                    <p>
                        <strong>Processing fees:</strong> A processing fee of 2%
                        of the total booking amount may be charged for all
                        refunds to cover payment gateway charges.
                    </p>
                </section>

                <section>
                    <h2>3. Special Cancellation Policies</h2>
                    <h3>3.1 Peak Season Bookings</h3>
                    <p>
                        Bookings made for peak season periods (such as major
                        holidays, festivals, or high-demand periods) may be
                        subject to stricter cancellation policies, including:
                    </p>
                    <ul>
                        <li>Higher non-refundable deposits</li>
                        <li>Earlier cancellation deadlines</li>
                        <li>Reduced refund percentages</li>
                    </ul>
                    <p>
                        These special terms will be clearly communicated during
                        the booking process.
                    </p>

                    <h3>3.2 Promotional Rates</h3>
                    <p>
                        Bookings made with promotional or discounted rates may
                        have limited or no refund options. These restrictions
                        will be displayed during the booking process.
                    </p>

                    <h3>3.3 Long-term Stays</h3>
                    <p>
                        Bookings for stays of 28 nights or more are considered
                        long-term stays and have a different cancellation
                        policy:
                    </p>
                    <ul>
                        <li>
                            Cancellation more than an days before check-in: Full
                            refund minus the first 7 nights
                        </li>
                        <li>
                            Cancellation less than 60 days before check-in: No
                            refund for the first month, 50% refund for remaining
                            nights
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>4. Add-On Services</h2>
                    <p>
                        Cancellation policies for Add-On services vary by
                        service type:
                    </p>
                    <ul>
                        <li>
                            <strong>Pre-paid Add-Ons:</strong> Follow the same
                            refund schedule as the main booking
                        </li>
                        <li>
                            <strong>Pay-at-Stay Add-Ons:</strong> Can be
                            cancelled at any time before check-in without
                            penalty
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>5. Extenuating Circumstances</h2>
                    <p>
                        In certain exceptional situations, we may provide full
                        or partial refunds outside of our standard policy.
                        Qualifying circumstances may include:
                    </p>
                    <ul>
                        <li>
                            Serious illness or injury requiring hospitalization
                            of the guest or immediate family member
                        </li>
                        <li>Death of the guest or immediate family member</li>
                        <li>
                            Natural disasters affecting the property or
                            preventing travel
                        </li>
                        <li>Government-issued travel restrictions</li>
                        <li>
                            Significant property issues not disclosed in the
                            listing
                        </li>
                    </ul>
                    <p>
                        Supporting documentation may be required to verify
                        extenuating circumstances claims.
                    </p>
                </section>

                <section>
                    <h2>6. Modifications to Bookings</h2>
                    <p>
                        Requests to modify bookings (such as changing dates or
                        guest count) are subject to availability and may result
                        in price adjustments:
                    </p>
                    <ul>
                        <li>
                            Changes that result in a higher price will require
                            payment of the difference
                        </li>
                        <li>
                            Changes that result in a lower price will be subject
                            to the cancellation policy for the difference amount
                        </li>
                        <li>
                            Date changes within 7 days of check-in may be
                            treated as a cancellation and new booking
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>7. Refund Process and Timeline</h2>
                    <p>When a refund is approved:</p>
                    <ul>
                        <li>
                            Refunds will be processed using the original payment
                            method
                        </li>
                        <li>Processing time is typically 5-10 business days</li>
                        <li>
                            Bank or credit card processing times may add
                            additional days for the refund to appear in your
                            account
                        </li>
                        <li>
                            For international bookings, currency exchange rates
                            may apply at the time of refund
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>8. Non-Refundable Situations</h2>
                    <p>
                        The following situations are generally not eligible for
                        refunds:
                    </p>
                    <ul>
                        <li>
                            No-shows (failing to arrive for your booking without
                            notification)
                        </li>
                        <li>
                            Early departure (checking out before the scheduled
                            departure date)
                        </li>
                        <li>
                            Dissatisfaction with features clearly disclosed in
                            the listing
                        </li>
                        <li>
                            Cancellations due to personal preference or
                            non-emergency circumstances
                        </li>
                        <li>Violations of house rules or property damage</li>
                    </ul>
                </section>

                <section>
                    <h2>9. Host Cancellations</h2>
                    <p>
                        In the rare event that a Partner cancels a confirmed
                        booking:
                    </p>
                    <ul>
                        <li>
                            You will receive a full refund of your booking
                            amount
                        </li>
                        <li>
                            We will assist in finding alternative accommodation
                        </li>
                        <li>
                            Depending on circumstances, we may provide
                            additional compensation or credits for the
                            inconvenience
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>10. How to Request a Refund</h2>
                    <p>To request a cancellation and refund:</p>
                    <ol>
                        <li>Log in to your OneClick Stays account</li>
                        <li>Navigate to "My Bookings"</li>
                        <li>Select the booking you wish to cancel</li>
                        <li>
                            Click on "Cancel Booking" and follow the prompts
                        </li>
                    </ol>
                    <p>
                        For special circumstances claims or assistance with
                        refunds, contact our customer support team:
                    </p>
                    <p>
                        Email: support@oneclickstays.com
                        <br />
                        Phone: +91 1234567890
                    </p>
                </section>

                <section>
                    <h2>11. Changes to This Policy</h2>
                    <p>
                        OneClick Stays reserves the right to modify this Refund
                        Policy at any time. Changes will be effective
                        immediately upon posting to our website. For bookings
                        made prior to a policy change, the policy in effect at
                        the time of booking will apply.
                    </p>
                </section>
            </div>
            <Footer btnText="Back to Home" onClick={onClick} />
        </div>
    );
};

export default RefundPolicyPage;
