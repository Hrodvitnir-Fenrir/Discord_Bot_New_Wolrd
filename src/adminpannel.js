const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const fs = require("fs");

module.exports = async function adminpannel() {
    const players = JSON.parse(fs.readFileSync("./json/player.json", "utf8"));

    const test = [];
    players.forEach(player => {
        test.push({ label: player.name, value: player.id });
    });

    const member = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setMaxValues(1)
                .setCustomId("death")
                .setPlaceholder("Qui veux tu retirer ?")
                .addOptions(test)
        );

    return { content: "Une personne en trop ?", components: [member], fetchReply: true, ephemeral: true };
};
