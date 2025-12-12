const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

let totalPresses = 0;
for (let j = 0; j < arr.length; j++) {
    arr[j] = arr[j].slice(1); // Remove [
    arr[j] = arr[j].slice(0, -1);
    const [indicatorLights, rest] = arr[j].split('] ');
    
    indicatorIndices = [];
    for (let i = 0; i < indicatorLights.length; i++) {
        if (indicatorLights[i] === '#') {
            indicatorIndices.push(i);
        }
    }
    indicatorIndices = indicatorIndices.join(',');
    
    let [wiringSchematics, joltageRequirements] = rest.split(' {');
    const wiringSchematicsArr = wiringSchematics.split(' ').map((e) => {
        e = e.slice(1);
        e = e.slice(0, -1);
        return e.split(',').map(Number);
    });
    
    const wiringSchematicsSet = new Set(wiringSchematicsArr.map(e => e.join(',')));
    
    const joltageLength = joltageRequirements.split(',').length;
    
    // console.log("currentCombinations: ", currentCombinations);
    // const joltagesSoFar = new Set();
    const goal = Array(joltageLength).fill(0).join(',');
    let numPresses = 0;
    // console.log("indicatorIndices: ", indicatorIndices);
    const joltageArr = joltageRequirements.split(',').map(Number);
    let currentJoltages = Array(joltageArr.slice());
    console.log(currentJoltages)
    let found = false;
    // while (!found && !joltagesSoFar.has(goal)) {
    while (!found) {
        const newJoltages = [];
        for (const joltage of currentJoltages) {
            let allInvalid = true;
            for (const wiringSchematic of wiringSchematicsArr) {
                if (found) {
                    break;
                }
                let invalid = false;
                let newJoltage = joltage.slice();
                for (const num of wiringSchematic) {
                    newJoltage[num]--;
                    if (newJoltage[num] < 0) {
                        // console.log("found invalid");
                        // joltagesSoFar.add(joltage.join(','));
                        invalid = true;
                        break;
                    }
                    allInvalid = false;
                }
                
                // if (!invalid && !joltagesSoFar.has(newJoltage.join(','))) {
                if (!invalid) {
                    // console.log("new combination found: ", newCombination);
                    const firstNonZeroElement = newJoltage.find(e => e > 0);
                    if (newJoltage.every(e => e === firstNonZeroElement || e === 0)) {
                        console.log("possible shortcut found!");
                        const wiringSchematicToFind = [];
                        for (let i = 0; i < newJoltage.length; i++) {
                            if (newJoltage[i] === firstNonZeroElement) {
                                wiringSchematicToFind.push(i);
                            }
                        }
                        
                        // Found solution
                        if (wiringSchematicsSet.has(wiringSchematicToFind.join(','))) {
                            console.log("shortcut!");
                            numPresses += firstNonZeroElement - 1;
                            // joltagesSoFar.add(newJoltage.join(','));
                            found = true;
                            break;
                        }
                    }
                    newJoltages.push(newJoltage);
                    // joltagesSoFar.add(newJoltage.join(','));
                }
            }
            if (allInvalid) {
                // joltagesSoFar.add(joltage.join(','));
            }
            
            if (found) {
                break;
            }
        }
        numPresses++;
        currentJoltages = newJoltages.slice();
        // console.log("combinationsSoFar.size", combinationsSoFar.size);
    }
    console.log("numPresses: ", numPresses);
    
    totalPresses += numPresses;
}

console.log(totalPresses);