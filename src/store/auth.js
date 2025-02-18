import { defineStore } from "pinia";
import { ref } from "vue";
import axiosApiInstanse from "../../api";

export const useAuthStore = defineStore("auth", () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const isLoading = ref(false);
  const error = ref("");

  const userData = ref({
    idToken: "",
    localId: "",
    refreshToken: "",
  });

  async function auth(payload, type) {
    const stringUrl = type === "login" ? "signInWithPassword" : "signUp";
    try {
      isLoading.value = true;
      const response = await axiosApiInstanse.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true,
        }
      );

      userData.value = {
        idToken: response.data.idToken,
        localId: response.data.localId,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem("userData", JSON.stringify(userData.value));
      if (type === "login") {
        document.cookie = `Wallet-Access-Token=${userData.value.idToken}; secure`;
        document.cookie = `Wallet-Refresh-Token=${userData.value.refreshToken}; secure`;
      }
    } catch (err) {
      switch (err.response.data.error.message) {
        case "INVALID_LOGIN_CREDENTIALS":
          error.value = "INVALID_LOGIN_CREDENTIALS";
          break;
        case "INVALID_PASSWORD":
          error.value = "INVALID_PASSWORD";
          break;
        case "EMAIL_EXISTS":
          error.value = "EMAIL_EXISTS";
          break;
        default:
          error.value = "Unknow error";
          break;
      }
      alert(error.value);
    } finally {
      isLoading.value = false;
    }
  }
  return { isLoading, userData, auth, error };
});

export default useAuthStore;
