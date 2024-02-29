const url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".country_container select");
const btn=document.querySelector("#btn");
const fromCurr=document.querySelector(".abc");
const toCurr=document.querySelector("#toid");
let msg=document.querySelector("#final_rate");
const swap=document.querySelector("#swap");
for(let select of dropdown){
    for(let code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code=="USD"){
            newOption.selected="selected";
        }
        else if(select.name=="to" && code=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let countryCode=element.value;
    let code=countryList[countryCode];
    let img=element.parentElement.querySelector("img");
    let newSrc=`https://flagsapi.com/${code}/flat/64.png`;
    img.src=newSrc;
}
const updateValue = () => {
    const tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;
    updateFlag(toCurr);
    updateFlag(fromCurr);
    
};
const  gateExchange= async()=>{
  let amount = document.querySelector(".input input");
  let amtVal = amount.value;
  if(amtVal=="" || amtVal<1){
    amtVal=1;
    amtVal.value="1";
  }
  const URL = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);
  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}

swap.addEventListener('click', () => {
    updateValue();
});

btn.addEventListener("click", () => {
    gateExchange();
  });
  
  window.addEventListener("load", () => {
    gateExchange();
  });
