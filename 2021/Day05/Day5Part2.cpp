#include <iostream>
#include <fstream>

int main(){
    std::ifstream inFile;
    int input[2000];
    inFile.open(".\\input.txt");
    int next_available{};
    std::string temp{};
    for (int i = 0; i < 2500; i++){
        if ((i+3)%5 != 0){
            inFile >> input[next_available];
            next_available++;
        } else{
            inFile >> temp;
        }
    }
    auto map = new int[1000][1000];
    bool negative{false};
    int number_of_marked{};
    int xPositive{};
    int yPositive{};
    bool negative1{false};
    bool negative2{false};
    for (int i = 0; i < 2000; i = i + 4){
        negative = false;
        negative1 = false;
        negative2 = false;
        if (input[i] == input[i+2]){ // the x values are equal
            number_of_marked = input[i+3] - input[i+1];
            if (number_of_marked < 0){
                number_of_marked = -number_of_marked;
                number_of_marked += 1;
                negative = true;
            } else{
                number_of_marked += 1;
            }
            for (int a = 0; a < number_of_marked; a++){ // mark the map
                if (negative == true){
                    map[input[i+3]+a][input[i]] += 1;
                } else{
                    map[input[i+1]+a][input[i]] += 1;
                }
            }
        } else if (input[i+1] == input[i+3]) { // the y values are equal
            number_of_marked = input[i+2] - input[i];
            if (number_of_marked < 0){
                number_of_marked = -number_of_marked;
                number_of_marked += 1;
                negative = true;
            } else{
                number_of_marked += 1;
            }
            for (int a = 0; a < number_of_marked; a++){ // mark the map
                if (negative == true){
                    map[input[i+1]][input[i+2]+a] += 1;
                } else{
                    map[input[i+1]][input[i]+a] += 1;
                }
            }
        } else { // diagonal line
            xPositive = input[i+2] - input[i];
            yPositive = input[i+3] - input[i+1];
            if (xPositive < 0){
                xPositive = -xPositive;
                xPositive += 1;
                negative1 = true;
            } else{
                xPositive += 1;
            }
            if (yPositive < 0){
                yPositive = -yPositive;
                yPositive += 1;
                negative2 = true;
            } else{
                yPositive += 1;
            }
            for (int a = 0; a < yPositive; a++){ // mark the map
                if ((negative1 == true) && (negative2 == true)){
                    map[input[i+1]-a][input[i]-a] += 1;
                } else if ((negative1 == true) && (negative2 == false)){
                    map[input[i+1]+a][input[i]-a] += 1;
                } else if ((negative1 == false) && (negative2 == true)){
                    map[input[i+1]-a][input[i]+a] += 1;
                } else if ((negative1 == false) && (negative2 == false)){
                    map[input[i+1]+a][input[i]+a] += 1;
                } else {
                    std::cout << "how did u get here" << std::endl;
                }
            }
        }
    }
    int counter{};
    int counter2{};
    for (int i = 0; i < 1000; i++){
        for (int j = 0; j < 1000; j++){
            if (map[i][j] >= 2){
                counter += 1;
            } else if (map[i][j] >= 0){
                counter2 += 1;
            }
        }
    }
    std::cout << "Numbers greater than or equal to 2: " << counter << std::endl;
    std::cout << "Numbers less than 2: " << counter2;
    delete[] map;
}
