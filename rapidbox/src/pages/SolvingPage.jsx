import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  carImages,
  fetchSingleBoundingBox,
  fileNames,
} from "../controllers/api";
import BoundingBox from "../compounds/boundingBox";

const SolvingPage = () => {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [imageDataIndex, setImageDataIndex] = useState(0);
  const [boundingBox, setBoundingBox] = useState({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
  });

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [showBoundingBox, setShowBoundingBox] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSingleBoundingBox();
        setImageDataIndex(fileNames.indexOf(response.fileName) + 1);
        console.log(fileNames.indexOf(response.fileName));
        setTimeRemaining(10);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const image = new Image();
    image.src = carImages[imageDataIndex];
    image.onload = () => {
      setImageDimensions({ width: image.width, height: image.height });
    };

    const countdownInterval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeRemaining === 0) {
      fetchData();
    }

    return () => clearInterval(countdownInterval);
  }, [timeRemaining, imageDataIndex]);

  const handleMoves = (newLeft, newTop) => {
    const maxWidth = imageDimensions.width - boundingBox.width;
    const maxHeight = imageDimensions.height - boundingBox.height;

    const boundedLeft = Math.max(0, Math.min(newLeft, maxWidth));
    const boundedTop = Math.max(0, Math.min(newTop, maxHeight));

    setBoundingBox({ ...boundingBox, left: boundedLeft, top: boundedTop });
  };

  const handleImageClick = (event) => {
    // Get mouse position relative to the image
    const rect = event.target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Set boundingBox state to mouse position
    setBoundingBox({
      left: mouseX,
      top: mouseY,
      width: 100, // Set default width
      height: 100, // Set default height
    });

    setShowBoundingBox(true);
  };

  const handleResize = (newWidth, newHeight) => {
    const maxWidth = imageDimensions.width - boundingBox.left;
    const maxHeight = imageDimensions.height - boundingBox.top;

    // Ensure newWidth and newHeight do not exceed the available space within the image
    const boundedWidth = Math.min(maxWidth, Math.max(1, newWidth));
    const boundedHeight = Math.min(maxHeight, Math.max(1, newHeight));

    setBoundingBox({
      ...boundingBox,
      width: boundedWidth,
      height: boundedHeight,
    });
  };

  const handleMove = (event) => {
    event.preventDefault(); // Prevent default touch events behavior

    const clientX =
      event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
    const clientY =
      event.type === "touchmove" ? event.touches[0].clientY : event.clientY;

    // Get mouse/touch position relative to the parent container
    const parentRect = event.target.parentElement.getBoundingClientRect();
    const mouseX = clientX - parentRect.left;
    const mouseY = clientY - parentRect.top;

    const maxWidth = imageDimensions.width - boundingBox.width;
    const maxHeight = imageDimensions.height - boundingBox.height;

    const boundedLeft = Math.max(0, Math.min(mouseX, maxWidth));
    const boundedTop = Math.max(0, Math.min(mouseY, maxHeight));

    setBoundingBox({ ...boundingBox, left: boundedLeft, top: boundedTop });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="text-2xl font-bold mb-4">{timeRemaining}s</div>
      {imageDataIndex ? (
        <div className="relative inline-block">
          <img
            src={carImages[imageDataIndex]}
            alt="Carimage"
            className="max-w-full mb-4 select-none"
            onClick={handleImageClick}
            onTouchMove={handleMove}
            draggable="false"
          />
          {showBoundingBox && (
            <BoundingBox
              id={1}
              left={boundingBox.left}
              top={boundingBox.top}
              width={boundingBox.width}
              height={boundingBox.height}
              onMove={handleMoves}
              onResize={handleResize}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

const SolvingPageWithDnd = () => (
  <DndProvider backend={HTML5Backend}>
    <SolvingPage />
  </DndProvider>
);

export default SolvingPageWithDnd;
