document.addEventListener('DOMContentLoaded', function () {
    // Get the menu element
    const menu = document.getElementById('menu');

    // Ensure the menu starts with only the first wheel visible
    menu.style.width = '10vw';

    // Expand the menu to reveal wheels on hover
    menu.addEventListener('mouseenter', function () {
        menu.style.width = '55vw'; // Extend to show all wheels
    });

    // Collapse the menu to hide the wheels when mouse leaves
    menu.addEventListener('mouseleave', function () {
        menu.style.width = '10vw'; // Shrink back to only show the first wheel
    });
});