// Test file with unsafe patterns for the finder

const myMap: {[key: string]: any} = {
    "localhost": true,
};

// Unsafe - should be flagged
export function unsafe1(param: string) {
    return myMap[param];  // ❌ Should be flagged
}

// Unsafe - should be flagged
export function unsafe2(req: any) {
    const field = req.query.field;
    return myMap[field];  // ❌ Should be flagged
}

// Safe - should NOT be flagged
export function safe1() {
    return myMap["localhost"];  // ✅ Safe - literal string
}

// Safe - should NOT be flagged
export function safe2() {
    return myMap[0];  // ✅ Safe - numeric index
}

// Unsafe assignment - should be flagged
export function unsafe3(key: string, value: any) {
    myMap[key] = value;  // ❌ Should be flagged
}

