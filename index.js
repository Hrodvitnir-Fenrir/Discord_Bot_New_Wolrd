require("dotenv/config");
const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');
const format = require('date-format');
const puppeteer = require("puppeteer");
const fs = require("fs");

const getIcon = require("./src/getIcon");
const ddos = require("./src/ddos");
const embedMaker = require("./src/embedMaker");
const rpg = require("./src/rpg");

Date.prototype.addMin = function (m) {
    this.setTime(this.getTime() + (m * 60 * 1000));
    return this;
}

client.on("ready", () => {
    // client.users.cache.get("236552969544269826").send("Init moi !!");
    console.log("Je suis log tocard");
    client.user.setPresence({ status: 'dnd', activities: [{ type: "COMPETING", name: "TBD" }] });


})

let players = [];

client.on("messageCreate", async (message) => {
    if (message.author.id == "236552969544269826") {

        if (message.content == "%rank") {
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
            const theEmbed = await embedMaker(players);

            const select = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('register')
                        .setLabel('➕')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('deletsafe')
                        .setLabel('❌')
                        .setStyle('DANGER'),
                );
            mess = await message.channel.send({ embeds: [theEmbed], components: [select] });
        }

        if (message.content == "%init") {
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
            msg = await message.channel.send('Les stats arrivent... <a:load:895199688645546016>');

            await fs.writeFileSync('./local.json', JSON.stringify(msg));

            await ddos(client);
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









    if (interaction.customId === 'register') {
        await interaction.reply(await rpg())

    }

    if (interaction.customId === 'update') {
        await ddos(client);
        interaction.reply({ content: 'Mise a jour éfectuée', fetchReply: true, ephemeral: false})
            .then(msg => {
                setTimeout(() => msg.delete(), 2000)
            })
    }
});






client.login(process.env.DISCORD_TOCKEN);