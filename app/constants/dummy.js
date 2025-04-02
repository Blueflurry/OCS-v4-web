export const dummyHeroData = {
    headline: "Book",
    highlight: "Luxury Stays",
    subheadline: "At Half The Price",
    description: "We redefine how you book your stays.",
};

export const PAGES = [
    {
        id: 1,
        title: "Stay Details",
        url: "/stays/${stayId}",
        nextUrl: "/stays/${stayId}/addons",
    },
    {
        id: 2,
        title: "Addons",
        url: "/stays/${stayId}/addons",
        nextUrl: "/stays/${stayId}/checkout",
    },
    {
        id: 3,
        title: "Checkout",
        url: "/stays/${stayId}/checkout",
        nextUrl: "/stays/${stayId}/payment",
    },
    {
        id: 4,
        title: "Payment in Progress",
        url: "/stays/${stayId}/payment",
        nextUrl: "/stays/${stayId}/payment-success",
    },
    {
        id: 5,
        title: "Payment Success",
        url: "/stays/${stayId}/payment-success",
        // nextUrl: "/stays/${stayId}/pay",
    },
];

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

// --------------------------------------------------

export const dummyLocationsData = [
    {
        id: 1,
        name: "New York",
        link: "/stays",
        image: "/assets/images/banner.webp",
    },
    {
        id: 2,
        name: "London",
        link: "/stays",
        image: "/assets/images/banner.webp",
    },
    {
        id: 3,
        name: "Paris",
        link: "/stays",
        image: "/assets/images/banner.webp",
    },
    {
        id: 4,
        name: "Tokyo",
        link: "/stays",
        image: "/assets/images/banner.webp",
    },
    {
        id: 5,
        name: "Tokyo",
        link: "/stays",
        image: "/assets/images/banner.webp",
    },
];

