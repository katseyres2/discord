module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.user.setActivity('I\'m a sheep');
        client.user.setUsername('BeepBeep');
        // client.user.setStatus('invisible');
        // client.user.setAvatar('/home/maximilien/Documents/discord/bot_discord/assets/alien.png');
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}