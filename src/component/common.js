export const getRandomNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
}

export const setBgRed = (elementId, flag) => {
    if (flag) document.getElementById(elementId).style.backgroundColor = "#ff6666";
    else document.getElementById(elementId).style.backgroundColor = "white";
}


export const loadOptions = (elementId, data) => {
    // console.log("c");
    var tempSelect = document.getElementById(elementId);
    tempSelect.innerHTML = "";
    let tempOp = document.createElement("option");
    tempOp.setAttribute("value", "DEFAULT");
    if( elementId === "selectPokeDex") tempOp.innerHTML ="SELECT POKE REGION";
    else if(elementId==="selectPokeType")  tempOp.innerHTML ="SELECT POKE TYPE";
    else if(elementId==='selectAbility') tempOp.innerHTML ="SELECT ABILITY";
    else tempOp.innerHTML ="SELECT OPTION";
    tempSelect.appendChild(tempOp);

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("name", data[i].name + "%::%" + data[i].url);
        option.setAttribute("value", data[i].name + "%::%" + data[i].url);
        option.innerHTML = data[i].name.toUpperCase();
        tempSelect.appendChild(option);
    }

}
export function makeTitleCase(str) {
    if (str.length === 0) return;
    str = str.trim();
    str = str.charAt(0).toUpperCase() + str.substring(1);
    return str;
}
