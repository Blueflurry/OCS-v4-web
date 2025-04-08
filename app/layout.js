import Image from "next/image";
// import FooterWithoutTabs from "./modules/Footer/FooterWithoutTabs";
import "./styles/main.scss";
import Link from "next/link";

export const metadata = {
    title: "OneClick Stays | Luxury Villas and Apartment at lowest price guaranteed",
    description:
        "OneClick Stays provides Luxury Villas and Apartment at lowest price guaranteed",
    icons: {
        icon: "/favicon.ico",
    },
    other: {
        "gtag-id": "G-WWB084J6BG", // Replace with your GA4 Measurement ID
        "hotjar-id": "5249346", // Replace with your Hotjar ID
        "hotjar-sv": "6",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />

                {/* Google Analytics Script */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${metadata.other["gtag-id"]}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${metadata.other["gtag-id"]}', {
                            page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
                {/* Hotjar tracking code */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(h,o,t,j,a,r){
                                h.hj = h.hj || function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                                h._hjSettings={hjid:${metadata.other["hotjar-id"]},hjsv:${metadata.other["hotjar-sv"]}};
                                a=o.getElementsByTagName('head')[0];
                                r=o.createElement('script');r.async=1;
                                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                                a.appendChild(r);
                            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                        `,
                    }}
                />
            </head>
            <body>
                <main>{children}</main>
                <section id="no-content">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={150}
                        height={90}
                    />
                    <div>
                        <h1>
                            Our website is currently only available on Mobile
                            devices.
                        </h1>
                        <p>
                            Please visit{" "}
                            <Link href={"https://oneclickstays.com"}>
                                www.oneclickstays.com
                            </Link>{" "}
                            on your mobile for the best stay booking experience
                            globally.
                        </p>
                    </div>
                </section>
                {/* <FooterWithoutTabs /> */}
            </body>
        </html>
    );
}
