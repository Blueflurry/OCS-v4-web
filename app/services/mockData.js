/**
 * Mock data for development and testing
 * Contains dummy data for various API endpoints
 */

// Mock data for stay carousels by category
export const carouselData = {
    trending: {
        title: "Trending Stays",
        icon: "Flame",
        description:
            "Our most popular luxury stays that everyone's talking about",
        stays: [
            {
                id: 1,
                name: "Sereno By The Sea",
                location: { name: "Asagao, Goa" },
                images: ["/assets/images/banner.webp"],
                rating: 5.0,
                reviewCount: 302,
                available: true,
                bhk: 2,
                maxGuests: 4,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 65500,
                    currentPrice: 45500,
                    perPerson: 10000,
                },
            },
            {
                id: 2,
                name: "Himalayan Heights",
                location: { name: "Manali, Himachal Pradesh" },
                images: ["/assets/images/banner.webp"],
                rating: 4.8,
                reviewCount: 156,
                available: true,
                bhk: 3,
                maxGuests: 6,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 78000,
                    currentPrice: 62000,
                    perPerson: 10333,
                },
            },
            {
                id: 3,
                name: "Forest Haven",
                location: { name: "Coorg, Karnataka" },
                images: ["/assets/images/banner.webp"],
                rating: 4.9,
                reviewCount: 211,
                available: true,
                bhk: 2,
                maxGuests: 4,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 55000,
                    currentPrice: 45000,
                    perPerson: 11250,
                },
            },
        ],
    },
    new: {
        title: "New Destinations",
        icon: "Sparkles",
        description: "The latest luxury properties to join our collection",
        stays: [
            {
                id: 4,
                name: "Royal Retreat",
                location: { name: "Udaipur, Rajasthan" },
                images: ["/assets/images/banner.webp"],
                rating: 4.7,
                reviewCount: 86,
                available: true,
                bhk: 4,
                maxGuests: 8,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 112000,
                    currentPrice: 95000,
                    perPerson: 11875,
                },
            },
            {
                id: 5,
                name: "Beachside Bliss",
                location: { name: "Kovalam, Kerala" },
                images: ["/assets/images/banner.webp"],
                rating: 4.8,
                reviewCount: 42,
                available: true,
                bhk: 2,
                maxGuests: 4,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 58000,
                    currentPrice: 48000,
                    perPerson: 12000,
                },
            },
        ],
    },
    featured: {
        title: "Featured Properties",
        icon: "Star",
        description: "Hand-picked stays that offer exceptional experiences",
        stays: [
            {
                id: 6,
                name: "Mountain View Villa",
                location: { name: "Darjeeling, West Bengal" },
                images: ["/assets/images/banner.webp"],
                rating: 4.9,
                reviewCount: 178,
                available: true,
                bhk: 3,
                maxGuests: 6,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 82000,
                    currentPrice: 68000,
                    perPerson: 11333,
                },
            },
            {
                id: 7,
                name: "Lakeside Manor",
                location: { name: "Nainital, Uttarakhand" },
                images: ["/assets/images/banner.webp"],
                rating: 4.7,
                reviewCount: 132,
                available: true,
                bhk: 4,
                maxGuests: 8,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 95000,
                    currentPrice: 75000,
                    perPerson: 9375,
                },
            },
        ],
    },
    offers: {
        title: "Special Offers",
        icon: "Tag",
        description:
            "Limited-time deals and exclusive discounts on luxury stays",
        stays: [
            {
                id: 8,
                name: "Desert Oasis",
                location: { name: "Jaisalmer, Rajasthan" },
                images: ["/assets/images/banner.webp"],
                rating: 4.6,
                reviewCount: 97,
                available: true,
                bhk: 2,
                maxGuests: 4,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 72000,
                    currentPrice: 48000,
                    perPerson: 12000,
                },
            },
            {
                id: 9,
                name: "Riverfront Retreat",
                location: { name: "Rishikesh, Uttarakhand" },
                images: ["/assets/images/banner.webp"],
                rating: 4.8,
                reviewCount: 124,
                available: true,
                bhk: 3,
                maxGuests: 6,
                partner: { name: "elivaas" },
                pricing: {
                    originalPrice: 85000,
                    currentPrice: 58000,
                    perPerson: 9667,
                },
            },
        ],
    },
};

// Extract available categories directly from carouselData keys
export const availableCategories = Object.keys(carouselData);

