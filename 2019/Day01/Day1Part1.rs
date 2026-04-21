use std::fs;

fn main() {
    let contents = fs::read_to_string("input.txt")
        .expect("Should have been able to read the file");

    let mut result = 0;
    for line in contents.lines() {
        let number: i32 = line.parse().expect("Not a number");
        result += number / 3 - 2;
    }
    println!("{}", result);
}