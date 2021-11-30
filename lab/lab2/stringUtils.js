function camelCase(str){
    if(!str) throw "Error: No input";
    if(typeof(str) !== "string") throw "Error: input have to be string";

    let low_str_list = str.toLowerCase().split(" ");
    let out = "";

    low_str_list.forEach((value) => {
        let samp_out = value[0].toUpperCase() + value.slice(1, value.length);
        out += samp_out;
    })
    out = out[0].toLowerCase() + out.slice(1, out.length);
    return out;
} // done with 0 questionss

function replaceChar(str){
    if(!str) throw "Error: No input";
    if(typeof(str) !== "string") throw "Error: input is not an string";

    
    let out = '';
    let first = str[0];
    let flag = true;
    for(let i = 0; i < str.length; i++){
        if(i === 0) out = str[i];
        else if(str[i] === first.toLowerCase() || str[i] === first.toUpperCase()){
            if(flag){
                out += "*";
                flag = !flag;
            }
            else{
                out += "$";
                flag = !flag;
            }
        }
        else out += str[i];
    }

    return out;

}

function mashUp(str1, str2){
    if(!str1 || !str2) throw "need both inputs";
    if(typeof(str1) !== "string" || typeof(str2) !== "string") throw "inputs have to be string";
    if(str1.length === 1 || str2.length === 1) throw "inputs have to be longer then 1";

    let str1_first = str1.substring(0, 2);
    let str2_first = str2.substring(0, 2);

    let out = `${str2_first}${str1.slice(2, str1.length)} ${str1_first}${str2.slice(2, str2.length)}`;

    return out
}

module.exports = {
    camelCase, 
    replaceChar, 
    mashUp
};




/*
try{ 
    let out = camelCase('my function rocks'); // Returns: "myFunctionRocks"
    console.log(out);
} catch(e){
    console.log(e);
}

try{ 
    let out = camelCase('FOO BAR'); // Returns: "fooBar"
    console.log(out);
} catch(e){
    console.log(e);
}

try{ 
    let out = camelCase("How now brown cow"); // Returns: "howNowBrownCow"
    console.log(out);
} catch(e){
    console.log(e);
}

try{ 
    camelCase(); // Throws Error
} catch(e){
    console.log(e);
}

try{ 
    camelCase(''); // Throws Error
} catch(e){
    console.log(e);
}

try{ 
    camelCase(123); // Throws Error
} catch(e){
    console.log(e);
}

try{ 
    camelCase(["Hello", "World"]); // Throws Error
} catch(e){
    console.log(e);
}
*/
//test for camelCase


/*
try{
    let out = replaceChar("Daddy"); // Returns: "Da*$y"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = replaceChar("Mommy"); // Returns: "Mo*$y" 
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = replaceChar("Hello, How are you? I hope you are well"); // Returns: "Hello, *ow are you? I $ope you are well"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = replaceChar("babbbbble"); // Returns: "ba*$*$*le"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = replaceChar(""); // Throws Error
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = replaceChar(123); // Throws Error
    console.log(out);
} catch (e){
    console.log(e);
}
*/
//test for replaceChar


/*
try{
    let out = mashUp("Patrick", "Hill"); //Returns "Hitrick Pall"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = mashUp("hello", "world"); //Returns "wollo herld"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = mashUp("Patrick", ""); //Throws error
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = mashUp([], []); // Throws Error
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = mashUp("John") // Throws error
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = mashUp ("h", "Hello") // Throws Error
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = mashUp ("h","e") // Throws Error
    console.log(out);
} catch (e){
    console.log(e);
}
*/
// test for mashUp


