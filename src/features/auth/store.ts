const KEY = "auth";

export const login = (username: string) => {
  localStorage.setItem(KEY, JSON.stringify({ isLoggedIn: true, username }));
};
export const logout = () => {
  localStorage.removeItem(KEY);
};

export const getAuth = () => {
  return JSON.parse(localStorage.getItem(KEY) || "null");
};