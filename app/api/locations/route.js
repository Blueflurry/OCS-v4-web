// app/api/locations/route.js
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // In a real application, this would fetch from a database
        const locationsData = [
            {
                id: "1",
                name: "Goa",
                image: "/assets/images/locations/goa.jpg",
                description:
                    "Tropical paradise with beaches and vibrant nightlife",
                stayCount: 42,
                featured: true,
            },
            {
                id: "2",
                name: "Manali",
                image: "/assets/images/locations/manali.jpg",
                description:
                    "Mountain retreat with scenic views and adventure activities",
                stayCount: 37,
                featured: true,
            },
            {
                id: "3",
                name: "Coorg",
                image: "/assets/images/locations/coorg.jpg",
                description: "Coffee plantations and misty hills in Karnataka",
                stayCount: 28,
                featured: true,
            },
            {
                id: "4",
                name: "Rishikesh",
                image: "/assets/images/locations/rishikesh.jpg",
                description:
                    "Spiritual center and adventure hub along the Ganges",
                stayCount: 31,
                featured: false,
            },
            {
                id: "5",
                name: "Munnar",
                image: "/assets/images/locations/munnar.jpg",
                description: "Tea plantations and rolling hills in Kerala",
                stayCount: 26,
                featured: false,
            },
        ];

        return NextResponse.json(locationsData);
    } catch (error) {
        console.error("Error retrieving locations data:", error);
        return NextResponse.json(
            { error: "Failed to retrieve locations data" },
            { status: 500 }
        );
    }
}
