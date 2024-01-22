import React, {useState, useEffect} from "react";
import './ImagesSwiper.css';
import 'react-slideshow-image/dist/styles.css'
import {
  Fade
} from "react-slideshow-image";
const ImagesSwiper = () =>{
    const [element, setElement] = useState(600);
    const checkContainerWidth = () =>{
      let containerWidth = document.getElementById("imageSwiper").clientWidth;
      setElement(containerWidth);
  }

  useEffect(()=>{
      checkContainerWidth();

  },[element])


  const images = [
    'background0.jpg',
    'background1.jpg',
    'background2.jpg',
  ]

  const divStyle = {
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
  const buttonStyle = {
    width: "30px",
    background: 'none',
    border: '0px',
    color: 'silver',
    fontSize: '24px',
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}></button>,
    nextArrow: <button style={{ ...buttonStyle }}></button>,
    transitionDuration: 1500,
    duration: 8000,
  }

  return(
      <div className="imageSwiper" id="imageSwiper" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}  onClick={checkContainerWidth} onLoad={checkContainerWidth}>
        <Fade {...properties}>
        {images.map(image => (
          <div key={image} id="backgroundImage" style={{ ...divStyle,
          // height: element < 600 ? "70vh" : "100vh",
            width: "100%",
            height:"100vh",
            backgroundImage: `url(${process.env.PUBLIC_URL + '/' + image})` }}>
            
          </div>
        ))}
        </Fade>
          
      </div>
  )
}

export default ImagesSwiper;