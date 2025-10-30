#!/usr/bin/env node

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

console.log("🔍 Pre-flight check...\n");

const errors = [];

// Check .env.local exists
if (!existsSync(join(projectRoot, ".env.local"))) {
  errors.push(
    "❌ .env.local not found\n" +
      "   Run: cp .env.example .env.local\n" +
      "   Then configure it",
  );
} else {
  // Quick check of critical vars
  const envContent = readFileSync(join(projectRoot, ".env.local"), "utf8");

  if (
    !envContent.includes("BETTER_AUTH_SECRET=") ||
    envContent.includes("your_generated_secret")
  ) {
    errors.push(
      "❌ BETTER_AUTH_SECRET not configured in .env.local\n" +
        "   Generate: openssl rand -base64 32",
    );
  }

  if (
    !envContent.includes("https://") ||
    envContent.includes("your-deployment")
  ) {
    errors.push(
      "❌ PUBLIC_CONVEX_URL not configured\n" + "   Run: pnpm convex dev first",
    );
  }
}

// Check node_modules
if (!existsSync(join(projectRoot, "node_modules"))) {
  errors.push("❌ Dependencies not installed\n" + "   Run: pnpm install");
}

// Check Convex initialized
if (!existsSync(join(projectRoot, "convex", "_generated"))) {
  errors.push(
    "❌ Convex not initialized\n" +
      "   Run: pnpm convex dev in another terminal",
  );
}

if (errors.length > 0) {
  console.log("❌ PRE-FLIGHT CHECK FAILED\n");
  errors.forEach((error) => console.log(error + "\n"));
  console.log('💡 Run "pnpm validate" for detailed setup validation\n');
  console.log("📖 See SETUP_GUIDE.md for step-by-step instructions\n");
  process.exit(1);
}

console.log("✅ Pre-flight check passed!\n");
console.log("🚀 Starting development server...\n");
