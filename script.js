// Array of class selectors where json data will be inserted
const output = [document.querySelector('.pointsEntry'), document.querySelector('.reboundsEntry'), document.querySelector('.threesEntry')];

// Event delegation for dynamically added elements
document.addEventListener('click', function(event) {
    if (event.target.matches('.toggle') || event.target.closest('.toggle')) {
        const button = event.target.closest('.toggle');
        const arrow = button.querySelector('.arrow');
        // Toggles the active state of accordian arrow
        if (arrow) {
            arrow.classList.toggle('active');
        }
    }
});

// Function that calls for the data
function getStats() {
    // Initializes placeholders for the data
    // Takes json file and index of array as argument 
    output[0].innerHTML = 'Try Again';
    readJSON('json/points.json', 0);
    output[1].innerHTML = 'Try Again';
    readJSON('json/rebounds.json', 1);
    output[2].innerHTML = 'Try Again';
    readJSON('json/threepointers.json', 2);
}

// Function that fetches data
function readJSON(json, value) {
    // Fetches data from json file for each stat
    if (value === 0){
        playerPTS = fetch(json)
        .then(response => response.json())
        .then(data => {
            printData(data.pts.pl, value);
        })
        .catch(error => console.log(error));
    }
    if (value === 1){
        playerREB = fetch(json)
        .then(response => response.json())
        .then(data => {
            printData(data.reb.pl, value);
        })
        .catch(error => console.log(error));
    }
    if (value === 2){
        player3PP = fetch(json)
        .then(response => response.json())
        .then(data => {
            printData(data.tpp.pl, value);
        })
        .catch(error => console.log(error));
    }
}

// Function that prints data to HTML in an accordian
function printData(data, value) {
    var html = '';
    // Used to determine whether final output will include "%" symbol
    var percentage = value === 2 ? 100 : 1;

    // Displays data for top 3 players of each stat
    data.forEach((element, index) => {
        if (index < 3) {
            html += `<li class="list-group-item pb-0"><section><p class="playerPosition">${element.pos}</p> <p class="playerName ps-5 fw-medium">${element.fn} ${element.ln}</p></section>  <section class="stat fw-medium">${round(element.val*percentage, value)}</section></li>`;
        }
    });
    html +=`<div class="accordion-item">
                <div id="panelsStayOpen-collapse${value}" class="accordion-collapse collapse">
                    <div class="accordion-body">`;
    // Displays data for the rest of the team within an accordian
    data.forEach((element, index) => {
        if (index > 3) {
            html += `<li class="list-group-item pb-0"><section><p class="playerPosition">${element.pos}</p> <p class="playerName ps-5 fw-medium">${element.fn} ${element.ln}</p></section>  <section class="stat fw-medium">${round(element.val*percentage, value)}</section></li>`;
        }
    });
    html +=`        </div>
                </div>
                <h2 class="accordion-header">
                    <button class="toggle accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${value}" aria-expanded="true" aria-controls="panelsStayOpen-collapse${value}">
                        <i class="arrow display-5 fa-solid fa-angle-down"></i>
                    </button>
                </h2>
            </div>`;
    output[value].innerHTML = html;
}

// Function used to keep value under 2 decimals
function round(stat, value) {
    if (value === 2) {
        stat = Math.round(stat * 100) / 100;
        return stat + '%';
    }
    else {
        return stat;
    }
}