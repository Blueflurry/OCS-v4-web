import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons.js";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton.js";
import styles from "./EmblaCarousel.module.scss";

const EmblaCarousel = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <div className={styles["embla"]}>
            <div className={styles["embla__viewport"]} ref={emblaRef}>
                <div className={styles["embla__container"]}>
                    {slides.map((index) => (
                        <div className={styles["embla__slide"]} key={index}>
                            <img
                                className={styles["embla__slide__img"]}
                                src={`https://picsum.photos/600/350?v=${index}`}
                                alt="Your alt text"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className={styles["embla__controls"]}>
                <div className={styles["embla__buttons"]}>
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <div className={styles["embla__dots"]}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={styles["embla__dot"].concat(
                                index === selectedIndex
                                    ? styles[" embla__dot--selected"]
                                    : ""
                            )}
                        />
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default EmblaCarousel;
