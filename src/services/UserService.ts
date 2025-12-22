import axios from "axios";

const userLogin = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
    return response.data;
}

export { userLogin };