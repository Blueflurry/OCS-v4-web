export const createCTALink = (villa, form) => {
    let message = `Hi, OneClick Stays! I am looking for a stay in ${form.city || "Goa"},`;

    if (form.checkInDate) message += ` from: ${form.checkInDate}, to: ${form.checkOutDate},`;

    message += ` and I really liked: "${villa.name}" from (${villa.vendor}). Could you help me find a perfect stay?`;

    return `https://wa.me/919899992197?text=${message}`;
};
