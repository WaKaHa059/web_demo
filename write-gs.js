document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('gsForm');
  const resultDiv = document.getElementById('result');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const col1 = document.getElementById('col1').value;
    const col2 = document.getElementById('col2').value;
    const payload = { data: [col1, col2] };
    fetch('https://script.google.com/macros/s/AKfycby5skTEyREQaeiffT6plbFSCZfFWF1wS85m-azZWVB-KgBD5zyrcnAV-YWw354v5SSc/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(response => response.text())
      .then(result => {
        resultDiv.textContent = '寫入成功: ' + result;
        form.reset();
      })
      .catch(error => {
        resultDiv.textContent = '寫入失敗: ' + error;
      });
  });
});
