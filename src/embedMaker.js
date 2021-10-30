const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const getIcon = require("./getIcon")
const fs = require("fs");

module.exports = async function embedMaker(client) {


    let players = JSON.parse(fs.readFileSync("./player.json", 'utf8'));


    let dpsText = "";
    players.forEach(player => {
        if (player.role == "dps") {
            dpsText += player.id + " | " + player.weapons + "\n Métier 150 :" + player.jobs.j150 + " | Métier 200 :" + player.jobs.j200 + "\n";
        }

    });

    let tankText = "";
    players.forEach(player => {
        if (player.role == "tank") {
            tankText += player.id + " | " + player.weapons + "\n Métier 150 :" + player.jobs.j150 + " | Métier 200 :" + player.jobs.j200 + "\n";
        }

    });


    let healText = "";
    players.forEach(player => {
        if (player.role == "heal") {
            healText += player.id + " | " + player.weapons + "\n Métier 150 :" + player.jobs.j150 + " | Métier 200 :" + player.jobs.j200 + "\n";
        }

    });



    if (healText == "") healText = ".";
    if (dpsText == "") dpsText = ".";
    if (tankText == "") tankText = ".";


    const but = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('register')
                .setLabel('➕')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('deletsafe')
                .setLabel('❌')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('deleteadmin')
                .setLabel("Admin delete")
                .setEmoji("<a:load:895199688645546016>")
                .setStyle('DANGER')
        );

    let { id, channelId } = JSON.parse(fs.readFileSync("./localddos.json", 'utf8'));
    msgDdos = await client.channels.cache.get(channelId).messages.fetch(id);
    msgDdos.edit({
        "content": null,
        "embeds": [{
            "color": 15105570,
            "title": "Membres de la guilde Artémis !",
            "url": "https://nwdb.info/build",
            "description": "Ici tu peut consulter le rôle et les métiers up des membres de la guilde \n\n ➕ pour t'ajouter dans la liste \n ❌ pour te retirer de la liste",
            "thumbnail": {
                "url": "https://i.imgur.com/KT6LE1j.png"
            },
            "fields": [
                { "name": "__**DPS :**__", "value": dpsText, "inline": false },
                { "name": "__**TANK :**__", "value": tankText, "inline": false },
                { "name": "__**HEAL :**__", "value": healText, "inline": false },
            ],
            "footer": {
                "icon_url": "https://i.imgur.com/Pw9TAba.png",
                "text": "v2.0.0 | Made by Hrodvitnir_Fenrir#4416.",
            }
        }],

        "components": [
            but
        ]

    })
}