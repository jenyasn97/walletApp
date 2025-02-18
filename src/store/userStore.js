import axiosApiInstanse from "../../api";
import { defineStore } from "pinia";
import { ref } from "vue";
import useAuthStore from "./auth";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const userInReal = ref({
    name: "",
    surname: "",
    img: "",
    userId: "",
  });

  async function getUserInAuthApi() {
    //Получение данных пользователя из авторизации, а не из realtime
    const authStore = useAuthStore();
    try {
      authStore.userData = JSON.parse(localStorage.getItem("userData"));
      const user = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          idToken: authStore.userData.idToken,
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserInRealtime() {
    const authStore = useAuthStore();
    try {
      const response = await axiosApiInstanse.get(
        "https://myapp-wallet-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );

      const users = response.data;
      for (const key in users) {
        const item = users[key]; // Данные конкретного пользователя

        if (item.id === authStore?.userData?.localId) {
          userInReal.value = {
            name: item.name,
            surname: item.surname,
            img: item.img,
            userId: item.id,
          };
        }
      }

      console.log(userInReal.value);
    } catch (error) {
      console.log(error);
    }
  }
  return { userInReal, getUserInRealtime, getUserInAuthApi };
});

export default useUserStore;
