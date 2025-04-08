"use client";
import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./EmblaCarousel.module.scss";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) =>
    Math.min(Math.max(number, min), max);

const EmblaCarousel = (props) => {
    const { slides, options, images } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef([]);

    const setTweenNodes = useCallback((emblaApi) => {
        if (!emblaApi) return;

        tweenNodes.current = emblaApi
            .slideNodes()
            .map((slideNode, idx) =>
                slideNode
                    ? slideNode.querySelector(
                          `${"#embla__slide__number" + idx} `
                      )
                    : null
            );
    }, []);

    const setTweenFactor = useCallback((emblaApi) => {
        if (!emblaApi) return;
        tweenFactor.current =
            TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback((emblaApi, eventName) => {
        if (typeof window === "undefined" || !emblaApi) return;

        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === "scroll";

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();
                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);
                            if (sign === -1) {
                                diffToTarget =
                                    scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget =
                                    scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const tweenValue =
                    1 - Math.abs(diffToTarget * tweenFactor.current);
                const scale = numberWithinRange(tweenValue, 0, 1).toString();
                const tweenNode = tweenNodes.current[slideIndex];

                if (tweenNode) {
                    tweenNode.style.transform = `scale(${1.3 * scale})`;
                    // tweenNode.style.transform = `scale(${1.4 * scale})`;
                    // tweenNode.style.borderRadius = `1rem`;
                }
            });
        });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi);

        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenScale)
            .on("scroll", tweenScale)
            .on("slideFocus", tweenScale);

        return () => {
            emblaApi
                .off("reInit", setTweenNodes)
                .off("reInit", setTweenFactor)
                .off("reInit", tweenScale)
                .off("scroll", tweenScale)
                .off("slideFocus", tweenScale);
        };
    }, [emblaApi, tweenScale]);
    return (
        <div className={styles["embla"]}>
            <div className={styles["embla__viewport"]} ref={emblaRef}>
                <div className={styles["embla__container"]}>
                    {slides.map((index) => (
                        <div className={styles["embla__slide"]} key={index}>
                            <img
                                id={`${"embla__slide__number" + index}`}
                                className={styles["embla__slide__img"]}
                                src={images[index]}
                                alt="villa image"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
