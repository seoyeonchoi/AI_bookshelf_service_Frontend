import axios from "axios";

/* user */
// export const getAuthToken = () =>
//   axios.get(SERVER_ADDRESS + "/api/user/authtoken");
export const signin = (data) => axios.post("/auth/signin", data);
// export const logout = () => axios.delete("/api/user/logout");
// export const signup = (data) => axios.post("/api/user/signup", data);
