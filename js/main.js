const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchIncidents = async (searchText) => {
  const res = await fetch("data/data.json");
  const incidents = await res.json();

  let matches = incidents.filter((incident) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return incident.name.match(regex) || incident.thread.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    const allIncidents = incidents
      .map(
        (incident) => `
      <tr>
        <td>${incident.number}</td>
        <td>${incident.name}</td>
        <td>${incident.owner}</td>
        <td>${incident.location}</td>
        <td>${incident.active}</td>
        <td>${incident.thread}</td>
        <td>${incident.threadSource}</td>
        <td>${incident.threadMechanism}</td>
      </tr>
    `
      )
      .join("");
    matchList.innerHTML = allIncidents;
  }

  outputHTML(matches);
};

const outputHTML = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (incident) => `
        <tr>
          <td>${incident.number}</td>
          <td>${incident.name}</td>
          <td>${incident.owner}</td>
          <td>${incident.location}</td>
          <td>${incident.active}</td>
          <td>${incident.thread}</td>
          <td>${incident.threadSource}</td>
          <td>${incident.threadMechanism}</td>
        </tr>
      `
      )
      .join("");

    matchList.innerHTML = html;
  }
};
searchIncidents("");

search.addEventListener("input", () => searchIncidents(search.value));
