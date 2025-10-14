(function(){
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if(stored === 'light') html.setAttribute('data-theme','light');

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    if(current === 'light'){
      html.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      toggle.textContent = 'Theme';
    } else {
      html.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
      toggle.textContent = 'Theme';
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();

function sendForm(e){
  e.preventDefault();
  const form = e.target;
  const result = document.getElementById('formResult');
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };
  if(!data.name || !data.email || !data.message){
    result.textContent = 'Please complete the form.';
    return false;
  }
  result.textContent = 'Sending...';
  setTimeout(() => {
    result.textContent = 'Thanks — message received. I will reply by email.';
    form.reset();
  }, 800);
  return false;
}

function openMail(){
  window.location.href = 'mailto:your.email@example.com?subject=Portfolio%20contact';
}
