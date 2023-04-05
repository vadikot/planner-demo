import React, { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { AuthContext } from '~/components/Auth/lib/AuthConext';

type HomepageColorsType = '#b5322e'| '#c7ad08'| '#287e3e'| '#237a9d';

interface SlideType {
    id: number;
    title: string;
    description: string;
    imgName: string
    color: HomepageColorsType

}
interface AnimationPropsType {
    rotateDeg: number;
    titleTranslate: number;
    descriptionTranslate: number;
    progressLine: number,
}

const slides: SlideType[] = [
    {
        id: 0,
        title: 'Strength',
        description: `We believe that real strength is achieving your goals,
living the life you want and take control of your life.`,
        imgName: 'man5.png',
        color: '#b5322e',
    },
    {
        id: 1,
        title: 'discipline',
        description: `Do you always want to change your life but you always put it off?
We will help you take small steps towards your dream
every day and become the best version of yourself.`,
        imgName: 'man.png',
        color: '#c7ad08',
    },
    {
        id: 2,
        title: 'health',
        description: `Health should be good not only physical, but also mental. Taking control of your life will help you 
feel better and have more energy.`,
        imgName: 'man4.png',
        color: '#287e3e',
    },
    {
        id: 3,
        title: 'wisdom',
        description: `We will help you organize all your thoughts and 
manage all your daily tasks. We use the best practices, JOIN US!`,
        imgName: 'man10.png',
        color: '#237a9d',
    },
];

const HomePage = () => {
    const slidesAmount = slides.length;
    const lastSlideIndex = slidesAmount - 1;
    const initAnimationValues: AnimationPropsType = {
        rotateDeg: 0,
        titleTranslate: 0,
        descriptionTranslate: -(lastSlideIndex * 450),
        progressLine: 0,
    };

    const [currentSlide, setCurrentSlide] = useState<SlideType>(slides[0]);
    const [
        slideAnimationValues,
        setSlideAnimationValues,
    ] = useState<AnimationPropsType>(initAnimationValues);

    const titleSlides = useMemo(
        () => slides
            .map((slide) => (
                <h2
                    key={slide.id}
                    className={`title__slide slide${slide.id}`}
                    style={{ color: `${slide.color}` }}
                >
                    {slide.title}
                </h2>
            )),
        [slides],
    );

    const descriptionSlides = useMemo(() => slides
        .slice()
        .reverse()
        .map((slide) => (
            <p key={slide.id} className="description__slide">{slide.description}</p>
        )), [slides]);

    const imgSlides = useMemo(() => slides.map((slide) => (
        <div
            key={slide.id}
            className={`img__slider__slide img__slider__slide${slide.id} circle-big`}
            style={{ background: `${slide.color}`, boxShadow: `0 0 150px ${slide.color}` }}
        >
            <div
                className="man"
                style={{ backgroundImage: `url(/assets/img/homepageSlider/${slide.imgName})` }}
            />
        </div>
    )), [slides]);

    const SLIDER__POINT = 200;
    const LINE_WIDTH = 100;
    const slideProgressLineNumber = (SLIDER__POINT - LINE_WIDTH) / (slidesAmount - 1);

    const nextSlideHandler = () => {
        if (currentSlide.id === lastSlideIndex) {
            setSlideAnimationValues(initAnimationValues);
            setCurrentSlide(slides[0]);
        } else {
            setCurrentSlide(slides[currentSlide.id + 1]);
            setSlideAnimationValues((prevState) => ({
                titleTranslate: prevState.titleTranslate - 450,
                descriptionTranslate: prevState.descriptionTranslate + 450,
                rotateDeg: prevState.rotateDeg - 90,
                progressLine: prevState.progressLine + slideProgressLineNumber,
            }));
        }
    };

    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const startHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (isAuth) {
            navigate('/dashboard/home');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="homepage">
            <div className="content__wrap">
                <div className="links">
                    <div className="logo">
                        <div />
                        <div />
                        <div />
                    </div>
                    <Link
                        className="homepage__link"
                        style={{ color: `${currentSlide.color}` }}
                        to="/"
                        onClick={startHandler}
                    >
                        Start
                    </Link>
                    <Link className="homepage__link" to="/about">About</Link>
                    <Link className="homepage__link" to="/contact">Contact</Link>
                </div>
                <div className="slider__text">
                    <div className="slider__text__wrap">
                        <span className="slider__span">our version of</span>
                        <div className="slider__text-title">
                            <div
                                className="slider__text-title__wrap"
                                /* eslint-disable-next-line */
                                style={{ transform: `translate(${slideAnimationValues.titleTranslate}px, 0px)` }}
                            >
                                {titleSlides}
                            </div>
                        </div>
                        <div className="slider__text-description">
                            <div
                                className="slider__text-description__wrap"
                                /* eslint-disable-next-line */
                                style={{ transform: `translate(${slideAnimationValues.descriptionTranslate}px, 0px)` }}
                            >
                                {descriptionSlides}
                            </div>
                        </div>
                    </div>
                    <div className="homepage__button" onClick={nextSlideHandler}>
                        <div
                            className="button__arrow__wrap"
                            style={{ borderColor: `${currentSlide.color}` }}
                        >
                            <svg
                                className="button__arrow"
                                style={{ fill: `${currentSlide.color}` }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                id="IconChangeColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5
                                    0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0
                                    0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                    id="mainIconPathAttribute"
                                    strokeWidth="1"
                                    stroke={`${currentSlide.color}`}
                                />
                            </svg>
                        </div>
                        <span style={{ color: `${currentSlide.color}` }}>Next</span>
                    </div>
                </div>
                <div className="slider__points">
                    <span className="current-slide" style={{ color: `${currentSlide.color}` }}>
                        0
                        {currentSlide.id + 1}
                    </span>
                    <div className="slider__point" style={{ background: `${currentSlide.color}` }}>
                        <div
                            className="line"
                            style={{
                                transform: `translate(${slideAnimationValues.progressLine}px, 0px)`,
                            }}
                        />
                    </div>
                    <span className="count-slides">
                        0
                        {slidesAmount}
                    </span>
                </div>
            </div>

            <div className="img__slider">
                <div
                    className="img__slider__wrap"
                    style={{ transform: `rotate(${slideAnimationValues.rotateDeg}deg)` }}
                >
                    {imgSlides}
                </div>
            </div>

            <div
                className="circle-small"
                style={{
                    background: `${currentSlide.color}`,
                    boxShadow: `0 0 150px ${currentSlide.color}`,
                }}
            />

        </div>
    );
};

export default HomePage;
