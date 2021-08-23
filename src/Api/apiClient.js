import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://sokal-media.herokuapp.com/api"
});
