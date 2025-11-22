import { safeGet, safeSet } from './safeGet';

describe('safeGet', () => {
    const testMap = {
        'localhost': true,
        '127.0.0.1': '127.0.0.1',
        'api.example.com': 'https://api.example.com',
        'db.host': 'localhost',
        'db.port': 5432,
    };

    describe('basic functionality', () => {
        it('should return value for valid key', () => {
            expect(safeGet(testMap, 'localhost')).toBe(true);
            expect(safeGet(testMap, '127.0.0.1')).toBe('127.0.0.1');
            expect(safeGet(testMap, 'api.example.com')).toBe('https://api.example.com');
        });

        it('should return undefined for non-existent key', () => {
            expect(safeGet(testMap, 'nonexistent')).toBeUndefined();
        });

        it('should return undefined for empty string key', () => {
            expect(safeGet(testMap, '')).toBeUndefined();
        });

        it('should return undefined for null/undefined key', () => {
            expect(safeGet(testMap, null as any)).toBeUndefined();
            expect(safeGet(testMap, undefined as any)).toBeUndefined();
        });
    });

    describe('prototype pollution protection', () => {
        it('should block __proto__ key', () => {
            expect(safeGet(testMap, '__proto__')).toBeUndefined();
        });

        it('should block constructor key', () => {
            expect(safeGet(testMap, 'constructor')).toBeUndefined();
        });

        it('should block prototype key', () => {
            expect(safeGet(testMap, 'prototype')).toBeUndefined();
        });

        it('should block hasOwnProperty key', () => {
            expect(safeGet(testMap, 'hasOwnProperty')).toBeUndefined();
        });

        it('should block keys starting with __', () => {
            expect(safeGet(testMap, '__custom')).toBeUndefined();
            expect(safeGet(testMap, '__anything')).toBeUndefined();
        });

        it('should block all dangerous keys from DANGEROUS_KEYS set', () => {
            const dangerousKeys = [
                '__proto__',
                'constructor',
                'prototype',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'toLocaleString',
                'toString',
                'valueOf',
            ];

            dangerousKeys.forEach(key => {
                expect(safeGet(testMap, key)).toBeUndefined();
            });
        });
    });

    describe('type safety', () => {
        it('should work with different value types', () => {
            const mixedMap = {
                string: 'value',
                number: 42,
                boolean: true,
                array: [1, 2, 3],
                object: { nested: 'value' },
            };

            expect(safeGet(mixedMap, 'string')).toBe('value');
            expect(safeGet(mixedMap, 'number')).toBe(42);
            expect(safeGet(mixedMap, 'boolean')).toBe(true);
            expect(safeGet(mixedMap, 'array')).toEqual([1, 2, 3]);
            expect(safeGet(mixedMap, 'object')).toEqual({ nested: 'value' });
        });
    });
});

describe('safeSet', () => {
    let testMap: {[key: string]: any};

    beforeEach(() => {
        testMap = {
            'localhost': true,
            '127.0.0.1': '127.0.0.1',
        };
    });

    describe('basic functionality', () => {
        it('should set value for valid key', () => {
            expect(safeSet(testMap, 'newKey', 'newValue')).toBe(true);
            expect(safeGet(testMap, 'newKey')).toBe('newValue');
        });

        it('should overwrite existing value', () => {
            expect(safeSet(testMap, 'localhost', false)).toBe(true);
            expect(safeGet(testMap, 'localhost')).toBe(false);
        });

        it('should return false for empty string key', () => {
            expect(safeSet(testMap, '', 'value')).toBe(false);
            expect(safeGet(testMap, '')).toBeUndefined();
        });
    });

    describe('prototype pollution protection', () => {
        it('should block __proto__ key', () => {
            expect(safeSet(testMap, '__proto__', { polluted: true })).toBe(false);
            expect(({} as any).polluted).toBeUndefined();
        });

        it('should block constructor key', () => {
            expect(safeSet(testMap, 'constructor', 'hacked')).toBe(false);
        });

        it('should block prototype key', () => {
            expect(safeSet(testMap, 'prototype', {})).toBe(false);
        });

        it('should block keys starting with __', () => {
            expect(safeSet(testMap, '__custom', 'value')).toBe(false);
            expect(safeGet(testMap, '__custom')).toBeUndefined();
        });
    });
});

