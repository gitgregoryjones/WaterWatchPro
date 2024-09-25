window.addEventListener("load", function () {
    const locationList = document.getElementById('leftList'); // Select all location lists
    const selectAllButtonLeft = document.getElementById('leftUnassignedSelectAll');
    const unselectAllButtonLeft = document.getElementById('leftUnassignedDeSelectAll');

    const selectAllButtonRight = document.getElementById('rightSelectAll');
    const unselectAllButtonRight = document.getElementById('rightDeSelectAll');

    var setUpMapLocations = null;

    const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];

            // Find the location list div
            

            // Add saved locations to the location list
            locationList && savedLocations.forEach(location => {
                const locationDiv = document.createElement('div');
                locationDiv.classList.add('scrollable-option');
                console.log(JSON.stringify(location))
                locationDiv.innerHTML = `&gt; ${location.locationName}`; // Assuming the 'name' property exists in the saved location
                
                
                
                locationList.appendChild(locationDiv);
                /*
                locationDiv.addEventListener('click', function(e) {
                    
                    e.target.classList.toggle('selected');
                    console.log('Add Location selected events');
                });*/
            });
    
  	
        // Add event delegation to handle clicks on options

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
        
    // Select All button functionality right List
    selectAllButtonRight && selectAllButtonRight.addEventListener('click', () => selectAll(document.getElementById("rightList")));
 
    
    // Un-select All button functionality right List
    unselectAllButtonRight && unselectAllButtonRight.addEventListener('click', () => unselectAll(document.getElementById("rightList")));

      // Select All button functionality Left List
    selectAllButtonLeft && selectAllButtonLeft.addEventListener('click', () => selectAll(document.getElementById("leftList")));
 
    
    // Un-select All button functionality left List
    unselectAllButtonLeft && unselectAllButtonLeft.addEventListener('click', () => unselectAll(document.getElementById("leftList")));

    setUpMapLocations && setUpMapLocations();
    
    
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
    //Event Listeners for Delete Buttons, etc 
    // Function to handle the deletion of selected contacts
function deleteSelectedContacts() {
     // Remove the corresponding entries from local storage
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    // Get all the selected options from the contact list
    const contactList = document.querySelectorAll('.scrollable-div.contacts .scrollable-option.selected');
    
    // If no contacts are selected, show an alert and return
    if (contactList.length === 0) {
        alert('No contacts selected for deletion.');
        return;
    }

    // Show a confirmation dialog before deleting
    const confirmation = confirm('Are you sure you want to delete the selected contacts?');
    
    if (confirmation) {
        // Iterate through all selected contacts and remove them from the DOM
        contactList.forEach(option => {

             // Update the contacts array by filtering out the deleted ones
        contacts = contacts.filter(contact => {
            return ![...contactList].some(selectedOption => {
                const selectedContact = selectedOption.innerHTML.trim().split("<br>");
                return contact.name === selectedContact[0] &&
                       contact.phone === selectedContact[1];
            });
        });

            
            option.remove();
        });

       
        
       

        // Save the updated contacts list back to local storage
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Notify the user that the contacts were successfully deleted
        alert('Selected contacts have been deleted.');
    }
}

// Add an event listener to the "Delete Selected" button
document.getElementById('deleteContact') && document.getElementById('deleteContact').addEventListener('click', deleteSelectedContacts);

// Add selection toggle functionality for contacts
/*
document.querySelectorAll('.scrollable-div.contacts .scrollable-option').forEach(option => {
    option.addEventListener('click', function() {
        // Toggle the 'selected' class when a contact is clicked
        option.classList.toggle('selected');
    });
});
*/

     //Now that the contacts are there.  Add event listener for each
        let listboxesOpt =       document.querySelectorAll('.scrollable-option');
    
        listboxesOpt.forEach(opt => {
            opt.addEventListener('click', function(e) {
                //if (e.target && e.target.classList.contains('scrollable-option')) {
                    e.target.classList.toggle('selected');
               // }
              
            });
              console.log(`add list events for ${opt.outerHTML}`);
        
               
          
        });
    
})
   
