// script.js

// --- Pop-up JavaScript ---
const openProtocolPopupBtn = document.getElementById('openProtocolPopupBtn');
const protocolPopupOverlay = document.getElementById('protocolPopupOverlay');
const closeProtocolPopupBtn = document.getElementById('closeProtocolPopupBtn');

/**
 * Shows the pop-up overlay.
 */
function showPopup() {
    if (protocolPopupOverlay) {
        protocolPopupOverlay.classList.add('show');
    }
}

/**
 * Hides the pop-up overlay.
 */
function hidePopup() {
    if (protocolPopupOverlay) {
        protocolPopupOverlay.classList.remove('show');
    }
}

// Add event listener to the "Purchase The Protocol" button to open the pop-up
if (openProtocolPopupBtn) {
    openProtocolPopupBtn.addEventListener('click', showPopup);
}

// Add event listener to the close button inside the pop-up
if (closeProtocolPopupBtn) {
    closeProtocolPopupBtn.addEventListener('click', hidePopup);
}

// Optional: Close pop-up if user clicks outside the content area (on the overlay)
if (protocolPopupOverlay) {
    protocolPopupOverlay.addEventListener('click', function(event) {
        // Check if the click occurred directly on the overlay, not on its child elements
        if (event.target === protocolPopupOverlay) {
            hidePopup();
        }
    });
}

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav'); // Desktop nav


if (mobileMenuButton) {
    mainNav.classList.toggle('show');
    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
        // Toggle desktop nav visibility only if it exists
        if (mainNav) {
            mainNav.classList.toggle('hidden');
        }
    });
}


// --- Contact Form JavaScript ---
const contactForm = document.getElementById('contactForm');
const contactFormMessage = document.getElementById('contactFormMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission (page reload)

        // IMPORTANT: Replace with the Web app URL you got from Google Apps Script deployment
        const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

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
            // Check if the Google Apps Script URL is set
            if (GOOGLE_APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' || !GOOGLE_APPS_SCRIPT_URL) {
                throw new Error("Google Apps Script URL is not configured. Please replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' with your actual deployment URL.");
            }

            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script web apps
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Even with 'no-cors', we can't directly read the response JSON.
            // We assume success if the fetch operation completes without a network error.
            // For more robust error handling and response parsing, a different backend setup
            // or a proxy would be needed.

            contactFormMessage.textContent = 'Message sent successfully! We will get back to you soon.';
            contactFormMessage.className = 'form-message success';
            contactForm.reset(); // Clear the form
        } catch (error) {
            console.error('Error submitting form:', error);
            contactFormMessage.textContent = 'Failed to send message. Please try again later. Error: ' + error.message;
            contactFormMessage.className = 'form-message error';
        }
    });
}
