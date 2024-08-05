// Array of class selectors where json data will be inserted
const output = [document.querySelector('.pointsEntry'), document.querySelector('.reboundsEntry'), document.querySelector('.threesEntry')];

// Function that calls for the data
function getStats() {
    // Initializes placeholders for the data
    // Takes json file and index of array as argument 
    output[0].innerHTML = 'Try Again';
    pointsJson('json/points.json', 0);
    output[1].innerHTML = 'Try Again';
    reboundsJson('json/rebounds.json', 1);
    output[2].innerHTML = 'Try Again';
    threesJson('json/threepointers.json', 2);
}

// Fetches points data
function pointsJson(json, value) {
    playerPTS = fetch(json)
    .then(response => response.json())
    .then(data => {
        printData(data.pts.pl, value);
    })
    .catch(error => console.log(error));
}

// Fetches rebounds data
function reboundsJson(json, value) {
    playerREB = fetch(json)
    .then(response => response.json())
    .then(data => {
        printData(data.reb.pl, value);
    })
    .catch(error => console.log(error));
}

// Fetches threes data
function threesJson(json, value) {
    // Passes percent as true to printData function
    var percent = true
    player3PP = fetch(json)
    .then(response => response.json())
    .then(data => {
        printData(data.tpp.pl, value, percent);
    })
    .catch(error => console.log(error));
}

// Function that prints data to HTML in an accordian
function printData(data, value, percent = false) {
    var html = '';
    // Variable that shows desired number of stat leaders
    var topPlayers = 3;

    // Displays data for top players of each stat
    data.slice(0, topPlayers).forEach((element) => {
        html += `<li class="list-group-item d-flex justify-content-between pb-0">
                    <section>
                        <p class="playerPosition">
                            ${element.pos}
                        </p> 
                        <p class="playerName ps-5 fw-medium">
                            ${element.fn} ${element.ln}
                        </p>
                    </section>
                    <section class="stat fw-medium">
                        ${round(element.val, percent)}
                    </section>
                </li>`;
    });
    html += `<div class="accordion-item">
                <div id="panelsStayOpen-collapse${value}" class="accordion-collapse collapse">
                    <div class="accordion-body">`;
    // Displays data for the rest of the team within an accordian
    data.slice(topPlayers).forEach((element) => {
        html += `<li class="list-group-item d-flex justify-content-between border-start-0 border-top-0 border-end-0 pb-0">
                    <section>
                        <p class="playerPosition">
                            ${element.pos}
                        </p> 
                        <p class="playerName ps-5 fw-medium">
                            ${element.fn} ${element.ln}
                        </p>
                    </section>
                    <section class="stat fw-medium">
                        ${round(element.val, percent)}
                    </section>
                </li>`;
    });
    html += `       </div>
                </div>
                <h2 class="accordion-header">
                    <button class="flex-column accordion-button" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#panelsStayOpen-collapse${value}" 
                    aria-expanded="true" 
                    aria-controls="panelsStayOpen-collapse${value}">
                        <i class="arrow display-5 fa-solid fa-angle-down"></i>
                    </button>
                </h2>
            </div>`;
    output[value].innerHTML = html;
}

// Function used to print percent values with less than 2 decimals places
function round(stat, percent) {
    if (percent === true) {
        stat = Math.round(stat * 10000) / 100;
        return stat + '%';
    }
    else {
        return stat;
    }
}

// Event delegation for dynamically added elements
document.addEventListener('click', function(event) {
    if (event.target.matches('.accordion-button') || event.target.closest('.accordion-button')) {
        const button = event.target.closest('.accordion-button');
        const arrow = button.querySelector('.arrow');
        // Toggles the active state of accordian arrow
        if (arrow) {
            arrow.classList.toggle('active');
        }
    }
});