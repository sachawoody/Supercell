const fs = require('fs');
const path = require('path');

class Translator {
  constructor(defaultLang = 'en') {
    this.defaultLang = defaultLang;
    this.languages = {};

    const localesPath = path.join(__dirname, '..', 'locales');
    const files = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

    for (const file of files) {
      const lang = path.basename(file, '.json');
      this.languages[lang] = require(path.join(localesPath, file));
    }
  }

  translate(lang, key, placeholders = {}) {
    const keys = key.split('.');
    let translation = this.languages[lang] || this.languages[this.defaultLang];

    for (const k of keys) {
      translation = translation[k];
      if (!translation) return key; // Return key if translation not found
    }

    for (const [placeholder, value] of Object.entries(placeholders)) {
      translation = translation.replace(`{${placeholder}}`, value);
    }

    return translation;
  }
}

module.exports = new Translator();