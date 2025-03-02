updateClock();

function updateClock() {
    const timeElement = document.querySelector("#time");
    const dateElement = document.querySelector("#date");

    const dateObject = new Date();

    const hours = dateObject.getHours() % 12 || 12;
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const seconds =
        dateObject.getSeconds() < 10 ? `0${dateObject.getSeconds()}` : dateObject.getSeconds();
    const ampm = dateObject.getHours() >= 12 ? "PM" : "AM";

    const time = `${hours}:${minutes}:${seconds} ${ampm}`;
    timeElement.textContent = time;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const date = dateObject.toLocaleDateString(undefined, options);
    dateElement.textContent = date;
}

setInterval(updateClock, 1000);
