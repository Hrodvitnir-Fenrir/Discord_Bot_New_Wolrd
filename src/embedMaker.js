const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const getIcon = require("./getIcon")
const fs = require("fs");

module.exports = async function embedMaker(client) {


    let players = JSON.parse(fs.readFileSync("./json/player.json", 'utf8'));

    let display = JSON.parse(fs.readFileSync("./json/display.json", 'utf8'));



    let dpsText = "";
    let tankText = "";
    let healText = "";

    let show = 'name';

    if (display % 2 == 0) {
        show = 'id';
    }


    players.forEach(player => {
        if (player.role == "dps") {
            dpsText += "__" + player[show] + "__" + " : " + player.weapons.join(" ") + "\n";
        } if (player.jobs.j150.length != 0 && player.jobs.j200.length == 0) {
            dpsText += "Métier 150 : " + player.jobs.j150.join(" ") + "\n";
        } if (player.jobs.j150.length == 0 && player.jobs.j200.length != 0) {
            dpsText += "Métier 200 : " + player.jobs.j200.join(" ") + "\n";
        } if (player.jobs.j150.length != 0 && player.jobs.j200.length != 0) {
            dpsText += "Métier 150 : " + player.jobs.j150.join(" ") + " | Métier 200 : " + player.jobs.j200.join(" ") + "\n";
        }
        dpsText += "\n"
    });

    players.forEach(player => {
        if (player.role == "tank") {
            tankText += "__" + player[show] + "__" + " : " + player.weapons.join(" ") + "\n";
            if (player.jobs.j150.length != 0 && player.jobs.j200.length == 0) {
                tankText += "Métier 150 : " + player.jobs.j150.join(" ") + "\n";
            } if (player.jobs.j150.length == 0 && player.jobs.j200.length != 0) {
                tankText += "Métier 200 : " + player.jobs.j200.join(" ") + "\n";
            } if (player.jobs.j150.length != 0 && player.jobs.j200.length != 0) {
                tankText += "Métier 150 : " + player.jobs.j150.join(" ") + " | Métier 200 : " + player.jobs.j200.join(" ") + "\n";
            }
        } 
        dpsText += "\n"
    });

    players.forEach(player => {
        if (player.role == "heal") {
            healText += "__" + player[show] + "__" + " : " + player.weapons.join(" ") + "\n";
            if (player.jobs.j150.length != 0 && player.jobs.j200.length == 0) {
                healText += "Métier 150 : " + player.jobs.j150.join(" ") + "\n";
            } if (player.jobs.j150.length == 0 && player.jobs.j200.length != 0) {
                healText += "Métier 200 : " + player.jobs.j200.join(" ") + "\n";
            } if (player.jobs.j150.length != 0 && player.jobs.j200.length != 0) {
                healText += "Métier 150 : " + player.jobs.j150.join(" ") + " | Métier 200 : " + player.jobs.j200.join(" ") + "\n";
            }
        } 
        dpsText += "\n"
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
                .setCustomId('change')
                .setLabel('🔄')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('deleteadmin')
                .setLabel("Admin delete")
                .setEmoji("<a:load:895199688645546016>")
                .setStyle('DANGER'),


        );

    let { id, channelId } = JSON.parse(fs.readFileSync("./json/localrank.json", 'utf8'));
    msgRank = await client.channels.cache.get(channelId).messages.fetch(id);
    msgRank.edit({
        "content": null,
        "embeds": [{
            "color": 15105570,
            "title": "Membres de la guilde Artémis !",
            "url": "https://nwdb.info/build",
            "description": "Ici tu peut consulter le rôle et les métiers up des membres de la guilde \n\n ➕ pour t'ajouter dans la liste \n ❌ pour te retirer de la liste \n 🔄 Debug.",
            "thumbnail": {
                "url": "https://i.imgur.com/KT6LE1j.png"
            },
            "fields": [
                { "name": "DPS :", "value": dpsText, "inline": false },
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