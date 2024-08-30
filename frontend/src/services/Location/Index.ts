import axios from "axios";

export const getLocation = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:5000/get-all-areas');
        return res?.data?.data;
    } catch (error) {
        throw error;
    }
}