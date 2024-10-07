// ImageSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css"; // optional for custom styles

const ImageSlider = () => {
  const settings = {
    dots: true, // Enables dots at the bottom
    infinite: true, // Enables infinite looping
    speed: 500, // Speed of transition
    slidesToShow: 1, // Shows one image at a time
    slidesToScroll: 1, // Scrolls one image at a time
    autoplay: true, // Auto-slide
    autoplaySpeed: 3000, // Time interval between slides
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="https://www.nimba.in/wp-content/uploads/2021/07/nimbablog3.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="https://runwayhealth.ca/wp-content/uploads/2021/07/Physiotherapy-for-the-knee.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="https://fulcrumtherapy.ca/wp-content/uploads/2023/07/f-physiotherapy.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="https://www.geelongphysiotherapy.com.au/wp-content/uploads/2021/04/gph_slide1.jpg" alt="Image 4" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
