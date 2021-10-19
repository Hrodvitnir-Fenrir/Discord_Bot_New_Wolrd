const puppeteer = require("puppeteer");
const format = require('date-format');
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message } = require('discord.js');

module.exports = async function ddos(i = 0) {
    console.log("je change tocard")

    const browser = await puppeteer.launch({
        // executablePath: '/usr/bin/chromium-browser'
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

    const del = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('update')
                    .setLabel('🔄')
                    .setStyle('SUCCESS'),
            );

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
                    "name": emote,
                    "value": status,
                }
            ]
        }],
        
        "components": [
            del
        ]
    });
}