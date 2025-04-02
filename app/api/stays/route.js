// app/api/stays/route.js
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // In a real application, this would fetch from a database
        const staysData = [
            {
                id: "popular",
                title: "Popular Stays",
                description: "Our most booked accommodations",
                viewAllLink: "/stays/popular",
                stays: [
                    {
                        id: "1",
                        name: "Sereno By The Sea",
                        location: "Asagao, Goa",
                        bhk: 2,
                        maxGuests: 4,
                        price: 45500,
                        originalPrice: 65500,
                        discount: 30,
                        rating: 5.0,
                        reviewCount: 300,
                        images: [
                            "/assets/images/villas/villa1.jpg",
                            "/assets/images/villas/villa1-interior.jpg",
                        ],
                        partner: "elivaas",
                        featured: true,
                    },
                    {
                        id: "2",
                        name: "Mountain View Retreat",
                        location: "Manali, Himachal Pradesh",
                        bhk: 3,
                        maxGuests: 6,
                        price: 38000,
                        originalPrice: 55000,
                        discount: 31,
                        rating: 4.9,
                        reviewCount: 245,
                        images: [
                            "/assets/images/villas/villa2.jpg",
                            "/assets/images/villas/villa2-interior.jpg",
                        ],
                        partner: "luxestays",
                        featured: true,
                    },
                    {
                        id: "3",
                        name: "Lakeside Villa",
                        location: "Udaipur, Rajasthan",
                        bhk: 4,
                        maxGuests: 8,
                        price: 60000,
                        originalPrice: 75000,
                        discount: 20,
                        rating: 4.8,
                        reviewCount: 189,
                        images: [
                            "/assets/images/villas/villa3.jpg",
                            "/assets/images/villas/villa3-interior.jpg",
                        ],
                        partner: "elivaas",
                        featured: true,
                    },
                ],
            },
            {
                id: "trending",
                title: "Trending Destinations",
                description: "Destinations gaining popularity this season",
                viewAllLink: "/stays/trending",
                stays: [
                    {
                        id: "4",
                        name: "Coffee Estate Bungalow",
                        location: "Coorg, Karnataka",
                        bhk: 2,
                        maxGuests: 5,
                        price: 35000,
                        originalPrice: 42000,
                        discount: 17,
                        rating: 4.7,
                        reviewCount: 156,
                        images: [
                            "/assets/images/villas/villa4.jpg",
                            "/assets/images/villas/villa4-interior.jpg",
                        ],
                        partner: "luxestays",
                        featured: false,
                    },
                    {
                        id: "5",
                        name: "Riverside Retreat",
                        location: "Rishikesh, Uttarakhand",
                        bhk: 2,
                        maxGuests: 4,
                        price: 28000,
                        originalPrice: 38000,
                        discount: 26,
                        rating: 4.6,
                        reviewCount: 132,
                        images: [
                            "/assets/images/villas/villa5.jpg",
                            "/assets/images/villas/villa5-interior.jpg",
                        ],
                        partner: "elivaas",
                        featured: false,
                    },
                    {
                        id: "6",
                        name: "Tea Garden View",
                        location: "Munnar, Kerala",
                        bhk: 3,
                        maxGuests: 6,
                        price: 32000,
                        originalPrice: 45000,
                        discount: 29,
                        rating: 4.8,
                        reviewCount: 173,
                        images: [
                            "/assets/images/villas/villa6.jpg",
                            "/assets/images/villas/villa6-interior.jpg",
                        ],
                        partner: "luxestays",
                        featured: false,
                    },
                ],
            },
        ];

        return NextResponse.json(staysData);
    } catch (error) {
        console.error("Error retrieving stays data:", error);
        return NextResponse.json(
            { error: "Failed to retrieve stays data" },
            { status: 500 }
        );
    }
}
