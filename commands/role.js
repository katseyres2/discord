const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed, MessageActionRow, MessageButton, GuildMember, RoleManager, Role, MessageComponentInteraction } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Manage roles')
        .addSubcommand(sub => sub
            .setName('add')
            .setDescription('Add a user role')
            .addUserOption(option => option.setName('target').setDescription('Target').setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription('Role').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('remove')
            .setDescription('Remove the user role')
            .addUserOption(option => option.setName('target').setDescription('Target').setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription('Role').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('reset')
            .setDescription('Remove all user roles')
            .addUserOption(option => option.setName('target').setDescription('Target').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('shuffle')
            .setDescription('Add a random role to the user')
            .addUserOption(option => option.setName('target').setDescription('Target').setRequired(true)))
        .addSubcommand(sub => sub
            .setName('list')
            .setDescription('List')),
    async execute(interaction) {
                    
        const textChannels = interaction.guild.channels.cache.filter(channel => channel.type == 'GUILD_TEXT');
        const voiceChannels = interaction.guild.channels.cache.filter(channel => channel.type == 'GUILD_VOICE');
        const categoryChannels = interaction.guild.channels.cache.filter(channel => channel.type == 'GUILD_CATEGORY');
        const has_MANAGE_ROLES = interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES);
        let member;
        let role;
        let randomRole;
        let row;

        if (interaction.options.getSubcommand() != null) {
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    member = interaction.options.getMember('target');
                    role = interaction.options.getRole('role');
    
                    if (has_MANAGE_ROLES) {
                        if (member.user.bot) {
                            await interaction.reply(`${member} n\'est pas mentionnable.`);
                            break;
                        }
                        if (role.name == 'bot' || role.name == '@everyone') {
                            await interaction.reply(`${role} n'est pas assignable.`);
                            break;
                        }
                        if (member.roles.cache.some(_role => _role.name == role.name)) {
                            await interaction.reply(`${member} possède déjà ${role}.`);
                            break;
                        }
                        member.roles.add(role);
                        await interaction.reply(`${role} ajouté à ${member}.`);
                        break;
                    }
                    await interaction.reply('Vous n\'êtes pas autorisé à utiliser cette commande.')
                    break;
                case 'remove':
                    member = interaction.options.getMember('target');
                    role = interaction.options.getRole('role');
    
                    if (has_MANAGE_ROLES) {
                        if (member.user.bot) {
                            await interaction.reply(`${member} n\'est pas mentionnable.`);
                            break;
                        }
                        if (role.name == 'bot' || role.name == '@everyone') {
                            await interaction.reply(`${role} n'est pas assignable.`);
                            break;
                        }
                        if (!member.roles.cache.some(_role => _role.name == role.name)) {
                            await interaction.reply(`${member} ne possède pas ${role}.`)
                            break;
                        }
                        member.roles.remove(role);
                        await interaction.reply(`${role} retiré à ${member}.`);
                        break;
                    }
                    await interaction.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
                    break;
                case 'reset':
                    member = interaction.options.getMember('target');
    
                    if (has_MANAGE_ROLES) {
                        if (member.user.bot) {
                            await interaction.reply(`${member} n\'est pas mentionnable.`);
                            break;
                        }
                        member.roles.cache.forEach(element => {
                            if (element.name != '@everyone') member.roles.remove(element);
                        });
                        await interaction.reply(`${member} ne possède plus aucun rôle`);
                        break;
                    }
                    await interaction.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
                    break;
                case 'shuffle':
                    member = interaction.options.getMember('target');
                    role = interaction.options.getRole('role');
                    randomRole = member.guild.roles.cache.filter(role => (
                        role.name != 'bot'
                        && role.name != '@everyone'
                        && !member.roles.cache.has(role.id)
                    )).random(1);
    
                    if (has_MANAGE_ROLES) {
                        if (member.user.bot) {
                            await interaction.reply(`${member} n\'est pas mentionnable.`);
                            break;
                        }
                        console.log(randomRole);
                        if (randomRole.length == 0) {
                            await interaction.reply(`${member} possède tous les rôles.`);
                            break;
                        }
                        member.roles.add(randomRole);
                        await interaction.reply(`${randomRole} ajouté à ${member}`);
                        break;
                    }
                    await interaction.reply('Vous n\'êtes pas autorisé à utiliser cette commande.');
                    break;
                case 'list':
                    row = new MessageActionRow()
                    .addComponents(
                            new MessageButton()
                                .setCustomId('primary')
                                .setLabel('Primary')
                                .setStyle('PRIMARY')
                    );
                    await interaction.reply({ content: 'Réponse', components: [row] });
                    break;
                default:
                    await interaction.reply('Commande introuvable.');
                    break;
            }
        }


    }

}