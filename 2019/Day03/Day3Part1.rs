use std::fs;
use std::convert::TryInto;
use std::collections::HashSet;

fn main() {
    let contents = fs::read_to_string("input.txt")
        .expect("Should have been able to read the file");

    let [wire1, wire2]: [Vec<String>; 2] = contents
        .lines()
        .map(|s| s.split(',').map(|e| e.to_string()).collect())
        .collect::<Vec<_>>()
        .try_into() // Convert Vec<Vec<String>> to [Vec<String>; 2]
        .expect("Not enough lines");

    let mut points1: HashSet<(i32, i32)> = HashSet::new();
    let mut x = 0;
    let mut y = 0;
    for instruction in wire1 {
        let (dir, dist_str) = instruction.split_at(1);
        let dist: i32 = dist_str.parse().expect("Not a number");
        for _ in 0..dist {
            match dir {
                "R" => x += 1,
                "L" => x -= 1,
                "U" => y += 1,
                "D" => y -= 1,
                _ => panic!("Unknown direction {}", dir),
            }
            points1.insert((x, y));
        }
    }
    
    x = 0;
    y = 0;
    
    let mut points2: HashSet<(i32, i32)> = HashSet::new();
    for instruction in wire2 {
        let (dir, dist_str) = instruction.split_at(1);
        let dist: i32 = dist_str.parse().expect("Not a number");
        for _ in 0..dist {
            match dir {
                "R" => x += 1,
                "L" => x -= 1,
                "U" => y += 1,
                "D" => y -= 1,
                _ => panic!("Unknown direction {}", dir),
            }
            points2.insert((x, y));
        }
    }
    
    // cloned() to convert &i32 to i32
    println!("{}", points1.intersection(&points2)
        .cloned()
        .map(|(x, y)| x.abs() + y.abs())
        .min()
        .expect("No intersection"));    
}