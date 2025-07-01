function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  // 如果有查詢參數
  if (e && e.parameter && e.parameter.q) {
    var keyword = e.parameter.q.toLowerCase();
    // 過濾標題列以外的資料
    var filtered = [data[0]]; // 保留標題
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // 將每一欄轉成字串後合併搜尋
      var rowStr = row.join(' ').toLowerCase();
      if (rowStr.indexOf(keyword) !== -1) {
        filtered.push(row);
      }
    }
    return ContentService.createTextOutput(JSON.stringify(filtered))
      .setMimeType(ContentService.MimeType.JSON);
  }
  // 沒有查詢參數就回傳全部
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var body = JSON.parse(e.postData.getDataAsString());
  var action = body.action;
  if (action === 'update' && typeof body.rowIndex === 'number' && Array.isArray(body.data)) {
    // 更新
    var row = body.rowIndex + 1;
    sheet.getRange(row, 1, 1, body.data.length).setValues([body.data]);
    return ContentService.createTextOutput("UPDATED");
  }
  if (action === 'delete' && typeof body.rowIndex === 'number') {
    // 刪除
    var row = body.rowIndex + 1;
    sheet.deleteRow(row);
    return ContentService.createTextOutput("DELETED");
  }
  if (action === 'append' && Array.isArray(body.data)) {
    // 新增
    sheet.appendRow(body.data);
    return ContentService.createTextOutput("OK");
  }
  return ContentService.createTextOutput("NO ACTION");
}
