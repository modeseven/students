import { safeGet } from './safeGet';
// Test accessing object with numeric index
const myObj: {[field: string]: any} = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "localhost": true,
    "127.0.0.1": true,
};

// Test 1: Access with numeric literal index - Should NOT be flagged
function testNumericIndex(){
    return safeGet(myObj, 1);  // Literal number - should be safe
}

// Test 2: Access with string literal index - Should NOT be flagged
function testStringLiteral(){
    return safeGet(myObj, "localhost");  // Literal string - should be safe
}

// Test 3: Access with variable (user input) - WILL be flagged
function testVariableIndex(userInput: string){
    return safeGet(myObj, userInput);  // Variable key - should be flagged
}

// Test 4: Access with const variable (not user input) - Might be flagged
function testConstVariable(){
    const key = "localhost";
    return safeGet(myObj, key);  // Const variable - might be flagged
}

// Test 5: Access with numeric variable
function testNumericVariable(){
    const index = 1;
    return safeGet(myObj, index);  // Const numeric variable - might be flagged
}
