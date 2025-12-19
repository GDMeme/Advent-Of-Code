#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

int main(){
    std::ifstream inFile;
    std::vector <int> input;
    inFile.open (".\\input.txt");
    std::string temp {""};
    std::string line {""};
    while (getline(inFile, line)){
        std::stringstream linestream(line);
        while (getline(linestream, temp, ',')){
            input.push_back(std::stoi(temp));
            temp = "";
        }
        inFile.close();
    }
    int max{};
    for (int i = 0; i < input.size(); i++){
        if (input[i] > max){
            max = input[i];
        }
    }
    int totalFuel{};
    int minTotalFuel{INT_MAX};
    for (int i = 0; i <= max; i++){
        for (int j = 0; j < input.size(); j++){
            totalFuel += abs(input[j] - i);
        }
        if (totalFuel < minTotalFuel){
            minTotalFuel = totalFuel;
        }
        totalFuel = 0;
    }
    std::cout << "the min total fuel is: " << minTotalFuel;
}