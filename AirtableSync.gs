class AirtableSync {
    constructor(baseId, tableName, viewName, attachmentFields) {
      this.baseId = baseId;
      this.tableName = tableName;
      this.viewName = viewName;
      this.attachmentFields = attachmentFields || [];
    }
  
    getBaseId() {
      return this.baseId;
    }
  
    getTableName() {
      return this.tableName;
    }
  
    getViewName() {
      return this.viewName;
    }
  
    getAttachmentFields() {
      return this.attachmentFields;
    }
  }
  