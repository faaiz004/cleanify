import { Icon, PointExpression } from "leaflet";

// Function to create a custom icon with a specific color
const CreateCustomIcon = (color: string, size: PointExpression = [38, 38]) => {
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="${color}">
          <circle cx="12" cy="12" r="10"/>
        </svg>
      `)}`,
      iconSize: size,
      iconAnchor: [19, 38], // Adjusted to make the circle center aligned
    });
};

export default CreateCustomIcon;