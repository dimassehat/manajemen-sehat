// Initialize EmailJS with your user ID
(function() {
    emailjs.init(OIXCV59s4YGr3N7Q5); // Replace with your EmailJS user ID
})();

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const formData = new FormData(this);
    const notification = document.getElementById('notification');
    notification.textContent = ''; // Clear previous notifications

    emailjs.sendForm('service_9w6x7hl', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            notification.textContent = 'Appointment booked successfully!';
            notification.style.color = 'green';
        }, function(error) {
            notification.textContent = 'There was an error sending your request.';
            notification.style.color = 'red';
        });

    this.reset(); // Reset form after submission
});
