const courses = document.getElementById("courses");
const studentListContainer = document.getElementById("studentListContainer");
const StudentAddForm = document.getElementById("studentAddForm");
const msgContainer = document.querySelector(".msg-container");
const editmsgContainer = document.querySelector(".editmsg-container");
const viewContainer = document.querySelector(".view-container");
const resultAddForm = document.getElementById("resultAddform");
const resultMassageContainer = document.querySelector(".resultmsg-container");
const resultViewModal = document.getElementById("resultViewModal");
const marksheetContainer = document.querySelector(".marksheet-container");
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
      ${student.result?`<button onclick="viewResult('resultViewModal',${student.id})"
      class="bg-orange-600 transform duration-300 hover:bg-orange-900 rounded-md text-gray-50 font-bold py-2 px-4"><i
        class="ri-eye-line"></i>
      View Result</button></td>`:`<button onclick="addResult('resultAddModal',${student.id})"
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

// Show Student resultAdd Add Modal
function addResult(modalTypeId, dataId) {

  //show result add modal
  function resultAddModal() {
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
  }
  resultAddModal()
  //send get request to get data
  async function getStudent() {
    await axios.get("http://localhost:5050/students/" + dataId).then(res => {
      let name = resultAddForm.querySelector("input[name='name']").value = res.data.name;
      let email = resultAddForm.querySelector("input[name='email']").value = res.data.email;
    }).catch(err => {
      console.log(err.message);
    });
  }
  getStudent();

  function sendResultToDb() {
    resultAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(resultAddForm);
      const objectFormData = Object.fromEntries(formData.entries());
      const {
        bangla,
        english,
        math,
        science,
        sScience,
        religion
      } = objectFormData
      //add validation
      if (!bangla || !english || !math || !science || !sScience || !religion) {
        resultMassageContainer.innerHTML = `
        <div id="msg" class="msg text-red-900 flex place-self-start py-4 px-2 bg-red-300 rounded w-full items-center">
        <div class="msg-body m-0"> <i class="ri-error-warning-fill"></i> All Feilds Are
        Required</div>
          <i onclick="closeAlert()"
        class="ri-close-circle-fill mr-0 cursor-pointer transform duration-300 hover:scale-110 hover:text-red-700"></i>
     </div>
        `;
      } else {
        //send patch request to the server
        axios.patch("http://localhost:5050/students/" + dataId, {
          result: objectFormData
        }).then(res => {
          resultMassageContainer.innerHTML = ` 
            <div id="msg" class="msg text-green-800 flex place-self-start py-4 px-2 bg-green-200 rounded w-full items-center">
               <div class="msg-body m-0"> <i class="ri-checkbox-line"></i> Result Has added succecfully SuccessFully</div>
           <i onclick="closeAlert()"
             class="ri-close-circle-fill mr-0 cursor-pointer transform duration-300 hover:scale-110 hover:text-red-700"></i>
         </div>`;
          resultAddForm.reset();
          //  show the updated data
          getAllStudent("http://localhost:5050/students");
        }).catch(error => {
          console.log(err.message);
        });
      }
    });
  }
  sendResultToDb();

}
// Show Student Result Sheet
// Show Student resultAdd Add Modal
function viewResult(modalTypeId, dataId) {
  //show result add modal
  function resultviewModal() {
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
  }
  resultviewModal()

  async function makeDynamicMarksheet() {
    await axios.get("http://localhost:5050/students/" + dataId).then(res => {
      const marks = res.data.result
      const result = new Result(marks)
      marksheetContainer.innerHTML = `
    <div class="marksheet border-4 rounded-md border-green-800">
    <div class="marksheet-header flex justify-center my-10 border-1 border-gray-700">
      <img class="institute_logo w-48 h-28 object-fill" src="./public/src/images/download.png"
        alt="institute logo" />
      <div class="institute-info mt-8 px-7">
        <h2 class="text-4xl font-bold font-serif">
          Sorobindu Pilot High School
        </h2>
        <p>Chowrangi KachaBazar, Suihari, Dinajpur Sadar, Dinajpur</p>
        <h4 class="text-2xl font-medium">
          Secondary School Certificate - 2023
        </h4>
      </div>
      <img class="devripon_logo w-44" src="./public/src/images/devriponlog.png" alt="devripon logo" />
    </div>
    <div class="student-info-area border-2 border-gray-700 py-5 w-11/12 block m-auto px-5">
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Student Name :</h4>
        <p>${res.data.name}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Student Email :</h4>
        <p>${res.data.email}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Student Cell :</h4>
        <p>${res.data.phone}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Student Gender :</h4>
        <p>${res.data.gender}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Student Address :</h4>
        <p>${res.data.address}</p>
      </div>
      <div class="info-group flex mt-2">
        <h4 class="pr-4 font-medium">Academic Year :</h4>
        <p>2023-2024</p>
      </div>
    </div>

    <div class="result-area">
      <table id="result-table"
        class="w-11/12 m-auto mt-5 table-auto border-collapse border-spacing-2 border border-slate-500 text-gray-700 text-sm">
        <thead class="border-1 border-gray-600 h-8 bg-slate-200">
          <th class="border-1 border-gray-600">Sl</th>
          <th class="border-1 border-gray-600">Subject Name</th>
          <th class="border-1 border-gray-600">Maximum Marks</th>
          <th class="border-1 border-gray-600">Obtained Marks</th>
          <th class="border-1 border-gray-600">GPA</th>
          <th class="border-1 border-gray-600">GRADE</th>
        </thead>
        <tbody class="border-1 h-8 m-auto text-center">
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">1</td>
            <td class="border-1 border-gray-600">Bangla</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">
              ${result.ban}
            </td>
            <td class="border-1 border-gray-600">
            ${result.gpa("ban")}
            </td>
            <td class="border-1 border-gray-600">
            ${result.grade("ban")}
            </td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">2</td>
            <td class="border-1 border-gray-600">English</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">
             ${result.eng}
            </td>
            <td class="border-1 border-gray-600">
             ${result.gpa("eng")}
            </td>
            <td class="border-1 border-gray-600">
              ${result.grade("eng")}
            </td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">3</td>
            <td class="border-1 border-gray-600">Mathmatics</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">
              ${result.math}
            </td>
            <td class="border-1 border-gray-600">
             ${result.gpa("math")}
            </td>
            <td class="border-1 border-gray-600">
            ${result.grade("math")}
            </td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">4</td>
            <td class="border-1 border-gray-600">Science</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">
            ${result.sci}
            </td>
            <td class="border-1 border-gray-600">
            ${result.gpa("sci")}
            </td>
            <td class="border-1 border-gray-600">
            ${result.grade("sci")}
            </td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">5</td>
            <td class="border-1 border-gray-600">Social Science</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">
            ${result.sSci}
            </td>
            <td class="border-1 border-gray-600">
            ${result.gpa("sci")}
            </td>
            <td class="border-1 border-gray-600">
            ${result.grade("sci")}
            </td>
          </tr>
          <tr class="border-1 py-4 h-8 border-gray-800">
            <td class="border-1 border-gray-600">6</td>
            <td class="border-1 border-gray-600">Religion</td>
            <td class="border-1 border-gray-600">100</td>
            <td class="border-1 border-gray-600">
            ${result.reli}
            </td>
            <td class="border-1 border-gray-600">
            ${result.gpa("reli")}
            </td>
            <td class="border-1 border-gray-600">
            ${result.grade("reli")}
            </td>
          </tr>
          <tr class="border-1 bg-teal-100 py-4 h-8 border-gray-800">
            <td colspan="3" class="border-1 border-gray-600 bg-blue-300 text-white">
              CGPA : ${result.cgpa()}
            </td>
            <td colspan="3" class="border-1 border-gray-600 bg-blue-300 text-white">
              GRADE : ${result.finalGrade()}
            </td>
          </tr>
          <tr class="border-1 bg-teal-100 py-4 h-8 border-gray-800">
            <td colspan="6" class="border-1 text-start text-white pl-7 bg-blue-400 border-blue-500">
              Result : ${result.finalResult()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="signature-area h-60 items-center flex justify-between w-11/12 m-auto">
      <div class="mentor-sign mt-48 flex flex-col justify-center items-center">
        <img src="./public/src/images/img.png" alt="signature" />
        <p class="text-xs font-medium">Mentor's Sign</p>
      </div>
      <div class="office-seal flex flex-col justify-center items-center">
        <img src="./public/src/images/sorobindu_seal.png" alt="signature" />
        <p class="text-xs font-medium">Office Seal</p>
      </div>
      <div class="principal-sign mt-48 flex flex-col justify-center items-center">
        <img src="./public/src/images/img (1).png" alt="signature" />
        <p class="text-xs font-medium">Principal's Sign</p>
      </div>
    </div>
    <div class="discalimer mt-10">
      <p class="py-5 w-11/12 block m-auto text-xs font-medium">
        NB :
        <span class="font-normal">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Beatae at in quasi eos fugit possimus doloribus quam qui iusto
          rerum.</span>
      </p>
    </div>
  </div>
    `;
    }).catch();




  }

  makeDynamicMarksheet();

}