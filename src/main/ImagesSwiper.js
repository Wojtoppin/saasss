import React, {useState, useEffect} from "react";
import './ImagesSwiper.css';
const ImagesSwiper = () =>{
    const [currentImage, setCurrentImage] = useState(1)
    const [element, setElement] = useState(600);
    const numberOfImages = 3;

    const checkContainerWidth = () =>{
      let containerWidth = document.getElementById("imageSwiper").clientWidth;
      setElement(containerWidth);
      console.log(containerWidth)
  }

  useEffect(()=>{
      checkContainerWidth();

  },[element])


    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrentImage((prevImage) => (prevImage + 1) % numberOfImages);
        }, 3000);
    
        return () => clearInterval(intervalId);
      }, [currentImage]);


    return(
        <div className="imageSwiper" id="imageSwiper" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}  onClick={checkContainerWidth} onLoad={checkContainerWidth}>
            <img src={process.env.PUBLIC_URL + `/background${currentImage}.jpg`} id="backgroundImage" style={{height:element<600?"70%":"100%"}}/> 
            
        </div>
    )
}

export default ImagesSwiper;