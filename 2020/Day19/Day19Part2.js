const { readFileSync } = require("fs");

const arr = readFileSync("./input.txt", "utf-8").split(/\r?\n/);

const rules = {};
let i = 0;

while (arr[i] !== "") {
    const [id, rule] = arr[i].split(": ");
    rules[id] = rule;
    i++;
}

const messages = arr.slice(i + 1);

const cache = {};

function buildRegex(ruleId) {
    if (cache[ruleId]) {
        return cache[ruleId];
    }

    if (ruleId === "8") {
        const r42 = buildRegex("42");
        return cache[ruleId] = `(${r42})+`;
    }

    if (ruleId === "11") {
        const r42 = buildRegex("42");
        const r31 = buildRegex("31");

        const parts = [];
        const MAX = 10; // Guess a reasonable upper limit for recursion depth

        // Add more rules
        for (let n = 1; n <= MAX; n++) {
            parts.push(
                `${r42.repeat(n)}${r31.repeat(n)}`
            );
        }

        return cache[ruleId] = `(${parts.join("|")})`;
    }

    const rule = rules[ruleId];

    if (rule.includes('"')) {
        return cache[ruleId] = rule.replace(/"/g, "");
    }

    const parts = rule.split(" | ");
    const built = parts.map(p =>
        p.split(" ").map(buildRegex).join("")
    );

    return cache[ruleId] = built.length === 1 ? built[0] : `(${built.join("|")})`;
}

const regex0 = buildRegex("0");
const fullRegex = new RegExp(`^${regex0}$`);

let count = 0;
for (const msg of messages) {
    if (fullRegex.test(msg)) {
        count++;
    }
}

console.log(count);