export const ADDONSERVICES = [
    {
        id: 1,
        isChecked: false,
        imgUrl: "/assets/images/addons-1.svg",
        serviceName: "Private Chef",
        pricePerNight: "₹ 2000/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 2,
        isChecked: false,
        imgUrl: "/assets/images/addons-2.svg",
        serviceName: "Butler",
        pricePerNight: "₹ 1500/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 3,
        isChecked: false,
        imgUrl: "/assets/images/addons-3.svg",
        serviceName: "Housekeeping",
        pricePerNight: "₹ 1000/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 4,
        isChecked: false,
        imgUrl: "/assets/images/addons-4.svg",
        serviceName: "Security",
        pricePerNight: "₹ 800/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 5,
        isChecked: false,
        imgUrl: "/assets/images/addons-1.svg",
        serviceName: "Driver",
        pricePerNight: "₹ 1200/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 6,
        isChecked: false,
        imgUrl: "/assets/images/addons-2.svg",
        serviceName: "Spa",
        pricePerNight: "₹ 2500/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 7,
        isChecked: false,
        imgUrl: "/assets/images/addons-3.svg",
        serviceName: "Gym",
        pricePerNight: "₹ 1000/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },

    {
        id: 8,
        isChecked: false,
        imgUrl: "/assets/images/addons-4.svg",
        serviceName: "Yoga",
        pricePerNight: "₹ 800/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 9,
        isChecked: false,
        imgUrl: "/assets/images/addons-1.svg",
        serviceName: "Pool",
        pricePerNight: "₹ 500/day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
];

export const dummyAddonsData = {
    title: "Pay at Stay",
    description:
        "Our team will contact you after you confirm your booking for these services. You don't have to pay at the time of booking.",
    partner: "elivaas",
    stayDetails: {
        title: "Sereno By The Sea",
        price: {
            perPerson: "₹10,000",
            unit: "per night",
        },
        bookingDates: {
            checkIn: "2024-05-26",
            checkOut: "2024-05-30",
        },
    },
    addons: ADDONSERVICES,
};

export const VILLA_IMAGES = [
    {
        imgUrl: "/assets/images/villa-1.svg",
        categoryName: "Exterior",
    },
    {
        imgUrl: "/assets/images/villa-2.svg",
        categoryName: "Rooms",
    },
    {
        imgUrl: "/assets/images/villa-3.png",
        categoryName: "Washrooms",
    },
    {
        imgUrl: "/assets/images/villa-4.png",
        categoryName: "Pools",
    },
    {
        imgUrl: "/assets/images/villa-5.png",
        categoryName: "All (40+)",
    },
];

export const AMENITIES_LIST = [
    {
        id: 1,
        name: "Swimming Pool",
        icon: "/assets/images/chef-icon.svg",
    },
    {
        id: 2,
        name: "Private Chef",
        icon: "/assets/images/chef-icon.svg",
    },
    {
        id: 3,
        name: "Sunroof",
        icon: "/assets/images/chef-icon.svg",
    },
    {
        id: 4,
        name: "Jacuzzi",
        icon: "/assets/images/chef-icon.svg",
    },
    {
        id: 5,
        name: "Games",
        icon: "/assets/images/chef-icon.svg",
    },
    {
        id: 6,
        name: "Personal Butler",
        icon: "/assets/images/chef-icon.svg",
    },
    {
        id: 7,
        name: "Pet Friendly",
        icon: "/assets/images/chef-icon.svg",
    },
];

export const POLICY_LIST = [
    {
        id: 1,
        name: "full-refund-icon",
        icon: "/assets/images/full-refund-icon.svg",
        title: "100% Refund if cancelled within 30 days",
        description:
            "Lorem ipsum dolor sit amet, consect etur adipiscing elit.",
    },

    {
        id: 2,
        name: "half-refund-icon",
        icon: "/assets/images/half-refund-icon.svg",
        title: "50% Refund if cancelled within 10 days",
        description:
            "Lorem ipsum dolor sit amet, consect etur adipiscing elit.",
    },

    {
        id: 3,
        name: "no-refund-icon",
        icon: "/assets/images/no-refund-icon.svg",
        title: "No Refund otherwise",
        description:
            "Lorem ipsum dolor sit amet, consect etur adipiscing elit.",
    },
];

export const REVIEWS = {
    totalCount: 563,
    avgRating: 4.5,
    highestRatingCount: 225,
    starWiseRatings: [
        {
            stars: 5,
            count: 225,
        },
        {
            stars: 4,
            count: 130,
        },
        {
            stars: 3,
            count: 70,
        },
        {
            stars: 2,
            count: 35,
        },
        {
            stars: 1,
            count: 2,
        },
    ],
    photoReviews: [
        {
            img: "/assets/images/photo-review-1.png",
            rating: 4.5,
            reviewBy: "Julie Khanna",
            reviewDate: "May 26, 2024",
            location: "Palolem, Goa",
        },
        {
            img: "/assets/images/photo-review-2.png",
            rating: 5.0,
            reviewBy: "Ram Sharma",
            reviewDate: "May 26, 2024",
            location: "Agonda, Goa",
        },
        {
            img: "/assets/images/photo-review-3.png",
            rating: 5.0,
            reviewBy: "Mansi Sharma",
            reviewDate: "May 26, 2024",
            location: "Agonda, Goa",
        },
    ],
    comments: [
        {
            img: "/assets/images/profile.svg",
            reviewBy: "Nikhil Sharma",
            reviewTime: "5m",
            rating: 4.5,
            review: "Coach Jha's enthusiasm is contagious! He pushes us to excel while keeping practices fun and engaging. Coach Jha's enthusiasm is contagious! He pushes us to excel while keeping practices fun and engaging.",
        },
        {
            img: "/assets/images/profile.svg",
            reviewBy: "Nikhil Sharma",
            reviewTime: "5m",
            rating: 4.5,
            review: "Coach Jha's enthusiasm is contagious! ",
        },
        {
            img: "/assets/images/profile.svg",
            reviewBy: "Nikhil Sharma",
            reviewTime: "5m",
            rating: 4.5,
            review: "Coach Jha's enthusiasm is contagious! He pushes us to excel while keeping practices fun and engaging. Coach Jha's enthusiasm is contagious! He pushes us to excel while keeping practices fun and engaging.",
        },
        {
            img: "/assets/images/profile.svg",
            reviewBy: "Nikhil Sharma",
            reviewTime: "5m",
            rating: 4.5,
            review: "Coach Jha's enthusiasm is contagious! He pushes us to excel while keeping practices fun and engaging. Coach Jha's enthusiasm is contagious! He pushes us to excel while keeping practices fun and engaging.",
        },
    ],
};

export const dummyStaysData = [
    {
        id: 1,
        bannerImage: "/assets/images/banner.webp",
        heroImages: VILLA_IMAGES,
        amentiesImages: VILLA_IMAGES,
        amenties: AMENITIES_LIST,
        policies: POLICY_LIST,
        reviews: REVIEWS,
        location: "Asagao, Goa",
        mapLocation: {
            lat: -3.745,
            lng: -38.523,
        },
        rating: 4.8,
        reviewsCount: 250,
        title: "Sunset Villa",
        bhk: 3,
        guests: 6,
        partner: "elivaas",
        price: {
            original: "₹70,000",
            discounted: "₹50,000",
            perPerson: "₹12,000",
            unit: "per night",
            tax: "₹12,000",
        },
        availability: "available",
    },
    {
        id: 2,
        bannerImage: "/assets/images/banner.webp",
        location: "Morjim, Goa",
        rating: 4.6,
        reviewsCount: 180,
        title: "Beachside Bliss",
        bhk: 2,
        guests: 4,
        partner: "elivaas",
        price: {
            original: "₹55,000",
            discounted: "₹40,000",
            perPerson: "₹10,000",
            unit: "per night",
        },
        availability: "available",
    },
    {
        id: 3,
        bannerImage: "/assets/images/banner.webp",
        location: "Candolim, Goa",
        rating: 4.7,
        reviewsCount: 220,
        title: "Seaside Retreat",
        bhk: 3,
        guests: 5,
        partner: "elivaas",
        price: {
            original: "₹65,000",
            discounted: "₹48,000",
            perPerson: "₹11,000",
            unit: "per night",
        },
        availability: "available",
    },
    {
        id: 4,
        bannerImage: "/assets/images/banner.webp",
        location: "Anjuna, Goa",
        rating: 4.5,
        reviewsCount: 200,
        title: "Tropical Haven",
        bhk: 2,
        guests: 4,
        partner: "elivaas",
        price: {
            original: "₹58,000",
            discounted: "₹45,000",
            perPerson: "₹10,500",
            unit: "per night",
        },
        availability: "available",
    },
    {
        id: 5,
        bannerImage: "/assets/images/banner.webp",
        location: "Palolem, Goa",
        rating: 4.9,
        reviewsCount: 300,
        title: "Luxury Beach Villa",
        bhk: 4,
        guests: 8,
        partner: "elivaas",
        price: {
            original: "₹85,000",
            discounted: "₹65,000",
            perPerson: "₹14,000",
            unit: "per night",
        },
        availability: "available",
    },
];

export const dummyStaysCarouselData = [
    {
        id: 1,
        title: "Popular Stays",
        description:
            "Discover the best stays curated just for you. Enjoy comfort and luxury at unbeatable prices!",
        titleIcon: "flame",
        redirectLinkWithFilters: "/stays",
        stays: dummyStaysData,
    },
    {
        id: 2,
        title: "Luxury Stays",
        description:
            "Indulge in the finest luxury stays with top-class amenities and breathtaking views!",
        titleIcon: "flame",
        redirectLinkWithFilters: "/stays",
        stays: dummyStaysData,
    },
    {
        id: 3,
        title: "Beachfront Escapes",
        description:
            "Wake up to the sound of waves and enjoy stunning ocean views from these premium stays.",
        titleIcon: "flame",
        redirectLinkWithFilters: "/stays",
        stays: dummyStaysData,
    },
    {
        id: 4,
        title: "Nature Retreats",
        description:
            "Escape to the lap of nature with these tranquil retreats surrounded by lush greenery.",
        titleIcon: "flame",
        redirectLinkWithFilters: "/stays",
        stays: dummyStaysData,
    },
    {
        id: 5,
        title: "Budget-Friendly Stays",
        description:
            "Enjoy a comfortable stay without breaking the bank. These stays offer great value at affordable prices!",
        titleIcon: "flame",
        redirectLinkWithFilters: "/stays",
        stays: dummyStaysData,
    },
];
