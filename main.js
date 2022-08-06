// main.js show the titile and import style.css
import "./style.css";

document.querySelector("#app").innerHTML = `
  <h1>Customer Review</h1>
`;
//below is adding a comment to page
const addComment = (ev) => {
  ev.preventDefault();
  console.log("hello world");
  //go into the dom and find the element with the id, fullname, then gets it's value then it stores that value in a variable called name.
  const name = document.querySelector("#full_name").value;
  //print the thing stored in the variable name
  console.log(name);
  const email = document.querySelector("#my_email").value;
  console.log(email);
  const comment = document.querySelector("#message").value;
  console.log(comment);
  const currentDate = new Date();
  console.log(currentDate);
  currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDayOfMonth = currentDate.getDate();
  // const time = currentDate.toLocaleTimeString();
  const time = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString =
    // currentMonth + 1 + "-" + currentDayOfMonth + "-" + currentYear + "-" + time;
    currentMonth + 1 + "-" + currentDayOfMonth + "-" + currentYear;
  console.log(time);
  const template = `
  <custom-comment
  name="${name}"
  email="${email}"
  comment="${comment}"
  timestamp="${dateString}"
  timeonly="${time}">
  </custom-comment>`;
  document
    .querySelector("#comments")
    .insertAdjacentHTML("afterbegin", template);
  document.querySelector("#full_name").value = "";
  document.querySelector("#my_email").value = "";
  document.querySelector("#message").value = "";
  document.querySelector("#option1").checked = false;
  //grab what user typed and set it to empty
};

//
//listens for a form submission and when a user clicks on it, it executes the search function
document.querySelector("form").addEventListener("submit", addComment);
