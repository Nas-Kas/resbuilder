document.addEventListener('DOMContentLoaded', () => {
  const json = JSON.parse(localStorage.getItem('resume'));
  const resume = JSON.parse(json.jsonresume);

  console.log(resume);
  const fullName = document.querySelector('.full-name');
  const firstName = fullName.querySelector('.first-name');
  const lastName = fullName.querySelector('.last-name');

  firstName.textContent = "Jeff"; 
  lastName.textContent = "Bezos"; 
  const experienceList = document.querySelector('.section__list');

  resume.resume.forEach(item => {
    const company = item.companyName;
    const location = item.location;
    const startDate = item.startDate;
    const endDate = item.endDate;
    const summary1 = item.summary1;
    const summary2 = item.summary2;
    const summary3 = item.summary3;


    // Create a new <div> element for the experience item
    const listItem = document.createElement('div');
    listItem.classList.add('section__list-item');

    // Create the inner HTML for the experience item
    listItem.innerHTML = `
      <div class="name"></div>
      <div class="left">
        <div class="name">${company}</div>
        <div class="duration">${startDate} - ${endDate}</div>
      </div>
      <div class="right">
        <div class="addr">${location}</div>
        <div class="name">Fr developer</div>
      </div>
      <div class="text">${summary1}</div>
      <div class="text">${summary2}</div>
      <div class="text">${summary3}</div>
    `;

    // Append the new <div> element to the experience list
    experienceList.appendChild(listItem);
  });

  console.log("Resume retrieved successfully");
});



