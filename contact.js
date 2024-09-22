document.addEventListener("DOMContentLoaded", function () {
    const locationLists = document.querySelectorAll('.scrollable-div'); // Select all location lists
    const selectAllButtons = document.querySelectorAll('.select-all');
    const unselectAllButtons = document.querySelectorAll('.unselect-all');

    locationLists.forEach(list => {
        list.addEventListener('dragstart', handleDragStart);
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('drop', handleDrop);
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

    // Drag start event
    function handleDragStart(e) {
        const selectedElements = document.querySelectorAll('.scrollable-option.selected');
        const selectedData = [...selectedElements].map(el => ({ id: el.id, html: el.innerHTML }));
        
        e.dataTransfer.setData('application/json', JSON.stringify(selectedData));
        e.dataTransfer.effectAllowed = 'move';
    }

    // Drag over event
    function handleDragOver(e) {
        e.preventDefault(); // Prevent default to allow dropping
        e.dataTransfer.dropEffect = 'move';
    }

    // Drop event
    function handleDrop(e) {
        e.preventDefault();
        const droppedData = JSON.parse(e.dataTransfer.getData('application/json'));

        if (e.target.classList.contains('scrollable-div')) {
            droppedData.forEach(data => {
                const draggedElement = document.getElementById(data.id);

                // Clone the dragged element for the new list
                const clonedElement = draggedElement.cloneNode(true);
                clonedElement.classList.remove('dragging');
                clonedElement.classList.remove('selected');
                clonedElement.setAttribute('draggable', true);

                // Generate a new unique ID for the cloned element
                const newId = `opt-${Math.floor(Math.random() * 10000)}`;
                clonedElement.id = newId;

                // Append the cloned element to the new list
                e.target.appendChild(clonedElement);

                // Remove the original element from its source list
                draggedElement.remove();
            });
        }
    }

    // Allow draggable on all list items and assign unique IDs
    const options = document.querySelectorAll('.scrollable-option');
    var optionNumber = 1;
    options.forEach(option => {
        option.setAttribute('draggable', true);
        option.setAttribute('id', `opt-${optionNumber++}`);

        // Add multi-select functionality (toggle selected class)
        option.addEventListener('click', (e) => {
            e.target.classList.toggle('selected');
        });
    });
});