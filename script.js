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
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15;
    }
    /**
     *
     * @param {CanvasRenderingContext2D} context
     */
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 20;
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
        });
    }
}

const effect = new Effect(canvas);
effect.handleParticles(ctx);

function animate() {}
