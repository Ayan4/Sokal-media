// import { apiClient } from "./Api/apiClient";

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch({ type: "LOGIN_START" });
//   try {
//     const res = await apiClient.post("/auth/login", userCredential);
//     dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
//   } catch (err) {
//     dispatch({ type: "LOGIN_FAILURE", payload: err });
//   }
// };
