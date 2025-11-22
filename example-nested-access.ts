// Example: How to safely replace fields?.tostat?.[fieldIndex]

import { safeGet } from './app/api/proxy/[...path]/safeGet';

// Original unsafe code:
// const value = fields?.tostat?.[fieldIndex];

// ✅ RECOMMENDED: Use polymorphic safeGet - works with both objects and arrays!
// This replaces: fields?.tostat?.[fieldIndex]
function exampleSafe(fields: {[key: string]: any} | null | undefined, fieldIndex: number) {
    // Handle null/undefined fields (optional chaining)
    if (!fields) {
        return undefined;
    }
    
    // safeGet is now polymorphic - it can get object properties OR array indices!
    // Step 1: Get the "tostat" property (object access)
    const tostat = safeGet(fields, "tostat");
    
    // Step 2: Get the array index (array access) - safeGet handles both!
    return safeGet(tostat, fieldIndex);
}

// ✅ Even simpler - one-liner version:
function exampleOneLiner(fields: {[key: string]: any} | null | undefined, fieldIndex: number) {
    // Chain safeGet calls - it handles both object properties and array indices
    return fields ? safeGet(safeGet(fields, "tostat"), fieldIndex) : undefined;
}

// ✅ With default value - no need for null checks!
function exampleWithDefault(fields: {[key: string]: any} | null | undefined, fieldIndex: number) {
    // Use default value to handle missing properties/indices
    // If fields is null/undefined, tostat will be [], then safeGet will return 'default'
    const tostat = safeGet(fields, "tostat", []);
    return safeGet(tostat, fieldIndex, 'default');
}

// ✅ One-liner with defaults:
function exampleOneLinerWithDefault(fields: {[key: string]: any} | null | undefined, fieldIndex: number) {
    return safeGet(safeGet(fields, "tostat", []), fieldIndex, 'default');
}

// ✅ Works with plain objects too (not just arrays):
function exampleObjectAccess(fields: {[key: string]: any} | null | undefined, fieldIndex: number) {
    if (!fields) {
        return undefined;
    }
    
    const tostat = safeGet(fields, "tostat");
    
    // If tostat is an object with numeric string keys like {"0": "value"}
    if (tostat && typeof tostat === 'object' && !Array.isArray(tostat)) {
        return safeGet(tostat, String(fieldIndex)); // Convert number to string for object key
    }
    
    // If tostat is an array, safeGet handles it directly with the number
    return safeGet(tostat, fieldIndex);
}

