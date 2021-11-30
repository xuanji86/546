
const questionOne = function questionOne(arr) {
    // Implement question 1 here
    if(!arr){ return {};} 
    else if(arr.length === 0){ return {}; } 
    else{

        let output = {};
        arr.forEach((num) => {
            if(num === 0 || num === 1){ 
                //output.directlyAddedKey = num ; 
                output[num] = false;
            }
            else{
                let check = true;
                for(i = 1; i < num;i++){
                    if(i === 1) { continue; }
                    else if(num % i === 0) {
                        check = false;
                        break;
                    }
                }
                //output.directlyAddedKey  = num; 
                output[num] = check;
             }
        })
        return output;
    }
} //done with 0 question

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if(!arr){ return 0;} 
    else if(arr.length === 0){ return 0; } 
    else{
        let square_arr = arr.map((value) => { return value * value; })
        let calc_num = 0;
        square_arr.forEach((value) => { calc_num += value; }) //sum of square
        //console.log(square_sum);
        calc_num = Math.sqrt(Math.pow(calc_num, 6)); //sqrt the 6th pow
        return calc_num;
    }
} //done with 0 question

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let output = {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0};
    if(!text){ return output;} 
    else if(text.length === 0){ return output; } 
    else{
        text = text.toLowerCase();
        const all_letter_range = [97, 122];
        const vow_index = [97, 101, 105, 111, 117];
        const num_range = [48, 57];
        const punc_index = [33, 34, 39, 44, 46, 58, 59, 63]; //.,?!'";:
        for (let char of text){
            let ascii_value = char.charCodeAt(0);
            //console.log(typeof ascii_value);
            if(ascii_value >= num_range[0] && ascii_value <= num_range[1]){ output.numbers++; }
            else if (ascii_value === 32){ output.spaces++;}
            else if (ascii_value >= all_letter_range[0] && ascii_value <= all_letter_range[1]){
                if (vow_index.includes(ascii_value)){ output.vowels++; } 
                else{ output.consonants++; }
            }
            else if( punc_index.includes(ascii_value)){ output.punctuation++;}
            else {output.specialCharacters++;}
            
        }
        return output;
    }
} // done with 0 question

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let a = num1;
    let r = num2 * 0.01 / 12;
    let n = num3 * 12;
    let p = a*(r*Math.pow((1 + r),n))/(Math.pow((1 + r),n)-1);
    
    return p.toFixed(2);
} // done with 0 question

module.exports = {
    firstName: "Jiashu", 
    lastName: "Wang", 
    studentId: "10460690",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};


///* questionOne test

console.log(questionOne([5, 3, 10])); // {5:true, 3: true, 10: false} 
console.log(questionOne([2]));  // {2: true} 
console.log(questionOne([5, 10, 9]));  // {5: true, 10: false, 9: false}
console.log(questionOne([2, 7, 9, 1013]));  // {2: true, 7: true, 9: false, 1013: true}
console.log(questionOne([]));  // {}
console.log(questionOne());  // {}
//*/

//let out = questionOne([0, 1]);
//console.log(typeof Object.keys(out)[0]);  // how to save a number key but not string

/* questionTwo test

console.log(questionTwo([5, 3, 10])); //2406104
console.log(questionTwo([2])); // 64 
console.log(questionTwo([5, 10, 9])); // 8741816
console.log(questionTwo([2, 7, 9, 10])); // 12812904
console.log(questionTwo([])); // 0
*/

/* questionThree test

console.log(questionThree("The quick brown fox jumps over the lazy dog.")); 
// {consonants: 24, vowels: 11, numbers: 0, spaces: 8, punctuation: 1, specialCharacters: 0}

console.log(questionThree("How now brown cow!!!"));
// {consonants: 10, vowels: 4, numbers: 0, spaces: 3, punctuation: 3, specialCharacters: 0}

console.log(questionThree("One day, the kids from the neighborhood carried my mother's groceries all the way home. You know why? It was out of respect."));
// {consonants: 61, vowels: 36, numbers: 0, spaces: 22, punctuation: 5, specialCharacters: 0}

console.log(questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// {consonants: 40, vowels: 23, numbers: 3, spaces: 16, punctuation: 3, specialCharacters: 1}

console.log(questionThree("")); 
// {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

*/

/*questionFour test

console.log(questionFour(25000, 3.11, 5)); //Monthly Payment: 450.44
// Loan Amount: 25,000 , interest rate: 3.11% (0.0311), term: 5 years (5*12 = 60 monthly payments)
console.log(questionFour(30000, 5, 6)); //483.15
console.log(questionFour(19500, 7, 3)); //602.10
console.log(questionFour(55000, 2, 6)); //811.27
console.log(questionFour(33000, 4.5, 2)); //1440.38
*/
/*
function test_fun(num1, num2){
    let x = 5
    console.log(x);
    return num1*num2
}

console.log(x);
console.log(test_fun(5));
*/