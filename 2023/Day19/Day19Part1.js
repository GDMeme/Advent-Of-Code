const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function categoryInCondition(categories, condition) {
    if (condition[1] === '>') {
        const [category, value] = condition.split('>');
        if (categories[category] > parseInt(value)) {
            return true;
        }
    } else {
        const [category, value] = condition.split('<');
        if (categories[category] < parseInt(value)) {
            return true;
        }
    }
    return false;
}

function extractNumbers(categories) {
    let sum = 0;
    for (const key in categories) {
        sum += categories[key];
    }
    return sum;
}

const workflowMap = new Map();

let newStartingIndex;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '') {
        newStartingIndex = i + 1;
        break;
    }
    
    const workflow = arr[i].match(/^([A-Za-z]+)\{/)[1];
    
    const match = arr[i].match(/\{([^}]*)\}/);
    const conditions = match[1].split(',');

    workflowMap.set(workflow, conditions);
}

let ans = 0;
for (let i = newStartingIndex; i < arr.length; i++) {
    const match = arr[i].match(/\{([^}]*)\}/);
    const categories = {};
    match[1].split(',').forEach(e => {
        const [category, value] = e.split('=');
        categories[category] = parseInt(value);
    });

    let currentWorkflow = 'in';
    let sorted = false;
    while (!sorted) {
        const conditions = workflowMap.get(currentWorkflow);
        for (const condition of conditions) {
            if (categoryInCondition(categories, condition) || (!condition.includes('>') && !condition.includes('<'))) {
                currentWorkflow = condition.includes(":") ? condition.split(':')[1] : condition;
                if (currentWorkflow === 'A' || currentWorkflow === 'R') {
                    if (currentWorkflow === 'A') {
                        ans += extractNumbers(categories);
                    }
                    sorted = true;
                }
                break;
            }
        }
    }
}

console.log(ans);