// app/api/stays/[stayId]/route.js
import { NextResponse } from "next/server";

// Mock database or service layer
const getStayById = async (id) => {
    // In a real application, this would fetch from a database
    const stays = {
        1: {
            id: "1",
            name: "Sereno By The Sea",
            bhk: 2,
            maxGuests: 4,
            partner: "elivaas",
            rating: "5.0",
            reviewCount: 300,
            originalPrice: 65500,
            discountedPrice: 45500,
            pricePerPerson: 10000,
            location: {
                latitude: 15.5937,
                longitude: 73.7387,
                address: "Asagao, Goa",
            },
            amenities: [
                {
                    id: 1,
                    name: "Swimming Pool",
                    icon: "/assets/images/amenities/pool.svg",
                },
                {
                    id: 2,
                    name: "WiFi",
                    icon: "/assets/images/amenities/wifi.svg",
                },
                {
                    id: 3,
                    name: "Air Conditioning",
                    icon: "/assets/images/amenities/ac.svg",
                },
                {
                    id: 4,
                    name: "Kitchen",
                    icon: "/assets/images/amenities/kitchen.svg",
                },
            ],
            images: [
                {
                    id: 1,
                    url: "/assets/images/villas/villa1.jpg",
                    alt: "Villa exterior",
                },
                {
                    id: 2,
                    url: "/assets/images/villas/villa2.jpg",
                    alt: "Living room",
                },
                {
                    id: 3,
                    url: "/assets/images/villas/villa3.jpg",
                    alt: "Bedroom",
                },
                {
                    id: 4,
                    url: "/assets/images/villas/villa4.jpg",
                    alt: "Kitchen",
                },
            ],
            reviews: [
                {
                    id: 1,
                    userName: "John Doe",
                    rating: 5,
                    date: "2023-12-15",
                    comment:
                        "Beautiful property with amazing views. Will definitely come back!",
                },
                {
                    id: 2,
                    userName: "Jane Smith",
                    rating: 4.5,
                    date: "2023-11-20",
                    comment: "Great location, very clean and comfortable.",
                },
            ],
        },
        // Add more stays as needed
    };

    return stays[id] || null;
};

export async function GET(request, { params }) {
    const { stayId } = params;

    try {
        const stay = await getStayById(stayId);

        if (!stay) {
            return NextResponse.json(
                { error: "Stay not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(stay);
    } catch (error) {
        console.error("Error retrieving stay:", error);
        return NextResponse.json(
            { error: "Failed to retrieve stay details" },
            { status: 500 }
        );
    }
}
