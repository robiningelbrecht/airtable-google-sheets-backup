const API_KEY = 'YOUR_API_KEY';
const ATTACHMENTS_ROOT_FOLDER_ID = 'ROOT_FOLDER_ID_WHERE_YOU_WANT_TO_STORE_ATTACHMENTS'

class App {
  constructor() {
    this.client = new AirtableClient(API_KEY);
    this.syncs = [
      new AirtableSync('someBaseId', 'someTableName', 'someViewName'),
      new AirtableSync('someBaseId', 'someTableName', 'someViewName', ['name-of-attachment-field-one', 'name-of-attachment-field-2']),
    ];
    this.attachmentSerivce = new AttachmentSerivce(ATTACHMENTS_ROOT_FOLDER_ID);
  }

  run() {
    this.syncs.forEach(sync => {
      const airtableRecords = new AirtableRecords(
        this.client.getRecords(sync.getBaseId(), sync.getTableName(), sync.getViewName()),
        sync.getAttachmentFields()
      );

      if (airtableRecords.isEmpty()) {
        // Shortcut and do not override sheet with "empty data".
        return;
      }

      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = new Sheet(spreadsheet.getSheetByName(sync.getTableName()) || spreadsheet.insertSheet(sync.getTableName()));

      sheet.clear();
      sheet.setHeader(airtableRecords.getFieldNames());
      sheet.setRows(airtableRecords.getData());

      // Download and save attachments, if any.
      for (const [id, urls] of Object.entries(airtableRecords.getAttachmentUrls())) {
        this.attachmentSerivce.downloadAndSave(id, urls[0], sync.getTableName());
      }
    });
  }
}

function run() {
  const app = new App();
  app.run();
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Airtable sync')
    .addItem('Run sync', 'run')
    .addToUi();
}

