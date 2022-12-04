#include <iostream>
#include <fstream>

bool didYouWin(int all_boards[1000][5][5][2], int winning_board){
    bool result{false};
    for (int j = 0; j < 5; j++){
        for (int k = 0; k < 5; k++){
            if (all_boards[winning_board][j][k][1] == -1){
                result = true;
            } else {
                result = false;
                break;
            }
        }
        if (result == true){
            return result;
        }
    }
    for (int k = 0; k < 5; k++){
        for (int j = 0; j < 5; j++){
            if (all_boards[winning_board][j][k][1] == -1){
                result = true;
            } else {
                result = false;
                break;
            }
        }
        if (result == true){
            return result;
        }

    }
    return false;
}

void winCondition(int all_boards[1000][5][5][2], int *iPosition, int *jPosition, int *kPosition, int *counter, bool win_boards[100]){
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
            if ((result == true) && (win_boards[i] == false)){
                *iPosition = i;
                *jPosition = j;
                win_boards[*iPosition] = true;
                *counter += 1;
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
            if ((result == true) && (win_boards[i] == false)){
                *iPosition = i;
                *kPosition = k;
                win_boards[*iPosition] = true;
                *counter += 1;
            }
        }
    }
}

int main(){
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
    bool win_boards[100] = {false};
    int counter{};
    for (int a = 0; a < 99; a++){ // go through all the bingo numbers
        winCondition(all_boards, &iPosition, &jPosition, &kPosition, &counter, win_boards); // check win condition
        if (counter == 99){
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
    int winning_board{};
    for (int a = 0; a < 100; a++){
        if (win_boards[a] == false){
            std::cout << "this board is the last one to win: " << a << std::endl;
            winning_board = a;
            for (int b = 0; b < 99; b++){
                if (didYouWin(all_boards, a) == true){
                    bingo_win_number = bingo_numbers[b-1];
                    break;
                }
                for (int j = 0; j < 5; j++){ // rows
                    for (int k = 0; k < 5; k++){ // columns
                        if (bingo_numbers[b] == all_boards[winning_board][j][k][0]){
                            all_boards[winning_board][j][k][1] = -1;
                        }
                    }
                }
            
            }
        }
    }
    std::cout << "The last number picked was: " << bingo_win_number << std::endl;
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            std::cout << all_boards[winning_board][i][j][0] << " ";
        }
        std::cout << std::endl;
    }
    std::cout << std::endl;
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            std::cout << all_boards[winning_board][i][j][1];
        }
        std::cout << std::endl;
    }
    int sum{};
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            if (all_boards[winning_board][i][j][1] == -2){
                sum += all_boards[winning_board][i][j][0];
            }
        }
    }
    int final_answer{};
    final_answer = sum * bingo_win_number;
    std::cout << "final answer: " << final_answer;
} 