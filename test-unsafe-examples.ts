// Test file with 5 unsafe bracket notation patterns

const myMap: {[key: string]: any} = {
    "localhost": true,
    "api.example.com": "https://api.example.com"
};

// Unsafe pattern 1: Direct variable access
export function unsafe1(param: string) {
    return myMap[param];  // ❌ Unsafe
}

// Unsafe pattern 2: From request parameter
export function unsafe2(req: any) {
    const field = req.query.field;
    return myMap[field];  // ❌ Unsafe
}

// Unsafe pattern 3: Assignment with variable
export function unsafe3(key: string, value: any) {
    myMap[key] = value;  // ❌ Unsafe assignment
    return myMap;
}

// Unsafe pattern 4: Nested access
export function unsafe4(obj: any, key1: string, key2: string) {
    return obj[key1][key2];  // ❌ Unsafe nested
}

// Unsafe pattern 5: From function parameter
export function unsafe5(config: {[key: string]: any}, setting: string) {
    const value = config[setting];  // ❌ Unsafe
    return value;
}

// Safe patterns (should NOT be flagged)
export function safe1() {
    return myMap["localhost"];  // ✅ Safe - literal string
}

export function safe2() {
    return myMap[0];  // ✅ Safe - numeric index
}

