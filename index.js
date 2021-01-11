const userInfo = {
  accuracy: 0,
  currentStreak: 0,
  displayName: "Student Studentson",
  email: "student.studentson@school.com",
  firstName: "Student",
  grade: 5,
  lastName: "Studentson",
  totalNumberOfSessions: 0,
  totalReadings: 0,
  totalTimeRead: 0,
  totalWordsRead: 0,
  wordsPerMin: 0,
};

const trophies = [
  {
    name: "10 Stories Read",
    description:
      "A good story always starts with a beginning. Read 10 stories to earn this trophy.",
    image: "images/trophy-10.svg",
    number: 1,
    earned: false,
    condition: {
      property: "totalReadings",
      value: 10,
    },
  },
  {
    name: "20 Stories Read",
    description: "Isn't reading fun? Read 20 stories to earn this trophy.",
    image: "images/trophy-20.svg",
    number: 2,
    earned: false,
    condition: {
      property: "totalReadings",
      value: 20,
    },
  },
  {
    name: "Bookworm",
    description:
      "Inch your way to the top. Read 100 stories to earn this trophy.",
    image: "images/trophy-bookworm.svg",
    number: 3,
    earned: false,
    condition: {
      property: "totalReadings",
      value: 100,
    },
  },
  {
    name: "1 Hour of Reading",
    description:
      "You're on your way. Read for 1 hour overall to earn this trophy.",
    image: "images/trophy-time.svg",
    number: 4,
    earned: false,
    condition: {
      property: "totalTimeRead",
      value: 3600,
    },
  },
  {
    name: "5 Hours of Reading",
    description:
      "Lose yourself in a good book. Read for 5 hours overall to earn this trophy.",
    image: "images/trophy-time-5.svg",
    number: 5,
    earned: false,
    condition: {
      property: "totalTimeRead",
      value: 3600 * 5,
    },
  },
  {
    name: "Bulls Eye",
    description:
      "Enunciation is key. Read with 90% accuracy to earn this trophy.",
    image: "images/trophy-bullseye.svg",
    number: 6,
    earned: false,
    condition: {
      property: "accuracy",
      value: 0.9,
    },
  },
  {
    name: "Speed Demon",
    description:
      "Race your way to the top! Read at 200 words per minute to earn this trophy.",
    image: "images/trophy-speed.svg",
    number: 7,
    earned: false,
    condition: {
      property: "wordsPerMin",
      value: 200,
    },
  },
  {
    name: "Howard Stephen Berg",
    description:
      "Howard Stephen Berg holds the world record for being the fasest reader. Think you have what it takes to beat him? Read at 25,000 words per minute to earn this trophy.",
    image: "images/trophy-berg.svg",
    number: 8,
    earned: false,
    condition: {
      property: "wordsPerMin",
      value: 25000,
    },
  },
  {
    name: "Hot Streak",
    description:
      "Repetition is the key to success. Read for 7 days in a row to earn this trophy.",
    image: "images/trophy-streak.svg",
    number: 9,
    earned: false,
    condition: {
      property: "currentStreak",
      value: 7,
    },
  },
];

let trophyModal;
let tada;

const checkTrophies = () => {
  for (let i = 0; i < trophies.length; i++) {
    let trophy = trophies[i];
    let condition = trophy.condition;
    let trophyEl = document.querySelector(`.trophy[number="${trophy.number}"]`);
    let property = condition.property;
    let userValue = userInfo[property];
    let value = condition.value;

    if (
      (property === "accuracy"
        ? userValue.toFixed(2) === value.toFixed(2)
        : userValue === value) &&
      !trophy.earned
    ) {
      trophyEl.classList.replace("inactive", "active");
      trophyEl.querySelector("figcaption").classList.add("font-weight-bold");
      tada.currentTime = 0;
      tada.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      trophy.earned = true;
    }
  }
};

const updateCounts = () => {
  const totalTimeRead = userInfo.totalTimeRead;
  const hours = Math.floor(totalTimeRead / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = (Math.floor(totalTimeRead / 60) - hours * 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalTimeRead % 60).toString().padStart(2, "0");

  document.querySelector("#totalReadings .count").innerHTML =
    userInfo.totalReadings;
  document.querySelector(
    "#totalTimeRead .count"
  ).innerHTML = `${hours}:${minutes}:${seconds}`;
  document.querySelector("#currentStreak .count").innerHTML =
    userInfo.currentStreak;
  document.querySelector("#accuracy .count").innerHTML = `${Math.round(
    userInfo.accuracy * 100
  )}%`;
  document.querySelector("#wordsPerMin .count").innerHTML = Math.round(
    userInfo.wordsPerMin
  );

  checkTrophies();
};

const onButtonClick = (event) => {
  if (event) {
    const property = event.target.parentElement.id;
    isAccuracy = property === "accuracy";

    if (!isAccuracy || (isAccuracy && userInfo[property].toFixed(2) < 1.0)) {
      userInfo[property] += isAccuracy
        ? 0.01
        : property === "totalTimeRead"
        ? 3600
        : 1;

      updateCounts();
    }
  }
};

const onTrophyClick = (event) => {
  if (event) {
    const trophy = trophies.find(
      (element) =>
        element.number ===
        parseInt(event.currentTarget.getAttribute("number") || 0, 10)
    );

    if (trophy) {
      const trophyName = trophy.name;
      trophyModal.setContent(`<div class="modal-header">
  <h5 class="modal-title" id="trophyModalLabel">${trophyName}</h5>
  <button
    type="button"
    class="close"
    data-dismiss="modal"
    aria-label="Close"
  >
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
<figure class="figure trophy-modal">
  <img class="figure-img" src="${trophy.image}" alt="${trophyName} Trophy" />
  <figcaption>${trophy.description}</figcaption>
</figure>
</div>`);
      trophyModal.update();
      trophyModal.show();
    }
  }
};

window.onload = () => {
  const rowCount = Math.ceil(trophies.length / 3);

  document.getElementById(
    "student-name"
  ).innerHTML = `${userInfo.displayName}'s Trophies`;

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", onButtonClick);
  });

  trophyModal = new BSN.Modal("#trophyModal", {
    content: "",
    backdrop: "static",
  });

  tada = new Audio("audio/tada.wav");

  for (let i = 0; i < rowCount; i++) {
    let row = document.createElement("div");

    row.classList.add("row");

    for (let j = i * 3; j <= i * 3 + 2; j++) {
      let trophyEl = document.createElement("figure");
      let trophy = trophies[j];

      trophyEl.classList.add("col-sm", "figure", "trophy", "inactive");

      if (trophy) {
        let trophyImage = document.createElement("img");
        let trophyName = document.createElement("figcaption");

        trophyImage.setAttribute("src", trophy.image);
        trophyImage.setAttribute("alt", `${trophy.name} Trophy`);
        trophyImage.classList.add("figure-img");

        trophyName.innerHTML = trophy.name;

        trophyEl.appendChild(trophyImage);
        trophyEl.appendChild(trophyName);
        trophyEl.setAttribute("number", trophy.number);
        trophyEl.addEventListener("click", onTrophyClick);
      }

      row.appendChild(trophyEl);
    }

    document.getElementById("trophies").appendChild(row);

    updateCounts();
  }
};
