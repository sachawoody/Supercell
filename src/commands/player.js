const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { generatePlayerCard } = require('../utils/generatePlayerCard');
const translator = require('../utils/translator'); // Importer le gestionnaire de traduction
const fs = require('fs');
const path = require('path');

// Charger les préférences des utilisateurs
const userPreferencesPath = path.join(__dirname, '..', 'data', 'userPreferences.json');
let userPreferences = {};
if (fs.existsSync(userPreferencesPath)) {
  userPreferences = JSON.parse(fs.readFileSync(userPreferencesPath, 'utf8'));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Get Clash of Clans player card')
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Player tag (e.g., #AAAAAAA)')
        .setRequired(true)),
  
  async execute(interaction) {
    let playerTag = interaction.options.getString('tag');
    if (!playerTag.startsWith('#')) {
      playerTag = '#' + playerTag;
    }

    const userId = interaction.user.id;
    const lang = userPreferences[userId] || 'en'; // Utiliser la langue préférée ou 'en' par défaut

    try {
      const response = await axios.get(`https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`, {
        headers: {
          Authorization: `Bearer ${process.env.COC_API_TOKEN}`,
        },
      });

      const player = response.data;

      // Générer l'image de la carte du joueur avec traduction
      const buffer = await generatePlayerCard(player, lang);
      const attachment = new AttachmentBuilder(buffer, { name: 'player-card.png' });

      // Créer un embed avec les informations traduites
      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle(translator.translate(lang, 'player_command.embed_title', { name: player.name }))
        .setThumbnail(player.league?.iconUrls?.medium || null)
        .addFields(
          { name: translator.translate(lang, 'player_command.trophies'), value: `${player.trophies} (Best: ${player.bestTrophies})`, inline: true },
          { name: translator.translate(lang, 'player_command.town_hall'), value: `${player.townHallLevel}`, inline: true },
          { name: translator.translate(lang, 'player_command.attack_wins'), value: `${player.attackWins}`, inline: true },
          { name: translator.translate(lang, 'player_command.defense_wins'), value: `${player.defenseWins}`, inline: true },
          { name: translator.translate(lang, 'player_command.war_stars'), value: `${player.warStars}`, inline: true },
          { name: translator.translate(lang, 'player_command.clan_role'), value: `${player.role || 'No Role'}`, inline: true },
          { name: translator.translate(lang, 'player_command.league'), value: `${player.league?.name || 'Unranked'}`, inline: true },
          { name: translator.translate(lang, 'player_command.builder_hall'), value: `${player.builderHallLevel || 'N/A'}`, inline: true },
          { name: translator.translate(lang, 'player_command.clan'), value: player.clan ? `[${player.clan.name}](${player.clan.badgeUrls.large})` : translator.translate(lang, 'player_command.no_clan'), inline: true },
          { name: translator.translate(lang, 'player_command.donations'), value: `Given: ${player.donations} / Received: ${player.donationsReceived}`, inline: true },
          { name: translator.translate(lang, 'player_command.clan_capital_contributions'), value: `${player.clanCapitalContributions}`, inline: true }
        )
        .setFooter({ text: translator.translate(lang, 'player_command.footer'), iconURL: player.clan?.badgeUrls?.small || null });

      // Répondre avec l'image et l'embed
      await interaction.reply({ embeds: [embed], files: [attachment] });

    } catch (error) {
      console.error(error);

      const errorEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle(translator.translate(lang, 'player_command.error_title'))
        .setDescription(translator.translate(lang, 'player_command.error_description'))
        .setFooter({ text: translator.translate(lang, 'player_command.footer') });

      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
