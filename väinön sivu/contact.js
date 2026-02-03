// Initialize EmailJS
emailjs.init(window.EMAIL_CONFIG.publicKey);

document.getElementById("contact-form-element").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const statusDiv = document.getElementById("form-status");
    const submitBtn = document.querySelector("#submit-button");
    
    // Check if hCaptcha is loaded (cookies accepted)
    if (typeof hcaptcha === 'undefined') {
        statusDiv.style.color = "#dc3545";
        statusDiv.textContent = "Hyväksy evästeet käyttääksesi lomaketta.";
        return;
    }
    
    // Check if hCaptcha is completed
    const hcaptchaResponse = hcaptcha.getResponse();
    if (!hcaptchaResponse) {
        statusDiv.style.color = "#dc3545";
        statusDiv.textContent = "Vahvista, että et ole robotti.";
        return;
    }
    
    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = "Lähetetään...";
    statusDiv.textContent = "";
    
    // Template parameters
    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        hcaptcha_token: hcaptchaResponse
    };
    
    // Send email to YOU (your inbox)
    emailjs.send(window.EMAIL_CONFIG.serviceId, window.EMAIL_CONFIG.template1, templateParams)
        .then(function() {
            // After successful send to you, send auto-reply to customer
            return emailjs.send(window.EMAIL_CONFIG.serviceId, window.EMAIL_CONFIG.template2, templateParams);
        })
        .then(function() {
            statusDiv.style.color = "#28a745";
            statusDiv.textContent = "Viesti lähetetty onnistuneesti!";
            document.getElementById("contact-form-element").reset();
            hcaptcha.reset(); // Reset the checkbox
            submitBtn.disabled = false;
            submitBtn.textContent = "Lähetä";
        })
        .catch(function(error) {
            statusDiv.style.color = "#dc3545";
            statusDiv.textContent = "Viestin lähetys epäonnistui. Yritä uudelleen.";
            hcaptcha.reset(); // Reset the checkbox
            submitBtn.disabled = false;
            submitBtn.textContent = "Lähetä";
            console.error("EmailJS Error:", error);
        });
});