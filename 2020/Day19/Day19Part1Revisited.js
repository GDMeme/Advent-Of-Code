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

    const rule = rules[ruleId];

    // Literal "a" or "b"
    if (rule.includes('"')) {
        const char = rule.replace(/"/g, "");
        cache[ruleId] = char;
        return char;
    }

    // Handle sequences and alternation
    const parts = rule.split(" | ");
    const builtParts = parts.map((part) =>
        part.split(" ").map(buildRegex).join("")
    );

    const result = builtParts.length === 1 ? builtParts[0] : `(${builtParts.join("|")})`;

    cache[ruleId] = result;
    return result;
}

const rule0Regex = buildRegex("0");
const fullRegex = new RegExp(`^${rule0Regex}$`);

let count = 0;
for (const msg of messages) {
    if (fullRegex.test(msg)) {
        count++;
    }
}

console.log(count);
