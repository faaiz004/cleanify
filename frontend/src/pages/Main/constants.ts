export interface Coordinates {
  lat: number;
  lon: number;
}



export type ContainerStatus = 'OVERFLOWING' | 'FULL' | 'NORMAL' | 'EMPTY';

export interface ContainerType {
  id: string;
  location: string;
  fill_status: ContainerStatus;
  depth: string;
  updatedAt: string;
  status: string;

}

export type VehicleStatus = 'WORKING' | 'NOT_WORKING';

export interface VehicleType {
  id: string;
  location: string;
  status: VehicleStatus;
  user_id: string;
}
// const containers: ContainerType[] = [
//     // Lahore
//     {
//         id: 1,
//         city: 'Lahore',
//         location: {
//             name: 'Gulberg',
//             coordinates: { lat: 31.5497, lon: 74.3436 }
//         },
//         status: 'Full'
//     },
//     {
//         id: 2,
//         city: 'Lahore',
//         location: {
//             name: 'Defense',
//             coordinates: { lat: 31.5204, lon: 74.3587 }
//         },
//         status: 'Normal'
//     },
//     {
//         id: 3,
//         city: 'Lahore',
//         location: {
//             name: 'Johar Town',
//             coordinates: { lat: 31.5206, lon: 74.3001 }
//         },
//         status: 'Empty'
//     },
//     {
//         id: 4,
//         city: 'Lahore',
//         location: {
//             name: 'Model Town',
//             coordinates: { lat: 31.5249, lon: 74.3301 }
//         },
//         status: 'Full'
//     },
//     {
//         id: 5,
//         city: 'Lahore',
//         location: {
//             name: 'Shadbagh',
//             coordinates: { lat: 31.5703, lon: 74.3168 }
//         },
//         status: 'Normal'
//     },
//     {
//         id: 6,
//         city: 'Lahore',
//         location: {
//             name: 'Lytton Road',
//             coordinates: { lat: 31.5709, lon: 74.3373 }
//         },
//         status: 'Empty'
//     },
//     {
//         id: 7,
//         city: 'Lahore',
//         location: {
//             name: 'Wapda Town',
//             coordinates: { lat: 31.4871, lon: 74.2813 }
//         },
//         status: 'Full'
//     },
//     {
//         id: 8,
//         city: 'Lahore',
//         location: {
//             name: 'Township',
//             coordinates: { lat: 31.5464, lon: 74.3037 }
//         },
//         status: 'Normal'
//     },
//     {
//         id: 9,
//         city: 'Lahore',
//         location: {
//             name: 'Saddar',
//             coordinates: { lat: 31.5852, lon: 74.3275 }
//         },
//         status: 'Empty'
//     },
//     {
//         id: 10,
//         city: 'Lahore',
//         location: {
//             name: 'Qartaba Chowk',
//             coordinates: { lat: 31.5521, lon: 74.3402 }
//         },
//         status: 'Full'
//     },

//     // Islamabad
//     {
//         id: 11,
//         city: 'Islamabad',
//         location: {
//             name: 'F-6',
//             coordinates: { lat: 33.6844, lon: 73.0479 }
//         },
//         status: 'Normal'
//     },
//     {
//         id: 12,
//         city: 'Islamabad',
//         location: {
//             name: 'F-10',
//             coordinates: { lat: 33.6881, lon: 73.0600 }
//         },
//         status: 'Empty'
//     },
//     {
//         id: 13,
//         city: 'Islamabad',
//         location: {
//             name: 'G-5',
//             coordinates: { lat: 33.7031, lon: 73.0591 }
//         },
//         status: 'Full'
//     },
//     {
//         id: 14,
//         city: 'Islamabad',
//         location: {
//             name: 'G-10',
//             coordinates: { lat: 33.7166, lon: 73.0602 }
//         },
//         status: 'Normal'
//     },
//     {
//         id: 15,
//         city: 'Islamabad',
//         location: {
//             name: 'G-11',
//             coordinates: { lat: 33.7224, lon: 73.0548 }
//         },
//         status: 'Empty'
//     },
//     {
//         id: 16,
//         city: 'Islamabad',
//         location: {
//             name: 'F-8',
//             coordinates: { lat: 33.6858, lon: 73.0625 }
//         },
//         status: 'Full'
//     },
//     {
//         id: 17,
//         city: 'Islamabad',
//         location: {
//             name: 'G-9',
//             coordinates: { lat: 33.7055, lon: 73.0597 }
//         },
//         status: 'Normal'
//     },
//     {
//         id: 18,
//         city: 'Islamabad',
//         location: {
//             name: 'F-7',
//             coordinates: { lat: 33.6889, lon: 73.0615 }
//         },
//         status: 'Empty'
//     },
//     {
//         id: 19,
//         city: 'Islamabad',
//         location: {
//             name: 'G-8',
//             coordinates: { lat: 33.6862, lon: 73.0543 }
//         },
//         status: 'Full'
//     },
//     {
//         id: 20,
//         city: 'Islamabad',
//         location: {
//             name: 'D-12',
//             coordinates: { lat: 33.7194, lon: 73.0406 }
//         },
//         status: 'Normal'
//     }
// ];
// export { containers };  