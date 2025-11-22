# SafeGet Migration Workflow

This guide helps you migrate unsafe bracket notation to `safeGet` without needing Semgrep locally.

## Three-Step Process

### Step 1: Find Unsafe Patterns

Identify all unsafe bracket notation patterns in your codebase:

```bash
# Find issues in a specific file
npm run codemod:find -- app/api/some-file.ts

# Find issues in a directory
npm run codemod:find -- app/

# Output as JSON (for tooling)
npm run codemod:find -- app/ --json
```

**What it finds:**
- `obj[variable]` where `variable` is not a literal
- Patterns that Semgrep's `eslint.detect-object-injection` would flag
- Uses AST parsing for accuracy (not regex)

**Output example:**
```
⚠️  Found 5 potentially unsafe bracket notation pattern(s):

📄 app/api/example.ts
   Line 42:15 - myMap[param]
   const value = myMap[param];
   ⚠️  Bracket object notation with variable key "param" might allow prototype pollution
   🔧 Rule: eslint.detect-object-injection
```

### Step 2: Preview Changes

See what the codemod would change before applying:

```bash
# Preview changes for a file
npm run codemod:preview -- app/api/some-file.ts

# Preview changes for a directory
npm run codemod:preview -- app/
```

**What it shows:**
- Line-by-line diff of what would change
- Files that would be modified
- Summary of changes

**Output example:**
```
📝 app/api/example.ts
────────────────────────────────────────────────────────────────────────────────
- 42: const value = myMap[param];
+ 42: const value = safeGet(myMap, param);
```

### Step 3: Apply Changes

Apply the codemod transformations:

```bash
# Apply to a specific file
npm run codemod:apply -- app/api/some-file.ts

# Apply to a directory
npm run codemod:apply -- app/
```

**What it does:**
- Transforms `obj[variable]` → `safeGet(obj, variable)`
- Transforms `obj[variable] = value` → `safeSet(obj, variable, value)`
- Automatically adds imports for `safeGet`/`safeSet`
- Preserves code structure and formatting

## Complete Workflow Example

```bash
# 1. Find all issues
npm run codemod:find -- app/

# 2. Preview changes (review carefully!)
npm run codemod:preview -- app/

# 3. Apply changes
npm run codemod:apply -- app/

# 4. Verify with finder again (should find 0 issues)
npm run codemod:find -- app/

# 5. Run tests
npm test

# 6. Commit changes
git add .
git commit -m "Migrate unsafe bracket notation to safeGet"
```

## Alternative: Using jscodeshift Directly

You can also use jscodeshift directly with more options:

```bash
# Dry run (preview) with verbose output
npx jscodeshift --parser=tsx -t codemods/replace-unsafe-bracket-notation.js --dry --print app/

# Apply with verbose output
npx jscodeshift --parser=tsx -t codemods/replace-unsafe-bracket-notation.js -v app/

# Apply to specific file types only
npx jscodeshift --parser=tsx -t codemods/replace-unsafe-bracket-notation.js --extensions=ts,tsx app/
```

## What Gets Transformed

✅ **Transformed:**
- `obj[variable]` → `safeGet(obj, variable)`
- `obj[param]` → `safeGet(obj, param)`
- `obj[key] = value` → `safeSet(obj, key, value)`

❌ **NOT Transformed (safe):**
- `obj["literal"]` - String literals are safe
- `obj[0]` - Numeric indices are safe
- `obj['static']` - Static strings are safe
- Already using `safeGet`/`safeSet`

## Troubleshooting

### Import Path Issues

If imports are incorrect after transformation, manually fix them:

```typescript
// Wrong (may happen)
import { safeGet } from './safeGet';

// Fix to correct relative path
import { safeGet } from '../api/proxy/[...path]/safeGet';
```

### Nested Access

For deeply nested access like `obj[key1][key2]`, you may need to manually refactor:

```typescript
// Before
const value = obj[key1][key2];

// After (manual refactor)
const nested = safeGet(obj, key1);
const value = safeGet(nested, key2);
```

### Type Issues

You may need to add type assertions if TypeScript complains:

```typescript
// May need type assertion
const value = safeGet(myMap, key) as string;
```

## Tips

1. **Start small**: Test on a single file first
2. **Review previews**: Always review the preview before applying
3. **Run tests**: Run your test suite after applying changes
4. **Git commit**: Commit before applying, so you can easily revert
5. **Iterate**: Apply to one directory at a time for easier review

