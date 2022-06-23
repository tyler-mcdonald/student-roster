/*
Student Roster application - A project using data pagination and filtering
*/

const itemsPerPage = 9;

// Function to display a page
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   
   // Determine if items will display on the active page
   for (let i = 0; i < list.length; i++) {
      
      // Display items on page if items are in the page index range
      if (i >= startIndex && i < endIndex) {
         
         const student = list[i];
         studentList.innerHTML += `
            <li class="student-item">
               
               <div class="student-details">
                  <!-- <img class="avatar" src="${student.picture.large}"> -->
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

// Create and append pagination buttons
function addPagination(list) {
   const numberOfPages = Math.ceil((list.length / itemsPerPage));
   const ul = document.querySelector('ul.link-list');
   ul.innerHTML = ''; // remove buttons previously displayed

   // Create page buttons
   for (let i = 0; i < numberOfPages; i++) {
      let pageNumber = i + 1; // page numbers start at 1
      ul.innerHTML += `
         <li>
            <button type="button">${pageNumber}</button>
         </li>   
         `;
      
      // Set first page button to active
      if (pageNumber === 1) { 
         const button = ul.querySelector('li button');
         button.className = 'active';
      }
   }
   
   // Event listener for page buttons
   ul.addEventListener('click', (e) => {
      const button = e.target;
      const pageNumber = button.textContent;
      const pageButtons = ul.querySelectorAll('.active');

      // Clicked button loads the page with showPage function
      if (button.type === 'button') { // Event fired on button click only
         showPage(data, pageNumber);
         // Swap 'active' class on buttons
         pageButtons.forEach( (button) => {button.classList.remove('active')});
         button.classList.add('active');
      }
   });
}

// Create a search form and append to header
(function() {
   const header = document.querySelector('header');
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

/** Search form functionality */
// Variables for search form and submit button; array of student names
const search = document.querySelector('.search');
const submit = document.querySelector('.submit');
const studentNames = [];
// Add each student name to 'studentNames' array
for (let student of data) {
   studentNames.push(`${student.name.first} ${student.name.last}`);
}

// Functionality for search input box
function searchForm(searchInput, names) {

   const filteredList = [];

   // Check matches between 'inputValue' and student name
   for (let name of names) {
      const inputValue = (searchInput.value).toLowerCase();
      const index = studentNames.indexOf(name);
      if (inputValue.length !== '' && name.toLowerCase().includes(inputValue)) {
         filteredList.push(index);
      }
   }
   
   // Update student list from filter/search
   const filteredData = [];
   for (let index of filteredList) {
      filteredData.push(data[index]);
   }

   // Load page from filters
   showPage(filteredData, 1);
   addPagination(filteredData);

   // Display for 'no results' 
   if (filteredList.length === 0) {
      const ul = document.querySelector('ul.student-list');
      const li = document.createElement('li');
      li.textContent = 'No results';
      ul.appendChild(li);
   }
}

// Event listener for search form
search.addEventListener('keyup', () => {
   searchForm(search, studentNames);
});

// Call functions
showPage(data, 1);
addPagination(data);