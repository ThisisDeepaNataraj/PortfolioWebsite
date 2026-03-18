  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const msg = document.getElementById('form-msg');
    const btn = form.querySelector('button[type="submit"]');
    
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/myknnbwn', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        msg.textContent = '✓ Message sent! I will get back to you within 24 hours.';
        msg.style.color = 'var(--accent)';
        msg.style.display = 'block';
        form.reset();
      } else {
        msg.textContent = '✗ Something went wrong. Please email me directly.';
        msg.style.color = 'red';
        msg.style.display = 'block';
      }
    } catch (error) {
      msg.textContent = '✗ Something went wrong. Please email me directly.';
      msg.style.color = 'red';
      msg.style.display = 'block';
    }

    btn.textContent = 'Send Message →';
    btn.disabled = false;
    setTimeout(() => msg.style.display = 'none', 5000);
  });