// map.js

let selectedLocation = null;
let selectedTimeframe = null;
let selectedDateTime = null;

// Track when the user selects a location
function updateMap(city) {
    const coords = cities[city];
    map.setCenter(coords);
    map.setZoom(10);
    selectedLocation = city; // Remember selected location
}

// Track the timeframe selection
document.querySelectorAll('[data-timeframe]').forEach(button => {
    button.addEventListener('click', function() {
        selectedTimeframe = this.getAttribute('data-timeframe');
        this.classList.add('active'); // Optionally highlight selected button
        document.querySelectorAll('[data-timeframe]').forEach(b => b !== this && b.classList.remove('active'));
    });
});

// Track the date and time selection
document.getElementById('datetime').addEventListener('change', function() {
    selectedDateTime = this.value;
    document.getElementById('selected-datetime').textContent = `Selected: ${selectedDateTime}`;
});

// Handle the "Report" button click
document.querySelector('.report').addEventListener('click', function() {
    if (!selectedLocation || !selectedTimeframe || !selectedDateTime) {
        // Show the validation dialog if any field is missing
        showDialog('Please select a location, timeframe, and date/time.');
    } else {
        // Redirect to report.html with query parameters
      //location=New+York&data-type=1hr&date-range=2024-09-05&time-range=19%3A11
        const params = new URLSearchParams({
            location: selectedLocation,
            "data-type": selectedTimeframe,
            "date-range": selectedDateTime.split("T")[0],
			"time-range": selectedDateTime.split("T")[1]
        });
        window.location.href = `report.html?${params.toString()}`;
    }
});

// Function to show the validation dialog
function showDialog(message) {
    const dialog = document.createElement('div');
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.backgroundColor = '#f8f9fa';
    dialog.style.border = '1px solid #549D50';
    dialog.style.padding = '20px';
    dialog.style.zIndex = '1000';
    dialog.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    const text = document.createElement('p');
    text.textContent = message;
    text.style.color = '#549D50';
    text.style.fontSize = '16px';
    text.style.marginBottom = '20px';
    dialog.appendChild(text);

    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.classList.add('button');
    okButton.addEventListener('click', () => {
        document.body.removeChild(dialog);
    });
    dialog.appendChild(okButton);

    document.body.appendChild(dialog);
}

    // Function to set the default value for datetime-local input
    function setDateTimeToNow() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      // Formatting for datetime-local (YYYY-MM-DDTHH:MM)
      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

      // Set the value of the input field
      if(document.getElementById('datetime')){
      	document.getElementById('datetime').value = formattedDateTime;
	selectedDateTime = formattedTime;
      }
    }

    // Call the function when the page loads
 
