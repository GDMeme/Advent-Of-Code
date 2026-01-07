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
    int days{80};
    for (int a = 0; a < days; a++){
        int input_size(input.size());
        for (int i = 0; i < input_size; i++){
            input[i] -= 1;
            if (input[i] == -1){
                input[i] = 6;
                input.push_back(8);
            }
        }
    }
    std::cout << "final answer: " << input.size();
}