    use std::fs;

    fn main() {
        let contents = fs::read_to_string("input.txt")
            .expect("Should have been able to read the file");

        let numbers: Vec<i32> = contents
            .split(',')
            .map(|s| s.parse::<i32>().expect("Not a number"))
            .collect();
        
        for noun in 0..100 {
            for verb in 0..100 {
                let mut idx = 0;
                let mut current_numbers = numbers.clone();
                current_numbers[1] = noun;
                current_numbers[2] = verb;
                while current_numbers[idx] != 99 {
                    let op = current_numbers[idx];
                    
                    // Vector indexing requires usize, cannot index with i32
                    let a = current_numbers[idx + 1] as usize;
                    let b = current_numbers[idx + 2] as usize;
                    let c = current_numbers[idx + 3] as usize;

                    if op == 1 {
                        current_numbers[c] = current_numbers[a] + current_numbers[b];
                    } else if op == 2 {
                        current_numbers[c] = current_numbers[a] * current_numbers[b];
                    } else {
                        panic!("Unknown opcode {}", op);
                    }

                    idx += 4;
                }
                
                if current_numbers[0] == 19690720 {
                    println!("{}", 100 * noun + verb);
                    return;
                }
            }
        }
    }