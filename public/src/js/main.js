const courses = document.getElementById("courses");
const studentListContainer = document.getElementById("studentListContainer");
const StudentAddForm = document.getElementById("studentAddForm");
const msgContainer = document.querySelector(".msg-container");
const editmsgContainer = document.querySelector(".editmsg-container");
const viewContainer = document.querySelector(".view-container");
//Show Course LIst into form
const showCourseList = async function (apiLink) {
  await axios
    .get(apiLink)
    .then((res) => {
      let courseList = ` <option value="">Select Course</option>`;
      res.data.map((item) => {
        courseList += ` <option value="${item.id}">${item.courseName}</option>`;
      });
      courses.innerHTML = courseList;
    })
    .catch((err) => {
      console.log(err);
    });
};
showCourseList("http://localhost:5050/courses");

//get all student to the student table/ Read Student DATA
const getAllStudent = async function (apiLink) {
  // ${axios.get("http://localhost:5050/courses/"+student.id).then(res=>{console.log(res.data.courseName);})}
  await axios
    .get(apiLink)
    .then((res) => {
      let studentList = "";
      res.data.map((student, index) => {
        studentList += `
      <tr class="bg-sky-50 font-normal border border-gray-300 border-l-0 border-r-0 hover:bg-sky-200 transform duration-300">
      <td class="border border-gray-200 border-l-0 text-center">${
        index + 1
      }</td>
      <td class="border border-gray-200 text-center"><img class="w-20" src="${
        student.image
      }"
          alt=student"></td>
      <td class="border border-gray-200 text-center">${student.name}</td>
      <td class="border border-gray-200 text-center">${student.email}</td>
      <td class="border border-gray-200 text-center">${student.gender}</td>
      <td class="border border-gray-200 text-center">${student.courseId}</td>
      <td class="border border-gray-200 text-center">${student.address}</td>
      <td class="border border-gray-200 text-center">${student.phone}</td>
      <td class="border border-gray-200 text-center">
      ${student.result?`<button onclick="showResultAddModal('resultModal',${student.id})"
      class="bg-orange-600 transform duration-300 hover:bg-orange-900 rounded-md text-gray-50 font-bold py-2 px-4"><i
        class="ri-eye-line"></i>
      View Result</button></td>`:`<button onclick="showResultAddModal('resultModal',${student.id})"
      class="bg-green-600 transform duration-300 hover:bg-green-900 rounded-md text-gray-50 font-bold py-2 px-4"><i class="ri-add-circle-line"></i>
      Add Result</button></td>`}
      
      <td>
        <button onclick="showSingleStudentModal('viewModal',${student.id})" id="openShowStudentModalBtn"
          class="bg-green-400 transform duration-300 hover:bg-green-700 rounded-md text-gray-50 font-bold py-2 px-4"><i
            class="ri-eye-line"></i>
          View</button>
        <button onclick="showEditStudentModal('editModal',${student.id})" id="editModalButton"
          class="bg-yellow-400 transform duration-300 hover:bg-yellow-500 rounded-md text-gray-50 font-bold py-2 px-4">
          <i class="ri-edit-box-line"></i> Edit</button>
        <button 
        onclick="deleteSingleStudent(${student.id})"
          class="bg-red-400 transform duration-300 hover:bg-red-500 rounded-md text-gray-50 font-bold py-2 px-4"><i
            class="ri-delete-bin-2-line"></i> Delete</button>
      </td>
    </tr>
      `;
      });
      studentListContainer.innerHTML = studentList;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
getAllStudent("http://localhost:5050/students");




//add new students ADD STUDENT
function addStudent() {
  StudentAddForm.onsubmit = (e) => {
    e.preventDefault();
    //get form data
    const formData = new FormData(StudentAddForm);
    const formDataObject = Object.fromEntries(formData.entries());
    //destructuring form data
    const {
      name,
      email,
      mobile,
      address,
      photourl,
      gender,
      course
    } =
    formDataObject;
    //add validation
    if (
      !name ||
      !email ||
      !mobile ||
      !address ||
      !photourl ||
      !gender ||
      !course
    ) {
      msgContainer.innerHTML = ` 
       <div id="msg" class="msg text-red-900 flex place-self-start py-4 px-2 bg-red-300 rounded w-full items-center">
          <div class="msg-body m-0"> <i class="ri-error-warning-fill"></i> All Feilds Are
          Required</div>
      <i onclick="closeAlert()"
        class="ri-close-circle-fill mr-0 cursor-pointer transform duration-300 hover:scale-110 hover:text-red-700"></i>
    </div>`;
    } else {
      //  send post request to server
      axios.post("http://localhost:5050/students", {
          id: "",
          name: name,
          email: email,
          phone: mobile,
          address: address,
          image: photourl,
          gender: gender,
          courseId: course,
        })
        .then((res) => {
          getAllStudent("http://localhost:5050/students");
          StudentAddForm.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}
addStudent();

//view Single Student
// Show Single Student Add Modal
function showSingleStudentModal(modalTypeId, dataId) {
  const modal = document.getElementById(modalTypeId);
  const closeModalBtn = document.querySelectorAll(".closeModalBtn");
  modal.style.display = "block";

  closeModalBtn.forEach(item => {
    item.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  //get the single student data
  axios.get("http://localhost:5050/students/" + dataId).then(res => {
    viewContainer.innerHTML = `
  <div class="top-pane flex justify-between gap-4 items-start">
  <div class="img">
    <img class="w-full" src="${res.data.image}"
      alt="">
  </div>
  <div class="info">
    <h3 class="name text-green-700 font-bold text-4xl">${res.data.name}</>
      <h6 class="email text-gray-600 font-medium">${res.data.email}</>
        <h6 class="location text-gray-600 font-medium">${res.data.address}</>
        <h6 class="mobile text-gray-600 font-medium">${res.data.phone}</>
        <h6 class="course text-gray-600 font-medium">${res.data.courseId}</>

  </div>
</div>
<div class="info-table"></div>
  `;
  }).catch(err => {
    console.log(err.message);
  });

}
//Delete Single Student
function deleteSingleStudent(dataId) {
  confirm(`Are you sure you want to delete ?`) ?
    axios.delete("http://localhost:5050/students/" + dataId).then(res => {
      getAllStudent("http://localhost:5050/students");
    }).catch(err => {
      console.log(err.message);
    }) : alert("Your data is safe")

}

//Edit Single Student
// Show Single Student EDIT Modal
function showEditStudentModal(modalTypeId, dataId) {
  let studentEditform = document.getElementById("studentEditform")
  const modal = document.getElementById(modalTypeId);
  const closeModalBtn = document.querySelectorAll(".closeModalBtn");
  modal.style.display = "block";
  closeModalBtn.forEach(item => {
    item.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  //send get request to the server
  async function editStudent() {
    await axios.get("http://localhost:5050/students/" + dataId).then(res => {

      let name = studentEditform.querySelector("input[name='name']").value = res.data.name;
      let email = studentEditform.querySelector("input[name='email']").value = res.data.email;
      let mobile = studentEditform.querySelector("input[name='mobile']").value = res.data.phone;
      let address = studentEditform.querySelector("textarea[name='address']").value = res.data.address;
      let photourl = studentEditform.querySelector("input[name='photourl']").value = res.data.image;
      let genderMaleRadio = studentEditform.querySelector("input[value='male']")
      let genderFemaleRadio = studentEditform.querySelector("input[value='female']")
      // let course = studentEditform.querySelector("select[name='course']").value = res.data.courseId;
      //set gender selection
      if (genderFemaleRadio.value == res.data.gender) {
        genderFemaleRadio.checked = true;
      } else {
        genderMaleRadio.checked = true;
      }
      //set course selection

    }).catch(err => {
      console.log(err.message);
    });
  }
  editStudent();
  //send patch request to the server
  studentEditform.addEventListener("submit", (e) => {
    e.preventDefault();
    //get form data
    const formData = new FormData(studentEditform);
    const formDataObject = Object.fromEntries(formData.entries());
    //destructuring form data
    const {
      name,
      email,
      mobile,
      address,
      photourl,
      gender,
      course
    } =
    formDataObject;
    //add validation
    if (
      !name ||
      !email ||
      !mobile ||
      !address ||
      !photourl ||
      !gender
    ) {
      editmsgContainer.innerHTML = ` 
       <div id="msg" class="msg text-red-900 flex place-self-start py-4 px-2 bg-red-300 rounded w-full items-center">
          <div class="msg-body m-0"> <i class="ri-error-warning-fill"></i> All Feilds Are
          Required</div>
      <i onclick="closeAlert()"
        class="ri-close-circle-fill mr-0 cursor-pointer transform duration-300 hover:scale-110 hover:text-red-700"></i>
    </div>`;
    } else {
      //  send Patch request to server
      axios.patch("http://localhost:5050/students/" + dataId, {
          name: name,
          email: email,
          phone: mobile,
          address: address,
          image: photourl,
          gender: gender,
        })
        .then((res) => {
          getAllStudent("http://localhost:5050/students");
          editmsgContainer.innerHTML = ` 
          <div id="msg" class="msg text-green-800 flex place-self-start py-4 px-2 bg-green-200 rounded w-full items-center">
             <div class="msg-body m-0"> <i class="ri-checkbox-line"></i> Your Data Has Been Updated SuccessFully</div>
         <i onclick="closeAlert()"
           class="ri-close-circle-fill mr-0 cursor-pointer transform duration-300 hover:scale-110 hover:text-red-700"></i>
       </div>`;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

}