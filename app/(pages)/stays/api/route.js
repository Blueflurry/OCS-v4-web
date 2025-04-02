// app/api/stays/listings/route.js
import { NextResponse } from "next/server";

// Helper function to filter stays based on query parameters
const filterStays = (stays, filters) => {
    return stays.filter((stay) => {
        // Filter by location
        if (
            filters.location &&
            stay.location
                .toLowerCase()
                .indexOf(filters.location.toLowerCase()) === -1
        ) {
            return false;
        }

        // Filter by guest count
        if (filters.guests && stay.maxGuests < parseInt(filters.guests)) {
            return false;
        }

        // Filter by price range
        if (filters.minPrice && stay.price < parseInt(filters.minPrice)) {
            return false;
        }

        if (filters.maxPrice && stay.price > parseInt(filters.maxPrice)) {
            return false;
        }

        // Filter by property type
        if (
            filters.propertyType &&
            filters.propertyType !== "all" &&
            stay.propertyType !== filters.propertyType
        ) {
            return false;
        }

        // Filter by minimum rating
        if (filters.minRating && stay.rating < parseFloat(filters.minRating)) {
            return false;
        }

        return true;
    });
};

// Helper function to sort stays
const sortStays = (stays, sortBy) => {
    const staysCopy = [...stays];

    switch (sortBy) {
        case "price_low":
            return staysCopy.sort((a, b) => a.price - b.price);
        case "price_high":
            return staysCopy.sort((a, b) => b.price - a.price);
        case "rating":
            return staysCopy.sort((a, b) => b.rating - a.rating);
        case "newest":
            return staysCopy.sort(
                (a, b) => new Date(b.addedDate) - new Date(a.addedDate)
            );
        case "recommended":
        default:
            // For recommended, we could use a weighted algorithm
            // For simplicity, we'll sort by a combination of rating and discount
            return staysCopy.sort((a, b) => {
                const scoreA = a.rating * 0.6 + a.discount * 0.4;
                const scoreB = b.rating * 0.6 + b.discount * 0.4;
                return scoreB - scoreA;
            });
    }
};

// Helper function to paginate stays
const paginateStays = (stays, page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return {
        stays: stays.slice(startIndex, endIndex),
        pagination: {
            total: stays.length,
            totalPages: Math.ceil(stays.length / limit),
            currentPage: page,
            limit,
        },
    };
};

