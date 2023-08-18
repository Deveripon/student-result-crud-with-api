// Show Student Add Modal
function showModal(modalTypeId) {
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


//adding page loader
window.addEventListener("load", function () {
  setTimeout(() => {
    pageLoader.classList.replace("flex", "hidden");
  }, 1000);
});



let height = 0;

// conditional or || operator
// alert(height || 100);
//conditional and && operator
// alert(height && "ok");
// null colasing oparetor
// alert(height ?? 100);