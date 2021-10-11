const { SlashCommandBuilder, SlashCommandStringOption } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("message")
        .setDescription("Send email to the specified user")
        .addUserOption(option => option.setName("user").setDescription("placeholder").setRequired(true))
        .addStringOption(option => option.setName("hello").setDescription("world"))
        .addMentionableOption(option => option.setName("mention").setDescription("placeholder"))
        ,
    async execute(interaction, userName) {
        await interaction.reply(`Send a message to ${interaction.options.getUser('user')}`);
    }
}