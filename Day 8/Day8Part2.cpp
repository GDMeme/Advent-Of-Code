#include <iostream>
#include <fstream>
#include <vector>

int main(){
    std::ifstream inFile;
    std::vector <std::string> input; // 800 elements
    inFile.open (".\\input.txt");
    std::vector <std::string> tempString; // 3000 elements
    std::string temp {""};
    while (inFile >> temp){
        tempString.push_back(temp);
    }
    inFile.close();
    for (int i = 11; i < tempString.size(); i = i + 15){
        for (int j = 0; j < 4; j++){
            input.push_back(tempString[i+j]);
        }
    }
    //         top
    // top left   top right
    //        middle
    // down left  down right 
    //         down
    int final_answer{};
    while (tempString.size() > 0){
        char top{'z'};
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
        } // finished the top number (a)
        std::string temp5Letter{""};
        std::string temp5Letter2{""};
        std::string temp5Letter3{""};
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
        char top_left{'z'};
        int tempComparison{0};
        for (int i = 0; i < 4; i++){
            for (int j = 0; j < 2; j++){
                if (temp4Letter[i] == notMatchingLetter[j]){
                    top_left = temp4Letter[i];
                    tempComparison = j;
                }
            }
        } // top left found (b)
        char bottom_left{'z'};
        if (tempComparison == 0){
            bottom_left = notMatchingLetter[1];
        } else {
            bottom_left = notMatchingLetter[0];
        } // down left found (e)
        std::vector <char> tempArray; // stores c, d, and f
        for (int i = 0; i < 4; i++){
            if (temp4Letter[i] != top_left){
                tempArray.push_back(temp4Letter[i]);
            }
        }

        bool found3{false};
        char middle{'z'};
        for (int i = 0; i < tempArray.size(); i++){
            for (int j = 0; j < 2; j++){
                if (tempArray[i] == temp2Letter[j]){
                    found3 = true;
                }
            }
            if (found3 == false){
                middle = tempArray[i];
                break;
            }
            found3 = false;
        } // middle found
        std::vector <char> comparisonArray2{'a', 'b', 'c', 'd', 'e', 'f', 'g'};
        int i{0};
        while (comparisonArray2.size() != 3){
            if (comparisonArray2[i] == top){
                comparisonArray2.erase(comparisonArray2.begin()+i);
            } else if (comparisonArray2[i] == top_left){
                comparisonArray2.erase(comparisonArray2.begin()+i);
            } else if (comparisonArray2[i] == bottom_left){
                comparisonArray2.erase(comparisonArray2.begin()+i);
            } else if (comparisonArray2[i] == middle){
                comparisonArray2.erase(comparisonArray2.begin()+i);
            } else {
                i++;
            }
        }
        
        bool found4{false};
        char down{'z'};
        for (int i = 0; i < comparisonArray2.size(); i++){
            for (int j = 0; j < 3; j++){
                if (comparisonArray2[i] == temp3Letter[j]){
                    found4 = true;
                }
            }
            if (found4 == false){
                down = comparisonArray2[i];
                break;
            }
            found4 = false;
        } // found down (g)
        
        int j{0};
        while (comparisonArray2.size() != 2){
            if (comparisonArray2[j] == down){
                comparisonArray2.erase(comparisonArray2.begin() + j);
                break;
            }
            j++;
        }
        // comparisonArray2 has c and f
        bool found5{false};

        std::vector <std::string> temp5Letters{temp5Letter, temp5Letter2, temp5Letter3};
        // find the number 5 out of the 3 temp5Letters and remove it from temp5Letters
        for (int i = 0; i < 5; i++){
            if (top_left == temp5Letter[i]){
                found5 = true;
            }
        }
        if (found5 == true){
            temp5Letters.erase(temp5Letters.begin());
        } else {
            for (int i = 0; i < 5; i++){
                if (top_left == temp5Letter2[i]){
                    found5 = true;
                }
            }
            if (found5 == true){
                temp5Letters.erase(temp5Letters.begin()+1);
            } else {
                temp5Letters.erase(temp5Letters.begin()+2);
            }
        }
        // assume that comparisonArray2[0] = top_right
        bool found6{false};
        char top_right{'z'};
        char bottom_right{'z'};
        for (int i = 0; i < 5; i++){
            if (temp5Letters[0][i] == comparisonArray2[0]){
                for (int j = 0; j < 5; j++){
                    if (temp5Letters[1][j] == comparisonArray2[0]){ // found top right in both 2 and 3
                        top_right = comparisonArray2[0];
                        bottom_right = comparisonArray2[1];
                    }
                }
            }
        }
        if (top_right == 'z'){
            top_right = comparisonArray2[1];
            bottom_right = comparisonArray2[0];
        }

        int fourDigitNumber[4]{0,0,0,0};
        for (int i = 0; i < 4; i++){ // 4 inputs
            if (input[i].size() == 2){
                fourDigitNumber[i] = 1;
            } else if (input[i].size() == 3){
                fourDigitNumber[i] = 7;
            } else if (input[i].size() == 4){
                fourDigitNumber[i] = 4;
            } else if (input[i].size() == 5){
                for (int j = 0; j < input[i].size(); j++){
                    if (top_left == char(input[i][j])){
                        fourDigitNumber[i] = 5;
                        break;
                    }
                }
                if (fourDigitNumber[i] != 5){
                    for (int j = 0; j < input[i].size(); j++){
                        if (bottom_right == char(input[i][j])){
                            fourDigitNumber[i] = 3;
                            break;
                        }
                        if (bottom_left == char(input[i][j])){
                            fourDigitNumber[i] = 2;
                            break;
                        }
                    }
                }
                if (fourDigitNumber[i] == 0) {
                    std::cout << "how did u get here";
                }
            } else if (input[i].size() == 6){
                bool found6{false};
                for (int j = 0; j < input[i].size(); j++){
                    if (middle == char(input[i][j])){
                        found6 = true;
                    }
                }
                if (found6 == false){
                    fourDigitNumber[i] = 0;
                } else {
                    for (int j = 0; j < input[i].size(); j++){
                        if (top_right == input[i][j]){
                            fourDigitNumber[i] = 9;
                            break;
                        }
                        if (bottom_left == input[i][j]){
                            fourDigitNumber[i] = 6;
                            break;
                        }
                    }
                }
            } else if (input[i].size() == 7){
                fourDigitNumber[i] = 8;
            } else {
                std::cout << "how did u get here?" << std::endl;
            }
        } 
        tempString.erase(tempString.begin(), tempString.begin()+15);
        input.erase(input.begin(), input.begin() + 4);
        final_answer += (1000*fourDigitNumber[0]) + (100*fourDigitNumber[1]) + (10*fourDigitNumber[2]) + (fourDigitNumber[3]);
    }   
    std::cout << "final answer: " << final_answer << std::endl;
}