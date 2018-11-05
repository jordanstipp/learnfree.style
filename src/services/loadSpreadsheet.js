import config from "../config";
/**
 * Load the rhymes from the spreadsheet
 * Get the right values from it and assign.
 */
export async function loadSpreadsheet(callback, spId, shId) {
  console.log(shId + "!C2:E");
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spId,
        range: "!C2:E"
      })
      .then(
        response => {
          const data = response.result.values;
          if (data) {
            const rhymes =
              data.map(rhymeGroup => ({
                rhyme: rhymeGroup[0],
                definition: rhymeGroup[1],
                helpers: rhymeGroup[2]
              })) || [];
            callback({
              rhymes
            });
          }
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
