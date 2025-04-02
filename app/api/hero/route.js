// app/api/hero/route.js
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // In a real application, this would fetch from a database
        const heroData = {
            title: "Experience Luxury Stays",
            subtitle: "Find the perfect getaway for your next vacation",
            imageSrc: "/assets/images/hero-background.jpg",
            primaryCTA: "Explore Stays",
            secondaryCTA: "View Special Offers",
            featured: {
                title: "Featured Destination",
                location: "Bali, Indonesia",
                description:
                    "Experience paradise with our luxury villas overlooking pristine beaches.",
                image: "/assets/images/featured-bali.jpg",
            },
        };

        return NextResponse.json(heroData);
    } catch (error) {
        console.error("Error retrieving hero data:", error);
        return NextResponse.json(
            { error: "Failed to retrieve hero data" },
            { status: 500 }
        );
    }
}
