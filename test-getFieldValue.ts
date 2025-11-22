// Quick test of getFieldValue function

import { getFieldValue } from './app/api/proxy/[...path]/safeGet';

// Test 1: Basic usage - get index 0
const fields1 = {
    name: ['John', 'Doe'],
    age: ['25'],
    email: ['john@example.com']
};

console.log('Test 1 - Basic (index 0):', getFieldValue(fields1, 'name')); // 'John'
console.log('Test 2 - Index 1:', getFieldValue(fields1, 'name', 1)); // 'Doe'
console.log('Test 3 - Missing field:', getFieldValue(fields1, 'missing')); // ''
console.log('Test 4 - Out of bounds:', getFieldValue(fields1, 'name', 5)); // ''
console.log('Test 5 - Custom default:', getFieldValue(fields1, 'missing', 0, 'N/A')); // 'N/A'

// Test 6: Null/undefined fields
console.log('Test 6 - Null fields:', getFieldValue(null, 'name')); // ''
console.log('Test 7 - Undefined fields:', getFieldValue(undefined, 'name')); // ''

// Test 7: Real-world usage pattern
const fields2: {[field: string]: string[]} = {
    firstName: ['Jane'],
    lastName: ['Smith'],
    middleName: [] // Empty array
};

console.log('Test 8 - Empty array:', getFieldValue(fields2, 'middleName')); // ''
console.log('Test 9 - With custom default:', getFieldValue(fields2, 'middleName', 0, 'No middle name')); // 'No middle name'

