const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const translator = require('./translator'); // Importer le gestionnaire de traduction

async function generatePlayerCard(player, lang = 'en') {
  const width = 800;
  const height = 400;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Charger un background simple
  const background = await loadImage(path.join(__dirname, 'background.jpg'));
  ctx.drawImage(background, 0, 0, width, height);

  // Ecrire les informations traduites
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px Sans-serif';
  ctx.fillText(translator.translate(lang, 'player_command.card_player', { name: player.name }), 50, 80);
  ctx.fillText(translator.translate(lang, 'player_command.card_trophies', { trophies: player.trophies }), 50, 130);
  ctx.fillText(translator.translate(lang, 'player_command.card_town_hall', { level: player.townHallLevel }), 50, 180);
  ctx.fillText(translator.translate(lang, 'player_command.card_clan', { clan: player.clan?.name || translator.translate(lang, 'player_command.no_clan') }), 50, 230);

  // Optionnel : charger et afficher l'icône de ligue
  if (player.league?.iconUrls?.small) {
    const leagueIcon = await loadImage(player.league.iconUrls.small);
    ctx.drawImage(leagueIcon, width - 150, 30, 100, 100);
  }

  return canvas.toBuffer('image/png');
}

module.exports = { generatePlayerCard };
