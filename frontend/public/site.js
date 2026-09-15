window.addEventListener('load', function(){
  const reveals = document.querySelectorAll('.reveal');
  const quoteForm = document.getElementById('quoteForm');

  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    reveals.forEach(el => io.observe(el));
  }

  if (quoteForm){
    quoteForm.addEventListener('submit', e => {
      e.preventDefault();
      const f = quoteForm;
      const name = f.name.value.trim();
      const phone = f.phone.value.trim();
      const email = f.email.value.trim();
      const type = f.type.value;
      const details = f.details.value.trim();
      if(!name || !phone){ alert('Please enter your name and phone number.'); return; }
      const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Type: ${type}\nProject Details: ${details}`;
      window.location.href = `mailto:Renovatemax2max@gmail.com?subject=Quote Request&body=${encodeURIComponent(body)}`;
      quoteForm.reset();
    });
  }
});
