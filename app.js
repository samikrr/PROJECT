document.addEventListener("DOMContentLoaded", function() {
    const refreshBtn = document.getElementById('refreshBtn');
    const employeesList = document.getElementById('employeesList');
    const employersList = document.getElementById('employersList');
    const otherPersonnelList = document.getElementById('otherPersonnelList');
    const addForm = document.getElementById('addForm');
  
    let data = {
      employees: [],
      employers: [],
      otherPersonnel: []
    };
  
    // Function to fetch data from the API or JSON file
    async function fetchData() {
      try {
        // Replace 'your-api-url' with the actual URL of your API endpoint or JSON file
        const response = await fetch('your-api-url');
        data = await response.json();
        displayData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Function to display data in the UI
    function displayData(data) {
      employeesList.innerHTML = '';
      employersList.innerHTML = '';
      otherPersonnelList.innerHTML = '';
  
      data.employees.forEach((employee, index) => {
        const listItem = createListItem('Employee', employee, index);
        employeesList.appendChild(listItem);
      });
  
      data.employers.forEach((employer, index) => {
        const listItem = createListItem('Employer', employer, index);
        employersList.appendChild(listItem);
      });
  
      data.otherPersonnel.forEach((person, index) => {
        const listItem = createListItem('Personnel', person, index);
        otherPersonnelList.appendChild(listItem);
      });
    }
  
    // Function to create list item element
    function createListItem(type, item, index) {
      const listItem = document.createElement('div');
      listItem.classList.add('list-item');
      listItem.innerHTML = `<span>${type}: ${item.name} - ${item.position || item.department || item.role}</span>
                            <button class="edit-btn" data-type="${type}" data-index="${index}">Edit</button>
                            <button class="delete-btn" data-type="${type}" data-index="${index}">Delete</button>`;
      return listItem;
    }
  
    // Event listener for refresh button
    refreshBtn.addEventListener('click', fetchData);
  
    // Event delegation for delete button
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const type = event.target.dataset.type;
        const index = parseInt(event.target.dataset.index);
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
          data[type.toLowerCase() + 's'].splice(index, 1);
          displayData(data);
          // Here you can add logic to send delete request to the API
        }
      }
    });
  
    // Event delegation for edit button
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-btn')) {
        const type = event.target.dataset.type;
        const index = parseInt(event.target.dataset.index);
        const item = data[type.toLowerCase() + 's'][index];
        const newName = prompt(`Enter new name for this ${type}:`, item.name);
        if (newName !== null) {
          item.name = newName;
          displayData(data);
          // Here you can add logic to send update request to the API
        }
      }
    });
  
    // Event listener for form submission
    addForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(addForm);
      const newItem = {};
      formData.forEach((value, key) => {
        newItem[key] = value;
      });
      const itemType = addForm.dataset.type;
      data[itemType.toLowerCase() + 's'].push(newItem);
      displayData(data);
      // Here you can add logic to send create request to the API
      addForm.reset();
    });
  
    // Initial data load
    fetchData();
  });