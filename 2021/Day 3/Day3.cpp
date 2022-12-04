#include <iostream>
#include <fstream>

int main(){ 
    std::ifstream inFile;
    inFile.open(".\\input.txt");
    long long input[1000];
    int counter11{};
    int counter10{};
    int counter21{};
    int counter20{};
    int counter31{};
    int counter30{};
    int counter41{};
    int counter40{};
    int counter51{};
    int counter50{};
    int counter61{};
    int counter60{};
    int counter71{};
    int counter70{};
    int counter81{};
    int counter80{};
    int counter91{};
    int counter90{};
    int counter101{};
    int counter100{};
    int counter111{};
    int counter110{};
    int counter121{};
    int counter120{};
    int temp{};
    for (int i = 0; i < 1000; i++){
        inFile >> input[i];
        long factor = 1;
        long total = 0;
        while (input[i] != 0)
    {
        total += (input[i]%10) * factor;
        input[i] /= 10;
        factor *= 2;
    }
    input[i] = total;
        temp = input[i] & 0x01;     
        if (temp == 1){
            counter121 += 1;
        } else {
            counter120 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter111 += 1;
        } else {
            counter110 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter101 += 1;
        } else {
            counter100 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter91 += 1;
        } else {
            counter90 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter81 += 1;
        } else {
            counter80 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter71 += 1;
        } else {
            counter70 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter61 += 1;
        } else {
            counter60 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter51 += 1;
        } else {
            counter50 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter41 += 1;
        } else {
            counter40 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter31 += 1;
        } else {
            counter30 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter21 += 1;
        } else {
            counter20 += 1;
        }
        input[i] >>= 1;
        temp = input[i] & 0x01;
        if (temp == 1){
            counter11 += 1;
        } else {
            counter10 += 1;
        }
    }
    if (counter11 > counter10){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter21 > counter20){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter31 > counter30){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter41 > counter40){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter51 > counter50){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter61 > counter60){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter71 > counter70){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter81 > counter80){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter91 > counter90){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter101 > counter100){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter111 > counter110){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
    if (counter121 > counter120){
        std::cout << "1";
    } else {
        std::cout << "0";
    }
}