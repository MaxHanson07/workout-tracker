function addWorkout(isAdding) {
    const workoutEl = document.querySelector("#t-workout");
    const exerciseEl = document.querySelector("#t-exercise");
    const errorEl = document.querySelector("form .error");
  
    // validate form
    if (workoutEl.value === "" || exerciseEl.value === "") {
      errorEl.textContent = "Missing Information";
      return;
    } else {
      errorEl.textContent = "";
    }
  
    // create record
    const workout = {
      name: workout.value
    };
  
    // add to beginning of current array of data
    workouts.unshift(workout);
  
    // re-run logic to populate ui with new record
    // populateChart();
    // populateTable();
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
          exerciseEl.value = "";
        }
      })
      .catch(err => {
        // fetch failed, so save in indexed db
        saveRecord(workout);
  
        // clear form
        workoutEl.value = "";
        exerciseEl.value = "";
      });
  }


document.querySelector("#create-workout").addEventListener("click", function(event) {
    event.preventDefault();
    sendTransaction(true);
  });