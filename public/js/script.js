const coursesCountElem = document.querySelector(".courses-count");
const coursesCountTopElem = document.querySelector(".courses-count-top");
const usersCountTopElem = document.querySelector(".users-count-top");
const usersCountainer = document.querySelector(".latest-users");
const coursesContainer = document.querySelector(".table-body");

const showLastCourses = (courses) => {
  const lastCourses = courses.slice(-3);
  coursesCountElem.innerHTML = courses.length;

  lastCourses.forEach((course) => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `
         <div class="tableRow">
               <p class="product-title">${course.title}</p>
              <p class="product-price">${course.price.toLocaleString()}</p>
              <p class="product-shortName">${course.registersCount}</p>
                <div class="product-manage">
                  <button class="edit-btn">
                    <!-- Edit icon -->
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="remove-btn">
                    <!-- Delete fas icon -->
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
         `
    );
  });
};

const showLastUsers = (users) => {
  const lastUsers = users.slice(-5);
  lastUsers.forEach((user) => {
    usersCountainer.insertAdjacentHTML(
      "beforeend",
      `
        <article>
              <!-- user icon -->
              <span class="icon-card">
                <i class="fa-solid fa-user"></i>
              </span>
              <!-- user data -->
              <div>
                <p class="user-name">${user.firstname}</p>
                <p class="user-email">${user.email}</p>
              </div>
        </article>
      `
    );
  });
};

window.addEventListener("load", async () => {
  const res = await fetch("https://js-cms.iran.liara.run/api/courses");
  const data = await res.json();

  coursesCountTopElem.innerHTML = data.length;

  showLastCourses(data);
});

window.addEventListener("load", async () => {
  const res = await fetch("https://js-cms.iran.liara.run/api/users");
  const data = await res.json();

  usersCountTopElem.innerHTML = data.length;

  showLastUsers(data);
});
