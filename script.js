const button = document.querySelector("button");

button.addEventListener("click", () => {
  let startTimeInput = document.querySelector("#start-shift-time").value;
  let endTimeInput = document.querySelector("#end-shifted-time").value;

  if (startTimeInput !== "" && endTimeInput !== "") {
    const nightHours = countNightHours(startTimeInput, endTimeInput);
    console.log(`Hours worked during the night: ${nightHours.toFixed(2)}`);
  } else {
    console.log("Proszę podaj daty");
  }
});

function countNightHours(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  let totalNightHours = 0;

  while (startDate < endDate) {
    let nightStart = new Date(startDate);
    let nightEnd = new Date(startDate);

    nightStart.setHours(22, 0, 0, 0);
    nightEnd.setHours(6, 0, 0, 0);
    nightEnd.setDate(nightEnd.getDate() + 1);

    if (startDate > nightStart) nightStart = new Date(startDate);
    if (endDate < nightEnd) nightEnd = new Date(endDate);

    if (nightStart < nightEnd) {
    }

    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0, 0, 0, 0);
  }

  return totalNightHours;
}
