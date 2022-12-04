#include <iostream>
#include <fstream>

int main(){ 
    std::ifstream inFile;
    inFile.open(".\\input.txt");
    std::string input[1000];
    int counter{};
    int delete_words{};
    std::string input2[1000];
    for (int i = 0; i < 1000; i++){
        inFile >> input[i];
        input2[i] = input[i];
    }
    for (int j = 0; j < 12; j++){
        counter = 0;
        if (delete_words == 999){
            break;
        }
        for (int i = 0; i < 1000 - delete_words; i++){
            if (input[i][j] == '1'){
                counter += 1;
            } else {
                counter -= 1;
            }
        }
        int temp{delete_words};
        if (counter >= 0){ // more 1's found
            for (int i = 0; i < 1000 - temp; i++){
                if (input[i][j] == '0'){
                    delete_words += 1;
                }
            }
            std::string new_input[1000 - delete_words];
            int next_available{0};
            for (int i = 0; i < 1000 - temp; i++){
                if (input[i][j] == '1'){
                    new_input[next_available] = input[i]; 
                    next_available += 1;
                }
            }
            for (int i = 0; i < 1000 - delete_words; i++){
                input[i] = new_input[i];
            }
        } else { // more 0's found
            for (int i = 0; i < 1000 - temp; i++){
                if (input[i][j] == '1'){
                    delete_words += 1;
                }
            }
            std::string new_input[1000 - delete_words];
            int next_available{0};
            for (int i = 0; i < 1000 - temp; i++){
                if (input[i][j] == '0'){
                    new_input[next_available] = input[i]; 
                    next_available += 1;
                }
            }
            for (int i = 0; i < 1000 - delete_words; i++){
                input[i] = new_input[i];
            }
        }
    }
    std::cout << input[0] << std::endl;
    delete_words = 0;
    for (int j = 0; j < 12; j++){
        counter = 0;
        if (delete_words == 999){
            break;
        }
        for (int i = 0; i < 1000 - delete_words; i++){
            if (input2[i][j] == '1'){
                counter += 1;
            } else {
                counter -= 1;
            }
        }
        int temp{delete_words};
        if (counter >= 0){ // more 1's found
            for (int i = 0; i < 1000 - temp; i++){
                if (input2[i][j] == '1'){
                    delete_words += 1;
                }
            }
            std::string new_input[1000 - delete_words];
            int next_available{0};
            for (int i = 0; i < 1000 - temp; i++){
                if (input2[i][j] == '0'){
                    new_input[next_available] = input2[i]; 
                    next_available += 1;
                }
            }
            for (int i = 0; i < 1000 - delete_words; i++){
                input2[i] = new_input[i];
            }
        } else { // more 0's found
            for (int i = 0; i < 1000 - temp; i++){
                if (input2[i][j] == '0'){
                    delete_words += 1;
                }
            }
            std::string new_input[1000 - delete_words];
            int next_available{0};
            for (int i = 0; i < 1000 - temp; i++){
                if (input2[i][j] == '1'){
                    new_input[next_available] = input2[i]; 
                    next_available += 1;
                }
            }
            for (int i = 0; i < 1000 - delete_words; i++){
                input2[i] = new_input[i];
            }
        }
    }
    std::cout << input2[0];
}