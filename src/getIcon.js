module.exports = function getIcon(name) {
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
        'x2': '<:x2:903286347165483088>',

        'ameublement': '<:ameublement:903377288748482581>',
        'armes': '<:armes:903377289104986162>',
        'armures': '<:armures:903377289365061672>',
        'arts': '<:arts:903377289524432926>',
        'inge': '<:inge:903377289419554857>',
        'joaillerie': '<:joaillerie:903377289537011782>',
        'cuisine': '<:cuisine:903377289444753428>',
    };

    let selected = icons[name];

    return selected != undefined ? selected : "";
}

