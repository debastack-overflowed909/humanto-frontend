document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contactForm');
            const successBox = document.getElementById('successMessage');
            const resetBtn = document.getElementById('resetBtn');

            // Form Submit Event
            form.addEventListener('submit',async (e) => {
                e.preventDefault();


                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const subject = document.getElementById('subject').value;
                    const message = document.getElementById('message').value;
                    const response = await fetch('http://localhost:3000/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            subject,
            message
        })
    });

    const data = await response.json();

    console.log(data);

                // Smooth transition between form and success box
                form.style.display = 'none';
                successBox.style.display = 'block';
            });

            // Reset Form Event
            resetBtn.addEventListener('click', () => {
                form.reset();
                successBox.style.display = 'none';
                form.style.display = 'grid';
            });
        });