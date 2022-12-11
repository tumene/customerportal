import { STORAGE_KEYS } from "../constants/storage";

export const saveContactDetailsToStorage = (value) => {
  localStorage.setItem(STORAGE_KEYS?.CONTACT, JSON.stringify(value));
};

export const getContactDetailsFromStorage = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS?.CONTACT) || "{}");
};
