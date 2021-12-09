#include <iostream>
#include <fstream>
#include <vector>

int main(){
    std::ifstream inFile;
    int grid[100][100];
    inFile.open (".\\input.txt");
    std::string temp{""};
    for (int i = 0; i < 100; i++){
        inFile >> temp;
        for (int j = 0; j < 100; j++){
            grid[i][j] = temp[j] - 48;
        }
    }
    inFile.close();
    int sum{};
    for (int i = 0; i < 100; i++){
        for (int j = 0; j < 100; j++){
            if (i == 0){
                if (j == 0){ // top left corner
                    if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                        sum += grid[i][j] + 1;
                    }
                } else if (j == 99){ // top right corner
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i+1][j])){
                        sum += grid[i][j] + 1;
                    }
                } else { // top row
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                        sum += grid[i][j] + 1;
                    }
                }
            } else if (i == 99){
                if (j == 0){ // bottom left corner
                    if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j])){
                        sum += grid[i][j] + 1;
                    }
                } else if (j == 99){ // bottom right corner
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i-1][j])){
                        sum += grid[i][j] + 1;
                    }
                } else { // bottom row
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j])){
                        sum += grid[i][j] + 1;
                    }
                }
            } else if (j == 0){ // left column
                if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j]) && (grid[i][j] < grid[i+1][j])){
                    sum += grid[i][j] + 1;
                }
            } else if (j == 99){ // right column
                if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i+1][j]) && (grid[i][j] < grid[i-1][j])){
                    sum += grid[i][j] + 1;
                }
            } else {
                if ((grid[i][j] < grid[i-1][j]) && (grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                    sum += grid[i][j] + 1;
                }
            }
        }
    }
    std::cout << "final answer: " << sum; 
}