document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.content-card');
    const mainArea = document.querySelector('.main-area');

    let draggedItem = null;
    let touchOffsetX = 0;
    let touchOffsetY = 0;

    // Loop through all content cards to make them draggable
    cards.forEach((card) => {
        card.setAttribute('draggable', true);

        // DRAG EVENTS FOR DESKTOP
        // When the dragging starts
        card.addEventListener('dragstart', function (e) {
            draggedItem = card;
            setTimeout(() => {
                card.style.display = 'none'; // Hide the card during drag
            }, 0);
        });

        // When dragging ends
        card.addEventListener('dragend', function (e) {
            setTimeout(() => {
                draggedItem.style.display = 'flex'; // Restore the card display after drag
                draggedItem = null;
            }, 0);
        });

        // Prevent the default behavior to allow drop
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        // Handle the drop event on a card
        card.addEventListener('drop', function (e) {
            e.preventDefault();
            if (draggedItem !== this) {
                mainArea.insertBefore(draggedItem, this); // Insert the dragged item before the dropped target
            }
        });

        // TOUCH EVENTS FOR iPads
        // When touch starts
        card.addEventListener('touchstart', function (e) {
            draggedItem = card;
            const touch = e.touches[0];
            touchOffsetX = touch.clientX - card.getBoundingClientRect().left;
            touchOffsetY = touch.clientY - card.getBoundingClientRect().top;
            card.style.position = 'absolute';
            card.style.zIndex = 1000;
            card.style.transform = 'scale(1.05)'; // Optional visual feedback for dragging
        });

        // When touch moves
        card.addEventListener('touchmove', function (e) {
            const touch = e.touches[0];
            card.style.left = touch.clientX - touchOffsetX + 'px';
            card.style.top = touch.clientY - touchOffsetY + 'px';
        });

        // When touch ends (drop)
        card.addEventListener('touchend', function (e) {
            card.style.position = '';
            card.style.transform = ''; // Reset transform

            // Find the card below the dragged item and insert it
            const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            if (dropTarget && dropTarget.classList.contains('content-card') && draggedItem !== dropTarget) {
                mainArea.insertBefore(draggedItem, dropTarget); // Reorder on drop
            } else {
                mainArea.appendChild(draggedItem); // Drop it at the end if no target
            }

            draggedItem = null;
        });
    });

    // Prevent the default behavior for the main content area to allow drop
    mainArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Handle drop event when dropped on the empty area in the main content area
    mainArea.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem) {
            mainArea.appendChild(draggedItem); // Append the dragged item if dropped in the main area
        }
    });

    // TOUCH EVENTS FOR MAIN AREA (in case user drops outside any card)
    mainArea.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while dragging
    });

    mainArea.addEventListener('touchend', function (e) {
        if (draggedItem) {
            card.style.position = '';
            card.style.transform = ''; // Reset transform

            const dropTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            if (!dropTarget || !dropTarget.classList.contains('content-card')) {
                mainArea.appendChild(draggedItem); // Drop at the end of the main area if not on another card
            }

            draggedItem = null;
        }
    });
});
