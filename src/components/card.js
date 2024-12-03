import { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";

import { formatToIndianRupee, parseThousands } from "../helpers/numbers";

import imagesIcon from "../assets/images/images.svg";
import starIcon from "../assets/images/star.svg";
import whatsappIcon from "../assets/images/whatsapp.svg";
import doubleCheckIcon from "../assets/images/double-check.svg";
import { createCTALink } from "../helpers/cta";

const Card = ({ villa, form }) => {
    const [name, setName] = useState(villa.name);
    const [amenities, setAmenities] = useState([]);
    const [isJiggling, setIsJiggling] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        let newName = villa.name.split("|")[0].trim();
        newName = newName.split("-")[0].trim();
        newName = newName.split(",")[0].trim();
        newName = newName.replace(/Rainforest|Rainforest & Talisman|Elivaas|Lohono/g, "").trim();
        setName(newName);
    }, [villa.name]);

    useEffect(() => {
        if (Array.isArray(villa.amenities) && villa.amenities.length > 0) {
            let newAmenities = villa.amenities.map((item) => (item.content ? item.content : item));
            if (newAmenities.length > 5) {
                newAmenities = newAmenities.slice(0, 5);
                let remainingAmenities = villa.amenities.length - 5;
                newAmenities.push(`+${remainingAmenities} more`);
            }

            setAmenities(newAmenities);
        }
    }, [villa.amenities]);

    useEffect(() => {
        if (Array.isArray(villa.images) && villa.images.length > 0) {
            let newImages = [];

            villa.images.forEach((img) => {
                let newImg = img;
                let imgComponents = img.split("/");

                if (img.includes("https://www.rftpm.in")) {
                    newImg = `https://www.rftpm.in/assets/${imgComponents[imgComponents.length - 1]}/villa/300/200`;
                }

                newImages.push({ original: newImg, thumbnail: newImg });
            });

            setGalleryImages(newImages);
        }
    }, [villa.images]);

    // Start the first jiggle animation when the component mounts
    useEffect(() => {
        // Function to trigger the jiggle animation
        const startJiggleAnimation = () => {
            setIsJiggling(true);

            setTimeout(() => {
                setIsJiggling(false); // Reset animation after it's finished

                // Set a new random delay for the next animation
                setTimeout(startJiggleAnimation, 10000);
            }, 10000); // Duration of jiggle animation in milliseconds
        };

        startJiggleAnimation();
    }, []); // Empty dependency array ensures this runs only once after the initial render

    const openWhatsapp = (e) => {
        e.preventDefault();
        window.open(createCTALink(villa, form), "_blank").focus();
    };

    return (
        <div className="villa-card">
            <div className="villa-card__image">
                {!showGallery && (
                    <>
                        <img src={villa.images[0]} alt={villa.name} className="villa-card__image--primary" />
                        <div onClick={() => setShowGallery(true)} className="villa-card__cta--view">
                            <img src={imagesIcon} alt="View Villa" />
                        </div>
                    </>
                )}
                {showGallery && <ReactImageGallery items={galleryImages} />}
            </div>
            <div className="villa-card__content">
                <div className="villa-card__header">
                    <div className="villa-card__header--left">
                        <h4 className="villa-card__content--title">{name}</h4>
                        <p className="villa-card__content--subtitle">{villa.location}</p>
                        <p className="villa-card__content--vendor">
                            In partnership with <a href="/">{villa.vendor}</a>
                        </p>
                    </div>
                    <div className="villa-card__header--right">
                        <div className="villa-card__rating">
                            <img src={starIcon} alt="Rating" />
                            {villa.rating}
                        </div>
                        <div className="villa-card__review">{parseThousands(villa.reviews)} reviews</div>
                    </div>
                </div>
                <div className="villa-card__capacity">
                    <div className="villa-card__capacity--item">
                        <span>{villa.bedrooms}</span> BHK
                    </div>
                    <span>|</span>
                    <div className="villa-card__capacity--item">
                        <span>{villa.guests}</span> Guests
                    </div>
                </div>
                {amenities.length > 0 && (
                    <div className="villa-card__amenities">
                        {amenities.map((item, key) => {
                            return (
                                <div className="villa-card__amenities--item" key={key}>
                                    {key < 5 && <img src={doubleCheckIcon} alt="" />}
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="villa-card__cockpit">
                    <div className="villa-card__price">
                        <h5 className="villa-card__price--cut">{formatToIndianRupee(villa._hr + 10000)}</h5>
                        <h3 className="villa-card__price--final">
                            {formatToIndianRupee(villa.price)}
                            <span>/night</span>
                        </h3>
                    </div>
                    <div className="villa-card__cta">
                        <a href="/" onClick={openWhatsapp} className={`villa-card__cta--whatsapp ${isJiggling ? "jiggle-animation" : ""}`}>
                            <img src={whatsappIcon} alt="Whatsapp Us" className={`${isJiggling ? "jiggle-animation" : ""}`} />
                            Enquire Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
