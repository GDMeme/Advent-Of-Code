use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt")
        .expect("Should have been able to read the file");

    let mut numbers: Vec<i32> = contents
        .split(',')
        .map(|s| s.parse::<i32>().expect("Not a number"))
        .collect();
    
    numbers[1] = 12;
    numbers[2] = 2;
    
    let mut idx = 0;
    while numbers[idx] != 99 {
        let op = numbers[idx];
        
        // Vector indexing requires usize, cannot index with i32
        let a = numbers[idx + 1] as usize;
        let b = numbers[idx + 2] as usize;
        let c = numbers[idx + 3] as usize;

        if op == 1 {
            numbers[c] = numbers[a] + numbers[b];
        } else if op == 2 {
            numbers[c] = numbers[a] * numbers[b];
        } else {
            panic!("Unknown opcode {}", op);
        }

        idx += 4;
    }
    
    println!("{}", numbers[0]);
}