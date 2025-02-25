import FooterWithoutTabs from "./modules/Footer/FooterWithoutTabs";
import "./styles/main.scss";

export const metadata = {
    title: "OneClick Stays | Luxury Villas and Apartment at lowest price guaranteed",
    description: "OneClick Stays provides Luxury Villas and Apartment at lowest price guaranteed",
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
                {/* Google Analytics Script */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${metadata.other["gtag-id"]}`} />
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
                <FooterWithoutTabs />
            </body>
        </html>
    );
}
