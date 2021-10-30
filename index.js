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
const adminpannel = require("./src/adminpannel")

const admis = ['236552969544269826', '275006697452339202'];

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
            msgDdos = await message.channel.send('Chagement du module... <a:load:895199688645546016>');

            await fs.writeFileSync('./localddos.json', JSON.stringify(msgDdos));

            await embedMaker(client);
        }

        if (message.content == "%init") {
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
            msg = await message.channel.send('Les stats arrivent... <a:load:895199688645546016>');

            await fs.writeFileSync('./local.json', JSON.stringify(msg));

            await ddos(client);
        }

        let cmd = message.content.split(" ");
        if (cmd[0] == "%del") {
            client.channels.cache.get(message.channel.id).messages.fetch(cmd[1]).then(message => message.delete());
            client.channels.cache.get(message.channel.id).messages.fetch(message.id).then(message => message.delete());
        }
    }
});

let bio = {}

client.on('interactionCreate', async interaction => {
    // if (!interaction.isSelectMenu() && !interaction.isButton()) return;

    let { id } = interaction.member;
    let temp = ""

    if (interaction.customId === 'register') {
        bio[id] = [];
        await interaction.reply(await rpg(bio[id]))
    }

    if (interaction.customId === 'role') {
        let tag = (`<@!${id}>`)
        let values = (`${interaction.values}`)

        if (bio[id].length == 0) {
            bio[id].push(tag, values)
        }

        await interaction.update(await rpg(bio[id]));
    };

    if (interaction.customId === 'weapon') {
        let weap = []
        if (bio[id].length == 2) {
            for (let i = 0; i < interaction.values.length; i++) {
                weap.push((`${getIcon(interaction.values[i])}`));
            }
            bio[id].push(weap)
        }
        await interaction.update(await rpg(bio[id]));
    }

    if (interaction.customId === 'job150') {

        let job1 = []
        if (bio[id].length == 3) {
            for (let i = 0; i < interaction.values.length; i++) {
                job1.push(`${getIcon(interaction.values[i])}`);
            }
            bio[id].push(job1);

        }

        await interaction.update(await rpg(bio[id]));
    }

    if (interaction.customId === 'job200') {
        let job2 = []
        if (bio[id].length == 4 || bio[id].length == 3) {
            if (bio[id].length == 3) {
                bio[id].push([]);
            }

            interaction.values.forEach(value => {
                if (!bio[id][3].includes(getIcon(value))) {
                    job2.push(`${getIcon(value)}`);
                }
            });
            bio[id].push(job2)
        }

        await interaction.update(await rpg(bio[id]));
    }

    if (interaction.customId === "cancel") {
        bio[id] = []
        await interaction.update(await rpg(bio[id]));
    }

    if (interaction.customId === 'save') {
        let players = JSON.parse(fs.readFileSync("./player.json", 'utf8'));

        const found = players.filter((player) => {
            return player.id == `<@!${id}>`;
        });

        if (found.length == 0) {
            if (bio[id][3] == undefined) {
                bio[id][3] = [];
            }
            if (bio[id][4] == undefined) {
                bio[id][4] = [];
            }
            let player = {
                name: interaction.member.displayName,
                id: bio[id][0],
                role: bio[id][1],
                weapons: bio[id][2],
                jobs: {
                    j150: bio[id][3],
                    j200: bio[id][4],
                }
            };

            players.push(player);
            await fs.writeFileSync('./player.json', JSON.stringify(players));
        }
        bio[id] = [];
        await interaction.update(await rpg(bio[id]));
        await embedMaker(client);
    }

    if (interaction.customId === 'deletsafe') {
        let players = JSON.parse(fs.readFileSync("./player.json", 'utf8'));
        const tag = `<@!${id}>`;

        players = players.filter((player) => {
            return player.id != tag;
        });

        await fs.writeFileSync('./player.json', JSON.stringify(players));
        await embedMaker(client);
    };

    if (interaction.customId === 'death') {
        let players = JSON.parse(fs.readFileSync("./player.json", 'utf8'));
        const tag = interaction.values[0];

        players = players.filter((player) => {
            return player.id != tag;
        });

        await fs.writeFileSync('./player.json', JSON.stringify(players));
        await embedMaker(client);
    }

    if (interaction.customId === 'deleteadmin') {
        let players = JSON.parse(fs.readFileSync("./player.json", 'utf8'));

        if (admis.includes(id) && players.length > 0) {
            await interaction.reply(await adminpannel())
        }
    }

    if (interaction.customId === 'update') {
        await ddos(client);
        interaction.reply({ content: 'Mise a jour éfectuée', fetchReply: true, ephemeral: false })
            .then(msg => {
                setTimeout(() => msg.delete(), 2000)
            })
    }
});

client.login(process.env.DISCORD_TOCKEN);