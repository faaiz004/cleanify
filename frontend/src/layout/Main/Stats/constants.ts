export interface fleetStatus {
    location: string;
    working: number,
    unavailable: number,
    offWork: number,
}
const fleetStatusData = [
    {
      location: "Lahore",
      working: 45,
      unavailable: 5,
      offWork: 10,
    },
    {
      location: "Bahria Town",
      working: 30,
      unavailable: 3,
      offWork: 7,
    },
];

export interface FleetUsage {
    city: string;
    month: string;
    kmsTravelled: number;
};

const fleetUsageData = [
    { city: "Lahore", month: "January", kmsTravelled: 1200 },
    { city: "Lahore", month: "February", kmsTravelled: 1100 },
    { city: "Lahore", month: "March", kmsTravelled: 1500 },
    { city: "Lahore", month: "April", kmsTravelled: 1300 },
    { city: "Lahore", month: "May", kmsTravelled: 1600 },
    { city: "Lahore", month: "June", kmsTravelled: 1400 },
    { city: "Bahria Town", month: "January", kmsTravelled: 900 },
    { city: "Bahria Town", month: "February", kmsTravelled: 1000 },
    { city: "Bahria Town", month: "March", kmsTravelled: 1200 },
    { city: "Bahria Town", month: "April", kmsTravelled: 1100 },
    { city: "Bahria Town", month: "May", kmsTravelled: 1300 },
    { city: "Bahria Town", month: "June", kmsTravelled: 1250 },
];

export {fleetStatusData, fleetUsageData}
  