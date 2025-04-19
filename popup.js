const usageLimitInput = document.getElementById("usage-limit");
const saveLimitButton = document.getElementById("save-limit");

chrome.storage.local.get("websiteData", ({ websiteData }) => {
  const domains = Object.keys(websiteData);
  const times = domains.map((domain) => websiteData[domain].timeSpent);
  
  const ctx = document.getElementById("habit-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: domains,
      datasets: [{
        label: "Time Spent (minutes)",
        data: times,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    }
  });
});

saveLimitButton.addEventListener("click", () => {
  const limit = usageLimitInput.value;
  chrome.storage.local.set({ usageLimit: limit });
});
