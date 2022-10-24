//-----version 2;
//-----operational functions are at the top part
//-----calculation functions are at the second part
//-----helper functions are at the buttom part
//-----Reviews are welcome :-) -----

let resDISPLAY = document.querySelector("#operand");
let eqesion = document.querySelector("#function");
let errorMessege = "---";
const validChars = ['0', '1','2','3','4','5','6','7','8','9','.','+','-','*','/','(',')','='];

function regularEntry(a) {
    if (isOperator(a)) if (eqesion.value[eqesion.value.length-1] == "=")
    {
        eqesion.value = resDISPLAY.innerHTML;

    }
    eqesion.value += a;
    compute();
}

eqesion.addEventListener("input", compute);

function compute() {   

    eqesionTEMP = eqesion.value;
    eqesion.value = ValidateInput(eqesion.value);
    if (eqesion.value != eqesionTEMP)      window.alert("inValid input");
    
    if (eqesion.value[eqesion.value.length-1] == "=") equal();
    else updateDisplayB(); 
       
}

function updateDisplayB(){
    
    let res = calculate(eqesion.value);
    if (!isNaN(res)) {
        resDISPLAY.innerHTML = res;
    }
    else {
        resDISPLAY.innerHTML = "";
    }

}

function cc() {
    resDISPLAY.innerHTML  = eqesion.value = "";
}

function ce() {
    
     if (isNaN(eqesion.value[eqesion.value.length-1])) 
            eqesion.value = eqesion.value.slice(0, -1);
    else 
            while (!isNaN(eqesion.value[eqesion.value.length-1]))         eqesion.value = eqesion.value.slice(0, -1);
    updateDisplayB();
}

function cLast() {
    eqesion.value = eqesion.value.slice(0, -1);
    updateDisplayB();
}


function equal() {

    let res = calculate(eqesion.value.slice(0, -1));
    if (!isNaN(res)) {
        resDISPLAY.innerHTML = res;
    }
    else {
        if (errorMessege == "---") errorMessege = "invalid eqesion!";
        window.alert(errorMessege);
        errorMessege = "---";
        eqesion.value = eqesion.value.slice(0, -1);
    } 
}












//----------------------------calculation part--------------------------------
function calculate(eqesion) {
    
    //base cases
    if (!eqesion.length) return;  
    if (!(isNaN(eqesion))) return eqesion *1;

    //dealing with ()
    eqesion = parentheses(eqesion);
    if (!(isNaN(eqesion))) return eqesion *1;
    
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
                right = calculate(eqesion.slice(index + 1));
                if (right == 0) {
                errorMessege = "cant divide by 0!";
                    return;
                } else
                return calculate(eqesion.slice(0, index)) / right;
        }
    }
    
}


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








//------------------helper functions------------------------





function isOperator(caller){
    if (caller == "+" || caller == "-" || caller == "*" || caller == "/") {
            return true;
    } else return false;
}

function ValidateInput(mathString) {
       
    for (let i = 0; i < mathString.length; i++) {
        if (!validChars.includes(mathString[i]))
        {
            mathString = mathString.slice(0, i) + mathString.slice(i+1, mathString.length-1);
            i = -1;
        }    
    }
    dot = false;
    for (let i = 0; i < mathString.length; i++) {
        if  (isOperator(mathString[i]))     dot = false;
        if (mathString[i] == '.')
        {
            if (isNaN(mathString[i-1]) || dot == true) mathString = mathString.slice(0, i) + mathString.slice(i+1, mathString.length-1);
            else         dot = true;
        } 
    }
    return mathString;
}

function sliceOneChar(str, i) {
    if (i == undefined) 
    {
        return str;
    }
    else
    return str.slice(0, i) + str.slice(i+1);
}





