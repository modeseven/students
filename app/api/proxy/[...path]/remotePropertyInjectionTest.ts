import { safeGet, safeSet } from './safeGet';

// Test case: Accessing {[field: string]: any} with function parameter
type ConfigMap = {[field: string]: any};

const myMap: ConfigMap = {
    "localhost": true,
    "127.0.0.1": true,
    "api.example.com": "https://api.example.com",
    "db.host": "localhost",
    "db.port": 5432,
};

// ============================================
// UNSAFE PATTERNS - WILL TRIGGER
// ============================================

// Test 1: Direct read access with function parameter - MIGHT trigger at work
export function testDirectAccess(param: string) {
    // This might trigger if your work rule checks reads
    return safeGet(myMap, param);
}

// Test 2: Direct assignment with function parameter - WILL TRIGGER
export function testDirectAssignment(param: string, value: any) {
    // This WILL trigger - assigning to map with function parameter
    safeSet(myMap, param, value);
    return myMap;
}

// Test 3: Assignment in Express handler - WILL TRIGGER
export function expressHandler(req: any, res: any) {
    const field = req.query.field;  // User input
    const value = req.query.value;
    // This WILL trigger - assigning with user input as key
    safeSet(myMap, field, value);
    return res.json(myMap);
}

// Test 4: Read access in Express handler - MIGHT trigger at work
export function expressReadHandler(req: any, res: any) {
    const field = req.query.field;  // User input
    // This might trigger if your work rule checks reads
    const value = safeGet(myMap, field);
    return res.json({ value });
}

// ============================================
// SAFE PATTERNS - Should NOT trigger
// ============================================

// Test 5: Using safeGet - Should NOT trigger
export function testSafeGet(param: string) {
    // This should NOT trigger - using safe wrapper function
    return safeGet(myMap, param);
}

// Test 6: Using safeSet - Should NOT trigger
export function testSafeSet(param: string, value: any) {
    // This should NOT trigger - using safe wrapper function
    return safeSet(myMap, param, value);
}

// Test 7: Using safeGet in Express handler - Should NOT trigger
export function safeExpressHandler(req: any, res: any) {
    const field = req.query.field;  // User input
    // This should NOT trigger - using safe wrapper
    const value = safeGet(myMap, field);
    return res.json({ value });
}

// Test 8: Using safeSet in Express handler - Should NOT trigger
export function safeExpressSetHandler(req: any, res: any) {
    const field = req.query.field;  // User input
    const value = req.query.value;
    // This should NOT trigger - using safe wrapper
    safeSet(myMap, field, value);
    return res.json(myMap);
}

// Test 9: Direct literal access - Should NOT trigger
export function testLiteralAccess() {
    // This should NOT trigger - using literal string
    return safeGet(myMap, "localhost");
}
