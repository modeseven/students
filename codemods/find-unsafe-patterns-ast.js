#!/usr/bin/env node
/**
 * AST-based finder for unsafe bracket notation patterns
 * More accurate than regex-based approach - uses jscodeshift AST parsing
 * 
 * Usage:
 *   node codemods/find-unsafe-patterns-ast.js <path>
 *   node codemods/find-unsafe-patterns-ast.js app/ --json
 */

const jscodeshift = require('jscodeshift');
const fs = require('fs');
const path = require('path');

function findUnsafePatternsAST(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  let root;
  try {
    root = jscodeshift.withParser('tsx')(content);
  } catch (e) {
    // If parsing fails, skip this file
    return issues;
  }
  
  // Find all MemberExpression with computed properties
  root.find(jscodeshift.MemberExpression).forEach(path => {
    if (!path.value || !path.value.property) {
      return;
    }
    
    // Only check computed property access (bracket notation)
    if (path.value.computed !== true) {
      return;
    }
    
    // Skip if this is part of a delete statement - delete is safe
    if (path.parent && path.parent.value) {
      const parent = path.parent.value;
      if (parent.type === 'UnaryExpression' && parent.operator === 'delete') {
        return; // delete obj[key] is safe
      }
    }
    
    const property = path.value.property;
    
    // Skip if key is a literal string or number (safe)
    // TypeScript/Babel uses StringLiteral, NumericLiteral, or Literal depending on parser
    if (property.type === 'Literal' || 
        property.type === 'StringLiteral' || 
        property.type === 'NumericLiteral') {
      if (typeof property.value === 'string') {
        return; // String literal like obj["key"] - safe
      }
      if (typeof property.value === 'number') {
        return; // Number literal like obj[0] - safe
      }
      // For Literal type, check the value
      if (property.type === 'Literal' && 
          (typeof property.value === 'string' || typeof property.value === 'number')) {
        return;
      }
    }
    
    // Skip if key is a template literal with only static content (no expressions)
    if (property.type === 'TemplateLiteral') {
      const hasExpressions = property.expressions && property.expressions.length > 0;
      if (!hasExpressions) {
        return; // Static template literal like obj[`key`] - safe
      }
    }
    
    // Skip if this is already using safeGet/safeSet (already safe)
    if (path.parent && path.parent.value) {
      const parent = path.parent.value;
      if (parent.type === 'CallExpression' && 
          parent.callee && 
          (parent.callee.name === 'safeGet' || parent.callee.name === 'safeSet')) {
        return; // Already using safeGet/safeSet
      }
    }
    
    // This is potentially unsafe - flag it
    const loc = path.value.loc;
    if (loc) {
      const keyName = property.type === 'Identifier' 
        ? property.name 
        : property.type === 'MemberExpression'
        ? `${property.object.name || 'obj'}.${property.property.name || 'prop'}`
        : '[expression]';
      
      // Get the line of code
      const lines = content.split('\n');
      const lineContent = lines[loc.start.line - 1] || '';
      
      issues.push({
        file: filePath,
        line: loc.start.line,
        column: loc.start.column + 1,
        code: lineContent.trim(),
        pattern: `${path.value.object.name || 'obj'}[${keyName}]`,
        object: path.value.object.name || '[expression]',
        key: keyName,
        severity: 'warning',
        message: `Bracket object notation with variable key "${keyName}" might allow prototype pollution`,
        rule: 'eslint.detect-object-injection'
      });
    }
  });
  
  return issues;
}

function scanDirectory(dirPath, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const issues = [];
  
  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip node_modules, .next, etc.
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === '.next' ||
          entry.name === 'dist' ||
          entry.name === 'build') {
        continue;
      }
      
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext)) {
          try {
            const fileIssues = findUnsafePatternsAST(fullPath);
            issues.push(...fileIssues);
          } catch (error) {
            console.warn(`Warning: Could not scan ${fullPath}: ${error.message}`);
          }
        }
      }
    }
  }
  
  walkDir(dirPath);
  return issues;
}

// Main
const args = process.argv.slice(2);
const targetPath = args[0] || process.cwd();
const outputJson = args.includes('--json');

let issues = [];

if (fs.statSync(targetPath).isDirectory()) {
  issues = scanDirectory(targetPath);
} else {
  issues = findUnsafePatternsAST(targetPath);
}

if (outputJson) {
  console.log(JSON.stringify({
    issues: issues,
    count: issues.length,
    scanned: targetPath
  }, null, 2));
} else {
  if (issues.length === 0) {
    console.log('✅ No unsafe bracket notation patterns found!');
    process.exit(0);
  }
  
  console.log(`\n⚠️  Found ${issues.length} potentially unsafe bracket notation pattern(s):\n`);
  
  // Group by file
  const byFile = {};
  issues.forEach(issue => {
    if (!byFile[issue.file]) {
      byFile[issue.file] = [];
    }
    byFile[issue.file].push(issue);
  });
  
  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`\n📄 ${file}`);
    fileIssues.forEach(issue => {
      console.log(`   Line ${issue.line}:${issue.column} - ${issue.pattern}`);
      console.log(`   ${issue.code}`);
      console.log(`   ⚠️  ${issue.message}`);
      console.log(`   🔧 Rule: ${issue.rule}\n`);
    });
  });
  
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Preview changes: npm run codemod:preview -- ${targetPath}`);
  console.log(`   2. Apply changes:    npm run codemod:apply -- ${targetPath}`);
  
  process.exit(1);
}

