import axios from "axios";

export const api = axios.create({
    baseURL: "https://nimbusns.weethub.com",
});
