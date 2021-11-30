function mean(arr){
    if(!arr) throw "Error: input does not exist";
    if(!Array.isArray(arr)) throw "Error: input not array";
    if(arr.length === 0) throw "Error: no input inside arr";

    let sum = 0;
    arr.forEach((num) => {
        if(typeof(num) !== "number") throw "Error: input contain non-number type";
        sum += num;
        }
    )
    return sum/arr.length;
} //done with 0 question

function medianSquared(arr){
    if(!arr) throw "Error: input does not exist";
    if(!Array.isArray(arr)) throw "Error: input not array";
    if(arr.length === 0) throw "Error: no input inside arr";

    if(!arr.every((value) => {
        return typeof(value) === "number";
    })) throw "Error: input contain non-number type";
    

    arr.sort((a, b) => a - b);
    let out = 0;
    if(arr.length % 2 === 1) out = arr[(arr.length-1) / 2]; 
    
    else{
        let sum = 0;
        let mid = arr.length / 2;
        sum = arr[mid] + arr[mid-1];
        out = sum/2;
    }

    return out*out;
} //done with 0 question

function maxElement(arr){
    if(!arr) throw "Error: input does not exist";
    if(!Array.isArray(arr)) throw "iError: nput not array";
    if(arr.length === 0) throw "Error: no input inside arr";

    if(!arr.every((value) => {
        return typeof(value) === "number";
    })) throw "Error: input contain non-number type";

    let flag = arr[0];
    arr.forEach((num) => {
        if(flag < num) flag = num;
    })

    let index = arr.indexOf(flag);
    let out = {};
    out[flag] = index;
    return out;

} //done with 0 question

function fill(end, value){
    if(!end) throw "Error: No input for end or end have to be larger then 0";
    if(typeof(end) !== "number") throw "Error: end is not a number";
    if(end <= 0) throw "Error: end have to be larger then 0";

    let out = [];
    if(!value){
        for(let i = 0; i < end; i++) out.push(i);
    }
    else{
        for(let i = 0; i < end; i++) out.push(value); 
    }

    return out;
} // done with 2 question: can value be not a string?    

function countRepeating(arr){
    if(!arr) throw "Error: No input for arr";
    if(!Array.isArray(arr)) throw "Error: input is not an array";
    
    let all = {};
    let output = {};
    if(arr.length === 0) return {};

    arr.forEach((element) => {
        if(!all.hasOwnProperty(element)) all[element] = 1;
        else all[element]++;
    })

    for (let key of Object.keys(all)){
        if(all[key] !== 1) output[key] = all[key];
    }

    return output;

} // done with 0 question

