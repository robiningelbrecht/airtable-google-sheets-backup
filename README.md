This script allows you to backup your Airtable data to Google sheets. It has support for attachment fields as well.
Feel free to copy and edit the script (Give it a :star: when you do).

# Usage

1. Copy the files to Google Apps Script
2. Assign your Airtable api key to `API_KEY` constant in `App.gs`. Can be configured on https://airtable.com/account
3. Assign your root folder id to `ATTACHMENTS_ROOT_FOLDER_ID` constant in `App.gs`. Attachements will be downloaded to this folder.
4. Add an `AirtableSync` item to the `this.syncs` prop for each view you want to backup

You should be good to go, run the script.
