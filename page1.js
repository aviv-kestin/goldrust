document.addEventListener('DOMContentLoaded', function () {
    // Add the text box element to the HTML (it will start hidden)
    const textBox = document.createElement('div');
    textBox.id = 'drag-text';
    textBox.style.display = 'none';  // Start hidden
    textBox.style.position = 'fixed';
    textBox.style.padding = '20px';
    textBox.style.color = 'rgb(73, 53, 53)';
    textBox.style.fontSize = '1.4vw';
    textBox.style.textAlign = 'center';
    textBox.style.fontFamily = "'Min'";  // Custom font from the site folder
    textBox.style.zIndex = '100';  // Ensure it's on top of everything

    // Position the text box in the top right corner using vw and vh
    textBox.style.top = '6.5vh';     // 5vh from the top
    textBox.style.right = '5vw';   // 5vw from the right

    document.body.appendChild(textBox);

    const spinningWheel = document.getElementById('spinning-wheel');
    if (spinningWheel) {
        spinningWheel.addEventListener('click', function () {
            window.location.href = 'index.html';  // Redirect to the main page
        });
    }

    // Add unique text messages for each car
    const carMessages = [
        "1. Red sports car, font-end damage and missing front wheels",
        "2. Grey hatchback, front-end damage and missing front doors ",
        "3. Black sedan, missing doors and rims",
        "4. Black sedan, significant front-end damage",
        "5. Black  SUV, significant front-end damage, missing doors and wheels",
        "6. White sedan, damage and missing components throughout",
        "7. Yellow punch buggy, general rust and dents throughout",
        "8. White SUV, extensive damage throughout",
        "9. White SUV, extensive front-end damage and missing front doors ",
        "10. Black sedan, significant front-end damage and missing tires throughout ",
        "11. Black sedan, missing rear doors and rims",
        "12. Violet sports car, missing rear doors and rims, filled with debris",
        "13. Black sedan, sighnificant  damage throughout",
        "14. White sedan, missing doors and panels",
        "15. Dark Grey sedan, front-end damage, missing rear doors and rear rims",
        "16. Grey minivan, extensive damage throughout, filled with debris",
        "17. Red compact sedan, extensive front-end damage and left door damage",
        "18. White SUV, dents throughout and missing wheels",
        "19. Black coupe, extensive damage at front and interior, missing all rims",
        "20. Black sedan, light damage throughout",
        "21. Grey sedan, significant damage throughout, rear-end replaced with debris ",
        "22. Grey sedan, missing doors, front panels and rims ",
        "23. Purple SUV, front-end damage and missing wheels throughout",
        "24. White sedan, significant front-end damage",
        "25. Grey SUV, front-end damage and missing wheels",
        "26. White sedan, missing rims and front bumper",
        "27. Grey sedan, extensive front-end damage and replaced panels",
        "28. Black sedan, front-end damage",
        "29. White compact, front-end damage",
        "30. Grey sedan, signifcant front-end damage, missing doors and wheels",
        "31. Mystery car, covered in a shawl with one spare exposed",
        "32. White sedan, missing doors and panels",
        "33. White sedan, front-end damage",
        "34. Black sedan, front-end damage",
        "35. Grey SUV, missing panels and wheels",
        "36. Black SUV, front-end damage",
        "37. Significant front-end damage, missing wheels and front doors",
        "38. Grey SUV, no body and fitted with Mustang wheels",
        "39. Black sedan, onl missing doors, wheels and panels",
        "40. Grey SUV, font-end damage, and missing wheels"
      

    ];

    // Initialize Matter.js components
    const { Engine, Render, Runner, Bodies, Composite, Body, Mouse, MouseConstraint, Events } = Matter;

    // Create an engine and a world
    const engine = Engine.create();
    const world = engine.world;

    engine.positionIterations = 20;
    engine.velocityIterations = 20;
    engine.constraintIterations = 10;

    // Set gravity for the simulation
    engine.world.gravity.y = 1; // Gravity pulling images down

    // Create a renderer to display the simulation in the browser
    const render = Render.create({
        element: document.body, // Attach the canvas to the body
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false, // Disable wireframes to show images
            background: 'transparent' // Ensure the canvas background is transparent
        }
    });

    // Run the renderer
    Render.run(render);

    // Create a runner with a fixed timestep
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Function to calculate image scale while strictly maintaining maxWidth and maxHeight
    function calculateScale(imageWidth, imageHeight) {
        const maxWidth = 2 * (window.innerWidth / 100); // Max width is 2vw
        const maxHeight = 1.7 * (window.innerHeight / 100); // Max height is 1.8vh

        const aspectRatio = imageWidth / imageHeight;

        let scaleFactor = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);

        const scaledWidth = imageWidth * scaleFactor;
        const scaledHeight = imageHeight * scaleFactor;

        return { scaledWidth, scaledHeight };
    }

    // Create image bodies with larger bounding boxes to avoid overlap
    const imageBodies = [];
    for (let i = 1; i <= 40; i++) {
        const carImageWidth = 100; // Example image width
        const carImageHeight = 60; // Example image height

        let { scaledWidth, scaledHeight } = calculateScale(carImageWidth, carImageHeight);

        if (i === 1) {
            const smallerScaleFactor = 0.75;
            scaledWidth *= smallerScaleFactor;
            scaledHeight *= smallerScaleFactor;
        }

        const collisionWidth = scaledWidth * 8;
        const collisionHeight = scaledHeight * 5.5;

        const img = Bodies.rectangle(
            Math.random() * (window.innerWidth - collisionWidth) + collisionWidth / 2,
            -100,
            collisionWidth,
            collisionHeight,
            {
                restitution: 0,
                friction: 1,
                frictionStatic: 1.2,
                density: 0.01,
                render: {
                    sprite: {
                        texture: `car${i}.png`,
                        xScale: scaledWidth / carImageWidth,
                        yScale: scaledHeight / carImageHeight
                    }
                }
            }
        );

        imageBodies.push(img);
        Composite.add(world, img);
    }

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });
    Composite.add(world, mouseConstraint);

    Events.on(mouseConstraint, 'startdrag', function (event) {
        const body = event.body;

        const index = imageBodies.indexOf(body);
        if (index !== -1) {
            textBox.innerText = carMessages[index];
            textBox.style.display = 'block';
        }
    });

    Events.on(mouseConstraint, 'enddrag', function () {
        textBox.style.display = 'none';
    });

    const ground = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight - 5,
        window.innerWidth,
        50,
        { isStatic: true, render: { visible: false } }
    );
    Composite.add(world, ground);

    const wallThickness = 50;
    const extendedWallHeight = window.innerHeight * 3;

    const leftWall = Bodies.rectangle(
        0,
        window.innerHeight / 2,
        wallThickness,
        extendedWallHeight,
        { isStatic: true, render: { visible: false } }
    );

    const rightWall = Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2,
        wallThickness,
        extendedWallHeight,
        { isStatic: true, render: { visible: false } }
    );

    Composite.add(world, [leftWall, rightWall]);

    Events.on(engine, 'beforeUpdate', function () {
        imageBodies.forEach(function (body) {
            body.velocity.x = Math.max(Math.min(body.velocity.x, 15), -15);
            body.velocity.y = Math.max(Math.min(body.velocity.y, 15), -15);
        });
    });

    window.addEventListener('resize', () => {
        render.options.width = window.innerWidth;
        render.options.height = window.innerHeight;
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;

        Body.setPosition(leftWall, { x: 50, y: window.innerHeight / 2 });
        Body.setPosition(rightWall, { x: window.innerWidth - 50, y: window.innerHeight / 2 });
        Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight - 5 });

        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: window.innerWidth, y: window.innerHeight }
        });
    });



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
    
    
    
    
});
