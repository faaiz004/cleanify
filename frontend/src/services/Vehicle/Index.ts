import axios from 'axios';

export const getVehicles = async (user_id:string, location: string ) => {
    // console.log('User ID in getVehicles:', user_id);
    // console.log('Location in getVehicles:', location);
    try {
        const response = await axios.get(`http://127.0.0.1:5000/get-all-vehicles-of-a-user-filtered-by-area?user_id=${user_id}&area_id=${location}`);
        // console.log('Response:', response.data);
        return response?.data?.data;
    } catch (error) {
        throw error;
    }
};