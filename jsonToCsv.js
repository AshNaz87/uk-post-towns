const postTowns = require("./postTowns");

function postTownsToCsv(postTowns) {
  const csvRows = [];
  const header = Object.keys(postTowns)[0];

  csvRows.push(header);

  const allPostTowns = postTowns.postTowns;

  const values = Object.values(
    allPostTowns.map(place => {
      const escaped = ("" + place.postTown).replace(/"/g, '\\"');
      return `"${escaped}"`;
    })
  ).join("\n");

  csvRows.push(values);

  return csvRows;  
}
