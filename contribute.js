const note = document.createElement('div');
note.id = 'contribute-note';
note.textContent = 'Email your suggestions';
document.body.appendChild(note);

let hideTimer;

document.querySelectorAll('.panel-buttons button').forEach(btn => {
    if (btn.textContent.trim() === 'Contribute') {
        btn.addEventListener('click', () => {
            const rect = btn.getBoundingClientRect();
            note.classList.add('show');
            note.style.left = rect.left + 'px';
            note.style.top = (rect.top - note.offsetHeight - 10) + 'px';
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => note.classList.remove('show'), 1200);
        });
    }
});