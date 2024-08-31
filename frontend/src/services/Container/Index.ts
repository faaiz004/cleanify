import axios from "axios";

export const getContainers = async (location:string) => {
    try {
        // console.log("location", location)
        const response = await axios.get(`http://127.0.0.1:5000/get-all-containers-filtered-by-area?area_id=${location}`);
        return response?.data?.data;
    } catch (error) {
        throw error;
    }
};