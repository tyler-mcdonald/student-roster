const itemsPerPage = 9;
showPage(data, 1);
addPagination(data);

/**
 * Display a page of student data
 * @param {array} data array of student objects
 * @param {number} pageNum page number to display
 */
function showPage(data, pageNum) {
  const startIndex = pageNum * itemsPerPage - itemsPerPage; // first item to display on page
  const endIndex = pageNum * itemsPerPage; // last item to display on page
  const studentList = document.querySelector("ul.student-list");
  studentList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    // Display items on page based on index position
    if (i >= startIndex && i < endIndex) {
      const student = data[i];
      studentList.innerHTML += `
         <li class="student-item">
            <div class="student-details">
               <img class="avatar" src="${student.picture.large}">
               <h3>${student.name.first} ${student.name.last}</h3>
               <span class="email">${student.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${student.registered.date}</span>
            </div>
         </li>
         `;
    }
  }
}

// Create page buttons
function createPageButtons(numberOfPages) {
  for (let i = 0; i < numberOfPages; i++) {
    const ul = document.querySelector("ul.link-list");
    let pageNumber = i + 1; // page numbers start at 1
    ul.innerHTML += `
      <li>
         <button type="button">${pageNumber}</button>
      </li>   
      `;

    // Set first page button to active
    if (pageNumber === 1) ul.querySelector("li button").className = "active";
  }
}

// Create and append pagination buttons
function addPagination(list) {
  const numberOfPages = Math.ceil(list.length / itemsPerPage);
  const pageButtons = document.querySelector("ul.link-list");
  pageButtons.innerHTML = ""; // remove previously displayed buttons
  createPageButtons(numberOfPages);

  // Event listener for page buttons
  pageButtons.addEventListener("click", (e) => {
    const button = e.target;
    const pageNumber = button.textContent;
    const activeButton = pageButtons.querySelector(".active");

    // Clicked button loads the page
    if (button.type === "button") {
      showPage(data, pageNumber);
      activeButton.classList.remove("active");
      button.classList.add("active");
    }
  });
}

// Create a search form and append to header
(function () {
  const header = document.querySelector("header");
  header.innerHTML += `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input class="search" placeholder="Search by name...">
      <button type="button" class="submit">
         <img src="img/icn-search.svg" alt="Search icon">
      </button>
   </label>
   `;
})();

/** Prepare for search form */
const studentNames = data.map((student) =>
  `${student.name.first} ${student.name.last}`.toLowerCase()
);

/** Search form functionality */
function searchForm(input) {
  const filteredData = [];
  const inputValue = input.value.toLowerCase();
  // Add matched names to filteredData
  studentNames.forEach((name) => {
    const index = studentNames.indexOf(name);
    if (inputValue.length !== "" && name.includes(inputValue))
      filteredData.push(data[index]);
  });
  // Display results
  showPage(filteredData, 1);
  addPagination(filteredData);
  if (filteredData.length === 0) displayNoResults();
}

/** No results message from search input */
function displayNoResults() {
  const ul = document.querySelector("ul.student-list");
  const li = document.createElement("li");
  li.textContent = "No results";
  ul.appendChild(li);
}

/** Search form */
const search = document.querySelector(".search");
search.addEventListener("keyup", () => searchForm(search));
