#!/bin/bash
# Strict Semgrep scan script for CI/CD pipelines
# This simulates a strict security scan that would catch SSRF vulnerabilities

set -e

export PATH="$HOME/.local/bin:$PATH"

echo "Running strict Semgrep security scan..."
echo "========================================"

# Run with custom SSRF rules + standard security rules
semgrep \
  --config=.semgrep.yml \
  --config="p/security-audit" \
  --config="p/owasp-top-ten" \
  --severity=ERROR \
  --error \
  --json \
  app/

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Semgrep scan passed with no blocking findings"
else
  echo "❌ Semgrep scan found security issues"
  exit 1
fi

