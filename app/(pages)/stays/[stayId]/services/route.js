// app/api/stays/[stayId]/services/route.js
import { NextResponse } from "next/server";

// Mock database or service layer
const getServicesByStayId = async (stayId) => {
    // In a real application, this would fetch from a database
    const stayServices = {
        1: [
            {
                id: 1,
                name: "Airport Transfer",
                description:
                    "Comfortable pickup and drop from the nearest airport",
                price: 2500,
                icon: "/assets/images/services/airport.svg",
            },
            {
                id: 2,
                name: "Chef on Demand",
                description:
                    "Professional chef to prepare meals of your choice",
                price: 3500,
                icon: "/assets/images/services/chef.svg",
            },
            {
                id: 3,
                name: "Spa Services",
                description:
                    "Relaxing spa treatments in the comfort of your villa",
                price: 2000,
                icon: "/assets/images/services/spa.svg",
            },
            {
                id: 4,
                name: "Guided Tour",
                description:
                    "Explore local attractions with a knowledgeable guide",
                price: 1500,
                icon: "/assets/images/services/tour.svg",
            },
        ],
        // Add more stays as needed
    };

    return stayServices[stayId] || [];
};

export async function GET(request, { params }) {
    const { stayId } = params;

    try {
        const services = await getServicesByStayId(stayId);
        return NextResponse.json(services);
    } catch (error) {
        console.error("Error retrieving services:", error);
        return NextResponse.json(
            { error: "Failed to retrieve services" },
            { status: 500 }
        );
    }
}
