const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(points) {
    const n = points.length;
    let c = 0;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];
        let li = 1;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                li *= (0 - points[j][0]) / (xi - points[j][0]);
            }
        }
        c += li * yi;
    }
    return Math.round(c);
}

function main(inputFilePath) {
    const data = JSON.parse(fs.readFileSync(inputFilePath));
    const n = data.keys.n;
    const k = data.keys.k;
    
    const points = [];
    
    for (let i = 1; i <= n; i++) {
        const base = data[i].base;
        const value = data[i].value;
        const x = i; 
        const y = decodeValue(base, value);
        points.push([x, y]);
    }

    const constantTerm = lagrangeInterpolation(points);
    console.log("The constant term c is:", constantTerm);

main('testcase1.json'); 
