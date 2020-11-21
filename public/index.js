let workouts = [];

fetch("/api/workouts")
  .then(response => response.json())
  .then(data => {
    // save db data on global variable
    workouts = data;
    populateTable();
  });

function populateTable() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
  
    workouts.forEach(workout => {
      // create and populate a table row
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${workout.name}</td>
        <td>${workout.exercises}</td>
        <button id="add-exercise"><i class="fa"></i> Add Exercise</button>
      `;
  
      tbody.appendChild(tr);
    });
  }

function addWorkout() {
    const workoutEl = document.querySelector("#t-workout");
    // const exerciseEl = document.querySelector("#t-exercise");
    const errorEl = document.querySelector("form .error");
  
    // validate form
    if (workoutEl.value === "" 
    // || exerciseEl.value === ""
    ) {
      errorEl.textContent = "Missing Information";
      return;
    } else {
      errorEl.textContent = "";
    }
  
    // create workout
    const workout = {
      name: workout.value
    };
  
    // add to beginning of current array of data
    workouts.unshift(workout);
  
    // re-run logic to populate ui with new record
    // populateChart();
    populateTable();
    // populateTotal();
  
    // also send to server
    fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          errorEl.textContent = "Missing Information";
        } else {
          // clear form
          workoutEl.value = "";
        //   exerciseEl.value = "";
        }
      })
      .catch(err => {
        // fetch failed, so save in indexed db
        saveRecord(workout);
  
        // clear form
        workoutEl.value = "";
        // exerciseEl.value = "";
      });
  }


document.querySelector("#create-workout").addEventListener("click", function(event) {
    event.preventDefault();
    addWorkout();
  });