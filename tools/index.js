import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));  // Otteniamo il percorso corrente
const tools = [];

for (const file of fs.readdirSync(__dirname)) {
  if (file !== 'index.js' && file.endsWith('.js')) {
    try {
      const filePath = path.join(__dirname, file);
      const fileUrl = `file://${filePath.replace(/\\/g, '/')}`; // Converte il percorso per Windows
      const tool = await import(fileUrl);  // Usa l'URL assoluto
      tools.push(tool.default);
      console.log(`✅ Tool caricato: ${tool.default.functionDef.function.name}`);
    } catch (err) {
      console.error(`❌ Errore caricamento tool ${file}: ${err.message}`);
    }
  }
}

export default tools;
