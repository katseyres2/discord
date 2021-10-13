const { SlashCommandBuilder, channelMention } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help'),
    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Manuel d\'aide')
            .setDescription('Pour utiliser les commandes correctement, il faut commencer par les connaître.')
            .addFields(
                { name: '``/role``', value: 'add\nremove\nreset\nshuffle', inline: true},
                { name: '``/math``', value: 'sin\ncos\nhypot', inline: true}
            ); 

        await interaction.channel.send({ embeds: [helpEmbed] });
        await interaction.reply('Voici mon manuel d\'utilisation !');
    }
}
