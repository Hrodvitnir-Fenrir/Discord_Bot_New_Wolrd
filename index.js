require("dotenv/config");
const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents })
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const format = require('date-format');
const puppeteer = require("puppeteer");

Date.prototype.addMin = function (m) {
    this.setTime(this.getTime() + (m * 60 * 1000));
    return this;
}

client.on("ready", () => {
    client.users.cache.get("236552969544269826").send("Init moi !!");
    console.log("Je suis log tocard");
    client.user.setPresence({ status: 'dnd', activities: [{ type: "COMPETING", name: "Wolfisheim" }] });
})

let players = [];

client.on("messageCreate", async (message) => {
    if (message.author.id == "236552969544269826") {

        if (message.content == "%rank") {
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
            const theEmbed = await embedMaker(players);

            const role = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('role')
                        .setPlaceholder('Sélectionne ton rôle')
                        .addOptions([
                            {
                                label: 'DPS',
                                description: 'Sélectionne ceci si tu est un DPS',
                                value: 'dps',
                                emoji: "<:dps:897068249324347502>"
                            },
                            {
                                label: 'TANK',
                                description: 'Sélectionne ceci si tu est un TANK',
                                value: 'tank',
                                emoji: "<:tank:897068249265610772>"
                            },
                            {
                                label: 'HEAL',
                                description: 'Sélectionne ceci si tu est un HEAL',
                                value: 'heal',
                                emoji: "<:heal:897068249181737011>"
                            },
                        ])
                );

            const weapon = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('weapon')
                        .setPlaceholder('Sélectionne tes deux arme')
                        .setMinValues(2)
                        .setMaxValues(2)
                        .addOptions([
                            {
                                label: 'Arc',
                                description: 'Sélectionne ceci si tu joue un arc',
                                value: 'arc',
                                emoji: getIcon('arc')
                            },
                            {
                                label: 'Bâton de feu',
                                description: 'Sélectionne ceci si tu joue un bâton de feu',
                                value: 'baton_feu',
                                emoji: getIcon('baton_feu')
                            },
                            {
                                label: 'Bâton de vie',
                                description: 'Sélectionne ceci si tu joue un bâton de vie ',
                                value: 'baton_vie',
                                emoji: getIcon('baton_vie')
                            },
                            {
                                label: 'Epée bouclier',
                                description: 'Sélectionne ceci si tu joue une epée et un bouclier ',
                                value: 'epee',
                                emoji: getIcon('epee')
                            },
                            {
                                label: 'Hache double',
                                description: 'Sélectionne ceci si tu joue une hache double ',
                                value: 'double_hache',
                                emoji: getIcon('double_hache')
                            },
                            {
                                label: 'Gantelet de glace',
                                description: 'Sélectionne ceci si tu joue un gantelet de glace ',
                                value: 'gant_glace',
                                emoji: getIcon('gant_glace')
                            },
                            {
                                label: 'Hachette',
                                description: 'Sélectionne ceci si tu joue une hachette ',
                                value: 'hachette',
                                emoji: getIcon('hachette')
                            },
                            {
                                label: 'Lance',
                                description: 'Sélectionne ceci si tu joue une lance ',
                                value: 'lance',
                                emoji: getIcon('lance')
                            },
                            {
                                label: "Marteau d'armes",
                                description: "Sélectionne ceci si tu joue un marteau d'armes",
                                value: 'marteau',
                                emoji: getIcon('marteau')
                            },
                            {
                                label: 'Mousquet',
                                description: 'Sélectionne ceci si tu joue un mousquet',
                                value: 'mousquet',
                                emoji: getIcon('mousquet')
                            },
                            {
                                label: 'Rapière',
                                description: 'Sélectionne ceci si tu joue un rapière',
                                value: 'rapiere',
                                emoji: getIcon('rapiere')
                            },
                        ]),
                );

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('delete')
                        .setLabel('❌')
                        .setStyle('DANGER'),
                );
            mess = await message.channel.send({ embeds: [theEmbed], components: [role, weapon, del] });
        }

        if (message.content == "%init") {
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
            msg = await message.channel.send('Les stats arrivent... <a:load:895199688645546016>');

            let i = 0;
            let time = 10;

            await ddos(i);

            await setInterval(async () => {
                i++;
                await ddos(i);
            }, time * 60 * 1000);
        }

        let cmd = message.content.split(" ");
        if (cmd[0] == "%del") {
            client.channels.cache.get(message.channel.id).messages.fetch(cmd[1]).then(message => message.delete());
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
        }


    }
});

