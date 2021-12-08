#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

int main(){
    std::ifstream inFile;
    std::vector<int> input;
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
    int counter0{};
    int counter1{};
    int counter2{};
    int counter3{};
    int counter4{};
    int counter5{};
    int days{256};
    for (int i = 0; i < input.size(); i++){
        if (input[i] == 1){
            counter1++;
        } else if (input[i] == 2){
            counter2++;
        } else if (input[i] == 3){
            counter3++;
        } else if (input[i] == 4){
            counter4++;
        } else if (input[i] == 5){
            counter5++;
        }
    } 
    long long totalFish{};
    std::vector<long long int> fishArray{0, counter1, counter2, counter3, counter4, counter5, 0, 0, 0};
    for (int i = 0; i < days; i++){
        long long temp{fishArray[0] + fishArray[7]};
        long long temp2{fishArray[0]};
        fishArray[0] = fishArray[1];
        fishArray[1] = fishArray[2];
        fishArray[2] = fishArray[3];
        fishArray[3] = fishArray[4];
        fishArray[4] = fishArray[5];
        fishArray[5] = fishArray[6];
        fishArray[6] = temp;
        fishArray[7] = fishArray[8];
        fishArray[8] = temp2;
    }
    for (int i = 0; i < 9; i++){
        totalFish += fishArray[i];
    }

    std::cout << "Total fish: " << totalFish << std::endl;
}