// Mock data for all stays
export const allStays = [
    {
        _id: "stay1",
        name: "Sereno By The Sea",
        description:
            "A stunning beachfront villa with private pool and direct beach access",
        location: {
            name: "Asagao, Goa",
        },
        categories: ["trending", "featured"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 5.0,
        reviewCount: 302,
        available: true,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 65500,
            currentPrice: 45500,
            perPerson: 11375,
        },
    },
    {
        _id: "stay2",
        name: "Himalayan Heights",
        description:
            "A mountain cabin with breathtaking views of the Himalayas",
        location: {
            name: "Manali, Himachal Pradesh",
        },
        categories: ["trending", "featured"],
        images: ["/assets/images/banner.webp"],
        rating: 4.8,
        reviewCount: 156,
        available: true,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 78000,
            currentPrice: 62000,
            perPerson: 10333,
        },
    },
    {
        _id: "stay3",
        name: "Forest Haven",
        description:
            "Luxurious villa located within a working coffee plantation",
        location: {
            name: "Coorg, Karnataka",
        },
        categories: ["trending", "new"],
        images: ["/assets/images/banner.webp"],
        rating: 4.9,
        reviewCount: 211,
        available: true,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 55000,
            currentPrice: 45000,
            perPerson: 11250,
        },
    },
    {
        _id: "stay4",
        name: "Royal Retreat",
        description: "Historic palace with stunning views of Lake Pichola",
        location: {
            name: "Udaipur, Rajasthan",
        },
        categories: ["new", "featured"],
        images: ["/assets/images/banner.webp"],
        rating: 4.7,
        reviewCount: 86,
        available: true,
        bhk: 4,
        maxGuests: 8,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 112000,
            currentPrice: 95000,
            perPerson: 11875,
        },
    },
    {
        _id: "stay5",
        name: "Beachside Bliss",
        description:
            "Modern beach house with panoramic views of the Arabian Sea",
        location: {
            name: "Kovalam, Kerala",
        },
        categories: ["new", "trending"],
        images: ["/assets/images/banner.webp"],
        rating: 4.8,
        reviewCount: 42,
        available: true,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 58000,
            currentPrice: 48000,
            perPerson: 12000,
        },
    },
    {
        _id: "stay6",
        name: "Mountain View Villa",
        description:
            "Charming cottage nestled in a tea estate with mountain views",
        location: {
            name: "Darjeeling, West Bengal",
        },
        categories: ["featured", "trending"],
        images: ["/assets/images/banner.webp"],
        rating: 4.9,
        reviewCount: 178,
        available: true,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 82000,
            currentPrice: 68000,
            perPerson: 11333,
        },
    },
    {
        _id: "stay7",
        name: "Lakeside Manor",
        description: "Elegant property with direct access to Nainital Lake",
        location: {
            name: "Nainital, Uttarakhand",
        },
        categories: ["featured", "new"],
        images: ["/assets/images/banner.webp"],
        rating: 4.7,
        reviewCount: 132,
        available: true,
        bhk: 4,
        maxGuests: 8,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 95000,
            currentPrice: 75000,
            perPerson: 9375,
        },
    },
    {
        _id: "stay8",
        name: "Desert Oasis",
        description:
            "Luxury tent camp in the Thar Desert with stunning dune views",
        location: {
            name: "Jaisalmer, Rajasthan",
        },
        categories: ["offers", "new"],
        images: ["/assets/images/banner.webp"],
        rating: 4.6,
        reviewCount: 97,
        available: true,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 72000,
            currentPrice: 48000,
            perPerson: 12000,
        },
    },
    {
        _id: "stay9",
        name: "Riverfront Retreat",
        description: "Luxury villa with panoramic views of the Ganges River",
        location: {
            name: "Rishikesh, Uttarakhand",
        },
        categories: ["offers", "featured"],
        images: ["/assets/images/banner.webp"],
        rating: 4.8,
        reviewCount: 124,
        available: true,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 85000,
            currentPrice: 58000,
            perPerson: 9667,
        },
    },
    {
        _id: "stay10",
        name: "Heritage Haveli",
        description: "Beautifully restored heritage home in the Pink City",
        location: {
            name: "Jaipur, Rajasthan",
        },
        categories: ["trending", "offers"],
        images: ["/assets/images/banner.webp"],
        rating: 4.7,
        reviewCount: 165,
        available: true,
        bhk: 4,
        maxGuests: 8,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 68000,
            currentPrice: 52000,
            perPerson: 6500,
        },
    },
    {
        _id: "stay11",
        name: "Backwater Houseboat",
        description:
            "Traditional Kerala houseboat cruising the beautiful backwaters",
        location: {
            name: "Alleppey, Kerala",
        },
        categories: ["new", "offers"],
        images: ["/assets/images/banner.webp"],
        rating: 4.9,
        reviewCount: 198,
        available: true,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 55000,
            currentPrice: 39000,
            perPerson: 9750,
        },
    },
    {
        _id: "stay12",
        name: "Taj View Apartment",
        description:
            "Luxury apartment with unobstructed views of the Taj Mahal",
        location: {
            name: "Agra, Uttar Pradesh",
        },
        categories: ["featured", "offers"],
        images: ["/assets/images/banner.webp"],
        rating: 4.8,
        reviewCount: 127,
        available: true,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
        },
        pricing: {
            originalPrice: 85000,
            currentPrice: 65000,
            perPerson: 10833,
        },
    },
];

