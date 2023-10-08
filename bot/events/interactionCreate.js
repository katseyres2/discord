module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (interaction.isCommand()) {
            console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
            command = require(`../commands/${interaction.commandName}`);
            command.execute(interaction);
        }
        else if (interaction.isButton()) {
            console.log(interaction);
            await interaction.reply(`> <@${interaction.user.id}>`);
        }

    }
}