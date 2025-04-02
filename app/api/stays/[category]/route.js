// app/api/stays/[category]/route.js
import { NextResponse } from "next/server";

// Mock database or service layer
const getStaysByCategory = async (category) => {
    // Categories map to help find data
    const categories = {
        popular: {
            id: "popular",
            title: "Popular Stays",
            description: "Our most booked accommodations",
            titleIcon: "flame",
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
                {
                    id: "4",
                    name: "Beachfront Bungalow",
                    location: "Varkala, Kerala",
                    bhk: 2,
                    maxGuests: 4,
                    price: 42000,
                    originalPrice: 52000,
                    discount: 19,
                    rating: 4.7,
                    reviewCount: 167,
                    images: [
                        "/assets/images/villas/villa4.jpg",
                        "/assets/images/villas/villa4-interior.jpg",
                    ],
                    partner: "elivaas",
                    featured: false,
                },
                {
                    id: "5",
                    name: "Forest Cabin",
                    location: "Munnar, Kerala",
                    bhk: 1,
                    maxGuests: 3,
                    price: 28000,
                    originalPrice: 35000,
                    discount: 20,
                    rating: 4.5,
                    reviewCount: 124,
                    images: [
                        "/assets/images/villas/villa5.jpg",
                        "/assets/images/villas/villa5-interior.jpg",
                    ],
                    partner: "luxestays",
                    featured: false,
                },
            ],
        },
        trending: {
            id: "trending",
            title: "Trending Destinations",
            description: "Destinations gaining popularity this season",
            titleIcon: "trending-up",
            stays: [
                {
                    id: "6",
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
                        "/assets/images/villas/villa6.jpg",
                        "/assets/images/villas/villa6-interior.jpg",
                    ],
                    partner: "luxestays",
                    featured: false,
                },
                {
                    id: "7",
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
                        "/assets/images/villas/villa7.jpg",
                        "/assets/images/villas/villa7-interior.jpg",
                    ],
                    partner: "elivaas",
                    featured: false,
                },
                {
                    id: "8",
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
                        "/assets/images/villas/villa8.jpg",
                        "/assets/images/villas/villa8-interior.jpg",
                    ],
                    partner: "luxestays",
                    featured: false,
                },
            ],
        },
        luxury: {
            id: "luxury",
            title: "Luxury Experiences",
            description: "Premium accommodations with exceptional amenities",
            titleIcon: "gem",
            stays: [
                {
                    id: "9",
                    name: "Royal Palace Suite",
                    location: "Jaipur, Rajasthan",
                    bhk: 4,
                    maxGuests: 8,
                    price: 85000,
                    originalPrice: 120000,
                    discount: 29,
                    rating: 4.9,
                    reviewCount: 187,
                    images: [
                        "/assets/images/villas/villa9.jpg",
                        "/assets/images/villas/villa9-interior.jpg",
                    ],
                    partner: "elivaas",
                    featured: true,
                },
                {
                    id: "10",
                    name: "Cliff-Edge Villa",
                    location: "Lonavala, Maharashtra",
                    bhk: 5,
                    maxGuests: 10,
                    price: 95000,
                    originalPrice: 115000,
                    discount: 17,
                    rating: 4.8,
                    reviewCount: 163,
                    images: [
                        "/assets/images/villas/villa10.jpg",
                        "/assets/images/villas/villa10-interior.jpg",
                    ],
                    partner: "luxestays",
                    featured: true,
                },
            ],
        },
    };

    // Return the requested category or default to 'popular'
    return categories[category] || categories["popular"];
};

export async function GET(request, { params }) {
    const { category } = params;

    try {
        const stayCarouselData = await getStaysByCategory(category);
        return NextResponse.json(stayCarouselData);
    } catch (error) {
        console.error("Error retrieving stays data:", error);
        return NextResponse.json(
            { error: "Failed to retrieve stays data" },
            { status: 500 }
        );
    }
}
