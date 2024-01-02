import { axiosInstance } from "./index";
import axios from "axios";

export const GetCurrentUser = async () => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		const response = await axios.get(
			// "https://spedire.onrender.com/api/v1/user/getCurrentUser",
			"http://localhost:8080/api/v1/user/getCurrentUser",
			config
		);
		console.log(response.data + "this is response from getcurent User");
		return response.data;
	} catch (error) {
		console.log(error);
		return error.response.data;
	}
};