const villas = [
    {
        name: "Morbaugh",
        url: "https://www.lohono.com/villas/india/jaipur/kothari-house?adult_count=2",
        images: [
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/01Ariel_facade.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/02Living_Area.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/03Bedroom_1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/04Bathroom1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/05Bedroom2.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/06Bathroom2.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/07Dinning_Area.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/08Living_Area1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/09Bedroom_6_Seating.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/10Bedroom_4_Seating.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/11Ariel_View.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/12Bedroom3-1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/13Bathroom3.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/14Bedroom_4-1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/15Bathroom4.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/16Bedroom_4.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/17Bedroom5.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/18Bathroom_5.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/19Bedroom_5Seating.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/20Bedroom_6.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/21Bedroom2-2.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/22Dinning_Area2.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/23Bedroom5-1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/24Entrance.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/25Entrance1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/26Game_Room.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/27Gazebo_Dining.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/28Lawn.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/29MEG00715-HDR.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/30Outdoor_Dining.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/31Pool_Lounge_Area.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/32Pool_Lounge_Area1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/33Pool1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/34Royal_Gazebo.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/35Royal_Gazebo1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/36Outdoor_Dining1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/37Ruins_Dinner.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/38Ruins.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/39Ruins1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/40Ariel_View1.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/41Ruin_Dining.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/42Ruins2.jpg",
            "https://d3oo9u3p09egds.cloudfront.net/filters:quality(20)/rental_property/kothari-house/43Ruins3.jpg",
        ],
        description:
            "Drive through the grand Rajasthani royal gates of Kothari Gadh and enter a world where majesty meets modern luxury. The six-bedroom villa within this estate offers a regal experience fit for maharajas and maharanis.\r\n\r\nStep into an opulent living and dining area adorned with intricate Rajasthani craftsmanship, a testament to timeless elegance. The villa's centrepiece is a majestic Rajasthani courtyard, where manjis are arranged for a royal feast, offering an authentic taste of Rajasthan's culinary heritage. The multiple private seating areas spread across the property provide an intimate setting for conversations and bonding sessions.. As the sun sets, the terrace becomes an enchanting spot for a sundowner with curated wine and cheese, surrounded by panoramic views painted in hues of amber and rose.\r\n\r\nConveniently close to Jaipur, the Pink City's vibrant cultural offerings are within easy reach, allowing exploration of its bazaars, forts, and palaces before returning to the serene luxury of this Lohono villa. At Morbaugh, luxury is an immersive journey through time, promising an indulgent stay where history and modernity intertwine seamlessly.",
        rules: [
            {
                content: "Guests, who are not checked in or registered as guests of Lohono Stays are not allowed to stay overnight at the property.",
            },
            {
                content: "Photo IDs are to be shared with the Guest Relations Team via WhatsApp prior to check-in",
            },
            {
                content:
                    "Large gatherings (> 14 people) at one point of time are prohibited at the villa. For any event beyond the mentioned capacity, prior intimation and permission is required",
            },
            {
                content:
                    "Our housekeeping staff is available to serve you from 8 am until 10 pm. Female attendants retire to their chambers at 7 pm while the male attendants will be at your service till 10 pm. Service from 10 pm to 2 am will be on a chargeable basis.",
            },
            {
                content: "Additional services should be requested at least 5 hours in advance.",
            },
            {
                content:
                    "Smoking is prohibited in the villa. We recommend you smoke outdoors. While smoking, kindly use the ashtray to dispose of cigarette buds, and take all necessary precautions to prevent a fire",
            },
            {
                content:
                    "Consumption or possession of illegal drugs is forbidden. Alcohol should be consumed responsibly. No guest under the age of 18 may possess or consume alcohol at any time while on the property.",
            },
            {
                content: "Loud music will not be allowed post 10 pm",
            },
            {
                content:
                    "Please ensure doors and windows are kept closed at all times to avoid insects and flies since the property is surrounded by a forested area.",
            },
            {
                content:
                    "Guests laundry is outsourced on a chargeable basis and takes 24 hrs-48 hrs to be returned. Kindly speak to the on-ground manager for assistance",
            },
            {
                content:
                    "Electricity and water conservation should be respected. Appliances such as ACs, geysers, etc. should only be switched on when they needed. Please ask for assistance if required",
            },
            {
                content: "Our procurement team is available from 9 am until 5 pm. Please place your requirements accordingly",
            },
            {
                content:
                    "Guests are responsible for their personal belongings and valuables. Kindly store your valuables in safety lockers available in the rooms. Management will not be responsible for any kind of theft.",
            },
            {
                content: "We encourage you to keep your surroundings clean and respect nature",
            },
            {
                content:
                    "Guests are requested to pay a security deposit of INR 20,000 at the time of booking. This amount will be refunded within 7 business days after check-out.",
            },
            {
                content:
                    "Check-in time is 2PM and Check-out time is 12PM. Early check-in and late check-out will be charged additionally and is subject to availability.",
            },
            {
                content: "Breakfast ends at 11AM. Please let the villa attendant know what time you would like the service to begin",
            },
            {
                content:
                    "This property does not serve or assist with the service of alcoholic beverages due to religious reasons. The team would not be able to assist with the procurement of the same",
            },
            {
                content:
                    "This is a pure vegetarian home, cooking non-vegetarian items is not permitted. Guests who wish to have non-vegetarian food can order from outside, the villa attendant can assist in serving them",
            },
            {
                content:
                    "Guests are requested to stay within the designated property boundary and avoid walking into the neighbouring property. Kindle have villa staff assist you should you wish to walk around",
            },
            {
                content:
                    "For cancellations made up to 15 days prior to the check-in date, 80%* of the booking amount will be refunded via the original payment mode or 100% in the form of a future credit note, which can be redeemed at the originally booked Lohono Villa",
            },
            {
                content: "For cancellations made 8-14 days prior to the check-in date, 50%* of the booking amount will be refunded",
            },
            {
                content: "For cancellations made within 7 days prior to the check-in date, the booking amount will be non-refundable",
            },
            {
                content:
                    "Standard Cancellation Policy does not apply to peak or blackout dates. Refunds are only available if 100% payment has been made. Partial payments are non-refundable.",
            },
            {
                content: "For additional information please refer to our Terms and Conditions",
            },
        ],
        amenities: [
            "Welcome",
            "Ceiling Fans",
            "Main Dining (8 persons)",
            "Swimming Pool (Private)",
            "Car Parking",
            "Towels",
            "Toiletries",
            "Security",
            "Caretaker",
            "Housekeeping",
            "BBQ",
        ],
        location: "Bhakrota, Jaipur,",
        price: 38760,
        capacity: ["Upto 14 Guests", "6 Bedrooms", "8 Bathrooms", "1 Pool"],
        _tm: 9120,
        _lr: 36480,
        _hr: 41040,
        vendor: "Lohono Stays",
        guests: 14,
        bedrooms: 6,
        rating: "4.7",
        reveiws: 9809,
    },
];

export default villas;
