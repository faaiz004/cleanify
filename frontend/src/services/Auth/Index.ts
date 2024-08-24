import axios from 'axios';

export const login = async (email: string, password: string) => {
    console.log('trying to login in')
    console.log(email,password)
    try {
        const res = await axios.post('http://127.0.0.1:5000/log-in', {
            email: email,
            password: password
        });
        console.log('res: ', res)
        console.log(res.status)
        if (res.status === 200) {
            // Login successful
            console.log('Login successful');
            return res.data;
        } else {
            // Handle unexpected status code
            console.log(`Unexpected status code: ${res.status}`);
            throw new Error(`Invalid email or password`);
        }
        
    } catch (error: any) {
        console.error('Login failed', error);
        throw error
    }
};
