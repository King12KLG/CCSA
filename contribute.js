// A small note that fades away on its own.
// ccsaNote(text, seconds, anchorElement): with an anchor it sits next to that element.
(function () {
    let timer = null;

    function getNote() {
        let note = document.getElementById('ccsa-note');
        if (!note) {
            note = document.createElement('div');
            note.id = 'ccsa-note';
            note.setAttribute('role', 'status');
            document.body.appendChild(note);
        }
        return note;
    }

    window.ccsaNote = function (text, seconds, anchor) {
        const note = getNote();
        clearTimeout(timer);

        note.textContent = text;
        note.style.left = 'auto';
        note.style.right = 'auto';
        note.style.top = 'auto';
        note.style.bottom = 'auto';
        note.style.transform = 'none';

        if (anchor) {
            const r = anchor.getBoundingClientRect();
            note.style.right = Math.max(10, window.innerWidth - r.right) + 'px';
            if (r.top > 130) {
                note.style.bottom = (window.innerHeight - r.top + 10) + 'px';
            } else {
                note.style.top = (r.bottom + 10) + 'px';
            }
        } else {
            note.style.left = '50%';
            note.style.bottom = '80px';
            note.style.transform = 'translateX(-50%)';
        }

        // Next frame so the fade-in plays
        requestAnimationFrame(() => note.classList.add('show'));
        timer = setTimeout(() => note.classList.remove('show'), (seconds || 10) * 1000);
    };

    window.ccsaHideNote = function () {
        clearTimeout(timer);
        const note = document.getElementById('ccsa-note');
        if (note) note.classList.remove('show');
    };
})();

// Share: opens the phone's share sheet, or copies the link if that is not available
function copyLink(url) {
    function fallback() {
        window.prompt('Copy this link to share it:', url);
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(
            () => window.ccsaNote('Link copied! Paste it to share.', 4),
            fallback
        );
    } else {
        fallback();
    }
}

function sharePage() {
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: 'CCSA (Concerts Company South Africa)',
            text: 'Have a look at this on CCSA!',
            url: url
        }).catch(err => {
            // Closing the share sheet is not an error
            if (err && err.name !== 'AbortError') copyLink(url);
        });
        return;
    }

    copyLink(url);
}

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

    if (label === 'Share') {
        btn.addEventListener('click', sharePage);
    }
});