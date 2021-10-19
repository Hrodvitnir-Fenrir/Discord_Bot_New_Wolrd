require("dotenv/config");
const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const format = require('date-format');
const puppeteer = require("puppeteer");

const getIcon = require("./src/getIcon");
const ddos = require("./src/ddos");
const embedMaker = require("./src/embedMaker");

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

            // await setInterval(async () => {
            //     i++;
            //     await ddos(i);
            // }, time * 60 * 1000);
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

    let i = 0;
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

    if (interaction.customId === 'update') {
        await ddos(i);
        i++
    }
});






client.login(process.env.DISCORD_TOCKEN);