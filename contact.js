window.addEventListener("load", function () {
    const locationLists = document.querySelectorAll('.scrollable-div'); // Select all location lists
    const selectAllButtons = document.querySelectorAll('.select-all');
    const unselectAllButtons = document.querySelectorAll('.unselect-all');

  	let listboxesOpt =       document.querySelectorAll('.scrollable-option');
        // Add event delegation to handle clicks on options
listboxesOpt.forEach(opt => {
    opt.addEventListener('click', function(e) {
        //if (e.target && e.target.classList.contains('scrollable-option')) {
            e.target.classList.toggle('selected');
       // }
    });

            // Retrieve contacts from localStorage and append them to the contact list
            const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
            const contactList = document.getElementById('contactList');

            // Append each contact to the scrollable div
            console.log(`Read Contacts as ${contacts.length}`);
            console.log(`contacts in memory is ${localStorage.getItem("contacts")}`)
            contacts.forEach(contact => {
                const contactDiv = document.createElement('div');
                contactDiv.classList.add('scrollable-option');
                contactDiv.innerHTML = `${contact.name}<br>${contact.email}<br>${contact.phone}`;
                contactList.appendChild(contactDiv);
            });
  
});

// Function to move selected options from one list to another
function moveOptions(fromList, toList) {
    const selectedOptions = Array.from(fromList.querySelectorAll('.scrollable-option.selected'));

    selectedOptions.forEach(option => {
        option.classList.remove('selected');  // Deselect when moving
        toList.appendChild(option);
    });
}

// Event listeners for the arrow buttons
document.getElementById('moveToRight') && document.getElementById('moveToRight').addEventListener('click', function() {
    moveOptions(document.getElementById('leftList'), document.getElementById('rightList'));
});

document.getElementById('moveToLeft') && document.getElementById('moveToLeft').addEventListener('click', function() {
    moveOptions(document.getElementById('rightList'), document.getElementById('leftList'));
});
    
    // Select All button functionality
    selectAllButtons && selectAllButtons.forEach((button, index) => {
        button.addEventListener('click', () => selectAll(locationLists[index]));
    });

    // Un-select All button functionality
    unselectAllButtons && unselectAllButtons.forEach((button, index) => {
        button.addEventListener('click', () => unselectAll(locationLists[index]));
    });

    // Select all options in the list
    function selectAll(list) {
        const options = list.querySelectorAll('.scrollable-option');
        options.forEach(option => option.classList.add('selected'));
    }

    // Un-select all options in the list
    function unselectAll(list) {
        const options = list.querySelectorAll('.scrollable-option');
        options.forEach(option => option.classList.remove('selected'));
    }
})
   
