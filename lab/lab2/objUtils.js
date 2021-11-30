function makeArrays(arr){
    if(!arr) throw "Error: no input";
    if(!Array.isArray(arr)) throw "Error: Input is not an array";
    if(arr.length < 2) throw "Error: Input have to contain at least 2 object";
    let out = []
    arr.forEach((obj) => {
        if(typeof(obj) === 'object' && !Array.isArray(obj)){
            let keys_list = Object.keys(obj);
            if(keys_list.length === 0) throw "Error: Object is empty";
            keys_list.forEach((key) => {
                let flag = [key, obj[key]];
                out[out.length] = flag;
            })
        }
        else throw "Error: element inside is not object";
    })

    return out;
} //done with 0 questions

function isDeepEqual(obj1, obj2){
    if(!obj1 || !obj2) throw "Missing input";
    if(typeof(obj1) !== "object" || Array.isArray(obj1)) throw "obj1 is not an object";
    if(typeof(obj2) !== "object" || Array.isArray(obj2)) throw "obj2 is not an object";
    let out = true;
    let key1_list = Object.keys(obj1);
    key1_list.forEach((key) => {
        //console.log(key);
        let temp = true;
        if(!obj2.hasOwnProperty(key)) temp = false;
        else{
            let value1 = obj1[key];
            let value2 = obj2[key];
            //console.log(typeof(value1), typeof(value2));
            if(typeof(value1) !== "object" && typeof(value2) !== "object"){
                if(value1 === value2) {
                    temp = true;
                }
                else{
                    //console.log("shabi")
                    temp = false;
                }
            }
            if(typeof(value1) === "object" && typeof(value2) === "object"){
                 temp = isDeepEqual(value1, value2);
            }
            
        }

        out = out && temp;
    })
    
    return out;
    
} //done with 0 questions

function computeObject(obj, func){
    if(!obj || !func) throw "Missing input";
    if(typeof(obj) !== "object" || Array.isArray(obj)) throw "Input is not an object";
    if(typeof(func) !== "function") throw "Input is not an function";

    let keys_list = Object.keys(obj);
    out = {}
    keys_list.forEach((key) => {
        let value = obj[key];
        out[key] = func(value)
    })

    return out;
} // done with 0 questions


module.exports = {
    makeArrays, 
    isDeepEqual, 
    computeObject
};





//console.log(computeObject({a: 3, b: 7, c: 5}, n => n*2));

/*
const first = {a: 2, b: 3};
const second = {a: 2, b: 4};
const third = {a: 2, b: 3};
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
console.log(isDeepEqual(first, second)); // false
console.log(isDeepEqual(forth, fifth)); // true
console.log(isDeepEqual(forth, third)); // false
console.log(isDeepEqual({}, {})); // true
*/


/*
const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };

try{
    const firstSecondThird = makeArrays([first, second, third]);
    console.log(firstSecondThird);
} catch (e){
    console.log(e);
}

try{
    const firstSecondThird = makeArrays([second, third]);
    console.log(firstSecondThird);
} catch (e){
    console.log(e);
}

try{
    const firstSecondThird =  makeArrays([third, first, second]);
    console.log(firstSecondThird);
} catch (e){
    console.log(e);
}
*/
// test for makeArrays