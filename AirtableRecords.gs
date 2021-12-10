class AirtableRecords {
    constructor(rawRecords, attachmentFields) {
      this.records = rawRecords;
      this.attachmentFields = attachmentFields || [];
      this.attachmentUrls = [];
      this.data = this.parseDataAndAttachementUrls();
    }
  
    isEmpty() {
      this.records !== undefined && this.records.length > 0;
    }
  
    getFieldNames() {
      return ['ID', ...Object.keys(this.records[0].fields)];
    }
  
    parseDataAndAttachementUrls() {
      let data = [];
  
      for (const [i, record] of Object.entries(this.records)) {
        let row = [record.id];
        for (let [j, value] of Object.entries(record.fields)) {
          // This is an attachment field, needs special processing.
          if (this.attachmentFields.includes(j)) {
            value = value.map((object) => object.url);
            // Keep track of attachment urls, so we can 
            this.attachmentUrls[record.id] = value;
          }
  
          row.push(value);
        }
        data.push(row);
      }
  
      return data;
    }
  
    getData() {
      return this.data;
    }
  
    getRawData() {
      return this.records;
    }
  
    getAttachmentUrls() {
      return this.attachmentUrls;
    }
  }