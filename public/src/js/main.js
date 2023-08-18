const courses = document.getElementById("courses");
const studentListContainer = document.getElementById("studentListContainer");
const StudentAddForm = document.getElementById("studentAddForm");
const msgContainer = document.querySelector(".msg-container");
//Show Course LIst into form 
const showCourseList = async function (apiLink) {
  await axios.get(apiLink).then((res) => {
    let courseList = ` <option value="">Select Course</option>`;
    res.data.map((item) => {
      courseList += ` <option value="${item.id}">${item.courseName}</option>`;
    });
    courses.innerHTML = courseList;
  }).catch(err => {
    console.log(err);
  });

}
showCourseList("http://localhost:5050/courses");


//get all student to the student table/ Read Student DATA
const getAllStudent = async function (apiLink) {
  // ${axios.get("http://localhost:5050/courses/"+student.id).then(res=>{console.log(res.data.courseName);})}
  await axios.get(apiLink).then((res) => {
    let studentList = "";
    res.data.map((student, index) => {
      studentList += `
      <tr class="bg-sky-50 font-normal border border-gray-300 border-l-0 border-r-0 hover:bg-sky-200 transform duration-300">
      <td class="border border-gray-200 border-l-0 text-center">${index+1}</td>
      <td class="border border-gray-200 text-center"><img class="w-20" src="${student.image}"
          alt=student"></td>
      <td class="border border-gray-200 text-center">${student.name}</td>
      <td class="border border-gray-200 text-center">${student.email}</td>
      <td class="border border-gray-200 text-center">${student.gender}</td>
      <td class="border border-gray-200 text-center">${student.courseId}</td>
      <td class="border border-gray-200 text-center">${student.address}</td>
      <td class="border border-gray-200 text-center">${student.phone}</td>
      <td class="border border-gray-200 text-center"><button
          class="bg-orange-600 transform duration-300 hover:bg-green-700 rounded-md text-gray-50 font-bold py-2 px-4"><i
            class="ri-eye-line"></i>
          View Result</button></td>
      <td>
        <button onclick="showModal('viewModal')" id="openShowStudentModalBtn"
          class="bg-green-400 transform duration-300 hover:bg-green-700 rounded-md text-gray-50 font-bold py-2 px-4"><i
            class="ri-eye-line"></i>
          View</button>
        <button onclick="showModal('editModal')" id="editModalButton"
          class="bg-yellow-400 transform duration-300 hover:bg-yellow-500 rounded-md text-gray-50 font-bold py-2 px-4">
          <i class="ri-edit-box-line"></i> Edit</button>
        <button
          class="bg-red-400 transform duration-300 hover:bg-red-500 rounded-md text-gray-50 font-bold py-2 px-4"><i
            class="ri-delete-bin-2-line"></i> Delete</button>
      </td>
    </tr>
      `;
    });
    studentListContainer.innerHTML = studentList;
  }).catch(err => {
    console.log(err.message);
  });


}
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
    } = formDataObject
    //add validation
    if (!name || !email || !mobile || !address || !photourl || !gender || !course) {
      msgContainer.innerHTML = ` 
       <div id="msg" class="msg text-red-900 flex place-self-start py-4 px-2 bg-red-300 rounded w-full items-center">
      <div class="msg-body m-0"> <i class="ri-error-warning-fill"></i> All Feilds Are
        Required</div>
      <i onclick="closeAlert()"
        class="ri-close-circle-fill mr-0 cursor-pointer transform duration-300 hover:scale-110 hover:text-red-700"></i>
    </div>`;
    } else {
      axios.post("http://localhost:5050/students", {
        id: "",
        name: name,
        email: email,
        phone: mobile,
        address: address,
        image: photourl,
        gender: gender,
        courseId: course
      }).then((res) => {
        getAllStudent("http://localhost:5050/students");
        StudentAddForm.reset();
      }).catch(err => {
        console.log(err);
      });
    }

  };
}
addStudent();