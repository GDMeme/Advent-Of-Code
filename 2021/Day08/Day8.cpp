#include <iostream>
#include <fstream>
#include <vector>
#include <string.h>
int main(){
    std::ifstream inFile;
    std::string input[800];
    inFile.open (".\\input.txt");
    std::string tempString[3000];
    std::string line {""};
    int next_available{};
    for (int i = 0; i < 3000; i++){
        inFile >> tempString[i];
        if ((i+4)%15 == 0){
            for (int j = 0; j < 4; j++){
                input[next_available] = tempString[i];
                next_available++;
                i++;
                inFile >> tempString[i];
            }
        }
    }
    int counter{};
    for (int i = 0; i < 800; i++){
        if (input[i].length() == 2){
            counter++;
        } else if (input[i].length() == 4){
            counter++;
        } else if (input[i].length() == 3){
            counter++;
        } else if (input[i].length() == 7){
            counter++;
        }
    }
    std::cout << "final answer: " << counter;
}   