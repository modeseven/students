# SafeGet Codemod Tools

Complete guide for migrating unsafe bracket notation to `safeGet`/`safeSet`.

## The Problem

Semgrep's `eslint.detect-object-injection` rule flags unsafe bracket notation:
- `obj[userInput]` ❌
- `obj[param]` ❌  
- `obj[key] = value` ❌

## The Solution

Use `safeGet` and `safeSet`:
- `safeGet(obj, userInput)` ✅
- `safeGet(obj, param)` ✅
- `safeSet(obj, key, value)` ✅

---

## Part 1: Setup (One-Time)

### Prerequisites

✅ You already have `safeGet.ts` on your work machine  
✅ Next.js + TypeScript project

### Step 1: Create Directory
```bash
mkdir -p codemods
```

### Step 2: Copy Files

Copy these 2 files to `codemods/`:
- ✅ `replace-unsafe-bracket-notation.js` - Main codemod
- ✅ `find-unsafe-patterns-ast.js` - Finder script

### Step 3: Install Dependencies
```bash
npm install --save-dev jscodeshift @babel/parser @babel/core
```

### Step 4: Add NPM Scripts

Add to `package.json` `"scripts"` section:

```json
"codemod:find": "node codemods/find-unsafe-patterns-ast.js",
"codemod:preview": "jscodeshift --parser=tsx -t codemods/replace-unsafe-bracket-notation.js --dry --print",
"codemod:apply": "jscodeshift --parser=tsx -t codemods/replace-unsafe-bracket-notation.js"
```

### Step 5: Test Setup

```bash
# Create test file
cat > test-unsafe.ts << 'EOF'
const obj: {[key: string]: any} = {};
export function test(key: string) {
    return obj[key];
}
EOF

# Run finder
npm run codemod:find -- test-unsafe.ts

# Should see: ⚠️  Found 1 potentially unsafe bracket notation pattern(s)
```

### Step 6: Configure Import Path

**You need to tell the codemod where your `safeGet.ts` file is located.**

1. Open `codemods/replace-unsafe-bracket-notation.js`
2. Find the `CONFIGURATION` section (around line 70)

**Option A: Use Next.js Path Alias (Recommended)**
```javascript
const USE_PATH_ALIAS = true;
const PATH_ALIAS = '@/utils/safeGet';  // ← Change this to your path
```
- If `safeGet.ts` is at `app/utils/safeGet.ts` → use `'@/utils/safeGet'`
- If `safeGet.ts` is at `app/lib/safeGet.ts` → use `'@/lib/safeGet'`
- If your alias is `@app` instead of `@` → use `'@app/utils/safeGet'`

**Option B: Use Relative Paths**
```javascript
const USE_PATH_ALIAS = false;
// Then configure the relative path logic below
```

The code has detailed comments with examples for both options.

---

## Part 2: Usage (Ongoing)

### Three-Step Workflow

#### 1️⃣ Find Issues

```bash
# Find all unsafe patterns
npm run codemod:find -- app/

# Find in specific file
npm run codemod:find -- app/api/example.ts

# JSON output for tooling
npm run codemod:find -- app/ --json
```

**Output:**
```
⚠️  Found 5 potentially unsafe bracket notation pattern(s):

📄 app/api/example.ts
   Line 42:15 - myMap[param]
   const value = myMap[param];
   ⚠️  Bracket object notation with variable key "param" might allow prototype pollution
```

#### 2️⃣ Preview Changes

```bash
# Preview what would change
npm run codemod:preview -- app/

# Preview specific file
npm run codemod:preview -- app/api/example.ts
```

Shows before/after diff of what would change.

#### 3️⃣ Apply Changes

```bash
# Apply transformations
npm run codemod:apply -- app/

# Apply to specific file
npm run codemod:apply -- app/api/example.ts
```

**Automatically:**
- Transforms `obj[key]` → `safeGet(obj, key)`
- Transforms `obj[key] = val` → `safeSet(obj, key, val)`
- Adds imports automatically

### Complete Example

```bash
# 1. Find issues
npm run codemod:find -- app/api/

# 2. Preview (review carefully!)
npm run codemod:preview -- app/api/

# 3. Apply
npm run codemod:apply -- app/api/

# 4. Verify (should find 0 issues)
npm run codemod:find -- app/api/

# 5. Test
npm test

# 6. Commit
git add .
git commit -m "Migrate to safeGet"
```

---

## What Gets Transformed

✅ **Transformed:**
- `obj[variable]` → `safeGet(obj, variable)`
- `obj[param]` → `safeGet(obj, param)`
- `obj[key] = value` → `safeSet(obj, key, value)`

❌ **NOT Transformed (Safe):**
- `obj["literal"]` - String literals
- `obj[0]` - Numeric indices
- `delete obj[key]` - Delete statements
- Already using `safeGet`/`safeSet`

---

## Tips

1. **Start small**: Test on one file first
2. **Review previews**: Always check what will change
3. **Commit first**: `git commit` before applying
4. **Test after**: Run `npm test` after changes
5. **Iterate**: Do one directory at a time

---

## Troubleshooting

### Import path wrong?
Manually fix the import path after transformation.

### Type errors?
Add type assertions: `safeGet(obj, key) as string`

### Nested access?
Manually refactor: `safeGet(safeGet(obj, key1), key2)`

### Parser errors?
Make sure you're using `--parser=tsx` flag (already in npm scripts).

---

## File Checklist

Before using the tools, verify:
- [ ] `codemods/replace-unsafe-bracket-notation.js`
- [ ] `codemods/find-unsafe-patterns-ast.js`
- [ ] `package.json` has the 3 npm scripts
- [ ] Dependencies installed (`jscodeshift`, `@babel/parser`, `@babel/core`)
- [ ] `safeGet.ts` exists in your project ✅

---

**That's it!** You're ready to migrate unsafe bracket notation to `safeGet`.

