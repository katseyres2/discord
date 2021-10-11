module.exports = {
    name: "interactionCreate",
    execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        command = require(`../commands/${interaction.commandName}`);
        command.execute(interaction);
    }
}