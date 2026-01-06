const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const workflowMap = new Map();

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '') {
        break;
    }

    const workflow = arr[i].match(/^([A-Za-z]+)\{/)[1];
    const match = arr[i].match(/\{([^}]*)\}/);
    const conditions = match[1].split(',');

    workflowMap.set(workflow, conditions);
}

function cloneRanges(ranges) {
    return JSON.parse(JSON.stringify(ranges));
}

function applyCondition(ranges, cond, negate = false) {
    const newRanges = cloneRanges(ranges);
    const key = cond[0];
    const op = cond[1];
    const value = parseInt(cond.slice(2));

    let [lo, hi] = newRanges[key];

    if (!negate) {
        if (op === '>') {
            lo = Math.max(lo, value + 1);
        } else {
            hi = Math.min(hi, value - 1);
        }   
    } else {
        if (op === '>') {
            hi = Math.min(hi, value);
        } else {
            lo = Math.max(lo, value);
        }
    }

    if (lo > hi) {
        return null;
    }

    newRanges[key] = [lo, hi];
    return newRanges;
}

function countCombinations(ranges) {
    return Object.values(ranges)
        .map(([lo, hi]) => hi - lo + 1)
        .reduce((a, b) => a * b, 1);
}

let total = 0;

function dfs(workflow, ranges) {
    if (!ranges) {
        return;
    }

    if (workflow === 'A') {
        total += countCombinations(ranges);
        return;
    }

    if (workflow === 'R') {
        return;
    }

    const rules = workflowMap.get(workflow);

    let remainingRanges = ranges;

    for (const rule of rules) {
        if (!rule.includes('<') && !rule.includes('>')) {
            dfs(rule, remainingRanges);
            return;
        }

        const [cond, next] = rule.split(':');

        // Condition true
        const trueRanges = applyCondition(remainingRanges, cond, false);
        dfs(next, trueRanges);

        // Condition false -> continue to next rule
        remainingRanges = applyCondition(remainingRanges, cond, true);
        
        if (!remainingRanges) {
            return;
        }
    }
}

dfs('in', {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000]
});

console.log(total);