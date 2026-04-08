import Matter, { Events } from 'matter-js';
import { useEffect, useRef } from 'react';

const strokeStyle = '#0061d7';
const lineWidth = 2;
const shapeCreators = {
    square: (x, y) =>
        Matter.Bodies.rectangle(x, y, 50, 50, {
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
    
    rectangle: (x, y) =>
        Matter.Bodies.rectangle(x, y, 80, 40, {
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
    
    circle: (x, y) =>
        Matter.Bodies.circle(x, y, 25, {
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
    
    triangle: (x, y) =>
        Matter.Bodies.polygon(x, y, 3, 30, {
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
    
    rhombus: (x, y) =>
        Matter.Bodies.rectangle(x, y, 50, 50, {
        angle: Math.PI / 4,
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
    
    hexagon: (x, y) =>
        Matter.Bodies.polygon(x, y, 6, 30, {
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
    
    octagon: (x, y) =>
        Matter.Bodies.polygon(x, y, 8, 30, {
        render: { fillStyle: 'transparent', strokeStyle, lineWidth },
    }),
};

const MatterScene = () => {
    const sceneRef = useRef(null);
    
    useEffect(() => {
        const {
            Engine,
            Render,
            Runner,
            Mouse,
            Composite,
            Bodies,
            Render: MatterRender,
        } = Matter;
        
        const { width, height } = sceneRef.current.getBoundingClientRect();

        const engine = Engine.create();
        const world = engine.world;
        
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: 'transparent',
            }
        });

        Render.run(render);
        
        const runner = Runner.create();
        Runner.run(runner, engine);
        
        const shapes = Object.fromEntries(
            Object.keys(shapeCreators).map(key => [key, 2])
        );
        const tempShapes = [];

        Object.entries(shapes).forEach(([shapeType, count]) => {
            const createShape = shapeCreators[shapeType];
            if (!createShape) return;

            for (let i = 0; i < count; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height * 0.5;
                tempShapes.push(createShape(x, y));
            };
        });
        
        Composite.add(world, tempShapes);
        
        Composite.add(world, [
            Bodies.rectangle((width / 2), 0, width, 1, {
                isStatic: true, 
                render: { visible: false },
            }),
            Bodies.rectangle((width / 2), height, width, 1, {
                isStatic: true, 
                render: { visible: false },
            }),
            Bodies.rectangle(width, (height / 2), 1, height, {
                isStatic: true, 
                render: { visible: false },
            }),
            Bodies.rectangle(0, (height / 2), 1, height, {
                isStatic: true, 
                render: { visible: false },
            })
        ]);

        const cursor = Bodies.circle(0, 0, 30, {
            isStatic: true,
            render: { visible: false },
        });
        Composite.add(world, cursor);

        const mouse = Mouse.create(render.canvas);
        mouse.element.removeEventListener('wheel', mouse.mousewheel);

        Events.on(engine, 'beforeUpdate', () => {
            Matter.Body.setPosition(cursor, {
                x: cursor.position.x + ((mouse.position.x - cursor.position.x) * 0.25),
                y: cursor.position.y + ((mouse.position.y - cursor.position.y) * 0.25)
            });
        });

        render.mouse = mouse;
        
        MatterRender.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
        });
        
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(world);
            Engine.clear(engine);
            if (render.canvas) {
                render.canvas.remove();
            }
            render.textures = {};
        };
    }, []);
    
    return (
        <div ref={sceneRef}
            className='matter-scene'></div>
    );
};

export default MatterScene;