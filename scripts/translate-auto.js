#!/usr/bin/env node

/**
 * Auto-translation script for DeltaYurt
 * Translates English JSON files to Russian and Kyrgyz using DeepL API
 * 
 * Usage:
 *   DEEPL_API_KEY=your_key node scripts/translate-auto.js
 * 
 * Or with Google Translate:
 *   GOOGLE_API_KEY=your_key node scripts/translate-auto.js --provider=google
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['ru', 'ky'];
const LOCALES_DIR = path.join(__dirname, '..', 'public', 'locales');
const NAMESPACES = ['common', 'teacher', 'student', 'sim'];

// API Configuration
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';
const GOOGLE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

class AutoTranslator {
  constructor(provider = 'deepl', apiKey) {
    this.provider = provider;
    this.apiKey = apiKey;
    this.delay = 1000; // 1 second delay between requests
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async translateText(text, targetLang) {
    if (!text || typeof text !== 'string') {
      return text;
    }

    try {
      if (this.provider === 'deepl') {
        return await this.translateWithDeepL(text, targetLang);
      } else if (this.provider === 'google') {
        return await this.translateWithGoogle(text, targetLang);
      }
    } catch (error) {
      console.error(`Translation error for "${text}":`, error.message);
      return text; // Return original text if translation fails
    }
  }

  async translateWithDeepL(text, targetLang) {
    const response = await axios.post(DEEPL_API_URL, {
      text: [text],
      source_lang: SOURCE_LANG.toUpperCase(),
      target_lang: targetLang.toUpperCase(),
    }, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    await this.delay(this.delay);
    return response.data.translations[0].text;
  }

  async translateWithGoogle(text, targetLang) {
    const response = await axios.post(`${GOOGLE_API_URL}?key=${this.apiKey}`, {
      q: text,
      source: SOURCE_LANG,
      target: targetLang,
    });

    await this.delay(this.delay);
    return response.data.data.translations[0].translatedText;
  }

  async translateObject(obj, targetLang) {
    const result = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = await this.translateText(value, targetLang);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = await this.translateObject(value, targetLang);
      } else {
        result[key] = value;
      }
    }
    
    return result;
  }

  async translateNamespace(namespace, targetLang) {
    const sourceFile = path.join(LOCALES_DIR, SOURCE_LANG, `${namespace}.json`);
    const targetFile = path.join(LOCALES_DIR, targetLang, `${namespace}.auto.json`);
    const reviewFile = path.join(LOCALES_DIR, targetLang, `${namespace}.review.md`);

    console.log(`\n📝 Translating ${namespace} to ${targetLang}...`);

    // Read source file
    if (!fs.existsSync(sourceFile)) {
      console.warn(`⚠️  Source file not found: ${sourceFile}`);
      return;
    }

    const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
    
    // Translate
    const translatedData = await this.translateObject(sourceData, targetLang);
    
    // Save auto-translated file
    fs.writeFileSync(targetFile, JSON.stringify(translatedData, null, 2), 'utf8');
    console.log(`✅ Auto-translated: ${targetFile}`);

    // Generate review file
    await this.generateReviewFile(sourceData, translatedData, namespace, targetLang, reviewFile);
  }

  async generateReviewFile(sourceData, translatedData, namespace, targetLang, reviewFile) {
    let reviewContent = `# Translation Review: ${namespace} (${targetLang})\n\n`;
    reviewContent += `**Generated:** ${new Date().toISOString()}\n`;
    reviewContent += `**Provider:** ${this.provider.toUpperCase()}\n\n`;
    reviewContent += `## Instructions\n`;
    reviewContent += `1. Review the auto-translated content below\n`;
    reviewContent += `2. Make corrections as needed\n`;
    reviewContent += `3. Copy the corrected content to \`${namespace}.json\`\n\n`;
    reviewContent += `---\n\n`;

    // Generate comparison table
    reviewContent += `| Key | Original (EN) | Auto-Translation | Corrected |\n`;
    reviewContent += `|-----|---------------|------------------|----------|\n`;

    const generateTableRows = (obj, translatedObj, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof value === 'string') {
          const translatedValue = translatedObj[key] || '';
          reviewContent += `| \`${fullKey}\` | ${value} | ${translatedValue} | |\n`;
        } else if (typeof value === 'object' && value !== null) {
          generateTableRows(value, translatedObj[key] || {}, fullKey);
        }
      }
    };

    generateTableRows(sourceData, translatedData);
    
    // Add JSON content for easy copying
    reviewContent += `\n## JSON Content (Copy to ${namespace}.json)\n\n`;
    reviewContent += `\`\`\`json\n`;
    reviewContent += JSON.stringify(translatedData, null, 2);
    reviewContent += `\n\`\`\`\n`;

    fs.writeFileSync(reviewFile, reviewContent, 'utf8');
    console.log(`📋 Review file: ${reviewFile}`);
  }

  async translateAll() {
    console.log(`🚀 Starting auto-translation with ${this.provider.toUpperCase()}`);
    console.log(`📁 Source: ${SOURCE_LANG}`);
    console.log(`🎯 Targets: ${TARGET_LANGS.join(', ')}`);
    console.log(`📦 Namespaces: ${NAMESPACES.join(', ')}\n`);

    for (const targetLang of TARGET_LANGS) {
      console.log(`\n🌍 Translating to ${targetLang.toUpperCase()}`);
      console.log('=' .repeat(50));

      // Create target directory
      const targetDir = path.join(LOCALES_DIR, targetLang);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      for (const namespace of NAMESPACES) {
        await this.translateNamespace(namespace, targetLang);
      }
    }

    console.log('\n🎉 Auto-translation completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the generated .review.md files');
    console.log('2. Make corrections as needed');
    console.log('3. Copy corrected content to .json files');
    console.log('4. Test the translations in the application');
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const provider = args.includes('--provider=google') ? 'google' : 'deepl';
  
  const apiKey = process.env.DEEPL_API_KEY || process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    console.error('❌ API key not found!');
    console.error('Please set DEEPL_API_KEY or GOOGLE_API_KEY environment variable');
    process.exit(1);
  }

  const translator = new AutoTranslator(provider, apiKey);
  await translator.translateAll();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoTranslator;
