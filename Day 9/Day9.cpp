#include <iostream>
#include <fstream>
#include <vector>

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
    for (int i = 0; i < checkPositions.size(); i++){
        std::cout << checkPositions[i].xValue << checkPositions[i].yValue << std::endl;
    }
}