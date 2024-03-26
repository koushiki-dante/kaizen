import { Block, TBlock } from "./block";
import { Menu } from "./menu";

const PIXEL_RATIO = window.devicePixelRatio;
const canvasPlaceholder = document.querySelector('[data-role="canvas-placeholder"]') as HTMLDivElement;
const canvas = document.querySelector('[data-role="canvas"]') as HTMLCanvasElement;
const script = document.querySelector('[data-role="script"]') as HTMLDivElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const cos = Math.cos, sin = Math.sin, PI = Math.PI;
const DEGREE = PI / 180;

// State variables.
let WIDTH: number; 
let HEIGHT: number;
let position: { x: number, y: number };
let direction: number;
let visible: boolean;
let pen: boolean;
let color: string;

function onResize(e?: UIEvent) {
    WIDTH = canvasPlaceholder.getBoundingClientRect().width * PIXEL_RATIO;
    HEIGHT = canvasPlaceholder.getBoundingClientRect().height * PIXEL_RATIO;
    canvas.setAttribute('width', String(WIDTH));
    canvas.setAttribute('height', String(HEIGHT));
    canvas.style.top = `${canvasPlaceholder.getBoundingClientRect().top}px`;
    canvas.style.left = `${canvasPlaceholder.getBoundingClientRect().left}px`;
    canvas.style.width = `${WIDTH / PIXEL_RATIO}px`;
    canvas.style.height = `${HEIGHT / PIXEL_RATIO}px`;

    if (e) {
        Menu.runSoon();
    }
}

function reset() {
    recenter();
    direction = deg2rad(90); // Facing "up".
    visible = true;
    pen = true; // When pen is true we draw, otherwise we move without drawing.
    color = 'black';
}

function deg2rad(degrees: number): number { return DEGREE * degrees; }

function drawTurtle() {
    if (!visible) {
        return;
    }

    const userPen = pen; // Save pen state.

    penUp(); _moveForward(5); penDown();
    _turn(-150); _moveForward(12);
    _turn(-120); _moveForward(12);
    _turn(-120); _moveForward(12);
    _turn(30);
    penUp(); _moveForward(-5);

    if (userPen) {
        penDown(); // Restore pen state.
    }

}

function drawCircle(radius: number) {
    if (!visible) {
        return;
    }

    const userPen = pen; // Save pen state.
    const steps = Math.min(Math.max(6, Math.floor(radius / 2)), 360);
    const theta = 360 / steps;
    const side = radius * 2 * sin(PI / steps);

    penUp(); _moveForward(-radius); penDown();
    _turn(-90);
    _moveForward(side / 2);

    for (let i = 1; i < steps; i++) {
        _turn(theta); _moveForward(side);
    }

    _turn(theta); _moveForward(side / 2);
    _turn(90);
    penUp(); _moveForward(radius);

    if (userPen) {
        penDown(); // Restore pen state.
    }
}

function _moveForward(distance: number) {
    const start = position;

    position = {
        x: cos(direction) * distance * PIXEL_RATIO + start.x,
        y: -sin(direction) * distance * PIXEL_RATIO + start.y,
    };

    if (pen) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
    }
}

function penUp() { pen = false;  }
function penDown() { pen = true;  }
function hideTurtle() { visible = false;  }
function showTurtle() { visible = true;  }
function forward(block: TBlock) { _moveForward(Block.value(block) || 0); }
function back(block: TBlock) { _moveForward(-(Block.value(block) || 0)); }
function circle(block: TBlock) { drawCircle(Block.value(block) || 0); }
function _turn(degrees: number) { direction += deg2rad(degrees); }
function right(block: TBlock) { _turn(-(Block.value(block) || 0)); }
function left(block: TBlock) { _turn(Block.value(block) || 0); }
function recenter() { position = { x: WIDTH/2, y: HEIGHT/2 };  }

function clear() {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();
    reset();
    ctx.moveTo(position.x, position.y);
}

onResize();
clear();
drawTurtle();

Menu.item('Right', right, 5, 'Degrees');
Menu.item('Left', left, 5, 'Degrees');
Menu.item('Forward', forward, 10, 'Steps');
Menu.item('Back', back, 10, 'Steps');
Menu.item('Circle', circle, 20, 'Radius');
Menu.item('Pen Up', penUp);
Menu.item('Pen Down', penDown);
Menu.item('Back to Center', recenter);
Menu.item('Show Turtle', showTurtle);
Menu.item('Hide Turtle', hideTurtle);

script.addEventListener('beforeRun', clear); // Always clear canvas first.
script.addEventListener('afterRun', drawTurtle); // Show turtle if visible.
window.addEventListener('resize', onResize);
