const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, Message, GuildStickerManager } = require('discord.js');
const { registerCustomQueryHandler } = require('puppeteer');
const getIcon = require("./getIcon");

module.exports = async function rpg(bio) {
    bio = [...bio];

    // console.log("Voila la bio qui devrais aller dans le profil : " + bio);
    let final = ""

    if (bio.length == 0) {
        final = ".";
    } else {
        if (bio.length >= 3 && typeof bio[2] != "string") {
            bio[2] = bio[2].join(" - ");
        }

        if (bio.length >= 4 && typeof bio[3] != "string") {
            bio[3] = bio[3].join(" - ");
        }

        if (bio.length >= 5 && typeof bio[4] != "String") {
            bio[4] = bio[4].join(" - ");
        }

        final = bio.join(" | ");
        // final.replace(",", " ")
    }


    const identity = new MessageEmbed()
        .setColor('#ea9f0d')
        .setTitle("Créé la fiche d'identité de ton personnage")
        .setURL("https://new-world.guide/fr-FR/calculators/skill-builder")
        .setDescription("Sélectionne ton rôle, tes armes ainsi que tes métiers ! \n\n Merci de sélectionner tes rôle dans le bon ordre \n N'oublie pas de te retirer de la liste si tu y est déjà ! \n\n ✅ pour valider \n ❌ pour annuler")
        .setThumbnail('https://i.imgur.com/KT6LE1j.png')
        .addFields(
            { name: "Tes informations :", value: final.toUpperCase() }
        )
        .setFooter("v2.0.0 | Made by Hrodvitnir_Fenrir#4416.", "https://i.imgur.com/Pw9TAba.png");



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
                .setPlaceholder('Sélectionne tes armes')
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
                    {
                        label: 'x2',
                        description: 'Sélectionne ceci si tu joue 2 fois la même arme',
                        value: 'x2',
                        emoji: getIcon('x2')
                    },
                ]),
        );

    const job150 = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('job150')
                .setMaxValues(7)
                .setPlaceholder('Sélectionne tes métier level 150-199')
                .addOptions([
                    {
                        label: "Fabrication d'armes",
                        value: 'armes',
                        emoji: '<:armes:903377289104986162>'
                    },
                    {
                        label: "Fabrication d'armures",
                        value: 'armures',
                        emoji: '<:armures:903377289365061672>'
                    },
                    {
                        label: "Ingénierie",
                        value: 'inge',
                        emoji: '<:inge:903377289419554857>'
                    },
                    {
                        label: "Joaillerie",
                        value: 'joaillerie',
                        emoji: '<:joaillerie:903377289537011782>'
                    },
                    {
                        label: "Arts obscurs",
                        value: 'arts',
                        emoji: '<:arts:903377289524432926>'
                    },
                    {
                        label: "Cuisine",
                        value: 'cuisine',
                        emoji: '<:cuisine:903377289444753428>'
                    },
                    {
                        label: "Ameublement",
                        value: 'ameublement',
                        emoji: '<:ameublement:903377288748482581>'
                    },
                ])
        );

    const job200 = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('job200')
                .setMaxValues(7)
                .setPlaceholder('Sélectionne tes métier level 200')
                .addOptions([
                    {
                        label: "Fabrication d'armes",
                        value: 'armes',
                        emoji: '<:armes:903377289104986162>'
                    },
                    {
                        label: "Fabrication d'armures",
                        value: 'armures',
                        emoji: '<:armures:903377289365061672>'
                    },
                    {
                        label: "Ingénierie",
                        value: 'inge',
                        emoji: '<:inge:903377289419554857>'
                    },
                    {
                        label: "Joaillerie",
                        value: 'joaillerie',
                        emoji: '<:joaillerie:903377289537011782>'
                    },
                    {
                        label: "Arts obscurs",
                        value: 'arts',
                        emoji: '<:arts:903377289524432926>'
                    },
                    {
                        label: "Cuisine",
                        value: 'cuisine',
                        emoji: '<:cuisine:903377289444753428>'
                    },
                    {
                        label: "Ameublement",
                        value: 'ameublement',
                        emoji: '<:ameublement:903377288748482581>'
                    },
                ])
        );

    const add = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('save')
                .setLabel('✅')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('cancel')
                .setLabel('❌')
                .setStyle('DANGER'),
        );

    return { embeds: [identity], components: [role, weapon, job150, job200, add], fetchReply: true, ephemeral: true }

}