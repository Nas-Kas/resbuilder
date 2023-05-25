const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const buildResumeBtn = document.getElementById("buildbtn");
const resumeContainer = document.querySelector(".resume-container");
const viewResumeBtn = document.getElementById("viewbtn");
const newResumeLane = document.querySelectorAll("#fourthcol .task");
const saveBtn = document.getElementById("savebtn");
const resumeItems = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  const inputValues = {};

  if (!value) return;

  const inputs = document.querySelectorAll("#todo-form input[type='text']");
  inputs.forEach((input) => {
    inputValues[input.placeholder] = input.value;
  });

  console.log(inputValues);

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");

  newTask.innerHTML = `
    <h4>Company: ${inputValues["Company Name"]}</h4>
    <p>Location: ${inputValues["Location"]}</p>
    <p>Start Date: ${inputValues["Start Date"]}</p>
    <p>End Date: ${inputValues["End Date"]}</p>
    <p>Summary 1: ${inputValues["Summary 1"]}</p>
    <p>Summary 2: ${inputValues["Summary 2"]}</p>
    <p>Summary 3: ${inputValues["Summary 3"]}</p>
  `;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});

buildResumeBtn.addEventListener("click", () => {
  // Create the fourth column
  const fourthColumn = document.createElement("div");
  fourthColumn.classList.add("swim-lane");
  
  fourthColumn.id = "resume-lane";

  // Set the heading for the fourth column
  const heading = document.createElement("h3");
  heading.classList.add("heading");
  heading.textContent = "Resume";

  fourthColumn.appendChild(heading);

  // Get all the resume items from each column except the resume items section
  const columns = document.querySelectorAll(".swim-lane:not(#resume-lane)");
  console.log(columns);
  for (let i = 1; i < columns.length; i++) {
    const resumeItems = columns[i].querySelectorAll(".task");
    for (let j = 0; j < resumeItems.length; j++) {
      if (i !== 0 || j !== 0) {
        fourthColumn.appendChild(resumeItems[j].cloneNode(true));
      }
    }
  }

  fourthColumn.setAttribute("id", "fourthcol");
  // Append the fourth column to the resume container
  resumeContainer.appendChild(fourthColumn);
});

viewResumeBtn.addEventListener("click", () => {
  axios.get('http://localhost:4004/getResume')
    .then(response => {
      const resume = response.data.resume;
      
      // Store the resume data in localStorage
      localStorage.setItem('resume', JSON.stringify(resume));

      // Redirect to the page that displays the resume
      window.location.href = 'template.html';
    })
    .catch(err => {
      console.log("Error retrieving resume", err);
    });
});



saveBtn.addEventListener("click", () => {
  const swimLanes = document.querySelectorAll('.swim-lane');
  const resumeItems = [];

  swimLanes.forEach((swimLane) => {
    const heading = swimLane.querySelector('.heading');
    const companyName = heading?.textContent.replace('Resume', '').trim();

    const tasks = swimLane.querySelectorAll('.task');
    tasks.forEach((task) => {
      const companyElement = task.querySelector('h4');
      const location = task.querySelector('p:nth-of-type(1)')?.textContent.replace('Location: ', '').trim();
      const startDate = task.querySelector('p:nth-of-type(2)')?.textContent.replace('Start Date: ', '').trim();
      const endDate = task.querySelector('p:nth-of-type(3)')?.textContent.replace('End Date: ', '').trim();
      const summary1 = task.querySelector('p:nth-of-type(4)')?.textContent.replace('Summary 1: ', '').trim();
      const summary2 = task.querySelector('p:nth-of-type(5)')?.textContent.replace('Summary 2: ', '').trim();
      const summary3 = task.querySelector('p:nth-of-type(6)')?.textContent.replace('Summary 3: ', '').trim();

      if (companyElement) {
        const companyName = companyElement.textContent.split(':')[1]?.trim();

        const resumeItem = {
          companyName,
          location,
          startDate,
          endDate,
          summary1,
          summary2,
          summary3,
        };

        resumeItems.push(resumeItem);
      }
    });
  });

  const jsonObject = {
    resume: resumeItems,
  };

  const jsonString = JSON.stringify(jsonObject, null, 2);
  const { resume } = JSON.parse(jsonString);
  
  const modifiedJsonString = JSON.stringify({ resume: resume.slice(0, Math.floor(resume.length / 2)) }, null, 2);
  
  console.log(modifiedJsonString);
  // hardcoded port fix later
  axios.post('http://localhost:4004/saveResume', { jsonResume: modifiedJsonString })
    .then(response => {
      console.log("Resume saved successfully");
    })
    .catch(err => {
      console.log("Error saving resume", err);
    });
  
});