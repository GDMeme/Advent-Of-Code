#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>

void calculateFish(int adultFish, int *daysLeft, int fishNumber, long long *totalFish, bool adult){
    if (*daysLeft <= 0){
        std::cout << "you ran out of days! " << std::endl;
        std::cout << "your total number of fish is: " << *totalFish << std::endl;
    }
    while (*daysLeft > 0){
        std::cout << " Real Days left: " << *daysLeft << std::endl;
        if (adult == true){
            if (((*daysLeft-fishNumber)-1)%7 == 0){
                *totalFish += adultFish;
                int new_days_left{*daysLeft - 7};
                int new_days_left_2{*daysLeft - 9};
                calculateFish(adultFish, &new_days_left, fishNumber, *&totalFish, adult);
                adult = false;
                std::cout << "Days left: " << new_days_left_2 << std::endl;
                calculateFish(adultFish, &new_days_left_2, fishNumber, *&totalFish, adult);
                *daysLeft -= 1;
            } else {
                *daysLeft -= 1;
            }
        } else if (adult == false){
            if (*daysLeft-9 >= 0){
                int new_days_left{*daysLeft - 9};
                adult = true;
                calculateFish(adultFish, &new_days_left, fishNumber, *&totalFish, adult);
                *daysLeft -= 1;
            } else {
                *daysLeft -= 1;
            }
        }
    }
}

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
    long long totalFish{};
    calculateFish(counter1, &days, 1, &totalFish, true);

    days=256;
    /* std::cout << "Total fish: " << totalFish << std::endl; */
}