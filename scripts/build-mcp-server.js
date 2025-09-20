import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔨 Building MCP Physics Server...');

try {
  // Create dist directory if it doesn't exist
  const distDir = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const mcpDir = path.join(distDir, 'mcp');
  if (!fs.existsSync(mcpDir)) {
    fs.mkdirSync(mcpDir, { recursive: true });
  }

  // Build the TypeScript files
  const projectRoot = path.join(__dirname, '..');
  execSync(`npx tsc ${path.join(projectRoot, 'src/mcp/physics-server.ts')} --outDir ${path.join(projectRoot, 'dist/mcp')} --target es2020 --module commonjs --moduleResolution node --esModuleInterop --allowSyntheticDefaultImports --resolveJsonModule`, {
    stdio: 'inherit',
    cwd: projectRoot
  });

  console.log('✅ MCP Physics Server built successfully!');
  console.log('📁 Server file: dist/mcp/physics-server.js');
} catch (error) {
  console.error('❌ Failed to build MCP server:', error.message);
  process.exit(1);
}
