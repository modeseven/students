// Test file for Semgrep eslint.detect-object-injection rule

// This SHOULD trigger the rule - unsafe bracket notation with user input
function unsafeAccess1(myMap: {[key: string]: any}, userInput: string) {
    return myMap[userInput];  // ❌ Should be flagged
}

// This SHOULD trigger the rule - unsafe bracket notation with param
function unsafeAccess2(myMap: {[key: string]: any}, param: string) {
    const value = myMap[param];  // ❌ Should be flagged
    return value;
}

// This should NOT trigger - literal string
function safeAccess1(myMap: {[key: string]: any}) {
    return myMap["localhost"];  // ✅ Safe - literal string
}

// This should NOT trigger - numeric index
function safeAccess2(myArr: any[]) {
    return myArr[0];  // ✅ Safe - numeric index
}

// This should NOT trigger - using safeGet
import { safeGet } from './app/api/proxy/[...path]/safeGet';

function safeAccess3(myMap: {[key: string]: any}, userInput: string) {
    return safeGet(myMap, userInput);  // ✅ Safe - using safeGet wrapper
}

// This should NOT trigger - variable assigned from literal
function safeAccess4(myMap: {[key: string]: any}) {
    const key = "localhost";
    return myMap[key];  // ✅ Safe - key is from literal
}

// This SHOULD trigger - variable from user input
function unsafeAccess3(myMap: {[key: string]: any}, userInput: string) {
    const key = userInput;
    return myMap[key];  // ❌ Should be flagged
}

