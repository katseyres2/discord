const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const { MessageEmbed, Message, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lore')
        .setDescription('Lore')
		.addStringOption(option => option
			.setName("champion")
			.setRequired(true)
			.setDescription("Champion")
		),
    async execute(interaction) {
		const axios = require('axios');

		var champName = interaction['options']['_hoistedOptions'][0]['value'];
		champName = champName.toLowerCase();
		champName = champName.charAt(0).toUpperCase() + champName.slice(1);

		axios.get(`http://ddragon.leagueoflegends.com/cdn/12.15.1/data/fr_FR/champion/${champName}.json`)
			 .then(response => {
				champ = response['data']['data'][champName];
				console.log(champ);

				const embed = new EmbedBuilder()
					.setColor('BLUE')
					.setTitle(`${champ['name']}, ${champ['title']}`)
					.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${champName}.png`)
					.setDescription(champ['lore'])
					.setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`);
				
				interaction.reply({embeds: [embed]});
			 })
			 .catch(error => {
				console.log(error);
				interaction.reply('Pas bien! ');
			 })
    }
}
