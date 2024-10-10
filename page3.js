document.addEventListener('DOMContentLoaded', function () {
    // Menu functionality
    const menu = document.getElementById('menu');
    menu.style.width = '10vw';

    menu.addEventListener('mouseenter', function () {
        menu.style.width = '55vw';
    });

    menu.addEventListener('mouseleave', function () {
        menu.style.width = '10vw';
    });

    // Draggable functionality for text lines
    const draggableElements = document.querySelectorAll('.draggable');
    
    draggableElements.forEach(item => {
        let isDragging = false;
        let offsetX, offsetY;

        item.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetX = e.clientX - item.getBoundingClientRect().left;
            offsetY = e.clientY - item.getBoundingClientRect().top;
            item.style.position = 'absolute';
            item.style.zIndex = 1000;
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                item.style.left = `${e.clientX - offsetX}px`;
                item.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
            item.style.zIndex = '';
        });
    });

    // Function to randomize positions on load
    function randomizePositions() {
        draggableElements.forEach(item => {
            const randomX = Math.floor(Math.random() * (window.innerWidth - 250));
            const randomY = Math.floor(Math.random() * (window.innerHeight - 150));
            item.style.left = `${randomX}px`;
            item.style.top = `${randomY}px`;
        });
    }

    // Function to order elements as per the given layout
    function orderElements() {
        const orderedPositions = [
            { top: 200, left: 397 }, { top: 263, left: 402 }, { top: 326, left: 399 }, { top: 389, left: 404 },
            { top: 452, left: 400 }, { top: 515, left: 396 }, { top: 578, left: 400 }, { top: 641, left: 403 },
            { top: 200, left: 804 }, { top: 263, left: 798 }, { top: 326, left: 801 }, { top: 389, left: 797 },
            { top: 452, left: 803 }, { top: 515, left: 799 }, { top: 578, left: 797 }, { top: 641, left: 801 }
        ];

        draggableElements.forEach((item, index) => {
            item.style.top = `${orderedPositions[index].top}px`;
            item.style.left = `${orderedPositions[index].left}px`;
        });
    }

    // Randomize positions on page load
    randomizePositions();

    // Handle order button click
    const orderButton = document.getElementById('order-button');
    orderButton.addEventListener('click', orderElements);
});
