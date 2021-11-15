let btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getTime,
  });
});

// current page
function getTime() {
  let timeSeconds = 0;
  const list = document.querySelectorAll("#overlays #text");
  let index = document.querySelectorAll("#publisher-container div span")[1]
    .innerHTML;
  let playlistLenght = Number(index.split("/")[1]);
  let currentIndex = Number(index.split("/")[0]) - 1;

  const days = [];
  const hours = [];
  const minutes = [];
  const seconds = [];

  let totalMinutes = 0;
  let totalSecond = 0;
  let totalHours = 0;
  let totalDays = 0;
  let i = currentIndex;
  for (i; i < playlistLenght; i++) {
    let currentTimeLenght = list[i].innerText.split(":");
    let currentTime = list[i].innerText.split(":");
    currentTimeLenght = Object.keys(currentTimeLenght).length;

    if (currentTimeLenght > 3) {
      days.push(Number(currentTime[0]));
      hours.push(Number(currentTime[1]));
      minutes.push(Number(currentTime[2]));
      seconds.push(Number(currentTime[3]));
    } else if (currentTimeLenght > 2) {
      hours.push(Number(currentTime[0]));
      minutes.push(Number(currentTime[1]));
      seconds.push(Number(currentTime[2]));
    } else if (currentTimeLenght > 1) {
      minutes.push(Number(currentTime[0]));
      seconds.push(Number(currentTime[1]));
    }
  }
  // add all times
  minutes.forEach((m) => {
    totalMinutes += m;
  });
  hours.forEach((h) => {
    totalHours += h;
  });
  days.forEach((d) => {
    totalDays += d;
  });
  seconds.forEach((s) => {
    totalSecond += s;
  });
  // convert to second
  timeSeconds =
    totalDays * 24 * 3600 + totalHours * 3600 + totalMinutes * 60 + totalSecond;
  // result
  const result = new Date(timeSeconds * 1000).toISOString().substr(11, 8);
  // display on screen

  const info = document.querySelectorAll(
    "#publisher-container div yt-formatted-string span"
  )[2];

  const currentIndexHtml = document.querySelectorAll(
    "#publisher-container div yt-formatted-string span"
  )[0];

  const playerlistIndexHtml = document.querySelectorAll(
    "#publisher-container div yt-formatted-string span"
  )[1];

  currentIndexHtml.innerHTML = `${currentIndex + 1}/`;
  playerlistIndexHtml.innerHTML = `${playlistLenght}`;
  info.innerHTML = ` - ${result}`;
}
