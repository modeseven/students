// Test null vs undefined behavior in safeGet

import { safeGet } from './app/api/proxy/[...path]/safeGet';

// Test 1: Property exists with value null (no default)
const obj1 = { foo: null };
console.log('Property with null value (no default):', safeGet(obj1, 'foo'));
// Expected: null (property exists, so return its value)

// Test 2: Property exists with value null (with default)
const obj2 = { foo: null };
console.log('Property with null value (with default):', safeGet(obj2, 'foo', 'default'));
// Expected: null (property exists, so return its value, not default)

// Test 3: Property doesn't exist (no default)
const obj3 = { foo: 'bar' };
console.log('Property missing (no default):', safeGet(obj3, 'missing'));
// Expected: undefined

// Test 4: Property doesn't exist (with default)
const obj4 = { foo: 'bar' };
console.log('Property missing (with default):', safeGet(obj4, 'missing', 'default'));
// Expected: 'default'

// Test 5: Map itself is null (no default)
console.log('Map is null (no default):', safeGet(null, 'foo'));
// Expected: undefined

// Test 6: Map itself is null (with default)
console.log('Map is null (with default):', safeGet(null, 'foo', 'default'));
// Expected: 'default'

// Test 7: Array element is null
const arr1 = ['a', null, 'c'];
console.log('Array element is null (no default):', safeGet(arr1, 1));
// Expected: null (element exists, so return its value)

// Test 8: Array element is null (with default)
const arr2 = ['a', null, 'c'];
console.log('Array element is null (with default):', safeGet(arr2, 1, 'default'));
// Expected: null (element exists, so return its value, not default)

