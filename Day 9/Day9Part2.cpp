#include <iostream>
#include <fstream>
#include <vector>
#include <cmath>

class Point {
    public:
        int xValue;
        int yValue;
        Point(int x, int y){
            this->xValue = x;
            this->yValue = y;
        }
};

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
    std::vector <Point> checkPositions;
    for (int i = 0; i < 100; i++){
        for (int j = 0; j < 100; j++){
            if (i == 0){
                if (j == 0){ // top left corner
                    if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);

                    }
                } else if (j == 99){ // top right corner
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i+1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);
                    }
                } else { // top row
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);
                    }
                }
            } else if (i == 99){
                if (j == 0){ // bottom left corner
                    if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);
                    }
                } else if (j == 99){ // bottom right corner
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i-1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);
                    }
                } else { // bottom row
                    if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);
                    }
                }
            } else if (j == 0){ // left column
                if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j]) && (grid[i][j] < grid[i+1][j])){
                    Point *p_new_point {new Point{j, i}};
                    checkPositions.push_back(*p_new_point);
                }
            } else if (j == 99){ // right column
                if ((grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i+1][j]) && (grid[i][j] < grid[i-1][j])){
                    Point *p_new_point {new Point{j, i}};
                    checkPositions.push_back(*p_new_point);
                }
            } else {
                if ((grid[i][j] < grid[i-1][j]) && (grid[i][j] < grid[i][j-1]) && (grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                    Point *p_new_point {new Point{j, i}};
                    checkPositions.push_back(*p_new_point);
                }
            }
        }
    }
    while (checkPositions.size() != 0){
        // Check 4 cardinal directions
        for (int x = -1; x <= 1; x++) {
            for (int y = -1; y <= 1; y++) {
                if (std::abs(x + y) != 1) {
                    continue;
                }
                std::vector <Point> p_current_point;
                p_current_point.push_back(checkPositions[0]);
                if (position_valid(p_current_point[0].xValue, p_current_point[0].yValue)) { // not a 9
                // Do stuff
                }
            }
        }
        checkPositions.erase(checkPositions.begin());
    }
}
