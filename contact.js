document.addEventListener("DOMContentLoaded", function () {
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
document.getElementById('moveToRight').addEventListener('click', function() {
    moveOptions(document.getElementById('leftList'), document.getElementById('rightList'));
});

document.getElementById('moveToLeft').addEventListener('click', function() {
    moveOptions(document.getElementById('rightList'), document.getElementById('leftList'));
});
    
    // Select All button functionality
    selectAllButtons.forEach((button, index) => {
        button.addEventListener('click', () => selectAll(locationLists[index]));
    });

    // Un-select All button functionality
    unselectAllButtons.forEach((button, index) => {
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
   
