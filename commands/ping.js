const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies withh Pong!")
        .addStringOption(option => option.setName("input").setDescription("Enter a string")),
    async execute(interaction) {
        await interaction.reply(`Pong!`);
    }
}