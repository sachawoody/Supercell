const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier où les préférences des utilisateurs sont stockées
const userPreferencesPath = path.join(__dirname, '..', 'data', 'userPreferences.json');

// Charger ou initialiser les préférences des utilisateurs
let userPreferences = {};
if (fs.existsSync(userPreferencesPath)) {
  userPreferences = JSON.parse(fs.readFileSync(userPreferencesPath, 'utf8'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setlang')
    .setDescription('Change your default language')
    .addStringOption(option =>
      option.setName('language')
        .setDescription('The language to set (e.g., en, fr)')
        .setRequired(true)
        .addChoices(
          { name: 'English', value: 'en' },
          { name: 'Français', value: 'fr' },
        )),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    const selectedLang = interaction.options.getString('language');

    // Mettre à jour la langue de l'utilisateur
    userPreferences[userId] = selectedLang;

    // Sauvegarder les préférences dans le fichier
    fs.writeFileSync(userPreferencesPath, JSON.stringify(userPreferences, null, 2));

    await interaction.reply(`✅ Your default language has been set to **${selectedLang}**.`);
  },
};