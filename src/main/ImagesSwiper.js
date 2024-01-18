import React, {useState, useEffect} from "react";
import './ImagesSwiper.css';
const ImagesSwiper = () =>{
    const [currentImage, setCurrentImage] = useState(1)
    const numberOfImages = 3;

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImage((prevImage) => (prevImage + 1) % numberOfImages);
        }, 3000);
    
        return () => clearInterval(intervalId);
      }, [currentImage]);


    return(
        <div className="imageSwiper"  style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <img src={process.env.PUBLIC_URL + `/background${currentImage}.jpg`} id="backgroundImage"/> 
            
        </div>
    )
}

export default ImagesSwiper;