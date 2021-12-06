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
    int next_available{};
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
    int counter6{};
    int counter7{};
    int counter8{};
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
        } else if (input[i] == 6){
            counter6++;
        }
    } 
    int counter01{};
    int counter11{};
    int counter21{};
    int counter31{};
    int counter41{};
    int counter51{};
    int counter61{};
    int counter71{};
    int counter81{};
    for (int a = 0; a < days; a++){
        int new_fish{};
        if ((days+5)%7 == 0){
            new_fish = counter1;
            counter1 *= 2;
            counter81 += new_fish;
        }
        if ((days >= 11) && (days-11)%9 == 0){
            counter1 += counter81;
            counter81 = 0;
        }
        
    }
    std::cout << "final answer: " << input.size();
}