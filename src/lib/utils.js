import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const url = import.meta.env.VITE_BASE_URL;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getCookie(name) {
  let cookie = document.cookie.split("; ").find((row) => row.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
}

export async function addUser(firstName, lastName, email, id) {
  const newUser = {
    id,
    name: firstName,
    surname: lastName,
    email,
    createdAt: Date.now(),
  };
  try {
    await axios.post(`${url}/users.json`, { ...newUser });
  } catch (e) {
    console.log(e);
  }
}

export async function addTransaction(description, userId) {
  const transaction = {
    date: Date(Date.now()),
    description,
    userId,
  };

  try {
    await axios.post(`${url}/transactions.json`, {
      ...transaction,
    });
  } catch (e) {
    console.log(e);
  }
}
