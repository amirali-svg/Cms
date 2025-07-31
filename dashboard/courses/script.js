// Delete 
const tableBody = document.querySelector(".table-body");
const removeModal = document.querySelector(".remove-modal");
const rejectRemoveCourse = document.querySelector(".reject-remove-course");
const acceptRemoveCourse = document.querySelector(".accept-remove-course");
const toast = document.querySelector(".toast");
const toastMessage = document.querySelector(".toast-content");
const toastProgress = document.querySelector(".process");
// POST
const createProductBtn = document.querySelector(".create-product");
const createModal = document.querySelector(".create-modal");
const newCourseTitle = document.querySelector(".new-product-title");
const newCourseCategory = document.querySelector(".new-product-category");
const newCoursePrice = document.querySelector(".new-product-price");
const newCourseStudentsCount = document.querySelector(".new-product-shortName");
const closeCreateModalBtn = document.querySelector(".close-create-modal");
const rejectCreateCourse = document.querySelector(".reject-create-course");
const acceptCreateCourse = document.querySelector(".accept-create-course");
// PUT(update)
const updateModal = document.querySelector(".update-modal");
const updateBtn = document.querySelector(".edit-btn");
const courseNewTitle = document.querySelector(".product-new-title");
const courseNewPrice = document.querySelector(".product-new-price");
const courseNewCategory = document.querySelector(".product-new-category");
const courseNewStudentsCount = document.querySelector(".product-new-shortName");
const rejectUpdateCourse = document.querySelector(".reject-update-course");
const acceptUpdateCourse = document.querySelector(".accept-update-course");
let courseIdToRemove = null;
let courseIdToUpdate = null;

const showCourses = (courses) => {
  tableBody.innerHTML = "";

  courses.forEach((course) => {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `
       <div class="tableRow">
              <p class="product-title">${course.title}</p>
              <p class="product-title">${course.category}</p>
              <p class="product-price">${course.price.toLocaleString()}</p>
              <p class="product-shortName">${course.registersCount}</p>
              <div class="product-manage">
                <button class="edit-btn" onclick ='showUpdateModal(${JSON.stringify(
                  course
                )})'>
                  <!-- Edit icon -->
                  <i class="fas fa-edit" onclick='updateCourse()'></i>
                </button>
                <button class="remove-btn" onclick="showRemoveModal('${
                  course._id
                }')">
                  <!-- Delete fas icon -->
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
      `
    );
  });
};

const showRemoveModal = (courseID) => {
  courseIdToRemove = courseID;
  console.log(courseIdToRemove);

  removeModal.classList.remove("hidden");
};

const showCreateModal = () => {
  createModal.classList.remove("hidden");
};

const showUpdateModal = (course) => {
  courseIdToUpdate = course._id;

  courseNewTitle.value = course.title;
  courseNewPrice.value = course.price;
  courseNewCategory.value = course.category;
  courseNewStudentsCount.value = course.registersCount;

  updateModal.classList.remove("hidden");
};

const hideRemoveModal = () => {
  removeModal.classList.add("hidden");
};

const hideCreateModal = () => {
  createModal.classList.add("hidden");
  clearCreateModalInput();
};

const hideUpdateModal = () => {
  clearUpdateModalInput();
  updateModal.classList.add("hidden");
};

const showToast = (status, message) => {
  toast.classList.remove(".hidden");
  toastMessage.innerHTML = message;

  if (status == "success") {
    toast.className = "toast success";
  } else {
    toast.className = "toast failed";
  }

  let toastProgressCounter = 0;

  const toastProgressInterval = setInterval(() => {
    toastProgressCounter++;

    if (toastProgressCounter > 120) {
      toastProgress.style.width = "0%";
      toast.classList.add("hidden");
      clearInterval(toastProgressInterval);
    }

    toastProgress.style.width = `${toastProgressCounter}%`;
  }, 40);
};

const removeCourse = () => {
  fetch(`https://js-cms.iran.liara.run/api/courses/${courseIdToRemove}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        fetchCourses();
        showToast("success", "دوره با موفقیت حذف شد");
        hideRemoveModal();
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateCourse = () => {
  console.log("Course Update => ", courseIdToUpdate);
  const courseNewInfo = {
    title: courseNewTitle.value,
    price: +courseNewPrice.value,
    registersCount: +courseNewStudentsCount.value,
    category: courseNewCategory.value,
  };

  fetch(`https://js-cms.iran.liara.run/api/courses/${courseIdToUpdate}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(courseNewInfo),
  })
    .then((response) => {
      if (response.status === 201) {
        hideUpdateModal();
        fetchCourses();
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`[error] => ${err}`);
    });
};

const createCourse = () => {
  const newCourse = {
    title: newCourseTitle.value,
    price: +newCoursePrice.value,
    registersCount: +newCourseStudentsCount.value,
    category: newCourseCategory.value,
    desc: "توضیحات فیک",
    discount: 0,
  };

  fetch("https://js-cms.iran.liara.run/api/courses", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newCourse),
  })
    .then((data) => {
      if (data.status === 201) {
        hideCreateModal();
        fetchCourses();
      }

      return data.json();
    })
    .then((data) => {
      console.log(data);
    });
};

const fetchCourses = () => {
  let baseUrl = "https://js-cms.iran.liara.run/api/courses";

  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      showCourses(data);
    });
};

const clearCreateModalInput = () => {
  newCourseTitle.value = "";
  newCoursePrice.value = "";
  newCourseStudentsCount.value = "";
  newCourseCategory.value = "";
};

const clearUpdateModalInput = () => {
  courseNewTitle.value = "";
  courseNewPrice.value = "";
  courseNewStudentsCount.value = "";
  courseNewCategory.value = "";
};

window.addEventListener("load", fetchCourses);
rejectRemoveCourse.addEventListener("click", hideRemoveModal);
acceptRemoveCourse.addEventListener("click", removeCourse);
createProductBtn.addEventListener("click", showCreateModal);
rejectCreateCourse.addEventListener("click", hideCreateModal);
rejectCreateCourse.addEventListener("click", hideUpdateModal);
closeCreateModalBtn.addEventListener("click", hideCreateModal);
acceptCreateCourse.addEventListener("click", createCourse);
acceptUpdateCourse.addEventListener("click", updateCourse);
rejectUpdateCourse.addEventListener("click", hideUpdateModal);
