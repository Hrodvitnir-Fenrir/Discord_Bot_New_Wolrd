const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const getIcon = require("./getIcon")
const fs = require("fs");

module.exports = async function embedMaker(client, afficher = 'dps') {


    let players = JSON.parse(fs.readFileSync("./json/player.json", 'utf8'));

    let display = JSON.parse(fs.readFileSync("./json/display.json", 'utf8'));

    let dpsText = "";
    // let tankText = "";
    // let healText = "";

    let show = 'name';

    if (display % 2 == 0) {
        show = 'id';
    }

    let field = [];
    let turc = afficher.toUpperCase() + " :";

    
    players.forEach(player => {
        if (player.role == afficher) {
            dpsText += "__" + player[show] + "__" + " : " + player.weapons.join(" ");
            if (player.jobs.j150.length != 0 && player.jobs.j200.length == 0) {
                dpsText += "\n Métier 150 : " + player.jobs.j150.join(" ");
            }
            if (player.jobs.j150.length == 0 && player.jobs.j200.length != 0) {
                dpsText += "\n Métier 200 : " + player.jobs.j200.join(" ");
            }
            if (player.jobs.j150.length != 0 && player.jobs.j200.length != 0) {
                dpsText += "\n Métier 150 : " + player.jobs.j150.join(" ") + " | Métier 200 : " + player.jobs.j200.join(" ");
            }
            dpsText += "\n\n"
            
            if (dpsText.length > 800) {
                if (field.length != 0) {
                    turc = ".";
                }
                field.push({ "name": turc, "value": dpsText});
                dpsText = "";
            }
        }
        
    });
    if (field.length != 0) {
        turc = ".";
    }
    field.push({ "name": turc, "value": dpsText});

    if (dpsText == "") dpsText = ".";

    const but = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('register')
                .setLabel('➕')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('deleteself')
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

        const but2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('aDps')
            .setLabel("Afficher les Dps")
            .setEmoji('<:dps:897068249324347502>')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('aTank')
            .setLabel("Afficher les Tanks")
            .setEmoji("<:tank:897068249265610772>")
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('aHeal')
            .setLabel("Afficher les Heals")
            .setEmoji("<:heal:897068249181737011>")
            .setStyle('SECONDARY'),
            // new MessageButton()
            // .setCustomId('jobs')
            // .setLabel("armes/métiers")
            // .setEmoji("<a:Confused_Dog:497489596654026763>")
            // .setStyle('SECONDARY'),
        );

    let { id, channelId } = JSON.parse(fs.readFileSync("./json/localrank.json", 'utf8'));
    msgRank = await client.channels.cache.get(channelId).messages.fetch(id);
    msgRank.edit({
        "content": null,
        "embeds": [{
            "color": 15105570,
            "title": "Membres de la guilde Artémis !",
            "url": "https://nwdb.info/build",
            "description": "Ici tu peut consulter le rôle et les métiers up des membres de la guilde \n\n ➕ pour t'ajouter dans la liste \n ❌ pour te retirer de la liste \n 🔄 Changer l'affichage des pseudos.",
            "thumbnail": {
                "url": "https://i.imgur.com/KT6LE1j.png"
            },
            "fields": [field],
            "footer": {
                "icon_url": "https://i.imgur.com/Pw9TAba.png",
                "text": "v2.1.4 | Made by Hrodvitnir_Fenrir#4416.",
            }
        }],

        "components": [
            but2, but
        ]

    })

}