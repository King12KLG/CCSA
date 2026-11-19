const form = document.getElementById('suggest-form');
const box = document.getElementById('suggestion');
const thanks = document.getElementById('suggest-thanks');
const sendBtn = form.querySelector('.send-btn');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = box.value.trim();
    if (!text) return;

    // Kept in this browser for now
    let list = [];
    try { list = JSON.parse(localStorage.getItem('ccsaSuggestions')) || []; }
    catch (err) { list = []; }

    list.push({ text: text, sent: new Date().toISOString() });

    try { localStorage.setItem('ccsaSuggestions', JSON.stringify(list)); }
    catch (err) { /* storage full or blocked, ignore */ }

    box.value = '';
    thanks.hidden = false;

    sendBtn.textContent = 'Sent!';
    sendBtn.disabled = true;
    setTimeout(() => {
        sendBtn.textContent = 'Send';
        sendBtn.disabled = false;
    }, 3000);
});

document.getElementById('back-btn').addEventListener('click', () => {
    if (history.length > 1) {
        history.back();
    } else {
        window.location.href = 'index.html';
    }
});