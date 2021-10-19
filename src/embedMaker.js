const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
module.exports = async function embedMaker(players = []) {
    let tempDps = [];
    let tempTank = [];
    let tempHeal = [];
    players.forEach(player => {
        switch (player.type) {
            case "dps":
                tempDps.push(`<@!${player.id}> ${getIcon(player.primary)} ${getIcon(player.secondary)}`);// [{id: 236552969544269826, primary: 1, secondary: 2}]
                break;
            case "tank":
                tempTank.push(`<@!${player.id}> ${getIcon(player.primary)} ${getIcon(player.secondary)}`);// [{id: 236552969544269826, primary: 1, secondary: 2}]
                break;
            case "heal":
                tempHeal.push(`<@!${player.id}> ${getIcon(player.primary)} ${getIcon(player.secondary)}`);// [{id: 236552969544269826, primary: 1, secondary: 2}]
                break;
            default:
                // error
                break;
        }
    });

    let dpsText = tempDps.join("\n");
    if (dpsText == "") dpsText = ".";

    let tankText = tempTank.join("\n");
    if (tankText == "") tankText = ".";

    let healText = tempHeal.join("\n");
    if (healText == "") healText = ".";

    const embedMaker = new MessageEmbed()
        .setColor("#cc6600")
        .setTitle("Prend tes rôles :")
        .setURL("https://nwdb.info/build")
        .setDescription("Merci de présciser ton **main** rôle \n Tu peut sélectionner : __**DPS**__ | __**TANK**__ | __**HEAL**__ \n Ainsi que tes deux armes. \n\n ❌ Pour te retirer de la liste")
        .setThumbnail("https://i.imgur.com/9TR51OU.png")
        .addFields(
            { name: "__**DPS :**__", value: dpsText, inline: true },
            { name: "__**TANK :**__", value: tankText, inline: true },
            { name: "__**HEAL :**__", value: healText, inline: true },
        )
        .setFooter("v1.0.0 | Made by Hrodvitnir_Fenrir#4416.", "https://i.imgur.com/pVTwS7j.png");

    return embedMaker;
}