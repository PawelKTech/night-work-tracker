const button = document.querySelector("button");
const displayResult = document.querySelector("#displayResult");

button.addEventListener("click", () => {
  let startTimeInput = document.querySelector("#start-shift-time").value;
  let endTimeInput = document.querySelector("#end-shifted-time").value;

  if (startTimeInput !== "" && endTimeInput !== "") {
    if (new Date(startTimeInput) < new Date(endTimeInput)) {
      console.log(startTimeInput, endTimeInput);
      const totalHours = calculateHoursBetweenDates(
        startTimeInput,
        endTimeInput
      );
      const nightHours = calculateNightHoursAndMinutes(
        startTimeInput,
        endTimeInput
      );
      displayResult.innerHTML = `<p>Łącznie przepracowałeś <span class='fw-bold'>${totalHours.toFixed(
        2
      )}h</span>, z czego w godzinach nocnych(22-6): ${nightHours}.</p>`;
    } else {
      displayResult.innerHTML = `<p class='text-danger'>Godzina zakończenia pracy nie może być wcześniejsza niż godzina rozpoczęcia pracy.</p>`;
    }
  } else {
    displayResult.innerHTML = `<p class='text-danger'>Wprowadź dane do obu formularzy.</p>`;
  }
});

function calculateNightHoursAndMinutes(startDateTime, endDateTime) {
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  let totalNightMinutes = 0;

  const startNightHour = 22;
  const endNightHour = 6;

  let current = new Date(start);

  while (current <= end) {
    const currentHour = current.getHours();
    const currentMinutes = current.getMinutes();

    if (
      (currentHour >= startNightHour && currentHour < 24) ||
      (currentHour >= 0 && currentHour < endNightHour)
    ) {
      totalNightMinutes++;
    }

    current.setMinutes(current.getMinutes() + 1);
  }

  const totalNightHours = Math.floor(totalNightMinutes / 60);
  const remainingMinutes = (totalNightMinutes % 60) - 1;

  return `<span class='fw-bold'>${totalNightHours}h</span> i <span class='fw-bold'>${remainingMinutes}min</span>`;
}

function calculateHoursBetweenDates(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const diffInMilliseconds = endDate - startDate;
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  return diffInHours;
}
