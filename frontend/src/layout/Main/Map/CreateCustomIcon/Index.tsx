import { Icon, PointExpression } from "leaflet";

// Function to create a custom icon with a specific color and dynamic content based on isContainer flag
const CreateCustomIcon = (
  color: string,
  size: PointExpression = [38, 38],
  isContainer: boolean = true
) => {
  // SVG for the container (trash can) icon
  const containerIcon = `
    <path d="M8 9h8v10H8V9zm1 1v8h6v-8H9zm6.5-4h-7l-.5 1h8l-.5-1z" fill="#00000"/>
    <path d="M10 9h1v8h-1zm3 0h1v8h-1zm2-5h-6l-1 1h8l-1-1z" fill="#00000"/>`;

  // SVG for the car icon
  const carIcon = `<svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
</svg>
;`

  // Choose the appropriate icon based on isContainer flag
  const iconSvg = isContainer ? containerIcon : carIcon;

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <circle cx="12" cy="12" r="10" fill="${color}" />
        ${iconSvg}
      </svg>
    `)}`,
    iconSize: size,
    iconAnchor: [19, 38], // Adjusted to make the icon center aligned
  });
};



export default CreateCustomIcon;