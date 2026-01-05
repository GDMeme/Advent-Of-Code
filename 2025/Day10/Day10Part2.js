const { readFileSync, writeFileSync } = require('fs');
const { execFile } = require("child_process");

// Needs z3 folder unzipped in the Day10 directory
const Z3_PATH = "./z3-4.15.4-x64-win/bin/z3.exe";

function runZ3(smt) {
    return new Promise(async (resolve, reject) => {
        writeFileSync("temp.smt2", smt);
        execFile(Z3_PATH, ["temp.smt2"], (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

function parseInput(text) {
    const machines = [];
    for (const line of text.trim().split("\n")) {
        if (!line.trim()) continue;

        const diagram = line.match(/\[([.#]+)\]/)[1];
        const buttons = [...line.matchAll(/\(([^)]+)\)/g)].map((m) =>
            m[1].split(",").map((x) => parseInt(x, 10))
        );

        const jolts = line
            .match(/\{([^}]+)\}/)[1]
            .split(",")
            .map((x) => parseInt(x, 10));

        machines.push({ diagram, buttons, jolts });
    }
    return machines;
}

// Extract integer model value
function getModelInt(out, name) {
    const re = new RegExp(`\\(define-fun ${name} \\(\\) Int\\s+([0-9-]+)\\)`);
    const m = out.match(re);
    return m ? parseInt(m[1], 10) : null;
}

async function solvePart1(m, idx) {
    const target = [...m.diagram].map((c) => (c === "#" ? 1 : 0));
    const B = m.buttons.length;
    const L = target.length;

    let smt = "(set-option :produce-models true)\n";
    smt += "(declare-fun total () Int)\n";

    // Variables x_i
    for (let i = 0; i < B; i++) {
        smt += `(declare-fun x_${idx}_${i} () Int)\n`;
    }

    // Toggle equations
    for (let l = 0; l < L; l++) {
        smt += `(declare-fun k_${idx}_${l} () Int)\n`;
        smt += "(assert (= (+";

        for (let i = 0; i < B; i++) {
            const toggles = m.buttons[i].includes(l) ? 1 : 0;
            smt += ` (* x_${idx}_${i} ${toggles})`;
        }

        smt += `) (+ ${target[l]} (* k_${idx}_${l} 2))))\n`;
    }

    // x ≥ 0
    for (let i = 0; i < B; i++) {
        smt += `(assert (>= x_${idx}_${i} 0))\n`;
    }

    // Total expression
    smt += "(assert (= total (+";
    for (let i = 0; i < B; i++) {
        smt += ` x_${idx}_${i}`;
    }
    smt += ")))\n";

    smt += "(minimize total)\n(check-sat)\n(get-model)\n";

    const out = await runZ3(smt);

    // Sum values
    let sum = 0;
    for (let i = 0; i < B; i++) {
        const v = getModelInt(out, `x_${idx}_${i}`);
        if (v !== null) {
            sum += v;
        }
    }
    return sum;
}

async function solvePart2(m, idx) {
    const target = m.jolts;
    const B = m.buttons.length;
    const C = target.length;

    let smt = "(set-option :produce-models true)\n";
    smt += "(declare-fun total () Int)\n";

    // Variables
    for (let i = 0; i < B; i++) {
        smt += `(declare-fun x2_${idx}_${i} () Int)\n`;
    }

    // Sum equations
    for (let c = 0; c < C; c++) {
        smt += "(assert (= (+";
        for (let i = 0; i < B; i++) {
            const eff = m.buttons[i].includes(c) ? 1 : 0;
            smt += ` (* x2_${idx}_${i} ${eff})`;
        }
        smt += `) ${target[c]}))\n`;
    }

    // x ≥ 0
    for (let i = 0; i < B; i++) {
        smt += `(assert (>= x2_${idx}_${i} 0))\n`;
    }

    // Total
    smt += "(assert (= total (+";
    for (let i = 0; i < B; i++) {
        smt += ` x2_${idx}_${i}`;
    }
    smt += ")))\n";

    smt += "(minimize total)\n(check-sat)\n(get-model)\n";

    const out = await runZ3(smt);

    // Sum values
    let sum = 0;
    for (let i = 0; i < B; i++) {
        const v = getModelInt(out, `x2_${idx}_${i}`);
        if (v !== null) {
            sum += v;
        }
    }
    return sum;
}

async function solveAll(text) {
    const machines = parseInput(text);
    let p1 = 0,
        p2 = 0;

    for (let i = 0; i < machines.length; i++) {
        p1 += await solvePart1(machines[i], i);
        p2 += await solvePart2(machines[i], i);
    }

    return { part1: p1, part2: p2 };
}

const text = readFileSync("input.txt", "utf8");
(async () => {
    const { part1, part2 } = await solveAll(text);
    console.log("Part 1:", part1);
    console.log("Part 2:", part2);
})();