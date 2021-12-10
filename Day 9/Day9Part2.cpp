#include <iostream>
#include <fstream>
#include <vector>
#include <cmath>
#include <set>

class Point {
    public:
        int xValue;
        int yValue;
        Point(int x, int y){
            this->xValue = x;
            this->yValue = y;
        }
};

bool position_valid(Point *p_new_point, std::vector<Point> doNotVisit, int grid[5][10], int sizeGridX, int sizeGridY){
    for (int i = 0; i < doNotVisit.size(); i++){
        if ((p_new_point->xValue == doNotVisit[i].xValue) && (p_new_point->yValue == doNotVisit[i].yValue)){
            return false;
        }
        if ((p_new_point->xValue < 0) || (p_new_point->yValue < 0)){
            return false;
        }
        if ((p_new_point->xValue >= sizeGridX) || (p_new_point->yValue >= sizeGridY)){
            return false;
        }
        if (grid[p_new_point->yValue][p_new_point->xValue] == 9){
            return false;
        }
    }
    return true;
}

int main(){
    int sizeGridX{10};
    int sizeGridY{5};
    std::ifstream inFile;
    int grid[5][10];
    inFile.open (".\\input.txt");
    std::string temp{""};
    for (int i = 0; i < sizeGridY; i++){
        inFile >> temp;
        for (int j = 0; j < sizeGridX; j++){
            grid[i][j] = temp[j] - 48;
        }
    }
    inFile.close();
    std::vector <Point> checkPositions;
    for (int i = 0; i < sizeGridY; i++){
        for (int j = 0; j < sizeGridX; j++){
            if (i == 0){
                if (j == 0){ // top left corner
                    if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i+1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);

                    }
                } else if (j == sizeGridX-1){ // top right corner
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
            } else if (i == sizeGridY-1){
                if (j == 0){ // bottom left corner
                    if ((grid[i][j] < grid[i][j+1]) && (grid[i][j] < grid[i-1][j])){
                        Point *p_new_point {new Point{j, i}};
                        checkPositions.push_back(*p_new_point);
                    }
                } else if (j == sizeGridX-1){ // bottom right corner
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
            } else if (j == sizeGridX-1){ // right column
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
    int biggestSizes[3];
    int size{0};
    std::vector<Point> doNotVisit;
    while (checkPositions.size() != 0){
        size = 0;
        std::vector <Point> p_current_point;
        p_current_point.push_back(checkPositions[0]);
        while (p_current_point.size() != 0){
        // Check 4 cardinal directions
            for (int x = -1; x <= 1; x++) {
                for (int y = -1; y <= 1; y++) {
                    if (std::abs(x + y) != 1) {
                        continue;
                    }
                    Point *p_new_point {new Point{p_current_point[0].xValue + x, p_current_point[0].yValue + y}};
                    if (position_valid(p_new_point, doNotVisit, grid, sizeGridX, sizeGridY)) {
                        p_current_point.push_back(*p_new_point);
                        doNotVisit.push_back(*p_new_point);
                    }
                }
            }
            size += 1;
            doNotVisit.push_back(p_current_point[0]);
            p_current_point.erase(p_current_point.begin());
        }
        if (size > biggestSizes[0]){
            biggestSizes[0] = size;
        } else if (size == biggestSizes[0]){
            biggestSizes[2] = biggestSizes[1];
            biggestSizes[1] = size;
        } else if (size > biggestSizes[1]){
            biggestSizes[1] = size;
        } else if (size == biggestSizes[1]){
            biggestSizes[2] = size;
        } else if (size > biggestSizes[2]){
            biggestSizes[2] = size;
        }
        checkPositions.erase(checkPositions.begin());
    }
    for (int i = 0; i < 3; i++){
        std::cout << biggestSizes[i] << ", ";
    }
    std::cout << std::endl;
    int final_answer{1};
    for (int i = 0; i < 3; i++){
        final_answer *= biggestSizes[i];
    }
    std::cout << "final answer: " << final_answer;
}
