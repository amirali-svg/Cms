//* Cms -> Content Management System

const data = {
  users: [
    {
      id: 1,
      name: "پیمان احمدی",
      username: "peyman",
      email: "peyman@gmail.com",
      password: "peyman1212",
    },
  ],

  products: [
    {
      id: 1,
      title: "کفش ورزشی",
      price: 2000000,
      slug: "nike-sport-shoe",
    },
  ],
};

const toggleMenu = document.querySelector(".toggle-sidebar");
const themeButton = document.querySelector(".theme-button");
const html = document.querySelector("html");
let newTheme;

toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});

const getStoredTheme = () => {
  return localStorage.getItem("theme");
};

const storeTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

const applyTheme = (theme) => {
  html.className = theme;
  storeTheme(theme);
};

const toggleTheme = () => {
  const currentTheme = getStoredTheme();
  if (currentTheme == "dark") {
    newTheme = "light";
  } else {
    newTheme = "dark";
  }

  applyTheme(newTheme);
};

const loadTheme = () => {
  const currentTheme = getStoredTheme();
  if (!currentTheme) {
    currentTheme = "light";
  }
  html.className = currentTheme;
};

themeButton.addEventListener("click", toggleTheme);
window.addEventListener("load", loadTheme);
