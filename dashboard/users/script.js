// * Users
const tableBody = document.querySelector(".table-body");
const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast-content");
const toastProgress = document.querySelector(".process");
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
const userNewAge = document.querySelector(".user-new-age");
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

const createUser = async () => {
  const newUser = {
    firstname: newUserName.value,
    lastname: newUserFamilyname.value,
    username: newUserUsername.value,
    email: newUserEmail.value,
    city: "City",
    age: +newUserAge.value,
  };

  const res = await fetch("https://js-cms.iran.liara.run/api/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (res.status === 201) {
    fetchUsers();
    showToast("success", "کاربر با موفقیت اضافه شد");
    hideCreateModal();
  } else {
    showToast("fail", "خطا در اضافه کردن کاربر");
    fetchUsers();
    hideCreateModal();
  }
};

// Delete functions
const showRemoveModal = (userId) => {
  userIdToRemove = userId;

  removeModal.classList.remove("hidden");
};

const hideRemoveModal = () => {
  removeModal.classList.add("hidden");
};

const removeUser = async () => {
  const response = await fetch(
    `https://js-cms.iran.liara.run/api/users/${userIdToRemove}`,
    {
      method: "DELETE",
    }
  );

  if (response.status === 200) {
    hideRemoveModal();
    showToast("success", "کاربر با موفقیت حذف شد");
    fetchUsers();
  } else {
    showToast("fail", "خطا در حذف کاربر");
    fetchUsers();
    hideRemoveModal();
  }
};

// Put functions
const showUpdateModal = (user) => {
  userIdToUpdate = user._id;

  userNewName.value = user.firstname;
  userNewFamilyname.value = user.lastname;
  userNewUsername.value = user.username;
  userNewEmail.value = user.email;
  userNewAge.value = user.age;

  updateModal.classList.remove("hidden");
};

const hideUpdateModal = () => {
  updateModal.classList.add("hidden");
};

const updateUser = async () => {
  console.log(`[User ID] => ${userIdToUpdate}`);

  console.log("input age =", userNewAge.value);
  console.log("typeof input age =", typeof userNewAge.value);
  const userNewInfo = {
    firstname: userNewName.value,
    lastname: userNewFamilyname.value,
    username: userNewUsername.value,
    email: userNewEmail.value,
    age: +userNewAge.value,
  };

  const response = await fetch(
    `https://js-cms.iran.liara.run/api/users/${userIdToUpdate}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userNewInfo),
    }
  );

  if (response.status === 200) {
    hideUpdateModal();
    showToast("success", "کاربر با موفقیت ویرایش شد");
    fetchUsers();
  } else {
    showToast("fail", "خطا در ویرایش کاربر");
    hideUpdateModal();
    fetchUsers();
  }
};

const fetchUsers = async () => {
  const response = await fetch("https://js-cms.iran.liara.run/api/users");
  const data = await response.json();

  showUsers(data);
};

const showToast = (status, message) => {
  toast.classList.remove("hidden");
  toastMessage.innerHTML = message;

  if (status == "success") {
    toast.className = "toast success";
  } else {
    toast.className = "toast failed";
  }

  let toastProgressCounter = 0;

  const toastProgressInterval = setInterval(() => {
    toastProgressCounter++;

    if (toastProgressCounter > 130) {
      toastProgress.style.width = "1%";
      toast.classList.add("hidden");
      clearInterval(toastProgressInterval);
    }

    toastProgress.style.width = `${toastProgressCounter}%`;
  }, 40);
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
