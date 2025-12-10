import React from "react";
import mainCarouselData from "./MainCarouselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCarousel = () => {
  const items = mainCarouselData.map((item, index) => (
    <img
      key={index}
      className="cursor-pointer w-full h-[50vh] object-cover object-top"
      role="presentation"
      src={item.image}
      alt={`carousel image ${index + 1}`}
    />

  ));

  return (
    <AliceCarousel
      className="cursor-pointer w-full"
      items={items}
      autoPlay
      autoPlayInterval={1000}
      infinite
      disableButtonsControls
      disableDotsControls={false}
      mouseTracking
    />
  );
};

export default MainCarousel;
