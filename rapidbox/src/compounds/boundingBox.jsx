import React, { useRef, useState, useEffect } from "react";

const BoundingBox = ({ id, left, top, width, height, onMove, onResize }) => {
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("resizable-handle")) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      onMove(left + deltaX, top + deltaY);
      setStartX(e.clientX);
      setStartY(e.clientY);
    } else if (isResizing) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      onResize(width + deltaX, height + deltaY);
      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleTouchStart = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
    if (event.target.classList.contains("resizable-handle")) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    if (isDragging) {
      onMove(left + deltaX, top + deltaY);
    } else if (isResizing) {
      onResize(width + deltaX, height + deltaY);
    }
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <div
      ref={boxRef}
      className="bounding-box"
      style={{
        left: left + "px",
        top: top + "px",
        width: width + "px",
        height: height + "px",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="resizable-handle"
        style={{
          bottom: 0,
          right: 0,
          width: "10px",
          height: "10px",
          background: "white",
          border: "2px solid black",
        }}
      />
      {/* Add resizable handles as needed */}
    </div>
  );
};

export default BoundingBox;
