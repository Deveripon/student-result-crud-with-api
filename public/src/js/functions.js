//alert close function
function closeAlert() {
  document.getElementById("msg").style.display = "none";
}

// result calculation contructor function
function Result(marksObject) {
  //get the subject waise marks
  this.ban = marksObject.bangla;
  this.eng = marksObject.english;
  this.math = marksObject.math;
  this.sci = marksObject.science;
  this.sSci = marksObject.sScience;
  this.reli = marksObject.religion;
  //calculate GPA of each subjec based on Mark
  this.gpa = function (sub) {
    if (this[sub] >= 0 && this[sub] < 33) return 0;
    if (this[sub] >= 33 && this[sub] < 40) return 1;
    if (this[sub] >= 40 && this[sub] < 50) return 2;
    if (this[sub] >= 50 && this[sub] < 60) return 3;
    if (this[sub] >= 60 && this[sub] < 70) return 3.5;
    if (this[sub] >= 70 && this[sub] < 80) return 4;
    if (this[sub] >= 80 && this[sub] <= 100) return 5;
    if (this[sub] > 100) return "invalid";
  }
  //calculate GRADE of each subjec based on Mark
  this.grade = function (sub) {
    if (this[sub] >= 0 && this[sub] < 33) return "F";
    if (this[sub] >= 33 && this[sub] < 40) return "D";
    if (this[sub] >= 40 && this[sub] < 50) return "C";
    if (this[sub] >= 50 && this[sub] < 60) return "B";
    if (this[sub] >= 60 && this[sub] < 70) return "A-";
    if (this[sub] >= 70 && this[sub] < 80) return "A";
    if (this[sub] >= 80 && this[sub] <= 100) return "A+";
    if (this[sub] > 100) return "invalid";
  }
  this.cgpa = function () {
    if (this.gpa("ban") > 0 &&
      this.gpa("eng") > 0 &&
      this.gpa("math") > 0 &&
      this.gpa("sci") &&
      this.gpa("sSci") > 0 &&
      this.gpa("reli") > 0) {
      let total = (this.gpa("ban") + this.gpa("eng") + this.gpa("math") + this.gpa("sci") + this.gpa("sSci") + this.gpa("reli")) / 6
      return total.toFixed(2);
    } else {
      return 0;
    }
  }
  this.finalGrade = function () {
    if (this.cgpa() >= 0 && this.cgpa() < 1) return "F";
    if (this.cgpa() >= 1 && this.cgpa() < 2) return "D";
    if (this.cgpa() >= 2 && this.cgpa() < 3) return "C";
    if (this.cgpa() >= 3 && this.cgpa() < 3.5) return "B";
    if (this.cgpa() >= 3.5 && this.cgpa() < 4) return "A-";
    if (this.cgpa() >= 4 && this.cgpa() < 5) return "A";
    if (this.cgpa() === 5) return "A+";
    if (this.cgpa() > 5) return "invalid";
  }
  this.finalResult = function () {
    if (this.gpa("ban") > 0 &&
      this.gpa("eng") > 0 &&
      this.gpa("math") > 0 &&
      this.gpa("sci") &&
      this.gpa("sSci") > 0 &&
      this.gpa("reli") > 0) {
      return "Passed"
    } else {
      return "Failed"
    }
  }

}