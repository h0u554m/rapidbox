import React, { useState, useEffect } from "react";

const BoundingBox = ({ id, left, top, width, height, onMove, onResize }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeSensitivity = 0.5; // Adjust this factor for smoother resizing

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("resizable-handle")) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - startPosition.x;
        const deltaY = e.clientY - startPosition.y;
        const newLeft = left + deltaX;
        const newTop = top + deltaY;
        onMove(newLeft, newTop);
        setStartPosition({ x: e.clientX, y: e.clientY });
      } else if (isResizing) {
        const deltaX = e.clientX - startPosition.x;
        const deltaY = e.clientY - startPosition.y;
        const newWidth = width + deltaX * resizeSensitivity;
        const newHeight = height + deltaY * resizeSensitivity;
        onResize(newWidth, newHeight);
        setStartPosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    left,
    top,
    width,
    height,
    onMove,
    onResize,
    startPosition,
  ]);

  return (
    <div
      className="bounding-box absolute border-2 border-yellow-400 "
      style={{ left, top, width, height, cursor: "move" }}
      onMouseDown={handleMouseDown}
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
