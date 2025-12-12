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
    
    const [wiringSchematics, joltageRequirements] = rest.split(' {');
    const wiringSchematicsArr = wiringSchematics.split(' ').map((e) => {
        e = e.slice(1);
        e = e.slice(0, -1);
        return e.split(',').map(Number);
    });
    
    const combinationsSoFar = new Set(wiringSchematicsArr.map(e => e.join(',')));
    // console.log("combinationsSoFar: ", combinationsSoFar);
    let currentCombinations = [...wiringSchematicsArr];
    let numPresses = 1;
    // console.log("indicatorIndices: ", indicatorIndices);
    while (!combinationsSoFar.has(indicatorIndices)) {
        const newCombinations = [];
        // console.log("currentCombinations: ", currentCombinations);
        for (const combination of currentCombinations) {
            for (const wiringSchematic of wiringSchematicsArr) {
                // console.log("combination: ", combination);
                // console.log("wiringSchematic: ", wiringSchematic);
                let newCombination = combination.slice(); // Clone the array
                let wiringSchematicClone = wiringSchematic.slice();
                
                const indicesToSplice = [];
                for (let i = 0; i < wiringSchematic.length; i++) {
                    // console.log("checking: ", wiringSchematic[i]);
                    if (newCombination.includes(wiringSchematic[i])) {
                        // console.log("found duplicate");
                        const indexToSplice = newCombination.indexOf(wiringSchematic[i]);
                        newCombination.splice(indexToSplice, 1);
                        indicesToSplice.push(i);
                    } 
                }
                
                for (let i = indicesToSplice.length - 1; i >= 0; i--) {
                    wiringSchematicClone.splice(indicesToSplice[i], 1);
                }
                
                // console.log("wiringSchematicClone here: ", wiringSchematicClone);
                
                newCombination = newCombination.concat(wiringSchematicClone).toSorted((a, b) => a - b);
                
                // console.log("newCombiantion after splice and concat: ", newCombination);
                if (newCombination.length !== 0 && !combinationsSoFar.has(newCombination.join(','))) {
                    // console.log("new combination found: ", newCombination);
                    newCombinations.push(newCombination);
                    combinationsSoFar.add(newCombination.join(','));
                    // console.log("combinationsSoFar updated: ", combinationsSoFar);
                }
                
                // console.log("combination here: ", combination);
            }
        }
        numPresses++;
        // console.log("numPresses: ", numPresses);
        // console.log("combinationsSoFar.size: ", combinationsSoFar.size);
        currentCombinations = newCombinations.slice();
        // break;
    }
    totalPresses += numPresses;
}

console.log(totalPresses)