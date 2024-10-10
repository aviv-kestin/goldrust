document.addEventListener('DOMContentLoaded', function () {
    // Menu behavior
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

    // Paragraph rotation on scroll
    const paragraphs = document.querySelectorAll('.tilted-paragraphs p');

    // Array to track whether the shift has already been applied for each paragraph
    let shifted = Array(paragraphs.length).fill(false);

    // Function to apply the rotation shift
    function applyRotationShift() {
        paragraphs.forEach((paragraph, index) => {
            if (!shifted[index]) {
                const paragraphRect = paragraph.getBoundingClientRect();
                const halfwayThroughViewport = window.innerHeight / 2;

                // Check if the paragraph is halfway through the viewport
                if (paragraphRect.top <= halfwayThroughViewport && paragraphRect.bottom >= 0) {
                    // Get the current rotation value from the transform property
                    const currentTransform = window.getComputedStyle(paragraph).transform;

                    // Calculate current rotation angle from the matrix values (if transform is not 'none')
                    let currentRotation = 0;
                    if (currentTransform !== 'none') {
                        const matrixValues = currentTransform.split('(')[1].split(')')[0].split(',');
                        const a = matrixValues[0];
                        const b = matrixValues[1];
                        currentRotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                    }

                    // Correct rotation logic: Positive values increase, negative values decrease
                    let newRotation = currentRotation > 0 ? currentRotation + 2 : currentRotation - 2;

                    // Apply the new rotation
                    paragraph.style.transform = `rotate(${newRotation}deg)`;

                    // Mark this paragraph as shifted to prevent multiple changes
                    shifted[index] = true;
                }
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', applyRotationShift);
});
