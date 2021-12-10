class AirtableClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getRecords(baseId, tableName, viewName) {
    // Wait for a bit so we don't get rate limited by Airtable.
    Utilities.sleep(201);

    let offset = 0;
    let records = [];

    // Make calls to Airtable, until all of the data has been retrieved.
    while (offset !== null) {
      const url = [
        "https://api.airtable.com/v0/",
        baseId,
        "/",
        encodeURIComponent(tableName),
        "?",
        "view=",
        viewName,
        "&offset=",
        offset
      ].join('');

      const options = {
        'method': 'GET',
        'headers': { 'Authorization': 'Bearer ' + this.apiKey }
      };

      // Call the URL and add results to to our result set.
      const response = JSON.parse(UrlFetchApp.fetch(url, options));
      records = [...records, ...response.records];


      offset = response.offset || null;
    }

    return records;
  }
}