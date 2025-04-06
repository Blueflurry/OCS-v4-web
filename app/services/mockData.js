/**
 * Mock data for development and testing
 * Contains dummy data for various API endpoints
 */

// Sample user data for testing
export const mockUsers = [
    {
        id: "user1",
        fullName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "9876543210",
        createdAt: "2023-01-15T10:30:00Z",
    },
    {
        id: "user2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        phoneNumber: "8765432109",
        createdAt: "2023-02-20T14:15:00Z",
    },
];

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
            "A stunning beachfront villa with private pool and direct beach access. Enjoy panoramic views of the Arabian Sea from your spacious terrace. Perfect for families or groups looking for a luxurious coastal retreat.",
        location: {
            name: "Asagao, Goa",
            city: "Asagao",
            state: "Goa",
            country: "India",
            coordinates: {
                lat: 15.598,
                lng: 73.754,
            },
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
        petsAllowed: true,
        bhk: 3,
        maxGuests: 8,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 65500,
            currentPrice: 45500,
            perPerson: 11375,
        },
        amenities: [
            "Swimming Pool",
            "Beach Access",
            "Air Conditioning",
            "Wi-Fi",
            "Kitchen",
            "Terrace",
            "Parking",
            "24/7 Security",
            "Housekeeping",
            "Private Chef",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 7 days before check-in",
        },
    },
    {
        _id: "stay2",
        name: "Himalayan Heights",
        description:
            "A luxurious mountain cabin with breathtaking views of the Himalayas. This cozy yet elegant retreat features a fireplace, outdoor hot tub, and panoramic mountain vistas from every room. The perfect base for hiking and mountain adventures.",
        location: {
            name: "Manali, Himachal Pradesh",
            city: "Manali",
            state: "Himachal Pradesh",
            country: "India",
            coordinates: {
                lat: 32.239,
                lng: 77.189,
            },
        },
        categories: ["trending", "featured"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.8,
        reviewCount: 156,
        available: true,
        petsAllowed: true,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 78000,
            currentPrice: 62000,
            perPerson: 10333,
        },
        amenities: [
            "Mountain View",
            "Fireplace",
            "Hot Tub",
            "Wi-Fi",
            "Heating",
            "Kitchen",
            "Terrace",
            "Parking",
            "Hiking Trails",
            "Ski Storage",
        ],
        bookingPolicy: {
            checkIn: "3:00 PM",
            checkOut: "10:00 AM",
            cancellation: "Free cancellation up to 10 days before check-in",
        },
    },
    {
        _id: "stay3",
        name: "Forest Haven",
        description:
            "Luxurious villa located within a working coffee plantation surrounded by lush forests. Experience tranquility with nature sounds, organic farm-to-table dining, and guided forest tours. Perfect for nature lovers seeking a peaceful retreat.",
        location: {
            name: "Coorg, Karnataka",
            city: "Madikeri",
            state: "Karnataka",
            country: "India",
            coordinates: {
                lat: 12.42,
                lng: 75.739,
            },
        },
        categories: ["trending", "new"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.9,
        reviewCount: 211,
        available: true,
        petsAllowed: false,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 55000,
            currentPrice: 45000,
            perPerson: 11250,
        },
        amenities: [
            "Coffee Plantation",
            "Forest View",
            "Organic Garden",
            "Wi-Fi",
            "Kitchen",
            "Private Deck",
            "Parking",
            "Guided Tours",
            "Breakfast Included",
            "Bird Watching",
        ],
        bookingPolicy: {
            checkIn: "1:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 5 days before check-in",
        },
    },
    {
        _id: "stay4",
        name: "Royal Retreat",
        description:
            "Historic palace with stunning views of Lake Pichola and the Aravalli mountains. This luxurious property features intricate Rajasthani architecture, private courtyards, and an infinity pool overlooking the lake. Experience royal living with modern amenities.",
        location: {
            name: "Udaipur, Rajasthan",
            city: "Udaipur",
            state: "Rajasthan",
            country: "India",
            coordinates: {
                lat: 24.585,
                lng: 73.712,
            },
        },
        categories: ["new", "featured"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.7,
        reviewCount: 86,
        available: true,
        petsAllowed: false,
        bhk: 4,
        maxGuests: 8,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 112000,
            currentPrice: 95000,
            perPerson: 11875,
        },
        amenities: [
            "Lake View",
            "Infinity Pool",
            "Heritage Property",
            "Wi-Fi",
            "Air Conditioning",
            "Private Courtyard",
            "Rooftop Restaurant",
            "Spa Services",
            "Cultural Performances",
            "Butler Service",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "12:00 PM",
            cancellation: "Free cancellation up to 14 days before check-in",
        },
    },
    {
        _id: "stay5",
        name: "Beachside Bliss",
        description:
            "Modern beach house with panoramic views of the Arabian Sea. This contemporary property features floor-to-ceiling windows, a private infinity pool, and direct beach access. Perfect for beach lovers seeking luxury and privacy.",
        location: {
            name: "Kovalam, Kerala",
            city: "Kovalam",
            state: "Kerala",
            country: "India",
            coordinates: {
                lat: 8.398,
                lng: 76.978,
            },
        },
        categories: ["new", "trending"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.8,
        reviewCount: 42,
        available: true,
        petsAllowed: true,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 58000,
            currentPrice: 48000,
            perPerson: 12000,
        },
        amenities: [
            "Sea View",
            "Infinity Pool",
            "Beach Access",
            "Wi-Fi",
            "Air Conditioning",
            "Modern Kitchen",
            "Outdoor Shower",
            "Hammock Garden",
            "Kayaking Equipment",
            "Sunset Deck",
        ],
        bookingPolicy: {
            checkIn: "3:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 7 days before check-in",
        },
    },
    {
        _id: "stay6",
        name: "Mountain View Villa",
        description:
            "Charming cottage nestled in a tea estate with stunning mountain views. This cozy retreat offers traditional architecture with modern amenities, surrounded by manicured tea gardens and mountain trails. Perfect for a peaceful mountain getaway.",
        location: {
            name: "Darjeeling, West Bengal",
            city: "Darjeeling",
            state: "West Bengal",
            country: "India",
            coordinates: {
                lat: 27.036,
                lng: 88.262,
            },
        },
        categories: ["featured", "trending"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.9,
        reviewCount: 178,
        available: true,
        petsAllowed: false,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 82000,
            currentPrice: 68000,
            perPerson: 11333,
        },
        amenities: [
            "Mountain View",
            "Tea Estate",
            "Fireplace",
            "Wi-Fi",
            "Heating",
            "Breakfast Veranda",
            "Tea Tasting",
            "Garden",
            "Trekking Trails",
            "Library",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 7 days before check-in",
        },
    },
    {
        _id: "stay7",
        name: "Lakeside Manor",
        description:
            "Elegant property with direct access to Nainital Lake. This colonial-style manor features antique furniture, manicured gardens, and stunning lake views from every room. Enjoy boating, fishing, and relaxing by the peaceful waters.",
        location: {
            name: "Nainital, Uttarakhand",
            city: "Nainital",
            state: "Uttarakhand",
            country: "India",
            coordinates: {
                lat: 29.38,
                lng: 79.463,
            },
        },
        categories: ["featured", "new"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.7,
        reviewCount: 132,
        available: true,
        petsAllowed: true,
        bhk: 4,
        maxGuests: 8,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 95000,
            currentPrice: 75000,
            perPerson: 9375,
        },
        amenities: [
            "Lake View",
            "Lake Access",
            "Boating Equipment",
            "Wi-Fi",
            "Fireplace",
            "Garden",
            "Library",
            "Hiking Trails",
            "Breakfast Included",
            "Evening Tea Service",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 10 days before check-in",
        },
    },
    {
        _id: "stay8",
        name: "Desert Oasis",
        description:
            "Luxury tent camp in the Thar Desert with stunning dune views. Experience glamping with all modern comforts including air conditioning, private bathrooms, and gourmet dining. Enjoy camel safaris, cultural performances, and stargazing in the desert.",
        location: {
            name: "Jaisalmer, Rajasthan",
            city: "Jaisalmer",
            state: "Rajasthan",
            country: "India",
            coordinates: {
                lat: 26.911,
                lng: 70.923,
            },
        },
        categories: ["offers", "new"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.6,
        reviewCount: 97,
        available: true,
        petsAllowed: false,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 72000,
            currentPrice: 48000,
            perPerson: 12000,
        },
        amenities: [
            "Desert View",
            "Air Conditioning",
            "En-suite Bathroom",
            "Wi-Fi",
            "Luxury Bedding",
            "Private Dining",
            "Camel Safari",
            "Cultural Shows",
            "Stargazing Deck",
            "Desert Jeep Tours",
        ],
        bookingPolicy: {
            checkIn: "1:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 7 days before check-in",
        },
    },
    {
        _id: "stay9",
        name: "Riverfront Retreat",
        description:
            "Luxury villa with panoramic views of the Ganges River. This peaceful retreat offers spacious rooms, private ghats, yoga deck, and meditation spaces. Perfect for spiritual seekers and those looking to connect with nature.",
        location: {
            name: "Rishikesh, Uttarakhand",
            city: "Rishikesh",
            state: "Uttarakhand",
            country: "India",
            coordinates: {
                lat: 30.087,
                lng: 78.267,
            },
        },
        categories: ["offers", "featured"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.8,
        reviewCount: 124,
        available: true,
        petsAllowed: false,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 85000,
            currentPrice: 58000,
            perPerson: 9667,
        },
        amenities: [
            "River View",
            "Private Ghat",
            "Yoga Deck",
            "Wi-Fi",
            "Air Conditioning",
            "Meditation Space",
            "Vegetarian Kitchen",
            "Ayurvedic Treatments",
            "Sunrise Deck",
            "Nature Trails",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "12:00 PM",
            cancellation: "Free cancellation up to 10 days before check-in",
        },
    },
    {
        _id: "stay10",
        name: "Heritage Haveli",
        description:
            "Beautifully restored heritage home in the Pink City. This centuries-old haveli features traditional Rajasthani architecture with intricately carved pillars, courtyards, and frescoes, all updated with modern luxury amenities.",
        location: {
            name: "Jaipur, Rajasthan",
            city: "Jaipur",
            state: "Rajasthan",
            country: "India",
            coordinates: {
                lat: 26.922,
                lng: 75.778,
            },
        },
        categories: ["trending", "offers"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.7,
        reviewCount: 165,
        available: true,
        petsAllowed: false,
        bhk: 4,
        maxGuests: 8,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 68000,
            currentPrice: 52000,
            perPerson: 6500,
        },
        amenities: [
            "Heritage Property",
            "Courtyard",
            "Rooftop Restaurant",
            "Wi-Fi",
            "Air Conditioning",
            "Traditional Decor",
            "City Views",
            "Cultural Performances",
            "Cooking Classes",
            "Heritage Walks",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "11:00 AM",
            cancellation: "Free cancellation up to 10 days before check-in",
        },
    },
    {
        _id: "stay11",
        name: "Backwater Houseboat",
        description:
            "Traditional Kerala houseboat cruising the beautiful backwaters. Experience luxury on water with private bedrooms, viewing decks, and freshly prepared Kerala cuisine. Glide through serene waterways surrounded by lush greenery and village life.",
        location: {
            name: "Alleppey, Kerala",
            city: "Alappuzha",
            state: "Kerala",
            country: "India",
            coordinates: {
                lat: 9.498,
                lng: 76.339,
            },
        },
        categories: ["new", "offers"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.9,
        reviewCount: 198,
        available: true,
        petsAllowed: false,
        bhk: 2,
        maxGuests: 4,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 55000,
            currentPrice: 39000,
            perPerson: 9750,
        },
        amenities: [
            "Backwater Views",
            "Private Deck",
            "Air Conditioning",
            "En-suite Bathrooms",
            "Traditional Kerala Cuisine",
            "Sunset Views",
            "Village Excursions",
            "Fishing Equipment",
            "Full Board Meals",
            "Personal Chef",
        ],
        bookingPolicy: {
            checkIn: "12:00 PM",
            checkOut: "9:00 AM",
            cancellation: "Free cancellation up to 14 days before check-in",
        },
    },
    {
        _id: "stay12",
        name: "Taj View Apartment",
        description:
            "Luxury apartment with unobstructed views of the Taj Mahal. Wake up to the sight of this iconic monument from your bed, and enjoy sunset views from your private terrace. Modern amenities with a historic setting.",
        location: {
            name: "Agra, Uttar Pradesh",
            city: "Agra",
            state: "Uttar Pradesh",
            country: "India",
            coordinates: {
                lat: 27.176,
                lng: 78.008,
            },
        },
        categories: ["featured", "offers"],
        images: [
            "/assets/images/banner.webp",
            "/assets/images/villa-1.svg",
            "/assets/images/villa-2.svg",
            "/assets/images/villa-3.png",
        ],
        rating: 4.8,
        reviewCount: 127,
        available: true,
        petsAllowed: false,
        bhk: 3,
        maxGuests: 6,
        partner: {
            name: "elivaas",
            logo: "/assets/images/partner-elivaas.svg",
        },
        pricing: {
            originalPrice: 85000,
            currentPrice: 65000,
            perPerson: 10833,
        },
        amenities: [
            "Taj Mahal View",
            "Terrace",
            "Air Conditioning",
            "Wi-Fi",
            "Modern Kitchen",
            "Breakfast Included",
            "Airport Transfers",
            "Private Guide",
            "Rooftop Dining",
            "Photography Space",
        ],
        bookingPolicy: {
            checkIn: "2:00 PM",
            checkOut: "12:00 PM",
            cancellation: "Free cancellation up to 10 days before check-in",
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

// Mock payment related data
export const mockPaymentData = {
    // Sample payment intent data structure
    paymentIntent: {
        id: "pi_sample123456",
        stayId: "stay1",
        stayName: "Sereno By The Sea",
        stayImage: "/assets/images/villa-1.svg",
        checkin: "2025-05-21T00:00:00.000Z",
        checkout: "2025-05-28T00:00:00.000Z",
        nights: 7,
        guests: 4,
        pricing: {
            stayPrice: 318500, // 7 nights at 45,500 per night
            gst: 57330, // 18% GST
            totalAmount: 375830, // Total including GST
        },
        addOns: [],
        createdAt: "2025-04-01T12:00:00.000Z",
        status: "created",
    },

    // Sample payment response data structure
    paymentResponse: {
        id: "pay_sample7890",
        paymentIntentId: "pi_sample123456",
        status: "success",
        transactionId: "txn_sample7890",
        processingTime: "2025-04-01T12:05:00.000Z",
    },

    // Tax rates
    taxRates: {
        sgst: 9, // State GST rate (%)
        cgst: 9, // Central GST rate (%)
        igst: 18, // Integrated GST rate (%) - used for interstate transactions
    },
};

// Mock data for bookings
export const bookingsData = [
    {
        _id: "test_booking_1743877899124",
        bookingId: "OCSBK299024",
        userId: "user123",
        stayId: "stay1",
        status: "completed", // confirmed, cancelled, completed, pending
        createdAt: "2025-03-20T10:30:00Z",
        stay: {
            name: "Sereno By The Sea",
            location: {
                name: "Asagao, Goa",
                city: "Asagao",
                state: "Goa",
                country: "India",
            },
            images: [
                "/assets/images/villa-1.svg",
                "/assets/images/villa-2.svg",
                "/assets/images/villa-3.png",
            ],
            partner: {
                name: "elivaas",
            },
        },
        dates: {
            checkIn: "2025-03-24T14:00:00Z",
            checkOut: "2025-03-30T11:00:00Z",
            nights: 6,
        },
        guests: {
            adults: 2,
            children: 1,
            infants: 0,
            pets: 0,
            total: 3,
        },
        pricing: {
            basePrice: 45500,
            nightlyRate: 45500,
            stayTotal: 273000,
            sgst: 24570, // 9% SGST
            igst: 24570, // 9% IGST
            cleaningFee: 0,
            serviceFee: 0,
            totalAmount: 322140,
        },
        payment: {
            method: "razorpay",
            transactionId: "pay_123456789",
            paidAt: "2025-03-20T10:35:00Z",
            status: "completed",
        },
        addOns: [
            {
                id: "addon1",
                name: "Indian Starboy Festival",
                description: "Exclusive access to the renowned music festival",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-1.webp",
                isSelected: true,
            },
            {
                id: "addon2",
                name: "Gourmet Meals",
                description: "Daily chef-prepared meals",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-2.webp",
                isSelected: true,
            },
            {
                id: "addon3",
                name: "Airport Pickup",
                description: "Luxury car airport transfer",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-3.webp",
                isSelected: true,
            },
            {
                id: "addon4",
                name: "Sea Food & Crabs",
                description: "Fresh seafood dinner experience",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-4.webp",
                isSelected: true,
            },
        ],
        earnedCoins: 50,
        cancellationPolicy: {
            type: "flexible",
            refundPercentage: {
                before7Days: 100,
                before3Days: 50,
                after3Days: 0,
            },
        },
    },
    {
        _id: "booking2",
        bookingId: "OCSBK299025",
        userId: "user123",
        stayId: "stay2",
        status: "completed",
        createdAt: "2025-01-15T09:20:00Z",
        stay: {
            name: "Himalayan Heights",
            location: {
                name: "Manali, Himachal Pradesh",
                city: "Manali",
                state: "Himachal Pradesh",
                country: "India",
            },
            images: ["/assets/images/villa-1.svg"],
            partner: {
                name: "elivaas",
            },
        },
        dates: {
            checkIn: "2025-02-10T14:00:00Z",
            checkOut: "2025-02-15T11:00:00Z",
            nights: 5,
        },
        guests: {
            adults: 4,
            children: 2,
            infants: 0,
            pets: 0,
            total: 6,
        },
        pricing: {
            basePrice: 62000,
            nightlyRate: 62000,
            stayTotal: 310000,
            sgst: 27900, // 9% SGST
            igst: 27900, // 9% IGST
            cleaningFee: 0,
            serviceFee: 0,
            totalAmount: 365800,
        },
        payment: {
            method: "razorpay",
            transactionId: "pay_987654321",
            paidAt: "2025-01-15T09:25:00Z",
            status: "completed",
        },
        addOns: [
            {
                id: "addon5",
                name: "Guided Trek",
                description: "Professional guide for mountain trekking",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-3.webp",
                isSelected: true,
            },
            {
                id: "addon6",
                name: "Bonfire Night",
                description: "Evening bonfire with snacks and drinks",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-1.webp",
                isSelected: true,
            },
        ],
        earnedCoins: 70,
        cancellationPolicy: {
            type: "moderate",
            refundPercentage: {
                before14Days: 100,
                before7Days: 50,
                after7Days: 0,
            },
        },
    },
    {
        _id: "booking3",
        bookingId: "OCSBK299026",
        userId: "user123",
        stayId: "stay3",
        status: "upcoming",
        createdAt: "2025-03-25T11:45:00Z",
        stay: {
            name: "Forest Haven",
            location: {
                name: "Coorg, Karnataka",
                city: "Coorg",
                state: "Karnataka",
                country: "India",
            },
            images: ["/assets/images/villa-1.svg"],
            partner: {
                name: "elivaas",
            },
        },
        dates: {
            checkIn: "2025-05-15T14:00:00Z",
            checkOut: "2025-05-20T11:00:00Z",
            nights: 5,
        },
        guests: {
            adults: 3,
            children: 1,
            infants: 0,
            pets: 0,
            total: 4,
        },
        pricing: {
            basePrice: 45000,
            nightlyRate: 45000,
            stayTotal: 225000,
            sgst: 20250, // 9% SGST
            igst: 20250, // 9% IGST
            cleaningFee: 0,
            serviceFee: 0,
            totalAmount: 265500,
        },
        payment: {
            method: "razorpay",
            transactionId: "pay_456789123",
            paidAt: "2025-03-25T11:50:00Z",
            status: "completed",
        },
        addOns: [
            {
                id: "addon7",
                name: "Coffee Plantation Tour",
                description: "Guided tour of the coffee estate",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-2.webp",
                isSelected: true,
            },
            {
                id: "addon8",
                name: "Bird Watching",
                description: "Morning bird watching with expert guide",
                price: "Pay at property",
                imgUrl: "/assets/images/activity-4.webp",
                isSelected: true,
            },
        ],
        earnedCoins: 45,
        cancellationPolicy: {
            type: "flexible",
            refundPercentage: {
                before7Days: 100,
                before3Days: 50,
                after3Days: 0,
            },
        },
    },
];

// Mock data for upcoming bookings (subset of bookingsData)
export const upcomingBookings = bookingsData.filter(
    (booking) => booking.status === "upcoming" || booking.status === "confirmed"
);

// Mock data for completed bookings (subset of bookingsData)
export const completedBookings = bookingsData.filter(
    (booking) => booking.status === "completed"
);
