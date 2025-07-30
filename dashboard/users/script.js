const tableBody = document.querySelector(".table-body");

// Create user(POST)
const createUserBtn = document.querySelector(".create-user");
const createModal = document.querySelector(".create-modal");
const newUserName = document.querySelector(".new-user-name");
const newUserFamilyname = document.querySelector(".new-user-familyname");
const newUserUsername = document.querySelector(".new-user-username");
const newUserEmail = document.querySelector(".new-user-email");
const newUserAge = document.querySelector(".new-user-password");
const rejectCreateUser = document.querySelector(".reject-user-create");
const acceptCreateUser = document.querySelector(".accept-user-create");

let userIdToUpdate = null;

const showUsers = (users) => {
  tableBody.innerHTML = "";

  users.forEach((user) => {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `
         <div class="tableRow">
              <p class="user-fullName">${user.firstname} ${user.lastname}</p>
              <p class="user-username">${user.username}</p>
              <p class="user-email">${user.email}</p>
              <p class="user-password">${user.age}</p>
              <div class="product-manage">
                <button class="edit-btn">
                  <!-- Edit icon -->
                  <i class="fas fa-edit"></i>
                </button>
                <button class="remove-btn">
                  <!-- Ban icon -->
                  <i class="fas fa-ban"></i>
                </button>
              </div>
            </div>
         `
    );
  });
};

const showCreateModal = () => {
  createModal.classList.remove("hidden");
};

const hideCreateModal = () => {
  createModal.classList.add("hidden");
};

const createUser = () => {
  const newUser = {
    firstname: newUserName.value,
    lastname: newUserFamilyname.value,
    username: newUserUsername.value,
    email: newUserEmail.value,
    city: "City",
    age: +newUserAge.value,
  };

  fetch("https://js-cms.iran.liara.run/api/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  }).then((response) => {
    if (response.status === 201) {
      fetchUsers();
      hideCreateModal();
    }
    return response.json().then((data) => {
      console.log(data);
    });
  });
};

const fetchUsers = () => {
  fetch("https://js-cms.iran.liara.run/api/users")
    .then((response) => response.json())
    .then((data) => {
      showUsers(data);
    });
};

window.addEventListener("load", fetchUsers);
// createUserBtn.addEventListener('click', showCreateModal)
rejectCreateUser.addEventListener("click", hideCreateModal);
acceptCreateUser.addEventListener("click", createUser);
