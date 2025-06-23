        const openProtocolPopupBtn = document.getElementById('openProtocolPopupBtn');
        const protocolPopupOverlay = document.getElementById('protocolPopupOverlay');
        const closeProtocolPopupBtn = document.getElementById('closeProtocolPopupBtn');

        function showPopup() {
            protocolPopupOverlay.classList.add('show');
        }

        function hidePopup() {
            protocolPopupOverlay.classList.remove('show');
        }

        if (openProtocolPopupBtn) {
            openProtocolPopupBtn.addEventListener('click', showPopup);
        }

        if (closeProtocolPopupBtn) {
            closeProtocolPopupBtn.addEventListener('click', hidePopup);
        }

        if (protocolPopupOverlay) {
            protocolPopupOverlay.addEventListener('click', function(event) {
                if (event.target === protocolPopupOverlay) {
                    hidePopup();
                }
            });
        }

        // --- Contact Form JavaScript (New) ---
        const contactForm = document.getElementById('contactForm');
        const contactFormMessage = document.getElementById('contactFormMessage');

        if (contactForm) {
            contactForm.addEventListener('submit', async function(event) {
                event.preventDefault(); // Prevent default form submission (page reload)

                // Replace with the Web app URL you got from Google Apps Script deployment
                const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybbIYhZ69bbu6MNNgwFDWTGMTQBPKRbys7uag5l-yt7z-2IXSfu7DP13LbDEbpsocg/exec'; // <<< IMPORTANT!

                // Display loading message
                contactFormMessage.textContent = 'Sending message...';
                contactFormMessage.className = 'form-message'; // Reset classes
                contactFormMessage.classList.remove('hidden');

                const formData = new FormData(contactForm);
                // Convert FormData to a plain object for JSON
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                try {
                    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors', // Important for Google Apps Script web apps
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    // Even with 'no-cors', we can't directly read the response JSON.
                    // Instead, we assume success if no network error occurred.
                    // For a more robust solution, you'd need a specific CORS setup on Apps Script.

                    contactFormMessage.textContent = 'Message sent successfully! We will get back to you soon.';
                    contactFormMessage.className = 'form-message success';
                    contactForm.reset(); // Clear the form
                } catch (error) {
                    console.error('Error submitting form:', error);
                    contactFormMessage.textContent = 'Failed to send message. Please try again later.';
                    contactFormMessage.className = 'form-message error';
                }
            });
        }
