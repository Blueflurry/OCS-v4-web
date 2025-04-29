import { Star, StarHalf } from "lucide-react";

export const renderStars = (rating, size = 16) => {
    const clamppedRating = Math.max(0, Math.min(rating, 5));
    const fullStars = Math.floor(+clamppedRating);
    const hasHalfStar = clamppedRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} fill="#fbb401" stroke="#fbb401" />
            ))}

            {hasHalfStar && <StarHalf key="half" size={size} fill="#fbb401" stroke="#fbb401" />}

            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} style={{ opacity: 0.3 }} fill="#fbb401" stroke="#fbb401" />
            ))}
        </>
    );
};