client.on('interactionCreate', async interaction => {
    // if (!interaction.isSelectMenu() && !interaction.isButton()) return;

    let { id } = interaction.member;

    if (interaction.customId === 'role') {
        let found = players.filter((player) => {
            return player.id == id;
        });

        if (found.length == 0) {
            players.push({ id, type: interaction.values[0] });
        } else {
            found[0].type = interaction.values[0];

            players.map((player) => {
                if (player.id == id) {
                    player = found[0];
                }

                return player;
            });
        }

        const theEmbed = await embedMaker(players);
        await interaction.update({ embeds: [theEmbed] });
    };

    if (interaction.customId === 'weapon') {
        let found = players.filter((player) => {
            return player.id == id;
        });

        if (found.length == 0) {
            // players.push({ id, primary: interaction.values[0], secondary: interaction.values[1] });
        } else {
            found[0].primary = interaction.values[0];
            found[0].secondary = interaction.values[1];

            players.map((player) => {
                if (player.id == id) {
                    player = found[0];
                }

                return player;
            });
        }

        const theEmbed = await embedMaker(players);
        await interaction.update({ embeds: [theEmbed] });
    }

    if (interaction.customId === 'delete') {
        players = players.filter((player) => {
            return player.id != id;
        });

        const theEmbed = await embedMaker(players);
        await interaction.update({ embeds: [theEmbed] });
    }
});

function getIcon(name) {
    const icons = {
        'arc': '<:arc:897069675249299486>',
        'baton_feu': '<:baton_feu:897069675509329932>',
        'baton_vie': '<:baton_vie:897069675421245470>',
        'double_hache': '<:double_hache:897069675098296341>',
        'epee': '<:epee:897069675383488522>',
        'gant_glace': '<:gant_glace:897069675316408360>',
        'hachette': '<:hachette:897069675672928286>',
        'lance': '<:lance:897069675052150785>',
        'marteau': '<:marteau:897069675643564042>',
        'mousquet': '<:mousquet:897069675366735892>',
        'rapiere': '<:rapiere:897069675366744064>',
    };

    let selected = icons[name];

    return selected != undefined ? selected : "";
}

async function embedMaker(players = []) {
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

async function ddos(i = 0) {
    console.log("je change tocard")

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://nwdb.info/server-status");
    // await page.screenshot({ path: "debug/1.png" });
    await page.type("input.svelte-1sqyhcl", "Jumala");
    // await page.screenshot({ path: "debug/2.png" });
    const info = await page.$$("table.svelte-15y0zjb tbody tr td");
    const players = await page.evaluate(content => content.innerText, info[4]);
    const queue = await page.evaluate(content => content.innerText, info[5]);
    const time = await page.evaluate(content => content.innerText, info[6]);

    const now = format('hh:mm', new Date());
    const later = format('hh:mm', new Date().addMin(10));

    let color;
    let status = "En ligne";
    let emote = "🟢";
    let connected = players.split(" / ")[0];

    if (connected <= 1996 && connected >= 3) {
        color = 3066993;
    } else if (connected <= 2) {
        color = 2303786;
        status = "Maintenance";
        emote = "🟠";
    } else if (connected >= 1997) {
        color = 10038562;
        status = "Plein";
        emote = "🔴";
    }

    await browser.close();
    msg.edit({
        "content": null,
        "embeds": [{
            "title": "**Etat du serveur Jumala <:fac:895264315630829568>**",
            "description": "Mise a jour toutes les 10min de l'état du serveur ! \n\n Liens utile :\n [Actualités New World](https://www.newworld.com/fr-fr/news) \n [Map interractive](https://www.newworld-map.com/) \n [Liste des objets du jeu](https://nwdb.info/) \n [Guide pêche](https://newworldfishingguide.com/) \n\n [Guide de  Shoji](https://docs.google.com/document/d/1ssfsMgCRftAmCzxXbTPAGjl25nFcNiPA8UiT2RCApg0/edit#)\n [Guide des Children of Bodom](https://docs.google.com/document/d/1MCkcj7rNPzcMED3PyXeiEjcGwPMc_h5ncUJmPPRJ7OA/edit#) ",
            "color": color,
            // "timestamp": new Date(),
            "footer": {
                "icon_url": "https://i.imgur.com/pVTwS7j.png",
                "text": "v1.0.0 | " + i + " | Made by Hrodvitnir_Fenrir#4416.",
            },
            "thumbnail": {
                "url": "https://i.imgur.com/HAtRAjm.png"
            },
            "fields": [
                {
                    "name": "Population <a:bag:895262137402941481>",
                    "value": players,
                    "inline": true

                },
                {
                    "name": "| File d'attente 📑 |",
                    "value": queue,
                    "inline": true
                },
                {
                    "name": "Temps d'attente estimé ⏰",
                    "value": time,
                    "inline": true
                },
                {
                    "name": "↩️ Dernière update",
                    "value": now,
                    "inline": true
                },
                {
                    "name": "Prochaine update ↪️",
                    "value": later,
                    "inline": true
                },
                {
                    "name": emote,
                    "value": status,
                }
            ]
        }]
    });
}


client.login(process.env.DISCORD_TOCKEN);