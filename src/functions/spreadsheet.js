import config from "../config";
/**
 * Load the rhymes from the spreadsheet
 * Get the right values from it and assign.
 */
export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "C2:E"
      })
      .then(
        response => {
          const data = response.result.values;
          const rhymes =
            data.map(rhymeGroup => ({
              rhyme: rhymeGroup[0],
              definition: rhymeGroup[1],
              helpers: rhymeGroup[2]
            })) || [];
          callback({
            rhymes
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}
