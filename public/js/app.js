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

toggleMenu.addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("open");
});
