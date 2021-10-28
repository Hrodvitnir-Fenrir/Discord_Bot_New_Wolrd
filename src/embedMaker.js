const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const getIcon = require ("./getIcon")
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
        .setDescription("Voila la liste des membre de la guilde d'Artémis \n ➕ pour t'ajouter dans la liste \n ❌ pour te retirer de la liste")
        .setThumbnail('https://i.imgur.com/KT6LE1j.png')
        .addFields(
            { name: "__**DPS :**__", value: dpsText, inline: false },
            { name: "__**TANK :**__", value: tankText, inline: false },
            { name: "__**HEAL :**__", value: healText, inline: false },
        )
        .setFooter("v2.0.0 | Made by Hrodvitnir_Fenrir#4416.", "https://i.imgur.com/Pw9TAba.png");

    return embedMaker;
}