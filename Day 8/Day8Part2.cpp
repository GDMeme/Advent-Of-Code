#include <iostream>
#include <fstream>
#include <vector>
#include <string.h>
#include <sstream>
int main(){
    std::ifstream inFile;
    std::vector <std::string> input; // 800 elements
    inFile.open (".\\input.txt");
    std::vector <std::string> tempString; // 3000 elements
    int loop{5};
    std::string temp {""};
    while (inFile >> temp){
        tempString.push_back(temp);
    }
    inFile.close();
    for (int i = 11; i < 3000; i = i + 15){
        for (int j = 0; j < 5; j++){
            input.push_back(tempString[i+j]);
        }
    }
    // up
    // top left, top right,
    // middle
    // bottom left, bottom right 
    // down
    char top{};
    std::string temp2Letter{""};
    std::string temp3Letter{""};
    for (int i = 0; i < 10; i++){
        if (tempString[i].length() == 2){
            temp2Letter = tempString[i];
        } else if (tempString[i].length() == 3){
            temp3Letter = tempString[i];
        }
    }
    int position[2]{-1, -1};
    for (int i = 0; i < 2; i++){
        for (int j = 0; j < 3; j++){
            if (temp2Letter[i] == temp3Letter[j]){
                if (position[0] == -1){
                    position[0] = j;
                } else {
                    position[1] = j;
                }
            }
        }
    }
    int comparisonArray[3]{0, 1, 2};
    bool found{false};
    for (int i = 0; i < 3; i++){
        for (int j = 0; j < 2; j++){
            if (comparisonArray[i] == position[j]){
                found = true;
            }
        }
        if (found == false){
            top = temp3Letter[comparisonArray[i]];
            break;
        }
        found = false;
    } // finished the top number
    std::string temp5Letter{};
    std::string temp5Letter2{};
    std::string temp5Letter3{};
    for (int i = 0; i < 10; i++){
        if (tempString[i].length() == 5){
            if (temp5Letter == ""){
                temp5Letter = tempString[i];
            } else if (temp5Letter2 == ""){
                temp5Letter2 = tempString[i];
            } else {
                temp5Letter3 = tempString[i];
            }
        }
    }
    std::cout << temp5Letter << temp5Letter2 << temp5Letter3 << std::endl;
    std::vector <char> notMatchingLetter;
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            if (temp5Letter[i] == temp5Letter2[j] || temp5Letter[i] == temp5Letter3[j]){
                found = true;
            }
        }
        if (found == false){
            notMatchingLetter.push_back(temp5Letter[i]);
        }
        found = false;
    }
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            if (temp5Letter2[i] == temp5Letter[j] || temp5Letter2[i] == temp5Letter3[j]){
                found = true;
            }
        }
        if (found == false){
            notMatchingLetter.push_back(temp5Letter2[i]);
        }
        found = false;
    }
    for (int i = 0; i < 5; i++){
        for (int j = 0; j < 5; j++){
            if (temp5Letter3[i] == temp5Letter[j] || temp5Letter3[i] == temp5Letter2[j]){
                found = true;
            }
        }
        if (found == false){
            notMatchingLetter.push_back(temp5Letter3[i]);
        }
        found = false;
    } // not matching letter has b and e
    std::string temp4Letter{""};
    for (int i = 0; i < 10; i++){
        if (tempString[i].length() == 4){
            temp4Letter = tempString[i];
        }
    }
    char top_left{};
    for (int i = 0; i < 4; i++){
        for (int j = 0; j < 2; j++){
            if (temp4Letter[i] == notMatchingLetter[j]){
                top_left = temp4Letter[i];
            }
        }
    } // top left found





    /* // some 6 letter stuff that i did but im dumb
    std::string temp6Letter{};
    std::string temp6Letter2{};
    for (int i = 0; i < 10; i++){
        if (tempString[i].length() == 6){
            if (temp6Letter == ""){
                temp6Letter = tempString[i];
            } else {
                temp6Letter2 = tempString[i];
            }
        }
    }
    std::cout << temp6Letter << temp6Letter2 << std::endl;
    bool found2{false};
    std::vector <char> notMatchingLetters;
    for (int i = 0; i < 6; i++){
        for (int j = 0; j < 6; j++){
            if (temp6Letter[i] == temp6Letter2[j]){
                found = true;
            }
        }
        if (found == false){
            notMatchingLetters.push_back(temp6Letter[i]);
        }
        found = false;
    }
    std::cout << notMatchingLetters[0] << notMatchingLetters[1] << std::endl;
 */


    tempString.erase(tempString.begin(), tempString.begin()+15);
}   