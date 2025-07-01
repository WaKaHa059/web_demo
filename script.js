document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('helloBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      alert('歡迎來到我的 GitHub 網頁！');
    });
  }

  // 讀取 Google Sheet 資料
  const readBtn = document.getElementById('readSheetBtn');
  if (readBtn) {
    readBtn.addEventListener('click', function() {
      fetch('https://script.google.com/macros/s/AKfycby5skTEyREQaeiffT6plbFSCZfFWF1wS85m-azZWVB-KgBD5zyrcnAV-YWw354v5SSc/exec')
        .then(res => res.json())
        .then(data => {
          let html = '<table border="1" style="border-collapse:collapse;width:100%">';
          data.forEach(row => {
            html += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
          });
          html += '</table>';
          document.getElementById('sheetData').innerHTML = html;
        })
        .catch(err => {
          document.getElementById('sheetData').textContent = '讀取失敗: ' + err;
        });
    });
  }
});
