export const getFromLocalStorage = (key: string) => localStorage.getItem(key);

export const saveToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const generateUUID = () => crypto.randomUUID();
