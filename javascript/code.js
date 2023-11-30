let peopleData = [];
let ascendingOrder = true;

document.addEventListener('DOMContentLoaded', function () {
  fetchRandomPeople();

  // Attach event listeners
  document.getElementById('searchInput').addEventListener('input', searchPeople);
  document.getElementById('toggleSortingBtn').addEventListener('click', toggleSorting);
});

async function fetchRandomPeople() {
  let response = await fetch('https://randomuser.me/api/?results=20');
  let data = await response.json();
  peopleData = data.results;
  displayPeople();
}

function displayPeople() {
  let peopleList = document.getElementById('peopleList');
  peopleList.innerHTML = '';

  peopleData.forEach(function (person) {
    let personDiv = document.createElement('div');
    personDiv.className = 'person';

    let image = document.createElement('img');
    image.src = person.picture.thumbnail;
    image.alt = `${person.name.first} ${person.name.last}`;
    
    let name = document.createElement('p');
    name.textContent = `${person.name.first} ${person.name.last}`;

    personDiv.appendChild(image);
    personDiv.appendChild(name);
    peopleList.appendChild(personDiv);
  });
}

function searchPeople() {
  let searchInput = document.getElementById('searchInput');
  let notFoundMessage = document.getElementById('notFoundMessage');
  let searchTerm = searchInput.value.toLowerCase();

  let filteredPeople = peopleData.filter(function (person) {
    let fullName = `${person.name.first.toLowerCase()} ${person.name.last.toLowerCase()}`;
    return fullName.includes(searchTerm);
  });

  notFoundMessage.style.display = filteredPeople.length === 0 && searchTerm !== '' ? 'block' : 'none';

  peopleData = filteredPeople;
  displayPeople();
}

function toggleSorting() {
  ascendingOrder = !ascendingOrder;

  peopleData.sort(function (a, b) {
    let nameA = a.name.first.toLowerCase();
    let nameB = b.name.first.toLowerCase();
    return ascendingOrder ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  displayPeople();
}
