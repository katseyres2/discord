const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const { EmbedBuilder, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spells')
        .setDescription('Spells')
		.addStringOption(option => option
			.setName("champion")
			.setRequired(true)
			.setDescription("Champion"))
		.addIntegerOption(option => option
			.setName('spell')
			.setRequired(false)
			.setDescription('Spell ID')),

    async execute(interaction) {
		const axios = require('axios');

		var champName = interaction['options']['_hoistedOptions'][0]['value'];
		champName = champName.toLowerCase();
		champName = champName.charAt(0).toUpperCase() + champName.slice(1);

		axios.get(`http://ddragon.leagueoflegends.com/cdn/12.15.1/data/fr_FR/champion/${champName}.json`)
			 .then(response => {
				champ = response['data']['data'][champName];
				console.log(champ);

				var spells = [];
					champ['spells'].forEach(spell => {
						var letter = spell['id'].substring(champName.length, champName.length + 1);
						// console.log(spell);

						const pattern = RegExp('{{ [a-z0-9]+ }}', 'g');

						spell['tooltip'];
						const matches = Array.from(spell['tooltip'].matchAll(pattern), m => `${m[0]}`);
						matches.forEach(match => {
							console.log(match);
						})

						// while (true) {
						// 	match = 
						// }

						// while (true) {
						// 	const match = pattern.exec();
						// 	if (match === null) break;
						// 	// Add capture of group 1 to `matches`
						// 	matches.push(match[1]);
						// }
						// const array = [...spell['tooltip'].matchAll(pattern)];
						// console.log(array[0]);
						// match = pattern.exec(spell['tooltip']);
						// while (match != null) {
						// 	console.log(match[0]);
						// 	match = pattern.exec(spell['tooltip']);
						// }

						spells.push({
							// name:  spell['name'],
							name: `${letter} (${spell['name']})`,
							value: `${spell['description']}
							- **cooldownburn :** ${spell['cooldownBurn']} sec
							- **cost :** ${spell['cost']}
							- **effect :** ${spell['effect']}
							- **effectBurn :** ${spell['effectBurn']}
							- **vars :** ${spell['vars']}`

						})
					});

				const embed = new EmbedBuilder()
					.setColor('BLUE')
					.setTitle(champ['name'])
					.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.15.1/img/champion/${champName}.png`)
					.setImage(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`)
					.setFields(spells);
				
				interaction.reply({embeds: [embed]});
			 })
			 .catch(error => {
				console.log(error);
				interaction.reply('Pas bien! ');
			 })
    }
}
