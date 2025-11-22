// Test polymorphic safeGet - should work with both objects and arrays

import { safeGet } from './app/api/proxy/[...path]/safeGet';

// Test 1: Object property access (string key)
const obj = { foo: 'bar', localhost: true };
const value1 = safeGet(obj, 'foo'); // ✅ Should work
const value2 = safeGet(obj, 'localhost'); // ✅ Should work

// Test 2: Array index access (number key)
const arr = ['a', 'b', 'c'];
const value3 = safeGet(arr, 0); // ✅ Should work - array index
const value4 = safeGet(arr, 1); // ✅ Should work - array index

// Test 3: Nested access pattern - fields?.tostat?.[fieldIndex]
const fields = {
    tostat: ['item0', 'item1', 'item2']
};
const fieldIndex = 1;
const tostat = safeGet(fields, 'tostat'); // Get the array
const value5 = safeGet(tostat, fieldIndex); // ✅ Should work - array index

// Test 4: Direct nested access in one line (if tostat is array)
// This is what the user wants: fields?.tostat?.[fieldIndex]
const value6 = safeGet(safeGet(fields, 'tostat'), fieldIndex); // ✅ Should work

