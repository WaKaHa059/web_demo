document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('helloBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      alert('歡迎來到我的 GitHub 網頁！');
    });
  }
});
