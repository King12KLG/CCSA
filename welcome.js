const form = document.getElementById('welcome-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = document.getElementById('photo').files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            // Shrink the photo so it fits in browser storage
            const size = 300;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const scale = Math.max(size / img.width, size / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

            const user = {
                firstName: document.getElementById('first-name').value.trim(),
                lastName: document.getElementById('last-name').value.trim(),
                age: document.getElementById('age').value,
                email: document.getElementById('email').value.trim(),
                photo: canvas.toDataURL('image/jpeg', 0.8)
            };

            try {
                localStorage.setItem('ccsaUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } catch (err) {
                alert('That photo could not be saved. Please try a smaller image.');
            }
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
});