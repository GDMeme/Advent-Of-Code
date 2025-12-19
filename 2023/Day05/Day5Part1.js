const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let seeds = arr[0].split(": ").slice(1)[0].split(" ").map(e => Number(e));

let seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation

let firstIndex = arr.indexOf("seed-to-soil map:");
let lastIndex = firstIndex;
while (arr[lastIndex] != "") {
    lastIndex++;
}
seedToSoil = arr.slice(firstIndex + 1, lastIndex);
let stsDest = seedToSoil.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let stsSource = seedToSoil.map(e => e.split(" ")[1]).map(e => Number(e));
let stsRange = seedToSoil.map(e => e.split(" ")[2]).map(e => Number(e));

firstIndex = arr.indexOf("soil-to-fertilizer map:");
lastIndex = firstIndex;
while (arr[lastIndex] != "") {
    lastIndex++;
}
soilToFertilizer = arr.slice(firstIndex + 1, lastIndex);
let stfDest = soilToFertilizer.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let stfSource = soilToFertilizer.map(e => e.split(" ")[1]).map(e => Number(e));
let stfRange = soilToFertilizer.map(e => e.split(" ")[2]).map(e => Number(e));

firstIndex = arr.indexOf("fertilizer-to-water map:");
lastIndex = firstIndex;
while (arr[lastIndex] != "") {
    lastIndex++;
}
fertilizerToWater = arr.slice(firstIndex + 1, lastIndex);
let ftwDest = fertilizerToWater.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let ftwSource = fertilizerToWater.map(e => e.split(" ")[1]).map(e => Number(e));
let ftwRange = fertilizerToWater.map(e => e.split(" ")[2]).map(e => Number(e));

firstIndex = arr.indexOf("water-to-light map:");
lastIndex = firstIndex;
while (arr[lastIndex] != "") {
    lastIndex++;
}
waterToLight = arr.slice(firstIndex + 1, lastIndex);
let wtlDest = waterToLight.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let wtlSource = waterToLight.map(e => e.split(" ")[1]).map(e => Number(e));
let wtlRange = waterToLight.map(e => e.split(" ")[2]).map(e => Number(e));

firstIndex = arr.indexOf("light-to-temperature map:");
lastIndex = firstIndex;
while (arr[lastIndex] != "") {
    lastIndex++;
}
lightToTemperature = arr.slice(firstIndex + 1, lastIndex);
let lttDest = lightToTemperature.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let lttSource = lightToTemperature.map(e => e.split(" ")[1]).map(e => Number(e));
let lttRange = lightToTemperature.map(e => e.split(" ")[2]).map(e => Number(e));

firstIndex = arr.indexOf("temperature-to-humidity map:");
lastIndex = firstIndex;
while (arr[lastIndex] != "") {
    lastIndex++;
}
temperatureToHumidity = arr.slice(firstIndex + 1, lastIndex);
let tthDest = temperatureToHumidity.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let tthSource = temperatureToHumidity.map(e => e.split(" ")[1]).map(e => Number(e));
let tthRange = temperatureToHumidity.map(e => e.split(" ")[2]).map(e => Number(e));

firstIndex = arr.indexOf("humidity-to-location map:");
lastIndex = arr.length - 1;
humidityToLocation = arr.slice(firstIndex + 1, lastIndex);
let htlDest = humidityToLocation.map(e => e.split(" ")[0]).map(e => Number(e)); // I couldn't think of a better way
let htlSource = humidityToLocation.map(e => e.split(" ")[1]).map(e => Number(e));
let htlRange = humidityToLocation.map(e => e.split(" ")[2]).map(e => Number(e));

let found = false;

let soil, fertilizer, water, light, temperature, humidity, location;
let smallestLocation = Number.MAX_SAFE_INTEGER;

console.log('hi')
for (let i = 0; i < seeds.length; i++) {
    for (let j = 0; j < stsSource.length; j++) {
        if (stsSource[j] <= seeds[i] && stsSource[j] + stsRange[j] - 1 >= seeds[i]) {
            found = true;
            soil = stsDest[j] - stsSource[j] + seeds[i];
        }
    }
    if (!found) {
        soil = seeds[i];
    }
    found = false;

    for (let j = 0; j < stfSource.length; j++) {
        if (stfSource[j] <= soil && stfSource[j] + stfRange[j] - 1 >= soil) {
            found = true;
            fertilizer = stfDest[j] - stfSource[j] + soil;
        }
    }
    if (!found) {
        fertilizer = soil;
    }
    found = false;

    for (let j = 0; j < ftwSource.length; j++) {
        if (ftwSource[j] <= fertilizer && ftwSource[j] + ftwRange[j] - 1 >= fertilizer) {
            found = true;
            water = ftwDest[j] - ftwSource[j] + fertilizer;
        }
    }
    if (!found) {
        water = fertilizer;
    }
    found = false;

    for (let j = 0; j < wtlSource.length; j++) {
        if (wtlSource[j] <= water && wtlSource[j] + wtlRange[j] - 1 >= water) {
            found = true;
            light = wtlDest[j] - wtlSource[j] + water;
        }
    }
    if (!found) {
        light = water;
    }
    found = false;

    for (let j = 0; j < lttSource.length; j++) {
        if (lttSource[j] <= light && lttSource[j] + lttRange[j] - 1 >= light) {
            found = true;
            temperature = lttDest[j] - lttSource[j] + light;
        }
    }
    if (!found) {
        temperature = light;
    }
    found = false;

    for (let j = 0; j < tthSource.length; j++) {
        if (tthSource[j] <= temperature && tthSource[j] + tthRange[j] - 1 >= temperature) {
            found = true;
            humidity = tthDest[j] - tthSource[j] + temperature;
        }
    }
    if (!found) {
        humidity = temperature;
    }
    found = false;

    for (let j = 0; j < htlSource.length; j++) {
        if (htlSource[j] <= humidity && htlSource[j] + htlRange[j] - 1 >= humidity) {
            found = true;
            location = htlDest[j] - htlSource[j] + humidity;
        }
    }
    if (!found) {
        location = humidity;
    }
    found = false;
    if (location < smallestLocation) {
        smallestLocation = location;
    }
}

console.log(smallestLocation)