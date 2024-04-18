let input='';
let solution=null;

let calculationPanel=document.querySelector("#calculations");
let answersPanel=document.querySelector('#answers');

let clearBtn=document.querySelector('#btn-clear');
let cancelBtn=document.querySelector('#btn-cancel');
let SwapCalculator=document.querySelector('#btn-S');

let dot=document.querySelector('#btn-dot');
let divisionOperator=document.querySelector('#btn-division');
let modulusOperator=document.querySelector('#btn-modulus');
let productOperator=document.querySelector('#btn-product');
let diffOperator=document.querySelector('#btn-diff');
let addOperator=document.querySelector('#btn-add');
let equalTo=document.querySelector('#btn-equal');


let num7=document.querySelector('#btn-7');
let num8=document.querySelector('#btn-8');
let num9=document.querySelector('#btn-9');
let num4=document.querySelector('#btn-4');
let num5=document.querySelector('#btn-5');
let num6=document.querySelector('#btn-6');
let num1=document.querySelector('#btn-1');
let num2=document.querySelector('#btn-2');
let num3=document.querySelector('#btn-3');
let num0=document.querySelector('#btn-0');

function calculate(currentInput){

    if (currentInput === '0' && input.startsWith('0')) {
        input = input.slice(1);
    }
    input+=currentInput;
    calculationPanel.innerText=`${input}`
    solution=eval((input));
    answersPanel.innerText=`${solution}`;


}
                                            // accessibility Event Section

clearBtn.addEventListener("click",()=>{
    calculationPanel.innerText='';
    answersPanel.innerText='';
    input='';
    solution=null;

});
cancelBtn.addEventListener("click",()=>{
    input=input.slice(0,-1);
    calculationPanel.innerText=`${input}`;
    solution=eval((input));
    answersPanel.innerText=`${solution}`;

});

// SwapCalculator.addEventListener();

                                            // Operators  Event Section

dot.addEventListener("click",()=> calculate('.'));                                            
modulusOperator.addEventListener("click", ()=>calculate('%'));
productOperator.addEventListener("click", ()=>calculate('*'));
diffOperator.addEventListener("click", ()=>calculate('-'));
addOperator.addEventListener("click",()=>calculate('+'));
divisionOperator.addEventListener("click",()=>calculate('/'))
equalTo.addEventListener("click",()=>{
    calculationPanel.innerText=`${solution}`;
    input=solution;
});

                                             // Number Event section

num0.addEventListener("click", () => calculate('0'));
num1.addEventListener("click", () => calculate('1'));
num2.addEventListener("click", () => calculate('2'));
num3.addEventListener("click", () => calculate('3'));
num4.addEventListener("click", () => calculate('4'));
num5.addEventListener("click", () => calculate('5'));
num6.addEventListener("click", () => calculate('6'));
num7.addEventListener("click", () => calculate('7'));
num8.addEventListener("click", () => calculate('8'));
num9.addEventListener("click", () => calculate('9'));