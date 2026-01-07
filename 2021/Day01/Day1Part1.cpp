#include <iostream>

int main(){
    int first_number{};
    int second_number{};
    int third_number{};
    int sum1{};
    int sum2{};
    int counter{};
    bool first_sum{true};
    std::cin >> first_number;
    std::cin >> second_number;
    
    while (true){
        std::cin >> third_number;
        sum2 = first_number + second_number + third_number;
        first_number = second_number;
        second_number = third_number;
        if (first_sum == true){
            first_sum = false;
        } else{
            if (sum2 > sum1){
                counter++;
            }
        }
        sum1 = sum2;
        std::cout << counter;
    }

}