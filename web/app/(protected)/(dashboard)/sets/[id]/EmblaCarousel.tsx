import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { Card } from "./page";
import "./EmblaCarousel.css";

type PropType = {
  slides: ReactNode[];
  options: EmblaOptionsType;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options = {},
  setCurrentSlide,
}: {
  slides: ReactNode[];
  options: EmblaOptionsType;
  setCurrentSlide: Dispatch<SetStateAction<number>>;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrevButtonClick();
      } else if (event.key === "ArrowRight") {
        onNextButtonClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPrevButtonClick, onNextButtonClick]);

  useEffect(() => {
    const logSlidesInView = (emblaApi: any) => {
      const slidesInView = emblaApi.slidesInView();
      setCurrentSlide(slidesInView[0]);
    };
    if (emblaApi) emblaApi.on("slidesInView", logSlidesInView);
  }, [emblaApi, setCurrentSlide]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div key={`slide-${index}`} className="embla__slide">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
