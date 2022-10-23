let mathString = "";
let numDISPLAY = document.querySelector("#operand");
let operatorDISPLAY = document.querySelector("#operator");
let eqesionDISPLAY = document.querySelector("#function");

// // function ce() {
// //     if (isNaN(mathString[mathString.length-1])) {
// //         mathString = mathString.slice(0, mathString.length-1);
// //         updateDisplay("ceOP");
// //     } else {
// //         mathString = mathString.slice(0, -numDISPLAY.innerHTML.length);
// //         updateDisplay("ceNUM");
// //     }
// // }
// function cLast() {
//     if (isNaN(mathString[mathString.length-1])) {
//         mathString = mathString.slice(0, mathString.length-1);
//         updateDisplay("ceOP");
//     } else {
        
//     }
// }
function regularEntry(a) {
    if (isOperator(a)) if (mathString == "") mathString += numDISPLAY.innerHTML;
    mathString += a;
    updateDisplayB();

}
function updateDisplayB(){
    eqesionDISPLAY.innerHTML = mathString;
    if (operatorDISPLAY.innerHTML == "=") operatorDISPLAY.innerHTML = "";

    let enter = mathString[mathString.length - 1];
    let last = mathString[mathString.length-2];

    if (!isNaN(enter)) {
        if (!isNaN(last))    numDISPLAY.innerHTML += enter;
            else             numDISPLAY.innerHTML = enter;
    } 
     else
    if (isOperator(enter)) {
        operatorDISPLAY.innerHTML = enter;
    }
     else 
    if (enter == "=") {
        numDISPLAY.innerHTML = calculate(mathString.slice(0, -1));
        operatorDISPLAY.innerHTML = enter;
        mathString = "";
    }

}

function cc() {
    numDISPLAY.innerHTML = operatorDISPLAY.innerHTML = eqesionDISPLAY.innerHTML = mathString = "";
}

function ce() {
    let enter = mathString[mathString.length - 1];
    if (isNaN(enter)) {
        mathString = mathString.slice(0, -1);
        eqesionDISPLAY.innerHTML = mathString;
        operatorDISPLAY.innerHTML = "";
    }
    else {
        let lastNumber = numDISPLAY.innerHTML;
        mathString = mathString.slice(0, -lastNumber.length);
        numDISPLAY.innerHTML = "";
        eqesionDISPLAY.innerHTML = mathString;
    }
}
function cLast() {
    let enter = mathString[mathString.length - 1];
    if (isNaN(enter)) {
        ce();
    }
    else {
        //let lastNumber = numDISPLAY.innerHTML;
        mathString = mathString.slice(0, -1);
        eqesionDISPLAY.innerHTML = mathString;
        numDISPLAY.innerHTML = numDISPLAY.innerHTML.slice(0, -1);
    }
}



// function updateDisplay(caller){
//     eqesionDISPLAY.innerHTML = mathString;
//     if (!isNaN(caller)) {
//                     if (!isNaN(lastEntered))             numDISPLAY.innerHTML += caller;
//                         else                             numDISPLAY.innerHTML = caller;
//     } else
//     if (isOperator(caller)) {
//         operatorDISPLAY.innerHTML = caller;
//         if (lastEntered == '='){
//             mathString += numDISPLAY.innerHTML;
//         }
//     } else 
//     if (caller == "=") {
//         numDISPLAY.innerHTML = calculate(mathString);
//         operatorDISPLAY.innerHTML = caller;
//         mathString = "";

//     } else 
//     if (caller == "c") {
//         numDISPLAY.innerHTML = operatorDISPLAY.innerHTML = eqesionDISPLAY.innerHTML = "";
//     } else 
//     if (caller == "ceOP") {
//         operatorDISPLAY.innerHTML = "";
//     } else 
//     if (caller == "ceNUM") {
//         numDISPLAY.innerHTML = "";
//     }
   
// }
function isOperator(caller){
    if (caller == "+" || caller == "-" || caller == "*" || caller == "/") {
            return true;
    } else return false;
}












//----------------------------calculation part--------------------------------
function calculate(eqesion) {
    
    //base cases
    if (!eqesion.length) return;  
    if (!(isNaN(eqesion))) return eqesion *1;

    //dealing with ()
    eqesion = parentheses(eqesion)
    
    // + and -
    for (let index = eqesion.length-1; index > 0 ; index--) {
        if (isOperator(eqesion[index]) && isOperator(eqesion[index-1])) continue;
            if (eqesion[index] == "+"){
                return  calculate(eqesion.slice(0, index)) + calculate(eqesion.slice(index+1));
            } else if (eqesion[index] == "-"){
                return calculate(eqesion.slice(0, index)) - calculate(eqesion.slice(index + 1));
            } 
        }
    
    // * and /
        for (let index = eqesion.length-1; index >= 0 ; index--) {
            if (eqesion[index] == "*") {
                return calculate(eqesion.slice(0, index)) * calculate(eqesion.slice(index +1));
            } else if (eqesion[index] == "/"){
                return calculate(eqesion.slice(0, index)) / calculate(eqesion.slice(index + 1));
        }
    }
    
}

// function myinput() {
//     document.querySelector("#output").innerHTML = calculate(document.querySelector("#input").value);
// }

function parentheses(eqesion) {
    let open, close;
    open  = close = eqesion.length;
        for (let index = eqesion.length-1; index >= 0 ; index--) {
        if (eqesion[index] == ")") close = index;
            if (eqesion[index] == "("){
                open = index;
                if (!isNaN(eqesion[open-1])){
                    eqesion = eqesion.slice(0, open) + "*" + eqesion.slice(open);
                    open++;
                    close++;
                }
                eqesion = eqesion.slice(0, open) + calculate(eqesion.slice(open+1, close)) + eqesion.slice(close+1);
                index = eqesion.length-1;
                open  = close = eqesion.length;
            } 
        }
    return eqesion;
}
