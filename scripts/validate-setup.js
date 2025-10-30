#!/usr/bin/env node

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

const errors = [];
const warnings = [];
const success = [];

console.log("🔍 Validating project setup...\n");

// Check for .env.local file
if (!existsSync(join(projectRoot, ".env.local"))) {
  errors.push(
    ".env.local file not found.\n" +
      "  Run: cp .env.example .env.local\n" +
      "  Then configure the required environment variables.",
  );
} else {
  success.push(".env.local file exists");

  // Parse .env.local
  try {
    const envContent = readFileSync(join(projectRoot, ".env.local"), "utf8");
    const envVars = {};

    envContent.split("\n").forEach((line) => {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        envVars[match[1].trim()] = match[2].trim();
      }
    });

    // Validate required variables
    const requiredVars = {
      BETTER_AUTH_SECRET: {
        validate: (val) =>
          val && val !== "your_generated_secret_here" && val.length >= 32,
        message:
          "Generate with: openssl rand -base64 32 (Mac/Linux) or PowerShell command (Windows)",
      },
      BETTER_AUTH_URL: {
        validate: (val) => val && val.startsWith("http"),
        message: "Should be http://localhost:5173 for development",
      },
      PUBLIC_CONVEX_URL: {
        validate: (val) =>
          val && val.startsWith("https://") && !val.includes("your-deployment"),
        message: "Run: pnpm convex dev to get your Convex URL",
      },
      CONVEX_DEPLOYMENT: {
        validate: (val) =>
          val && val.startsWith("dev:") && !val.includes("your-deployment"),
        message: "Automatically set by: pnpm convex dev",
      },
    };

    for (const [varName, config] of Object.entries(requiredVars)) {
      const value = envVars[varName];
      if (!config.validate(value)) {
        errors.push(
          `${varName} is not configured correctly.\n  ${config.message}`,
        );
      } else {
        success.push(`${varName} is configured`);
      }
    }

    // Optional but recommended
    const optionalVars = {
      RESEND_API_KEY: "Email functionality (password reset)",
      GOOGLE_CLIENT_ID: "Google OAuth",
      GOOGLE_CLIENT_SECRET: "Google OAuth",
    };

    for (const [varName, purpose] of Object.entries(optionalVars)) {
      const value = envVars[varName];
      if (!value || value.startsWith("your_")) {
        warnings.push(`${varName} not configured (needed for: ${purpose})`);
      }
    }
  } catch (err) {
    errors.push(`Failed to parse .env.local: ${err.message}`);
  }
}

// Check for node_modules
if (!existsSync(join(projectRoot, "node_modules"))) {
  errors.push("node_modules not found.\n  Run: pnpm install");
} else {
  success.push("Dependencies installed");
}

// Check for Convex generated files
if (!existsSync(join(projectRoot, "convex", "_generated"))) {
  warnings.push("Convex not initialized.\n  Run: pnpm convex dev");
} else {
  success.push("Convex initialized");
}

// Print results
console.log("✅ SUCCESS:");
success.forEach((msg) => console.log(`  ✓ ${msg}`));
console.log("");

if (warnings.length > 0) {
  console.log("⚠️  WARNINGS:");
  warnings.forEach((msg) => console.log(`  - ${msg}`));
  console.log("");
}

if (errors.length > 0) {
  console.log("❌ ERRORS:");
  errors.forEach((msg, index) => {
    console.log(`\n${index + 1}. ${msg}`);
  });
  console.log("\n📖 Quick Setup:");
  console.log("  1. cp .env.example .env.local");
  console.log(
    "  2. openssl rand -base64 32  # Copy output to BETTER_AUTH_SECRET",
  );
  console.log("  3. pnpm install");
  console.log("  4. pnpm convex dev  # Follow prompts");
  console.log("  5. pnpm dev\n");
  process.exit(1);
}

console.log("🎉 Setup validation complete! Ready to run:\n");
console.log("  Terminal 1: pnpm convex dev");
console.log("  Terminal 2: pnpm dev\n");
