// Vehicle type definition
export interface Vehicle {
    id: string;
    position: [number, number];
  }
  
  // Initial vehicle data
  const initialVehicles: Vehicle[] = [
    { id: "Vehicle 1", position: [31.5497, 74.3436] },
    { id: "Vehicle 2", position: [31.5597, 74.3536] },
    // Add more vehicles if needed
  ];
export { initialVehicles};