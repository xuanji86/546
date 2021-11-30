let axios = require("axios");

async function getWork(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
        return data // this will be the array of people objects
    } catch (e){
        console.log(e);
    }
}

async function getPeople(){
    try{
        const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json')
        return data; // this will be the array of people objects  
    } catch(e){
        console.log(e);
    }
}


async function listEmployees(){
    let all_company = await getWork();
    let all_people = await getPeople();

    let sorted_key = Object.keys(all_people).sort((a, b) => {
        return all_people[a]["id"] - all_people[b]['id'];
    })

    let output = [];
    Object.keys(all_company).forEach((key) => {
        let input_info = all_company[key];
        let comp_info = {};
        comp_info["company_name"] = input_info["company_name"];
        comp_info["employees"] = [];

        input_info["employees"].forEach((element) => {
            let people_info = {};
            people_info.first_name = all_people[sorted_key[element - 1]]["first_name"];
            people_info.last_name = all_people[sorted_key[element - 1]]["last_name"];
            comp_info["employees"].push(people_info);
        })
        output.push(comp_info)
        //if(input_info["company_name"] === "Hilll, Waters and Bins") console.log(comp_info)
    })

    //console.log(output["Raynor-Grimes"]);
    return output;
}

async function fourOneOne(phoneNumber){
    if(!phoneNumber) throw "Error: No input";
    if(typeof(phoneNumber) !== "string") throw "Error: input type is not a string";

    let phone_number = phoneNumber.split("-");
    let length_check = phoneNumber.length === 12 && phone_number.length === 3;
    let each_check = phone_number[0].length === 3 && phone_number[1].length === 3 && phone_number[2].length === 4;
    if(!(length_check && each_check)) throw "Error: input is not in ###-###-#### formate";

    let all_company = await getWork();
    let output = {};

    Object.keys(all_company).forEach((element) => {
        let input_info = all_company[element];

        if(input_info["company_phone"] === phoneNumber){
            output.company_name = input_info["company_name"];
            output.company_address = input_info["company_address"];
            return
        }
    })

    if(Object.keys(output).length === 0) throw "Error: did not find the company with this number";
    //console.log(output);
    return output;
}

async function whereDoTheyWork(ssn){
    if(!ssn) throw "Error: No input";
    if(typeof(ssn) !== "string") throw "Error: input has to be a stirng";

    let ssn_number = ssn.split("-");
    let length_check = ssn.length === 11 && ssn_number.length === 3
    let each_check = ssn_number[0].length === 3 && ssn_number[1].length === 2 && ssn_number[2].length === 4;

    if(!(length_check && each_check)) throw "Error: Input format is not in ###-##-#### formate";

    let all_people = await getPeople();
    let this_person = "";
    Object.keys(all_people).forEach((element) => {
        let person = all_people[element];
        if(person["ssn"] === ssn) {
            this_person = person;
            return
        }
    })
    if(this_person === "") throw "Error: this person does not exist";

    let all_company = await getWork();
    let output = ""
    Object.keys(all_company).forEach((element) => {
        let company = all_company[element];
        let this_person_id = this_person["id"];

        if(company["employees"].includes(this_person_id)){
            let first = this_person["first_name"];
            let last = this_person["last_name"];
            let comp_name = company["company_name"];

            output = `${first} ${last} works at ${comp_name}.`;
            return
        }
    })

    return output
}

module.exports = {
    listEmployees, 
    fourOneOne, 
    whereDoTheyWork
}

async function main(){
    //await listEmployees();
    try{
        //await fourOneOne("240-144-7553");
        let x = await whereDoTheyWork('299-63-8866'); // Returns: "Marga Dawidowitsch works at Durgan LLC."
        let y = await whereDoTheyWork('277-85-0056'); // Returns: "Toby Ginsie works at Hirthe, Adams and Reilly."
        console.log(x);
        console.log(y);
    } catch (e){
        console.log(e)
    }
}

main()

