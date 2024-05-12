import { oklabScaledNumber } from "./utils.js";

/**
 * @type {HTMLCanvasElement}
 */

/* 
Setup
*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas width and height to the browser window width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// set the fill style outside of our objects for performance, minimize setting this over and over again
ctx.fillStyle = "pink";

// resize the canvas if the user resizes the window
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    // reference to main `effect` object
    constructor(effect) {
        this.effect = effect;
        this.radius = Math.random() * 40 + 5;
        // keep the radius within the bounds of the window
        // ...to the new random x,y coordinate value, add the radius
        // ...and multiply this by the width of the canvas minus the radius of the circle * 2
        // this ensures the circles aren't off the edge of the canvas
        this.x =
            this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y =
            this.radius +
            Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        // using the new oklch color space.
        // l = lightness from 0 to 100%
        // c = chroma from gray to the most saturated color
        // h = hue angle 0 - 360
        // optional a = opacity 0 - 1 or 0 - 100%
        context.fillStyle = `oklch(70% 0.1 ${this.y})`;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    update() {
        // random velocity in x and y directions
        this.x += this.vx;
        this.y += this.vy;

        // bounce off the horizontal walls
        if (this.x > this.effect.width - this.radius || this.x < this.radius)
            this.vx *= -1;

        // bounce off the vertical walls
        if (this.y > this.effect.height - this.radius || this.y < this.radius)
            this.vy *= -1;
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 50;
        this.createParticles();
    }
    // runs once to intialize the effect
    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            // `this` within new Particle(this) refers to the Effect class that we are in
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context) {
        this.particles.forEach((particle) => {
            particle.draw(context);
            particle.update();
        });
    }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();