function isEqual(arr1, arr2){
    if(!arr1 || !arr2) throw "Error: input does not exist";
    if(!(Array.isArray(arr1) || Array.isArray(arr2))) throw "Error: input not array";

    if(arr1.length !== arr2.length) return false;

    arr1.sort((a, b) => {
        let a_type = typeof(a);
        let b_type = typeof(b);
        if(a_type === "number" && b_type !== "number") return -1; 
        if(a_type === "string" && b_type === "object") return -1;
        return 1;
    });
    arr2.sort((a, b) => {
        let a_type = typeof(a);
        let b_type = typeof(b);
        if(a_type === "number" && b_type !== "number") return -1; 
        if(a_type === "string" && b_type === "object") return -1;
        return 1;
    });

    let o_num_flag = 0; let o_str_flag = 0; let t_num_flag = 0; let t_str_flag = 0;

    arr1.forEach((value) => {
        if(typeof(value) === "number"){
            o_num_flag++;
            o_str_flag++;
        }
        else if(typeof(value) === "string") o_str_flag++;
    })
    arr2.forEach((value) => {
        if(typeof(value) === "number"){
            t_num_flag++;
            t_str_flag++;
        }
        if(typeof(value) === "string") t_str_flag++;
    })

    if(o_num_flag !== t_num_flag || o_str_flag !== t_str_flag) return false;

    let arr1_nums = arr1.slice(0, o_num_flag);
    let arr1_strs = arr1.slice(o_num_flag, o_str_flag);
    let arr1_list = arr1.slice(o_str_flag, arr1.length);
    let arr2_nums = arr2.slice(0, t_num_flag);
    let arr2_strs = arr2.slice(t_num_flag, t_str_flag);
    let arr2_list = arr2.slice(t_str_flag, arr2.length);

    arr1_nums.sort(); arr1_strs.sort(); arr1_list.sort();
    arr2_nums.sort(); arr2_strs.sort(); arr2_list.sort();

    if(o_num_flag !== 0){
        for(let i = 0; i < o_num_flag; i++){
            if(arr1_nums[i] !== arr2_nums[i]) return false;
        }
    }

    if(o_str_flag !== 0){
        for(let i = 0; i < o_str_flag; i++){
            if(arr1_strs[i] !== arr2_strs[i]) return false;
        }
    }

    if(arr1_list.length === 0) return true;

    for(let i = 0; i < arr1_list.length; i++){
        for(let j = 0; j < arr2_list.length; j++){
            if(isEqual(arr1_list[i], arr2_list[j])) {
                arr2_list.splice(j, 1);
                break;
            }
        }
    }
    if(arr2_list.length === 0) return true;
    else return false;

} // done with 0 question


module.exports = {
    mean, 
    medianSquared, 
    maxElement, 
    fill, 
    countRepeating, 
    isEqual
};



console.log(maxElement([5, 6, 9, 8]))

/*
let a = ['632', [632, 789], ['632', 789], 632];
let b = ['632', 632, ['632', 789], [632, 789]];

console.log(isEqual(a, b));
*/


/*
try{
    mean();
} catch(e){
    console.log(e);
}

try{
    mean([]);
} catch(e){
    console.log(e);
}

try{
    mean("test");
} catch(e){
    console.log(e);
}

try{
    mean([5, 3, 7 ,"yo"]);
} catch(e){
    console.log(e);
}

try{
    console.log(mean([1, 2, 3]));
} catch(e){
    console.log(e);
}
*/
//test for mean 

/*
try{
    medianSquared([4, 3, "4"]);
} catch(e){
    console.log(e);
}

try{
    console.log(medianSquared([4, 3, 2]));
} catch(e){
    console.log(e);
}

try{
    console.log(medianSquared([4, 3, 2, 6]));
} catch(e){
    console.log(e);
}

medianSquared([1, 200, 100, 43, 56, 257]);


*/
//test for medianSquared

/*
try{
    console.log(maxElement([8, 3 ,5 ,7 ,2, 11, 4, 9]));
} catch (e){
    console.log(e);
}
*/
//test for maxElement

/*
try{
    console.log(fill());
} catch(e){
    console.log(e);
}

try{
    console.log(fill("test"));
} catch(e){
    console.log(e);
}

try{
    console.log(fill(0));
} catch(e){
    console.log(e);
}

try{
    console.log(fill(-4));
} catch(e){
    console.log(e);
}

try{
    console.log(fill(6));
} catch(e){
    console.log(e);
}

try{
    console.log(fill(3, "Welcome"));
} catch(e){
    console.log(e);
}
*/ 
//test for fill

/*
try{
    console.log(countRepeating([]));
} catch (e){
    console.log(e);
}

try{
    console.log(countRepeating({}));
} catch (e){
    console.log(e);
}

try{
    console.log(countRepeating([7, '7', 13, true, true, true, "Hello", "Hello", "hello"]));
} catch (e){
    console.log(e);
}
*/
//test for countRepeating

/*

console.log(isEqual([3, "yo", [5, 3, 7, ["test", 77]], "bro", 33, ["sample", ["a lot of", "input", ["arrays"]]]],
                    [3, ["sample", ["a lot of", "input", ["arrays"]]], [5,[77, "test"], 3, 7], "bro", 33, "yo"]))
*/


