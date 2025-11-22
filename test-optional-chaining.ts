import { safeGet, getFieldValue } from '@/utils/safeGet';
// Test file with optional chaining pattern

const fields: {[field: string]: string[]} = {
    myfield: ['value1', 'value2', 'value3'],
    otherfield: ['a', 'b']
};

// Pattern: fields?.myfield?.[fieldIndex]
export function testOptionalChaining(fieldIndex: number) {
    // This is the pattern we want to test
    return getFieldValue(fields, 'myfield', fieldIndex);
}

// Pattern with variable field name
export function testOptionalChainingWithVariable(fieldName: string, fieldIndex: number) {
    return safeGet(fields?.[fieldName], fieldIndex);
}

// Pattern with request parameter
export function testFromRequest(req: any) {
    const fieldName = req.query.field;
    const fieldIndex = parseInt(req.query.index);
    return safeGet(fields?.[fieldName], fieldIndex);
}

// Safe pattern (should NOT be flagged)
export function testSafe() {
    return getFieldValue(fields, 'myfield', 0);  // ✅ Safe - numeric literal
}

