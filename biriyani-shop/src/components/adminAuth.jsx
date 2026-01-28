export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123"
};

export const isAdminLoggedIn = () => {
  return localStorage.getItem("isAdminAuth") === "true";
};

export const adminLogin = (username, password) => {
  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    localStorage.setItem("isAdminAuth", "true");
    return true;
  }
  return false;
};

export const adminLogout = () => {
  localStorage.removeItem("isAdminAuth");
};