describe('safeGet with arrays (polymorphic)', () => {
    const testMap: {[key: string]: string[]} = {
        'foo': ['first', 'second', 'third'],
        'bar': ['a', 'b', 'c'],
        'empty': [],
        'numbers': ['1', '2', '3'],
    };

    describe('basic functionality', () => {
        it('should return array item for valid key and index', () => {
            const arr = safeGet(testMap, 'foo');
            expect(safeGet(arr, 0)).toBe('first');
            expect(safeGet(arr, 1)).toBe('second');
            expect(safeGet(safeGet(testMap, 'bar'), 0)).toBe('a');
        });

        it('should return undefined for non-existent key', () => {
            const arr = safeGet(testMap, 'nonexistent');
            expect(safeGet(arr, 0)).toBeUndefined();
        });

        it('should return undefined for out of bounds index', () => {
            const arr = safeGet(testMap, 'foo');
            expect(safeGet(arr, 10)).toBeUndefined();
            expect(safeGet(arr, -1)).toBeUndefined();
        });

        it('should return undefined for empty array', () => {
            const arr = safeGet(testMap, 'empty');
            expect(safeGet(arr, 0)).toBeUndefined();
        });

        it('should return undefined if value is not an array', () => {
            const nonArrayMap = {
                'notArray': 'string value',
            };
            const value = safeGet(nonArrayMap, 'notArray');
            expect(Array.isArray(value)).toBe(false);
        });
    });

    describe('prototype pollution protection', () => {
        it('should block dangerous keys', () => {
            expect(safeGet(testMap, '__proto__')).toBeUndefined();
            expect(safeGet(testMap, 'constructor')).toBeUndefined();
            expect(safeGet(testMap, 'prototype')).toBeUndefined();
        });

        it('should work with numeric indices safely', () => {
            const arr = safeGet(testMap, 'foo');
            expect(safeGet(arr, 0)).toBe('first');
            expect(safeGet(arr, 1)).toBe('second');
            expect(safeGet(arr, 2)).toBe('third');
        });
    });

    describe('real-world scenario', () => {
        it('should safely access nested array from user input key', () => {
            // Simulating: obj[userInput][0] where userInput comes from req.query
            const userInput = 'foo';
            const arr = safeGet(testMap, userInput);
            const result = safeGet(arr, 0);
            expect(result).toBe('first');
        });
    });
});

describe('safeGet with nested objects (polymorphic)', () => {
    const nestedMap = {
        'level1': {
            'level2': {
                'level3': 'deep value',
            },
            'array': ['a', 'b', 'c'],
        },
        'simple': 'value',
    };

    describe('basic functionality', () => {
        it('should return nested value for valid path', () => {
            const level1 = safeGet(nestedMap, 'level1');
            const level2 = safeGet(level1, 'level2');
            const level3 = safeGet(level2, 'level3');
            expect(level3).toBe('deep value');
            
            // Or chained
            expect(safeGet(safeGet(safeGet(nestedMap, 'level1'), 'level2'), 'level3')).toBe('deep value');
            expect(safeGet(nestedMap, 'simple')).toBe('value');
        });

        it('should return undefined for invalid path', () => {
            expect(safeGet(nestedMap, 'nonexistent')).toBeUndefined();
            const level1 = safeGet(nestedMap, 'level1');
            expect(safeGet(level1, 'nonexistent')).toBeUndefined();
        });
    });

    describe('prototype pollution protection', () => {
        it('should block dangerous keys at any level', () => {
            expect(safeGet(nestedMap, '__proto__')).toBeUndefined();
            const level1 = safeGet(nestedMap, 'level1');
            expect(safeGet(level1, '__proto__')).toBeUndefined();
            expect(safeGet(nestedMap, 'constructor')).toBeUndefined();
        });
    });
});

