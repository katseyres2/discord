module.exports = {
    name: 'guildMemberAdd',
    execute(client, member) {
        const mainChannel = client.guild.channels.cache.filter(channel => channel.name == 'général');
        
        console.log(client);
        member.send(`Bienvenue ${mainChannel}`);
    }
}