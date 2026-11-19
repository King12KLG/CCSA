// Maps link goes back to the cities page
document.querySelectorAll('.nav-purple').forEach(a => {
    a.href = 'index.html';
});

document.querySelectorAll('.panel-buttons button').forEach(btn => {
    const label = btn.textContent.trim();

    if (label === 'Contribute') {
        btn.textContent = 'Back';
        btn.addEventListener('click', () => {
            if (history.length > 1) {
                history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    if (label === 'Save a spot') {
        btn.textContent = 'Saved spots';
        btn.addEventListener('click', () => {
            window.location.href = 'saved.html';
        });
    }
});