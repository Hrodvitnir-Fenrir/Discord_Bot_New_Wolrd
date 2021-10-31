const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const getIcon = require("./getIcon")
const fs = require("fs");

module.exports = async function adminpannel() {
    let players = JSON.parse(fs.readFileSync("./json/player.json", 'utf8'));

    let test = []
    players.forEach(player => {
        test.push({ label: player.name, value: player.id})
    });

    const member = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setMaxValues(1)
                .setCustomId('death')
                .setPlaceholder('Qui veux tu retirer ?')
                .addOptions(test)
        );

    return {content: 'Une personne en trop ?', components: [member], fetchReply: true, ephemeral: true }
}