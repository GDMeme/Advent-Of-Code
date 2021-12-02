#include <iostream>
#include <fstream>

int main(){
    std::ifstream inFile;
    inFile.open(".\\input.txt");
    std::string input[2000];
    for (int i = 0; i < 2000; i++){
        (inFile >> input[i]);
    } 
    int forward{};
    int aim{};
    int depth{};
    for (int i = 0; i < 2000; i = i+2){
        if (input[i] == "forward"){
            forward = forward + std::stoi(input[i+1]);
            depth = depth + (aim * std::stoi(input[i+1]));
        } else if (input[i] == "down"){
            aim = aim + std::stoi(input[i+1]);
        } else if (input[i] == "up"){
            aim = aim - std::stoi(input[i+1]);
        }  
    } 
    std::cout << (forward * depth);
}