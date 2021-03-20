const sudokuEl = document.getElementById('sudoku');
sudokuEl.hidden = true;
const canvas = document.createElement('canvas');

canvas.width = 450;
canvas.height = 450;
const ctx = canvas.getContext("2d");

// create sudoku representation
let cells = [];
for (let i=0; i<9; i++) {
    cells.push([]);
}

// read sudoku
const sudokuString = sudokuEl.innerText;
let row = 0;
let col = 0;
for (let c=0; c<sudokuString.length; c++) {
    const char = sudokuString.charAt(c);
    if (char >= '1' && char <= '9') {
        cells[row][col] = char - '0';
        col++;
    }
    else if (char === '_') {
        col++;
    }
    if (col >= 9) {
        col = 0;
        row ++;
        if (row >= 9) {
            break;
        }
    }
}

// draw grid lines
for (let i=0; i<=9; i++) {
    if (i % 3 === 0) {
        ctx.lineWidth = 4;
    } else {
        ctx.lineWidth = 1;
    }
    // Draw vertical lines
    ctx.beginPath();
    ctx.moveTo(i * canvas.width / 9, 0);
    ctx.lineTo(i * canvas.width / 9, canvas.height);
    ctx.stroke();

    // Draw horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, i * canvas.height / 9);
    ctx.lineTo(canvas.width,i * canvas.height / 9);
    ctx.stroke();
}

// draw numbers
const fontSize = 0.8 * canvas.height / (9);
for (let row=0; row<9; row++) {
    for (let col=0; col<9; col++) {
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let x = (col + 0.5) * canvas.width / 9;
        let y = (row + 0.58) * canvas.height / 9;
        const cell = cells[row][col];
        if (cell !== undefined) {
            ctx.fillText(cells[row][col], x, y);
        }
    }
}

document.body.append(canvas);
