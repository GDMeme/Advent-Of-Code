#include <iostream>
#include <fstream>

int main(){ // 100 bingo boards
    std::ifstream inFile;
    inFile.open(".\\input.txt");
    int all_boards[100][5][5][2];
    for (int i = 0; i < 100; i++){ // total number of boards
        for (int j = 0; j < 5; j++){ // rows
            for (int k = 0; k < 5; k++){ // columns
                inFile >> all_boards[i][j][k][0];
                all_boards[i][j][k][1] = -2; // -2 means unmarked, -1 means marked
            }
        }
    }
    int bingo_numbers[99];
    for (int i = 0; i < 100; i++){
        inFile >> bingo_numbers[i];
    }
    std::cout << bingo_numbers[99];
}