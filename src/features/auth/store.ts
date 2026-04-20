const AUTH_KEY = "isLoggedIn";

const setAuth = (value: boolean) => {
  localStorage.setItem(AUTH_KEY, value ? "true" : "false");
};

export const login = () => {
  setAuth(true);
};

export const logout = () => {
  setAuth(false);
};

export const getAuth = () => localStorage.getItem(AUTH_KEY) === "true";