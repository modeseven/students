/**
 * Codemod to replace unsafe bracket notation with safeGet/safeSet
 * 
 * Transforms:
 * - obj[variable] → safeGet(obj, variable)
 * - obj[variable] = value → safeSet(obj, variable, value)
 * 
 * Usage:
 *   npx jscodeshift -t codemods/replace-unsafe-bracket-notation.js <path>
 * 
 * IMPORTANT: CUSTOMIZE IMPORT PATH
 * =================================
 * Before using, you MUST configure the import path to your safeGet.ts file.
 * 
 * QUICK SETUP (Recommended):
 * 1. Find the CONFIGURATION section (around line 70)
 * 2. Set USE_PATH_ALIAS = true
 * 3. Set PATH_ALIAS to your safeGet.ts path (e.g., '@/utils/safeGet')
 * 
 * ALTERNATIVE (Relative paths):
 * 1. Set USE_PATH_ALIAS = false
 * 2. Configure the relative path logic in getImportPath()
 * 
 * See detailed comments in the getImportPath() function for examples.
 */

module.exports = function transformer(file, api, options) {
  const j = api.jscodeshift;
  
  // Skip non-TypeScript/JavaScript files
  if (!file.path.match(/\.(ts|tsx|js|jsx)$/)) {
    return file.source;
  }
  
  // Try to parse the file
  let root;
  try {
    root = j(file.source);
  } catch (e) {
    // If parsing fails, skip this file
    console.warn(`Warning: Could not parse ${file.path}: ${e.message}`);
    return file.source;
  }
  let hasSafeGetImport = false;
  let hasSafeSetImport = false;
  let hasGetFieldValueImport = false;
  let safeGetImportPath = null;

  // Find existing safeGet/safeSet/getFieldValue imports
  root.find(j.ImportDeclaration).forEach(path => {
    const source = path.value.source.value;
    if (source.includes('safeGet')) {
      safeGetImportPath = source;
      path.value.specifiers.forEach(spec => {
        if (spec.imported && spec.imported.name === 'safeGet') {
          hasSafeGetImport = true;
        }
        if (spec.imported && spec.imported.name === 'safeSet') {
          hasSafeSetImport = true;
        }
        if (spec.imported && spec.imported.name === 'getFieldValue') {
          hasGetFieldValueImport = true;
        }
      });
    }
  });

  // ============================================================================
  // IMPORTANT: CONFIGURE YOUR safeGet.ts PATH HERE
  // ============================================================================
  // 
  // This function determines the import path to your safeGet.ts file.
  // 
  // OPTION 1: Use Next.js path alias (RECOMMENDED)
  // ==============================================
  // If you have path aliases configured in tsconfig.json (like @/utils/safeGet),
  // set USE_PATH_ALIAS to true and configure PATH_ALIAS below.
  //
  // OPTION 2: Use relative paths
  // ============================
  // If you prefer relative paths, set USE_PATH_ALIAS to false and configure
  // the relative path logic below.
  //
  // ============================================================================
  
  // ========================================================================
  // CONFIGURATION: Choose your import style
  // ========================================================================
  const USE_PATH_ALIAS = true;  // ← Set to true for @/ notation, false for relative paths
  const PATH_ALIAS = '@/utils/safeGet';  // ← CHANGE THIS to your safeGet.ts path alias
  // Examples:
  //   '@/utils/safeGet'      if safeGet.ts is at app/utils/safeGet.ts
  //   '@/lib/safeGet'        if safeGet.ts is at app/lib/safeGet.ts
  //   '@/api/proxy/safeGet'  if safeGet.ts is at app/api/proxy/safeGet.ts
  //   '@app/utils/safeGet'   if your alias is @app instead of @
  
  const getImportPath = () => {
    // If file already imports safeGet, use that path
    if (safeGetImportPath) {
      return safeGetImportPath;
    }
    
    // ========================================================================
    // OPTION 1: Use Next.js path alias (e.g., @/utils/safeGet)
    // ========================================================================
    if (USE_PATH_ALIAS) {
      return PATH_ALIAS;  // Simple! Just return the alias path
    }
    
    // ========================================================================
    // OPTION 2: Use relative paths (if USE_PATH_ALIAS is false)
    // ========================================================================
    const filePath = file.path;
    
    // Example 1: If safeGet.ts is at 'app/api/proxy/[...path]/safeGet.ts'
    // (This is the default - adjust if different)
    if (filePath.includes('app/api/proxy/[...path]')) {
      return './safeGet';  // Same directory
    }
    if (filePath.includes('app/api/proxy')) {
      return './safeGet';  // Same directory
    }
    
    // Example 2: If safeGet.ts is at 'app/utils/safeGet.ts'
    // Uncomment and adjust:
    // if (filePath.includes('app/utils')) {
    //   return './safeGet';
    // }
    // if (filePath.includes('app/')) {
    //   return '../utils/safeGet';
    // }
    
    // Example 3: If safeGet.ts is at 'lib/safeGet.ts' (root level)
    // Uncomment and adjust:
    // const pathParts = filePath.split('/');
    // const depth = pathParts.length - 1; // -1 for filename
    // return '../'.repeat(depth) + 'lib/safeGet';
    
    // ========================================================================
    // DEFAULT: Calculate relative path (adjust this logic for your structure)
    // ========================================================================
    // This tries to calculate: app/api/example.ts -> app/api/proxy/[...path]/safeGet
    const pathParts = filePath.split('/');
    const appIndex = pathParts.indexOf('app');
    if (appIndex !== -1) {
      const depth = pathParts.length - appIndex - 2; // -2 for filename and 'app'
      // ADJUST THIS PATH to match where your safeGet.ts actually is:
      const relativePath = depth > 0 
        ? '../'.repeat(depth) + 'api/proxy/[...path]/safeGet'  // ← CHANGE THIS
        : './api/proxy/[...path]/safeGet';  // ← OR CHANGE THIS
      return relativePath;
    }
    
    // ========================================================================
    // FALLBACK: Default path (change this to your safeGet.ts location)
    // ========================================================================
    // If nothing matches above, this is used as fallback
    return './safeGet';  // ← CHANGE THIS to match your safeGet.ts location
  };

  let transformations = 0;
  const processedAssignments = new Set();
  const processedGetFieldValue = new Set();

  // ============================================================================
  // SPECIAL CASE: Transform fields?.myfield?.[fieldIndex] → getFieldValue(fields, 'myfield', fieldIndex)
  // ============================================================================
  // This handles the common pattern: fields?.fieldName?.[index]
  // and transforms it to use getFieldValue helper function
  root.find(j.OptionalMemberExpression).forEach(path => {
    if (!path.value || !path.value.property) {
      return;
    }
    
    // Skip if already processed
    if (processedGetFieldValue.has(path)) {
      return;
    }
    
    // Look for pattern: obj?.property?.[index]
    // Where the outer expression is computed (has [index])
    // and the object is an OptionalMemberExpression with a STATIC property (not variable)
    if (
      path.value.computed === true &&
      path.value.property.type !== 'Literal' && // index is a variable (not a number literal)
      path.value.object &&
      path.value.object.type === 'OptionalMemberExpression' // obj?.property
    ) {
      const optionalMember = path.value.object;
      
      // Only transform if the inner property is STATIC (not computed/variable)
      // fields?.myfield?.[index] ✅ - static property 'myfield'
      // fields?.[fieldName]?.[index] ❌ - variable property, use safeGet instead
      if (optionalMember.computed === true) {
        // This is fields?.[variable] - skip, let safeGet handler process it
        return;
      }
      
      // Check if the property is a string literal or identifier (like 'myfield' or myfield)
      let fieldName = null;
      if (
        optionalMember.property &&
        optionalMember.property.type === 'Literal' &&
        typeof optionalMember.property.value === 'string'
      ) {
        // Property is a string literal: fields?.['myfield']
        fieldName = optionalMember.property.value;
      } else if (
        optionalMember.property &&
        optionalMember.property.type === 'Identifier'
      ) {
        // Property is an identifier: fields?.myfield
        fieldName = optionalMember.property.name;
      }
      
      if (fieldName) {
        // This is the pattern: fields?.myfield?.[fieldIndex] or fields?.['myfield']?.[fieldIndex]
        const fieldsObj = optionalMember.object;
        const fieldIndex = path.value.property;
        
        // Create getFieldValue call: getFieldValue(fields, 'myfield', fieldIndex)
        const getFieldValueCall = j.callExpression(
          j.identifier('getFieldValue'),
          [fieldsObj, j.literal(fieldName), fieldIndex]
        );
        
        // Replace the entire expression
        j(path).replaceWith(getFieldValueCall);
        transformations++;
        hasGetFieldValueImport = true;
        processedGetFieldValue.add(path);
      }
    }
  });

  // Transform assignments: obj[key] = value → safeSet(obj, key, value)
  root.find(j.AssignmentExpression).forEach(path => {
    if (!path.value || !path.value.left || !path.value.right) {
      return;
    }
    
    const { left, right, operator } = path.value;
    
    // Only handle simple assignments (=), not +=, -=, etc.
    // Note: += and -= could be transformed but would need more complex logic
    if (operator !== '=') {
      return;
    }
    
    // Check if left side is MemberExpression with computed property
    if (
      left.type === 'MemberExpression' &&
      left.computed === true &&
      left.property
    ) {
      const key = left.property;
      
      // Skip if key is a literal string or number (safe to use bracket notation)
      if (key.type === 'Literal' && (typeof key.value === 'string' || typeof key.value === 'number')) {
        return;
      }
      
      // Mark this assignment as processed
      processedAssignments.add(path);
      
      const object = left.object;
      
      // Create safeSet call
      const safeSetCall = j.callExpression(
        j.identifier('safeSet'),
        [object, key, right]
      );
      
      // Replace assignment with safeSet call
      j(path).replaceWith(safeSetCall);
      transformations++;
      hasSafeSetImport = true; // Mark that we need safeSet
    }
  });

  // Transform property access: obj[key] → safeGet(obj, key)
  root.find(j.MemberExpression).forEach(path => {
    if (!path.value || !path.value.property) {
      return;
    }
    
    // Skip if this is part of a processed assignment
    let parent = path.parent;
    while (parent && parent.value) {
      if (processedAssignments.has(parent)) {
        return;
      }
      parent = parent.parent;
    }
    
    // Skip if this is the left side of an assignment (already handled above)
    if (path.parent && path.parent.value && 
        path.parent.value.type === 'AssignmentExpression' && 
        path.parent.value.left === path.value) {
      return;
    }
    
    // Skip if this is part of a delete statement - delete requires property reference
    // delete obj[key] is safe and should not be transformed
    if (path.parent && path.parent.value && 
        path.parent.value.type === 'UnaryExpression' && 
        path.parent.value.operator === 'delete') {
      return;
    }
    
    // Skip if this is part of increment/decrement (++/--) - these need special handling
    // We'll skip them for now as they require more complex transformation
    if (path.parent && path.parent.value) {
      const parentType = path.parent.value.type;
      if (parentType === 'UpdateExpression') {
        // Skip ++ and -- operators - they need special handling
        return;
      }
    }
    
    // Check if it's computed property access
    if (
      path.value.computed === true &&
      path.value.property &&
      path.value.property.type !== 'Literal' // Only transform if key is not a literal
    ) {
      // Skip if key is a literal string (safe to use bracket notation)
      if (path.value.property.type === 'Literal' && typeof path.value.property.value === 'string') {
        return;
      }
      
      // Skip if key is a number literal - safeGet expects string, and numeric indices are safe
      if (path.value.property.type === 'Literal' && typeof path.value.property.value === 'number') {
        return;
      }
      
      // Skip if this is already a safeGet call
      if (path.parent && path.parent.value && 
          path.parent.value.type === 'CallExpression' &&
          path.parent.value.callee &&
          path.parent.value.callee.name === 'safeGet') {
        return;
      }
      
      // Skip if the object itself is a safeGet call result being accessed with bracket
      // This handles cases like safeGet(obj, key)[subKey] - we don't want to transform the [subKey]
      // because safeGet can return undefined. Instead, we'll skip this transformation.
      // The user should use safeGetNested for deeply nested access.
      if (path.value.object &&
          path.value.object.type === 'CallExpression' &&
          path.value.object.callee &&
          path.value.object.callee.name === 'safeGet') {
        // Don't transform - this would create invalid code
        // Note: This case should use safeGetNested instead
        return;
      }
      
      // Skip if this is part of a getFieldValue pattern we already processed
      if (processedGetFieldValue.has(path)) {
        return;
      }
      
      // Skip if this is part of optional chaining that we might handle specially
      // (getFieldValue pattern handles obj?.property?.[index])
      if (path.value.object &&
          path.value.object.type === 'OptionalMemberExpression') {
        // Let the getFieldValue handler process this first
        // If it doesn't match that pattern, it will be handled by safeGet below
      }
      
      const object = path.value.object;
      const key = path.value.property;
      
      // Skip if key is a number - safeGet expects string keys
      // Number indices are generally safe for arrays
      if (key.type === 'Literal' && typeof key.value === 'number') {
        return;
      }
      
      // Skip if key is a symbol - safeGet expects string keys
      // Symbols are not common in user input scenarios
      if (key.type === 'Identifier' && key.name === 'Symbol') {
        return;
      }
      
      // Create safeGet call
      const safeGetCall = j.callExpression(
        j.identifier('safeGet'),
        [object, key]
      );
      
      // Replace member expression with safeGet call
      j(path).replaceWith(safeGetCall);
      transformations++;
      hasSafeGetImport = true; // Mark that we need safeGet
    }
  });

  // Add imports if needed
  if (hasSafeGetImport || hasSafeSetImport || hasGetFieldValueImport) {
    const importSpecifiers = [];
    if (hasSafeGetImport) {
      importSpecifiers.push(j.importSpecifier(j.identifier('safeGet')));
    }
    if (hasSafeSetImport) {
      importSpecifiers.push(j.importSpecifier(j.identifier('safeSet')));
    }
    if (hasGetFieldValueImport) {
      importSpecifiers.push(j.importSpecifier(j.identifier('getFieldValue')));
    }

    // Check if there's already an import from safeGet
    const existingImport = root.find(j.ImportDeclaration).filter(
      path => path.value.source.value.includes('safeGet')
    );

    if (existingImport.length > 0) {
      // Add to existing import
      existingImport.forEach(path => {
        const existingSpecs = path.value.specifiers || [];
        const existingNames = new Set(
          existingSpecs.map(s => s.imported ? s.imported.name : s.local.name)
        );
        
        importSpecifiers.forEach(spec => {
          const name = spec.imported.name;
          if (!existingNames.has(name)) {
            path.value.specifiers.push(spec);
          }
        });
      });
    } else {
      // Create new import statement
      const importStatement = j.importDeclaration(
        importSpecifiers,
        j.literal(getImportPath())
      );
      
      // Insert at the top after other imports
      const firstImport = root.find(j.ImportDeclaration).at(0);
      if (firstImport.length > 0) {
        firstImport.insertAfter(importStatement);
      } else {
        // No imports exist, add at the top
        root.get().node.program.body.unshift(importStatement);
      }
    }
  }

  if (transformations > 0) {
    console.log(`Transformed ${transformations} unsafe bracket notation patterns in ${file.path}`);
  }

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

