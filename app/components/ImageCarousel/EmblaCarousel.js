import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import styles from "./EmblaCarousel.module.scss";

const EmblaCarousel = (props) => {
    const { slides, options, images } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

    return (
        <div className={styles["embla"]}>
            <div className={styles["embla__viewport"]} ref={emblaRef}>
                <div className={styles["embla__container"]}>
                    {slides.map((index) => (
                        <div className={styles["embla__slide"]} key={index}>
                            <img
                                className={styles["embla__slide__img"]}
                                src={images[index].imgUrl}
                                alt="Your alt text"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
