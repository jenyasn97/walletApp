import { getCookie } from "@/lib/utils";
import useAuthStore from "@/store/auth";
import axios from "axios";
import { useRouter } from "vue-router";

const axiosApiInstanse = axios.create();
const apiKey = import.meta.env.VITE_API_KEY;
const router = useRouter();

axiosApiInstanse.interceptors.request.use((config) => {
  const url = config.url;
  if (!url.includes("signInWithPassword") && !url.includes("signUp")) {
    const authStore = useAuthStore();
    let params = new URLSearchParams();
    params.append("auth", getCookie("Wallet-Access-Token"));
    authStore.userData = JSON.parse(localStorage.getItem("userData"));
    config.params = params;
  }
  return config;
});

axiosApiInstanse.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const authStore = useAuthStore();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey} `,
          {
            grant_type: "refresh_token",
            refresh_token: getCookie("Wallet-Refresh-Token"),
          }
        );
        authStore.userData.idToken = newTokens.data.access_token;
        authStore.userData.refreshToken = newTokens.data.refresh_token;
        document.cookie = `Wallet-Access-Token=${newTokens.data.access_token}; secure`;
        document.cookie = `Wallet-Refresh-Token=${newTokens.data.refresh_token}; secure`;
      } catch (err) {
        console.log(err);
        document.cookie = "Wallet-Access-Token=; Max-Age=-1;";
        document.cookie = "Wallet-Refresh-Token=; Max-Age=-1;";
        authStore.userData.idToken = "";
        authStore.userData.refreshToken = "";
        router.push("/login");
      }
    }
    console.log(error);
  }
);

export default axiosApiInstanse;
