export const createCTALink = (villa, form) => {
    const message = `Hi, OneClick Stays! I am looking for a stay in ${form.city || "Goa"}, ${
        form.checkInDate ? ` from: ${form.checkInDate}, to: ${form.checkOutDate},` : ""
    } and I really liked: "${villa.name}" from (${villa.vendor}). Could you help me find a perfect stay?`;

    return `https://wa.me/919899992197?text=${message}`;
};
