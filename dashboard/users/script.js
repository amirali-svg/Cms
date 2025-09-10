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

// Remove user (Delete)
const removeModal = document.querySelector(".remove-modal");
const acceptUserRemove = document.querySelector(".accept-user-remove");
const rejectUserRemove = document.querySelector(".reject-user-remove");

// Update user (PUT)
const updateModal = document.querySelector(".update-modal");
const userNewName = document.querySelector(".user-new-name");
const userNewFamilyname = document.querySelector(".user-new-familyname");
const userNewUsername = document.querySelector(".user-new-username");
const userNewEmail = document.querySelector(".user-new-email");
const userNewPassword = document.querySelector(".user-new-password");
const rejectUserUpdate = document.querySelector(".reject-user-update");
const acceptUserUpdate = document.querySelector(".accept-user-update");
const editBtn = document.querySelector(".edit-btn");

let userIdToRemove;
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
                <button class="edit-btn" onclick ='showUpdateModal(${JSON.stringify(
                  user
                )})'>
                  <!-- Edit icon -->
                  <i class="fas fa-edit"></i>
                </button>
                <button class="remove-btn" onclick="showRemoveModal('${
                  user._id
                }')">
                  <!-- Ban icon -->
                  <i class="fas fa-ban"></i>
                </button>
              </div>
            </div>
         `
    );
  });
};

// Post functions
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

// Delete functions
const showRemoveModal = (userId) => {
  userIdToRemove = userId;

  removeModal.classList.remove("hidden");
};

const hideRemoveModal = () => {
  removeModal.classList.add("hidden");
};

const removeUser = () => {
  fetch(`https://js-cms.iran.liara.run/api/users/${userIdToRemove}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        hideRemoveModal();
        fetchUsers();
      }

      return response.json();
    })
    .then((data) => {
      console.log(`[Message] => ${data.message} \n [ID] => ${data.id}`);
    });
};

// Put functions
const showUpdateModal = (user) => {
  userIdToUpdate = user._id;

  userNewName.value = user.firstname;
  userNewFamilyname.value = user.lastname;
  userNewUsername.value = user.username;
  userNewEmail.value = user.email;
  userNewPassword.value = user.age;

  updateModal.classList.remove("hidden");
};

const hideUpdateModal = () => {
  updateModal.classList.add("hidden");
};

const updateUser = () => {
  console.log(`[User ID] => ${userIdToUpdate}`);
  const userNewInfo = {
    firstname: userNewName.value,
    lastname: userNewFamilyname.value,
    username: userNewUsername.value,
    email: userNewEmail.value,
    age: +userNewPassword.value,
  };

  fetch(`https://js-cms.iran.liara.run/api/users/${userIdToUpdate}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userNewInfo),
  })
    .then((response) => {
      if (response.status === 200) {
        hideUpdateModal();
        fetchUsers();
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
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
// Post
acceptCreateUser.addEventListener("click", createUser);
rejectCreateUser.addEventListener("click", hideCreateModal);
// Delete
acceptUserRemove.addEventListener("click", removeUser);
rejectUserRemove.addEventListener("click", hideRemoveModal);
// Put
acceptUserUpdate.addEventListener("click", updateUser);
rejectUserUpdate.addEventListener("click", hideUpdateModal);