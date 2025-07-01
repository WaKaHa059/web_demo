document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('helloBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      alert('歡迎來到我的 GitHub 網頁！');
    });
  }

  // 讀取 Google Sheet 資料
  fetch('https://script.google.com/macros/s/AKfycby5skTEyREQaeiffT6plbFSCZfFWF1wS85m-azZWVB-KgBD5zyrcnAV-YWw354v5SSc/exec')
    .then(response => response.json())
    .then(data => {
      console.log('Google Sheet 資料:', data);
      // 你可以在這裡把資料顯示到網頁上
    })
    .catch(error => {
      console.error('讀取失敗:', error);
    });

  // 寫入 Google Sheet 資料範例
  const writeBtn = document.createElement('button');
  writeBtn.textContent = '寫入 Google Sheet';
  writeBtn.className = 'button';
  document.querySelector('.container').appendChild(writeBtn);
  writeBtn.addEventListener('click', function() {
    const payload = { data: ['新資料1', '新資料2'] };
    fetch('https://script.google.com/macros/s/AKfycby5skTEyREQaeiffT6plbFSCZfFWF1wS85m-azZWVB-KgBD5zyrcnAV-YWw354v5SSc/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => response.text())
      .then(result => {
        alert('寫入成功: ' + result);
      })
      .catch(error => {
        alert('寫入失敗: ' + error);
      });
  });
});
