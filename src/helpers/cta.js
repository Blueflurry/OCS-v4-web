export const createCTALink = (villa, form) => {
    let message = `Hi, OneClick Stays! I am looking for a stay in ${form.city || "Goa"},`;

    if (form.checkInDate) message += ` between ${form.checkInDate} and ${form.checkOutDate},`;

    message += ` and I really liked: "${villa.name}" from (${villa.vendor}). Can you help me?`;

    return `https://wa.me/919899992197?text=${message}`;
};
