import config from "../config";
/**
 * Load the rhymes from the spreadsheet
 * Get the right values from it and assign.
 */
export async function loadSpreadsheet(callback, spId, shId) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spId,
        range: "!C5:H"
      })
      .then(
        response => {
          const data = response.result.values;
          if (data) {
            const rhymes =
              data.map(rhymeGroup => ({
                rhyme: rhymeGroup[0],
                definition: rhymeGroup[1],
                helpers:
                  rhymeGroup[3] + ", " + rhymeGroup[4] + ", " + rhymeGroup[5],
                sentence: rhymeGroup[2],
                rhymeGroup: rhymeGroup
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
