let axios = require("axios");

async function getPeople(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
        return data; // this will be the array of people objects  
    } catch(e){
        console.log(e);
    }
}


async function getPersonById(id){
    if(!id) throw "Error: No ID is inputed";
    if(typeof(id) !== "number") throw "Error: input have to be number";
    if(id < 0) throw "Error: ID has to be positive";
    let all_data = await getPeople();
    let out = {};
    all_data.forEach((element) => {
        let real_id = element["id"];
        if(real_id == id) out = element;
    });
    return out;
} // done with 1 question: does id might be 0?


async function howManyPerState(statAbbrv){
    if(!statAbbrv) throw "Error: No input";
    if(typeof(statAbbrv) !== "string") throw "Error: input has to be a string";
    
    let all_data = await getPeople();
    let total = 0;

    Object.keys(all_data).forEach((element) => {
        let state = all_data[element]["address"]["state"];
        if(state === statAbbrv) total++;
    });

    if(total === 0) throw "Error: nobody lives there";
    return total;
}

async function personByAge(index){
    if(!index && index !== 0) throw "Error: No input";
    if(typeof(index) !== "number") throw "Error: Input type is not nubmer";

    let all_people = await getPeople();
    if(Object.keys(all_people).length <= index) throw "Error: input is to big";
    let sorted_key = Object.keys(all_people).sort((a, b) => {
        let a_date = all_people[a]["date_of_birth"];
        let b_date = all_people[b]["date_of_birth"];

        a_date = a_date.split("/");
        b_date = b_date.split("/");

        a_date = [a_date[2], a_date[0], a_date[1]]
        b_date = [b_date[2], b_date[0], b_date[1]]
        
        a_date.forEach((element) => {
            a_date[element] = Math.floor(a_date[element]);
        })

        b_date.forEach((element) => {
            b_date[element] = Math.floor(b_date[element]);
        })
        let date = new Date()
        date = [date.getFullYear(), date.getMonth()+1, date.getDate()];
        let a_age = date[0] - a_date[0];
        let b_age = date[0] - b_date[0];
        //console.log(a_date[0])

        if(date[1] < a_date[1]) a_age--;
        if(date[1] === a_date[1] && date[2] < a_date[2]) a_age--;

        if(date[1] < b_date[1]) b_age--;
        if(date[1] === b_date[1] && date[2] < b_date[2]) b_age--;

        all_people[a]["age"] = a_age;
        all_people[b]["age"] = b_age;
        
        if(b_date[0] - a_date[0] !== 0) return a_date[0] - b_date[0];
        if(b_date[1] - a_date[1] !== 0) return a_date[1] - b_date[1];
        return a_date[2] - b_date[2];
    })
    let output = {};
    let that_person = all_people[sorted_key[index]];
    output["first_name"] = that_person["first_name"];
    output["last_name"] = that_person["last_name"];
    output["date_of_birth"] = that_person["date_of_birth"];
    output["age"] = that_person["age"];

    return output;
}

async function peopleMetrics(){
    let all_data = await getPeople();
    let output = {
        totalLetters: 0,
        totalVowels: 0,
        totalConsonants: 0,
        longestName: "",
        shortestName: "",
        mostRepeatingCity: "",
        averageAge: 0
    };

    let vowel_list = [97, 101, 105, 111, 117];
    let city_count = {};

    let age_total = 0;
    Object.keys(all_data).forEach((key) => {
        let data = all_data[key];
        let name = `${data["first_name"]} ${data["last_name"]}`;
        for(let i = 0; i < name.length; i++){
            let ascii = name[i].toLowerCase().charCodeAt(0);
            if(ascii >= 97 && ascii <= 122){
                output["totalLetters"]++;
                if(vowel_list.includes(ascii)) output["totalVowels"]++;
                else output["totalConsonants"]++;
            }
        }

        if(output["longestName"] === "") output["longestName"] = name
        else if(output["longestName"].length < name.length) output["longestName"] = name

        if(output["shortestName"] === "") output["shortestName"] = name
        else if(output["shortestName"].length > name.length) output["shortestName"] = name

        if(Object.keys(city_count).includes(data["address"]["city"])) city_count[data["address"]["city"]]++;
        else city_count[data["address"]["city"]] = 1;

        let date = data["date_of_birth"];
        date = date.split("/");
        date = [date[2], date[0], date[1]]
        date.forEach((element) => {
            date[element] = Math.floor(date[element]);
        })

        let today = new Date()
        today = [today.getFullYear(), today.getMonth()+1, today.getDate()];
        let age = today[0] - date[0];
        if(today[1] < date[1]) age--;
        else if(today[1] === date[1] && today[2] < date[2]) age--;

        age_total += age;
    })

    let sorted = Object.keys(city_count).sort((a, b) => {return city_count[b] - city_count[a]})
    output["mostRepeatingCity"] = sorted[0];
    output["averageAge"] = age_total/Object.keys(all_data).length;
    //console.log(output);
    return output;
}


module.exports = {
    getPersonById, 
    howManyPerState, 
    personByAge, 
    peopleMetrics
}



async function main(){
    let x = await getPersonById(43);
    //console.log(x);
    try{
        let y = await howManyPerState("WY")
        //console.log(y);
    } catch (e){
        console.log(e);
    }
    try{
        //console.log(await personByAge(1000));
    } catch (e){
        console.log(e)
    }
    

    let test = await peropleMetrics();

}



main()