export async function GET(request) {
    try {
        // Get query parameters
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "10");

        const filters = {
            location: url.searchParams.get("location") || "",
            guests: url.searchParams.get("guests") || "",
            minPrice: url.searchParams.get("minPrice") || "",
            maxPrice: url.searchParams.get("maxPrice") || "",
            propertyType: url.searchParams.get("propertyType") || "",
            minRating: url.searchParams.get("minRating") || "",
        };

        const sortBy = url.searchParams.get("sort") || "recommended";

        // In a real application, this would fetch from a database
        // For this example, we'll use mock data
        const allStays = [
            {
                id: "1",
                name: "Sereno By The Sea",
                location: "Asagao, Goa",
                propertyType: "villa",
                bhk: 2,
                maxGuests: 4,
                price: 45500,
                originalPrice: 65500,
                discount: 30,
                rating: 5.0,
                reviewCount: 300,
                addedDate: "2023-12-15",
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
                propertyType: "cottage",
                bhk: 3,
                maxGuests: 6,
                price: 38000,
                originalPrice: 55000,
                discount: 31,
                rating: 4.9,
                reviewCount: 245,
                addedDate: "2023-11-20",
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
                propertyType: "villa",
                bhk: 4,
                maxGuests: 8,
                price: 60000,
                originalPrice: 75000,
                discount: 20,
                rating: 4.8,
                reviewCount: 189,
                addedDate: "2023-10-05",
                images: [
                    "/assets/images/villas/villa3.jpg",
                    "/assets/images/villas/villa3-interior.jpg",
                ],
                partner: "elivaas",
                featured: true,
            },
            {
                id: "4",
                name: "Coffee Estate Bungalow",
                location: "Coorg, Karnataka",
                propertyType: "bungalow",
                bhk: 2,
                maxGuests: 5,
                price: 35000,
                originalPrice: 42000,
                discount: 17,
                rating: 4.7,
                reviewCount: 156,
                addedDate: "2024-01-10",
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
                propertyType: "cottage",
                bhk: 2,
                maxGuests: 4,
                price: 28000,
                originalPrice: 38000,
                discount: 26,
                rating: 4.6,
                reviewCount: 132,
                addedDate: "2023-09-18",
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
                propertyType: "cottage",
                bhk: 3,
                maxGuests: 6,
                price: 32000,
                originalPrice: 45000,
                discount: 29,
                rating: 4.8,
                reviewCount: 173,
                addedDate: "2023-12-05",
                images: [
                    "/assets/images/villas/villa6.jpg",
                    "/assets/images/villas/villa6-interior.jpg",
                ],
                partner: "luxestays",
                featured: false,
            },
            {
                id: "7",
                name: "Royal Palace Suite",
                location: "Jaipur, Rajasthan",
                propertyType: "villa",
                bhk: 4,
                maxGuests: 8,
                price: 85000,
                originalPrice: 120000,
                discount: 29,
                rating: 4.9,
                reviewCount: 187,
                addedDate: "2024-02-01",
                images: [
                    "/assets/images/villas/villa7.jpg",
                    "/assets/images/villas/villa7-interior.jpg",
                ],
                partner: "elivaas",
                featured: true,
            },
            {
                id: "8",
                name: "Beachfront Bungalow",
                location: "Varkala, Kerala",
                propertyType: "bungalow",
                bhk: 2,
                maxGuests: 4,
                price: 42000,
                originalPrice: 52000,
                discount: 19,
                rating: 4.7,
                reviewCount: 167,
                addedDate: "2023-11-15",
                images: [
                    "/assets/images/villas/villa8.jpg",
                    "/assets/images/villas/villa8-interior.jpg",
                ],
                partner: "elivaas",
                featured: false,
            },
            {
                id: "9",
                name: "Forest Cabin",
                location: "Munnar, Kerala",
                propertyType: "cottage",
                bhk: 1,
                maxGuests: 3,
                price: 28000,
                originalPrice: 35000,
                discount: 20,
                rating: 4.5,
                reviewCount: 124,
                addedDate: "2023-10-20",
                images: [
                    "/assets/images/villas/villa9.jpg",
                    "/assets/images/villas/villa9-interior.jpg",
                ],
                partner: "luxestays",
                featured: false,
            },
            {
                id: "10",
                name: "Cliff-Edge Villa",
                location: "Lonavala, Maharashtra",
                propertyType: "villa",
                bhk: 5,
                maxGuests: 10,
                price: 95000,
                originalPrice: 115000,
                discount: 17,
                rating: 4.8,
                reviewCount: 163,
                addedDate: "2024-01-25",
                images: [
                    "/assets/images/villas/villa10.jpg",
                    "/assets/images/villas/villa10-interior.jpg",
                ],
                partner: "luxestays",
                featured: true,
            },
            {
                id: "11",
                name: "Heritage Haveli",
                location: "Jaisalmer, Rajasthan",
                propertyType: "villa",
                bhk: 3,
                maxGuests: 6,
                price: 55000,
                originalPrice: 70000,
                discount: 21,
                rating: 4.6,
                reviewCount: 145,
                addedDate: "2023-09-30",
                images: [
                    "/assets/images/villas/villa11.jpg",
                    "/assets/images/villas/villa11-interior.jpg",
                ],
                partner: "elivaas",
                featured: false,
            },
            {
                id: "12",
                name: "Backwater Retreat",
                location: "Alleppey, Kerala",
                propertyType: "cottage",
                bhk: 2,
                maxGuests: 4,
                price: 36000,
                originalPrice: 45000,
                discount: 20,
                rating: 4.7,
                reviewCount: 178,
                addedDate: "2023-12-20",
                images: [
                    "/assets/images/villas/villa12.jpg",
                    "/assets/images/villas/villa12-interior.jpg",
                ],
                partner: "luxestays",
                featured: false,
            },
            {
                id: "13",
                name: "Urban Luxury Apartment",
                location: "Mumbai, Maharashtra",
                propertyType: "apartment",
                bhk: 3,
                maxGuests: 6,
                price: 75000,
                originalPrice: 90000,
                discount: 17,
                rating: 4.8,
                reviewCount: 203,
                addedDate: "2024-02-10",
                images: [
                    "/assets/images/villas/villa13.jpg",
                    "/assets/images/villas/villa13-interior.jpg",
                ],
                partner: "elivaas",
                featured: true,
            },
            {
                id: "14",
                name: "Mountain Hideaway",
                location: "Dharamshala, Himachal Pradesh",
                propertyType: "cottage",
                bhk: 2,
                maxGuests: 5,
                price: 32000,
                originalPrice: 40000,
                discount: 20,
                rating: 4.5,
                reviewCount: 136,
                addedDate: "2023-11-05",
                images: [
                    "/assets/images/villas/villa14.jpg",
                    "/assets/images/villas/villa14-interior.jpg",
                ],
                partner: "luxestays",
                featured: false,
            },
            {
                id: "15",
                name: "Spice Garden Villa",
                location: "Wayanad, Kerala",
                propertyType: "villa",
                bhk: 3,
                maxGuests: 7,
                price: 45000,
                originalPrice: 58000,
                discount: 22,
                rating: 4.7,
                reviewCount: 159,
                addedDate: "2024-01-15",
                images: [
                    "/assets/images/villas/villa15.jpg",
                    "/assets/images/villas/villa15-interior.jpg",
                ],
                partner: "elivaas",
                featured: false,
            },
        ];

        // Filter, sort, and paginate the stays
        const filteredStays = filterStays(allStays, filters);
        const sortedStays = sortStays(filteredStays, sortBy);
        const paginatedData = paginateStays(sortedStays, page, limit);

        return NextResponse.json(paginatedData);
    } catch (error) {
        console.error("Error retrieving stays data:", error);
        return NextResponse.json(
            { error: "Failed to retrieve stays data" },
            { status: 500 }
        );
    }
}
