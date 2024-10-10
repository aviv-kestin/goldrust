document.addEventListener('DOMContentLoaded', function () {
    // Menu functionality
    const menu = document.getElementById('menu');
    const menuItems = document.querySelectorAll('.spinning-image span');
    const centeredBox = document.querySelector('.centered-box');

    menu.style.width = '10vw';

    menu.addEventListener('mouseenter', function () {
        menu.style.width = '55vw';
        updateTextColors();
    });

    menu.addEventListener('mouseleave', function () {
        menu.style.width = '10vw';
        updateTextColors();
    });

    function checkOverlap(box, item) {
        const boxRect = box.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        return !(itemRect.right < boxRect.left || 
                 itemRect.left > boxRect.right || 
                 itemRect.bottom < boxRect.top || 
                 itemRect.top > boxRect.bottom);
    }

    function updateTextColors() {
        menuItems.forEach(item => {
            if (checkOverlap(centeredBox, item)) {
                item.classList.add('white-text');
            } else {
                item.classList.remove('white-text');
            }
        });
    }

    window.addEventListener('resize', updateTextColors);
    updateTextColors();

    // Draggable image functionality
    const draggableImage = document.querySelector('.draggable-image');
    let isDragging = false;
    let offsetX, offsetY;

    // Function to handle mousedown
    draggableImage.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent default browser behavior
        isDragging = true;
        offsetX = e.clientX - draggableImage.getBoundingClientRect().left;
        offsetY = e.clientY - draggableImage.getBoundingClientRect().top;
        draggableImage.style.position = 'absolute';
        draggableImage.style.zIndex = 1000; // Bring the image to the front while dragging
    });

    // Function to handle mousemove
    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            draggableImage.style.left = `${e.clientX - offsetX}px`;
            draggableImage.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // Function to handle mouseup
    document.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            draggableImage.style.zIndex = ''; // Reset z-index after dragging
        }
    });
});
