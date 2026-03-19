import React, { Component, createRef, memo } from 'react';

let points = [];
let intervalLoop;

/// Mouse trail adapted from a jQuery Codepen by Bryan C (https://codepen.io/bryjch/pen/QEoXwA)
class Cursor extends Component {
    constructor(props) {
        super(props);

        this.canvas = createRef();
        this.lastSpawn = 0;

        this.addPoint = this.addPoint.bind(this);
        this.setSize = this.setSize.bind(this);
    };

    distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx * dx + dy * dy);
    };

    midPoint(a, b) {
        const mx = a.x + (b.x - a.x) * 0.5;
        const my = a.y + (b.y - a.y) * 0.5;

        return new Point(mx, my);
    };

    angle(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.atan2(dy, dx);
    };

    addPoint({ clientX, clientY }) {
        const now = performance.now();

        if (now - this.lastSpawn < 60) return;
        this.lastSpawn = now;

        const canvas = this.canvas.current;
        const jitter = () => (Math.random() - 0.5) * 20;

        for (let i = 0; i < 2; i++) {
            const point =
                new Point(
                    clientX - canvas.offsetLeft + jitter(),
                    clientY - canvas.offsetTop + jitter(),
                    0
                );
            points.push(point);
        };
    };

    animatePoints() {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');
        const duration = 180;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = points.length - 1; i >= 0; i--) {
            const point = points[i];
            point.lifetime++;

            if (point.lifetime > duration) {
                points.splice(i, 1);
                continue;
            };

            const lifePercent = point.lifetime / duration;
            const radius = 8 + lifePercent * 12;
            const alpha = 1 - lifePercent;

            point.y -= 0.2;

            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(137, 207, 240, ${alpha * 0.2})`;
            ctx.fill();

            ctx.closePath();
        };
    };

    setSize() {
        let elementCanvas = document.getElementById('cursor-canvas');
        elementCanvas.height = document.body.clientHeight;
        elementCanvas.width = document.body.clientWidth;
    };

    componentDidMount() {
        this.setSize();

        window.addEventListener('resize', this.setSize);
        document.addEventListener('mousemove', this.addPoint);

        if (matchMedia('(pointer:fine)').matches) {
            intervalLoop = setInterval(() => {
                this.animatePoints();
            }, 1000 / 60);
        };
    };

    componentWillUnmount() {
        clearInterval(intervalLoop);
        window.removeEventListener('resize', this.setSize);
        document.removeEventListener('mousemove', this.addPoint);
    };
    
    render() {
        return (
            <canvas id='cursor-canvas'
                ref={this.canvas}
                style={{
                    zIndex: 1,
                    pointerEvents: 'none'
                }}/>
        );
    };
};

class Point {
    constructor(x, y, lifetime) {
        this.x = x;
        this.y = y;
        this.lifetime = lifetime;
    };
};

export default memo(Cursor);