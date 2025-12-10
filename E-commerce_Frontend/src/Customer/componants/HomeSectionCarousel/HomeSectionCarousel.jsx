import React, { useRef } from "react";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeSectionCarousel = ({ data, title  }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col mt-10 m-5">
      <h1 className="text-2xl font-bold m-5">{title}</h1>
      <div className="relative flex items-center">
        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-200"
        >
          <ArrowBackIosIcon />
        </button>
        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory p-5 scroll-smooth"
        >
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div key={item.id || item._id || item.name || index} className="snap-start">
                <HomeSectionCard product={item} index={index} />
              </div>
            ))
          ) : (
            <div className="text-gray-500 p-5">No products available</div>
          )}
        </div>
        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-200"
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;