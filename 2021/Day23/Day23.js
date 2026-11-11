import { MinHeap } from '../utils/MinHeap';

const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf-8').trim().split(/\r?\n/);

const ENERGY = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
};

const ROOM_TYPES = ["A", "B", "C", "D"];
const ROOM_ENTRANCES = [2, 4, 6, 8];
const HALLWAY_STOPS = [0, 1, 3, 5, 7, 9, 10];

const HALLWAY_LENGTH = 11;

function getRoomIndex(room, depth, roomDepth) {
    return HALLWAY_LENGTH + room * roomDepth + depth;
}

// Parse input into a flattened string
// Rooms are stored room-by-room, top-to-bottom
function parseInput(input, part2 = false) {
    const rows = part2
        ? [
            input[2],
            "  #D#C#B#A#",
            "  #D#B#A#C#",
            input[3]
        ]
        : [input[2], input[3]];

    const amphipods = [3, 5, 7, 9].flatMap(col =>
        rows.map(row => row[col])
    ).join("");

    return `...........${amphipods}`;
}

function getPossibleMoves(state, roomDepth) {
    const moves = [];

    // Check whether the hallway between two positions is clear
    // Starting position excluded, destination included
    function hallwayClear(start, end) {
        const direction = Math.sign(end - start);

        for (let i = start + direction; i !== end + direction; i += direction) {
            if (state[i] !== ".") {
                return false;
            }
        }

        return true;
    }

    // Find the deepest available position in a room
    // Returns -1 if the room contains an incorrect amphipod
    // or has no available space
    function getDestinationDepth(room, amphipod) {
        let destinationDepth = -1;

        for (let d = 0; d < roomDepth; d++) {
            const occupant = state[getRoomIndex(room, d, roomDepth)];

            if (occupant !== "." && occupant !== amphipod) {
                return -1;
            }

            if (occupant === ".") {
                destinationDepth = d;
            }
        }

        return destinationDepth;
    }

    // 1. HALLWAY -> ROOM
    for (let hallway = 0; hallway < HALLWAY_LENGTH; hallway++) {
        const amphipod = state[hallway];

        if (amphipod === ".") continue;

        const room = ROOM_TYPES.indexOf(amphipod);
        const entrance = ROOM_ENTRANCES[room];

        // Check hallway path
        if (!hallwayClear(hallway, entrance)) continue;

        // Check destination room
        const destinationDepth = getDestinationDepth(room, amphipod);

        if (destinationDepth === -1) continue;

        const steps = Math.abs(hallway - entrance) + destinationDepth + 1;

        const newState = state.split("");

        newState[hallway] = ".";
        newState[getRoomIndex(room, destinationDepth, roomDepth)] = amphipod;

        moves.push({
            state: newState.join(""),
            cost: steps * ENERGY[amphipod]
        });
    }

    // 2. ROOM -> ROOM / HALLWAY
    for (let room = 0; room < 4; room++) {
        const entrance = ROOM_ENTRANCES[room];
        const roomType = ROOM_TYPES[room];

        // Find topmost amphipod
        let sourceDepth = -1;
        let amphipod = null;

        for (let d = 0; d < roomDepth; d++) {
            const occupant = state[getRoomIndex(room, d, roomDepth)];

            if (occupant !== ".") {
                sourceDepth = d;
                amphipod = occupant;
                break;
            }
        }

        if (sourceDepth === -1) continue;

        // Check whether amphipod is already settled
        let settled = amphipod === roomType;

        if (settled) {
            for (let d = sourceDepth + 1; d < roomDepth; d++) {
                if (state[getRoomIndex(room, d, roomDepth)] !== amphipod) {
                    settled = false;
                    break;
                }
            }
        }

        if (settled) continue;

        // 2a. ROOM -> DESTINATION ROOM
        const destinationRoom = ROOM_TYPES.indexOf(amphipod);

        if (destinationRoom !== room) {
            const destinationEntrance = ROOM_ENTRANCES[destinationRoom];

            if (hallwayClear(entrance, destinationEntrance)) {
                const destinationDepth = getDestinationDepth(destinationRoom, amphipod);

                if (destinationDepth !== -1) {
                    const steps =
                        sourceDepth + 1 +
                        Math.abs(entrance - destinationEntrance) +
                        destinationDepth + 1;

                    const newState = state.split("");

                    newState[getRoomIndex(room, sourceDepth, roomDepth)] = ".";
                    newState[getRoomIndex(destinationRoom, destinationDepth, roomDepth)] = amphipod;

                    moves.push({
                        state: newState.join(""),
                        cost: steps * ENERGY[amphipod]
                    });
                }
            }
        }

        // 2b. ROOM -> HALLWAY
        for (const hallway of HALLWAY_STOPS) {
            if (!hallwayClear(entrance, hallway)) continue;

            const steps = sourceDepth + 1 + Math.abs(entrance - hallway);

            const newState = state.split("");

            newState[getRoomIndex(room, sourceDepth, roomDepth)] = ".";
            newState[hallway] = amphipod;

            moves.push({
                state: newState.join(""),
                cost: steps * ENERGY[amphipod]
            });
        }
    }

    return moves;
}

function isGoal(state, roomDepth) {
    const amphipods =
        "A".repeat(roomDepth) +
        "B".repeat(roomDepth) +
        "C".repeat(roomDepth) +
        "D".repeat(roomDepth);

    return state === `...........${amphipods}`;
}

function solve(initialState, roomDepth) {
    const heap = new MinHeap([], e => e.cost);
    const distances = new Map();

    heap.insert({
        state: initialState,
        cost: 0
    });

    distances.set(initialState, 0);

    while (heap.size() > 0) {
        const { state, cost } = heap.extractMin();

        if (cost > distances.get(state)) continue;

        if (isGoal(state, roomDepth)) {
            return cost;
        }

        // Explore possible moves
        for (const move of getPossibleMoves(state, roomDepth)) {
            const newCost = cost + move.cost;

            if (!distances.has(move.state) ||
                newCost < distances.get(move.state)) {

                distances.set(move.state, newCost);

                heap.insert({
                    state: move.state,
                    cost: newCost
                });
            }
        }
    }

    return -1;
}

// Part 1
const initialState = parseInput(input);
console.log("Part 1:", solve(initialState, 2));

// Part 2
const initialState2 = parseInput(input, true);
console.log("Part 2:", solve(initialState2, 4));
