// Test default value parameter in safeGet

import { safeGet } from './app/api/proxy/[...path]/safeGet';

// Test 1: Object property that exists
const obj1 = { foo: 'bar' };
console.log(safeGet(obj1, 'foo')); // 'bar'
console.log(safeGet(obj1, 'foo', 'default')); // 'bar' (value exists, ignore default)

// Test 2: Object property that doesn't exist
const obj2 = { foo: 'bar' };
console.log(safeGet(obj2, 'missing')); // undefined
console.log(safeGet(obj2, 'missing', 'default')); // 'default'

// Test 3: Object property that exists but is undefined
const obj3 = { foo: undefined };
console.log(safeGet(obj3, 'foo')); // undefined (property exists with undefined value)
console.log(safeGet(obj3, 'foo', 'default')); // undefined (property exists, don't use default)

// Test 4: Array index that exists
const arr1 = ['a', 'b', 'c'];
console.log(safeGet(arr1, 1)); // 'b'
console.log(safeGet(arr1, 1, 'default')); // 'b' (value exists, ignore default)

// Test 5: Array index that doesn't exist
const arr2 = ['a', 'b', 'c'];
console.log(safeGet(arr2, 10)); // undefined
console.log(safeGet(arr2, 10, 'not found')); // 'not found'

// Test 6: Array index that exists but is undefined
const arr3 = ['a', undefined, 'c'];
console.log(safeGet(arr3, 1)); // undefined (element exists with undefined value)
console.log(safeGet(arr3, 1, 'default')); // undefined (element exists, don't use default)

// Test 7: Nested access with default
const fields = {
    tostat: ['item0', 'item1']
};
const fieldIndex = 5;
const value = safeGet(safeGet(fields, 'tostat', []), fieldIndex, 'default');
console.log(value); // 'default' (index 5 doesn't exist)

