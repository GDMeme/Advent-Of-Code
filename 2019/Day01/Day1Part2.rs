use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt")
        .expect("Should have been able to read the file");

    let mut result = 0;
    for line in contents.lines() {
        let mut total_fuel = 0;
        let mut curr_fuel: i32 = line.parse().expect("Not a number");
        while curr_fuel > 8 {
            curr_fuel = curr_fuel / 3 - 2;
            total_fuel += curr_fuel;
        }
        result += total_fuel;
    }
    println!("{}", result);
}