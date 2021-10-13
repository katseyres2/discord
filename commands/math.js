const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('all mathematic methods')
        .addSubcommand(subcommand => subcommand.setName('sin').setDescription('sinus')
            .addNumberOption(option => option.setName('rad').setDescription('radians').setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('hypot').setDescription('hypotenuse')
            .addNumberOption(option => option.setName('opp').setDescription('opposite side').setRequired(true))
            .addNumberOption(option => option.setName('adj').setDescription('adjacent side').setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('cos').setDescription('cosinus')
            .addNumberOption(option => option.setName('rad').setDescription('radians').setRequired(true))),
    async execute(interaction) {
        let result;

        switch (interaction.options.getSubcommand()) {
            case 'sin':
                result = Math.sin(interaction.options.getNumber('rad'));
                break;
            case 'cos':
                result = Math.cos(interaction.options.getNumber('rad'));
                break;
            case 'hypot':
                result = Math.hypot(interaction.options.getNumber('opp'), interaction.options.getNumber('adj'));
                break;
            default:
                break;
        }

        await interaction.reply(`${result}`);
    }
}