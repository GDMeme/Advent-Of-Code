#include <iostream>
#include <fstream>

bool winCondition(int all_boards[1000][5][5][2], int *iPosition, int *jPosition, int *kPosition){
    bool result{false};
    for (int i = 0; i < 100; i++){ // check all rows
        for (int j = 0; j < 5; j++){
            for (int k = 0; k < 5; k++){
                if (all_boards[i][j][k][1] == -1){
                    result = true;
                } else {
                    result = false;
                    break;
                }
            }
            if (result == true){
                *iPosition = i;
                *jPosition = j;
                return result;
            }
        }
    }
    for (int i = 0; i < 100; i++){ // check all columns
        for (int k = 0; k < 5; k++){
            for (int j = 0; j < 5; j++){
                if (all_boards[i][j][k][1] == -1){
                    result = true;
                } else {
                    result = false;
                    break;
                }
            }
            if (result == true){
                *iPosition = i;
                *kPosition = k;
                return result;
            }
        }
    }
    return false;
}

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
    for (int i = 0; i < 99; i++){
        inFile >> bingo_numbers[i];
    }
    int iPosition{-1};
    int jPosition{-1};
    int kPosition{-1};
    int bingo_win_number{};
    for (int a = 0; a < 99; a++){ // go through all the bingo numbers
        //std::cout << "one bingo number has been drawn" << std::endl;
        if (winCondition(all_boards, &iPosition, &jPosition, &kPosition) == true){ // check win condition
            std::cout << "bingo number value: " << bingo_numbers[a-1] << std::endl;
            bingo_win_number = bingo_numbers[a-1];
            break;
        }
        for (int i = 0; i < 100; i++){ // total number of boards
            for (int j = 0; j < 5; j++){ // rows
                for (int k = 0; k < 5; k++){ // columns
                    if (bingo_numbers[a] == all_boards[i][j][k][0]){
                        all_boards[i][j][k][1] = -1;
                    }
                }
            }
        }
    }
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            std::cout << all_boards[iPosition][i][j][0] << " ";
        }
        std::cout << std::endl;
    }
    std::cout << "board number: " << iPosition << "row number: " << jPosition << "or column number: " << kPosition << std::endl;
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            std::cout << all_boards[iPosition][i][j][1];
        }
        std::cout << std::endl;
    }
    int sum{};
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            if (all_boards[iPosition][i][j][1] == -2){
                sum += all_boards[iPosition][i][j][0];
            }
        }
    }
    int final_answer{};
    final_answer = sum * bingo_win_number;
    std::cout << "final answer: " << final_answer;
} 