// Mock data for add-on services by stayId
export const addonServices = {
    // Default add-ons available for all stays
    default: [
        {
            id: "addon1",
            serviceName: "Airport Pickup",
            pricePerNight: "₹2,000 per trip",
            description:
                "Hassle-free pickup from the nearest airport in a luxury vehicle",
            imgUrl: "/assets/images/addons-1.svg",
            isChecked: false,
        },
        {
            id: "addon2",
            serviceName: "Gourmet Meals",
            pricePerNight: "₹1,500 per person",
            description:
                "Exquisite cuisine prepared by our in-house chef with local ingredients",
            imgUrl: "/assets/images/addons-2.svg",
            isChecked: false,
        },
        {
            id: "addon3",
            serviceName: "Indian Starboy Festival",
            pricePerNight: "₹5,000 per event",
            description:
                "Exclusive access to local cultural performances and festivities",
            imgUrl: "/assets/images/addons-3.svg",
            isChecked: false,
        },
        {
            id: "addon4",
            serviceName: "Sea Food & Crabs",
            pricePerNight: "₹2,500 per meal",
            description:
                "Fresh seafood specialties prepared according to your preferences",
            imgUrl: "/assets/images/addons-4.svg",
            isChecked: false,
        },
    ],

    // Specific add-ons for stay1 (coastal property)
    stay1: [
        {
            id: "addon1",
            serviceName: "Airport Pickup",
            pricePerNight: "₹2,000 per trip",
            description:
                "Hassle-free pickup from the nearest airport in a luxury vehicle",
            imgUrl: "/assets/images/addons-1.svg",
            isChecked: false,
        },
        {
            id: "addon2",
            serviceName: "Gourmet Meals",
            pricePerNight: "₹1,800 per person",
            description:
                "Exquisite cuisine prepared by our in-house chef with local ingredients",
            imgUrl: "/assets/images/addons-2.svg",
            isChecked: false,
        },
        {
            id: "addon5",
            serviceName: "Sunset Yacht Cruise",
            pricePerNight: "₹8,000 per trip",
            description:
                "Exclusive private yacht cruise along the coast to watch the sunset",
            imgUrl: "/assets/images/addons-3.svg",
            isChecked: false,
        },
        {
            id: "addon6",
            serviceName: "Beach Barbecue",
            pricePerNight: "₹3,500 per event",
            description:
                "Private beach barbecue with fresh seafood and refreshing cocktails",
            imgUrl: "/assets/images/addons-4.svg",
            isChecked: false,
        },
    ],

    // Specific add-ons for stay2 (mountain property)
    stay2: [
        {
            id: "addon1",
            serviceName: "Airport Pickup",
            pricePerNight: "₹2,500 per trip",
            description:
                "Comfortable pickup from the nearest airport in a 4x4 vehicle",
            imgUrl: "/assets/images/addons-1.svg",
            isChecked: false,
        },
        {
            id: "addon2",
            serviceName: "Traditional Mountain Cuisine",
            pricePerNight: "₹1,600 per person",
            description:
                "Authentic Himalayan cuisine prepared with organic local ingredients",
            imgUrl: "/assets/images/addons-2.svg",
            isChecked: false,
        },
        {
            id: "addon7",
            serviceName: "Mountain Trekking Guide",
            pricePerNight: "₹3,000 per day",
            description:
                "Professional guide for mountain treks with equipment provided",
            imgUrl: "/assets/images/addons-3.svg",
            isChecked: false,
        },
        {
            id: "addon8",
            serviceName: "Bonfire Evening",
            pricePerNight: "₹2,000 per event",
            description:
                "Cozy evening bonfire with traditional music and refreshments",
            imgUrl: "/assets/images/addons-4.svg",
            isChecked: false,
        },
    ],
};

// GUESTS data for search filters
export const GUESTS = [
    {
        type: "Men",
        count: 0,
    },
    {
        type: "Women",
        count: 0,
    },
    {
        type: "Children",
        count: 0,
    },
    {
        type: "Pets",
        count: 0,
    },
];

// Navigation pages for the Footer component
export const PAGES = [
    {
        url: "/stays/${stayId}",
        nextUrl: "/stays/${stayId}/addons",
    },
    {
        url: "/stays/${stayId}/addons",
        nextUrl: "/stays/${stayId}/checkout",
    },
    {
        url: "/stays/${stayId}/checkout",
        nextUrl: "/stays/${stayId}/payment",
    },
    {
        url: "/stays/${stayId}/payment",
        nextUrl: "/stays/${stayId}/payment-success",
    },
    {
        url: "/stays/${stayId}/payment-success",
        nextUrl: "/bookings/upcoming",
    },
];
