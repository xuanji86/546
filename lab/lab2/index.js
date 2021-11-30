array_file = require('./arrayUtils');
string_file = require('./stringUtils');
object_file = require('./objUtils');
//mean
try{
    console.log(array_file.mean([]));
} catch(e){
    console.log(e);
}

try{
    console.log(array_file.mean([1, 2, 3]));
} catch(e){
    console.log(e);
}
//mean finish, mediansquared
try{
    console.log(array_file.medianSquared([4, 3, "4"]));
} catch(e){
    console.log(e);
}

try{
    console.log(array_file.medianSquared([1, 200, 100, 43, 56, 257]));
} catch(e){
    console.log(e);
}
//mediansquared finish, maxelement
try{
    console.log(array_file.maxElement(['hello']));
} catch (e){
    console.log(e);
}

try{
    console.log(array_file.maxElement([8, 3 ,5 ,7 ,2, 11, 4, 9]));
} catch (e){
    console.log(e);
}
//maxelement finish, fill

try{
    console.log(array_file.fill("test"));
} catch(e){
    console.log(e);
}

try{
    console.log(array_file.fill(3, "Welcome"));
} catch(e){
    console.log(e);
}
//fill finish, countrepeating
try{
    console.log(array_file.countRepeating({}));
} catch (e){
    console.log(e);
}

try{
    console.log(array_file.countRepeating([7, '7', 13, true, true, true, "Hello", "Hello", "hello"]));
} catch (e){
    console.log(e);
}
//countrepeating finish, isequal

try{
    console.log(array_file.isEqual(['test']));
} catch(e){
    console.log(e);
}

try{
    console.log(array_file.isEqual([3, "yo", [5, 3, 7, ["test", 77]], "bro", 33, ["sample", ["a lot of", "input", ["arrays"]]]],
                                   [3, ["sample", ["a lot of", "input", ["arrays"]]], [5,[77, "test"], 3, 7], "bro", 33, "yo"]))
} catch(e){
    console.log(e);
}
//isequal finish, camelcase

try{ 
    let out = string_file.camelCase("How now brown cow"); // Returns: "howNowBrownCow"
    console.log(out);
} catch(e){
    console.log(e);
}

try{ 
    let out = string_file.camelCase(); // Throws Error
    console.log(out);
} catch(e){
    console.log(e);
}
//camelcase finish, replacechar
try{
    let out = string_file.replaceChar("babbbbble"); // Returns: "ba*$*$*le"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = string_file.replaceChar(""); // Throws Error
    console.log(out);
} catch (e){
    console.log(e);
}
//replacechar finish, mashup
try{
    let out = string_file.mashUp("hello", "world"); //Returns "wollo herld"
    console.log(out);
} catch (e){
    console.log(e);
}

try{
    let out = string_file.mashUp("Patrick", ""); //Throws error
    console.log(out);
} catch (e){
    console.log(e);
}
//mashup finish, makeArrays

const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

try{
    const firstSecondThird = object_file.makeArrays([first, second, third]);
    console.log(firstSecondThird);
} catch (e){
    console.log(e);
}

try{
    let out = object_file.makeArrays();
    console.log(out);
} catch(e){
    console.log(e);
}

//makearray finish, isdeepequal
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try{
    console.log(object_file.isDeepEqual(forth, fifth)); // true
} catch(e) {
    console.log(e);
}

try{
    console.log(object_file.isDeepEqual([1, 2, 3]));
} catch(e){
    console.log(e);
}
//isdeepequal finish, comuteobject
try{
    console.log(object_file.computeObject({a: 3, b: 7, c: 5}, n => n*2));
} catch(e){
    console.log(e);
}

try{
    console.log(object_file.computeObject({a: 4, b: 7}, "5"));
} catch(e){
    console.log(e);
}