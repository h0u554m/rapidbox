// List of file names
export const fileNames = [
  "vid_4_600.jpg",
  "vid_4_980.jpg",
  "vid_4_1000.jpg",
  "vid_4_1020.jpg",
  "vid_4_2540.jpg",
  "vid_4_3140.jpg",
  "vid_4_4540.jpg",
  "vid_4_4560.jpg",
  "vid_4_8580.jpg",
  "vid_4_14480.jpg",
  "vid_4_28840.jpg",
];
// Export all car images
export const carImages = [
  require("../assets/cars/vid_4_600.jpg"),
  require("../assets/cars/vid_4_980.jpg"),
  require("../assets/cars/vid_4_1000.jpg"),
  require("../assets/cars/vid_4_1020.jpg"),
  require("../assets/cars/vid_4_2540.jpg"),
  require("../assets/cars/vid_4_3140.jpg"),
  require("../assets/cars/vid_4_4540.jpg"),
  require("../assets/cars/vid_4_4560.jpg"),
  require("../assets/cars/vid_4_8580.jpg"),
  require("../assets/cars/vid_4_14480.jpg"),
  require("../assets/cars/vid_4_28840.jpg"),
  // ... (i../assets/ort other image files as needed)
];

// Simulated API function to get single bounding box data with different file names
let currentIndex = 0;

export async function fetchSingleBoundingBox() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        Id: `id_${currentIndex}`,
        fileName: fileNames[currentIndex],
        target: "car",
      };
      currentIndex = (currentIndex + 1) % fileNames.length; // Move to the next file name in the list
      resolve(response);
    }, 300); // Simulating a 300ms delay to mimic API response time
  });
}
