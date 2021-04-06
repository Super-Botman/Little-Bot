const Discord = require('discord.js');
const client = new Discord.Client();

//pour le lancement du bot

client.on('ready', () => {
    console.log(`${client.user.tag} est lancer il est partit écumer les océans de discord!`);
    client.user.setActivity(prefix + 'help', { type: 'WATCHING' })
});

client.on('guildMemberAdd', member => {
    console.log('test');
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur mon serveur ' + member.author.username)
    }).catch(console.error)
})

client.on('guildMemberAdd' , () => {console.log('test')});

//lors de l'arrivé d'un arrivant

//les variables pour le code aprés

let prefix  = ".";
let nblog = 0;
let newschannel = false;
let nbnewchannel = 0;
let deletechannel = false;
let nbdeletechannel = 0;

//pour savoir si un salon a ete creer ou pas 

client.on('channelCreate', message => {newschannel = true;nbnewchannel++;});
client.on('channelDelete', message => {deletechannel = true;nbdeletechannel++;});

client.on('message', message =>{

    //gérer les entrées

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    //variable pour les commandes

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //les commandes

    switch (command) {

        case 'prefix':
            try {
                if (!message.member.hasPermission('MANAGE_GUILD')) return;
            }catch (e) {
                message.channel.send("Vous ne pouvez pas taper ce message en dm");
                return;
            }
            if (!message.member.hasPermission('MANAGE_CHANNELS')) return;
            nblog++;

            prefix = args;

            const prefixmsg = new Discord.MessageEmbed()
                .setColor('#3279d6')
                .setTitle('Prefix')
                .setAuthor('Little Bot', 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                .addFields(
                    {name: 'nouveau prefix ', value: prefix},
                )
                .setTimestamp()
                .setFooter('by Ismael Velay');

            message.channel.send(prefixmsg)

            client.user.setActivity(prefix + 'help', { type: 'WATCHING' })

            break;

        case 'invite':
            let link = "";
            client.generateInvite({
                permissions: ['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE'],
            }).then(response => {
                link += response;
                const invitemsg = new Discord.MessageEmbed()
                    .setColor('#3279d6')
                    .setTitle('Invite')
                    .setAuthor('Little Bot', 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                    .addFields(
                        {name: 'voila un lien vers mon serveur :grin: : \n ', value: 'https://discord.gg/bRB3rH8p49 '},
                        {
                            name: 'et voila le lien pour inviter mon bot chez toi  :grin: : \n ',
                            value: `Invite: ${link}`
                        },
                    )
                    .setTimestamp()
                    .setFooter('by Ismael Velay');
                message.channel.send(invitemsg);
            });
            nblog++;
            break;

        case 'infoguild':
            nblog++
            try {
                if (!message.member.hasPermission('MANAGE_GUILD')) return;
            }catch (e) {
                message.channel.send("Vous ne pouvez pas taper ce message en dm");
                return;
            }
            if (!message.member.hasPermission('MANAGE_GUILD')) return;

            const infoguildmsg = new Discord.MessageEmbed()
                .setColor('#3279d6')
                .setTitle('Info Server')
                .setAuthor('Little Bot', 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                .addFields(
                    {name: 'nombre de commandes tapé : \n', value: nblog},
                    {name: 'nombre de salon creé : \n ', value: nbnewchannel},
                    {name: 'nombre de salon suprimer: \n ', value: nbdeletechannel},
                )
                .setTimestamp()
                .setFooter('by Ismael Velay');

            nblog++;
            message.channel.send(infoguildmsg);
            break;

        case 'clear':
            nblog++;

            try {
                if (!message.member.hasPermission('MODERATE')) return;
            }catch (e) {
                message.channel.send("Vous ne pouvez pas taper ce message en dm");
                return;
            }

            if (!message.member.hasPermission('MODERATE')) return;

            const clearmsg = new Discord.MessageEmbed()
                .setColor('#3279d6')
                .setAuthor("Little Bot", 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                .setDescription('suprimer le(s) message(s) ? :white_check_mark: :x: ')
                .setFooter('by Ismael Velay');

            message.channel.send(clearmsg).then(Message => {
                Message.react("❌")
                Message.react("✅")
                // on attend l'event d'ajout d'une réaction
                client.on('messageReactionAdd', (reaction, user) => {
                    // on vérifie que ce soit bien la bonne réaction et on ne compte pas celui du bot
                    if (reaction.emoji.name === '✅' && user.id !== client.user.id) {
                        let intargs = parseInt(args);
                        intargs += 2;
                        message.channel.bulkDelete(intargs);
                        return;
                    }
                    if(reaction.emoji.name === '❌' && user.id !== client.user.id){
                        message.channel.bulkDelete(2);
                        return;
                    }

                })
            })
            break;

        case 'newembed':
            nblog++;

            const origne_author = message.author.id;
            const createEmbed1 = new Discord.MessageEmbed()
                .setColor('#3279d6')
                .setAuthor("Little Bot", 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                .setDescription('entrer un Titre:')
                .setFooter('by Ismael Velay')

            message.channel.send(createEmbed1).then(message => {

                let exec = false;
                let exec2 = false;

                client.on('message', message => {

                    if (exec) return;
                    if (exec2) return;
                    if (message.author.id === client.user.id) return;
                    if (origne_author !== message.author.id) return;
                    exec2 = true;

                    const title = message.content;
                    message.channel.bulkDelete(2);

                    const createEmbed2 = new Discord.MessageEmbed()
                        .setColor('#3279d6')
                        .setAuthor("Little Bot", 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                        .setDescription('entrer une description')
                        .setFooter('by Ismael Velay');

                    message.channel.send(createEmbed2).then(message => {

                        client.on('message', message => {
                            if (exec) return;
                            if (message.author.id === client.user.id) return;
                            if (origne_author !== message.author.id) return;
                            exec = true;

                            const describ = message.content;
                            message.channel.bulkDelete(2);

                            const embedCreated = new Discord.MessageEmbed()
                                .setTitle(title)
                                .setDescription(describ)
                            message.channel.send(embedCreated)
                            return;
                        })
                        if (exec) return;
                        return;
                    })
                    return;
                })
                return;
            })
            return;
            break;

        case 'clearchannel':
            nblog++
            try {
                if (!message.member.hasPermission('MODERATE')) return;
            }catch (e) {
                message.channel.send("Vous ne pouvez pas taper ce message en dm");
                return;
            }
            if (!message.member.hasPermission('MODERATE')) return;

            const clearchannelmsg = new Discord.MessageEmbed()
                .setColor('#3279d6')
                .setAuthor("Little Bot", 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                .setDescription('réinitialiser ce salon ? :white_check_mark: :x: ')
                .setFooter('by Ismael Velay');

            message.channel.send(clearchannelmsg).then(Message => {
                Message.react("❌")
                Message.react("✅")
                // on attend l'event d'ajout d'une réaction
                for (let i1 = 0; i1 < 1 ; i1++) {

                    client.on('messageReactionAdd', (reaction, user) => {
                        // on vérifie que ce soit bien la bonne réaction et on ne compte pas celui du bot

                        for (let i2 = 1; i2 < 2; i2++) {
                            
                            if (reaction.emoji.name === '✅' && user.id !== client.user.id) {

                                for (let i3 = 2; i3 < 3; i3++) {

                                    message.channel.clone();
                                    console.log("var i3 : "+i3);
                                }

                                message.channel.delete();
                                console.log("var i2 : "+i1);
                            }
                        }
                        if (reaction.emoji.name === '❌' && user.id !== client.user.id) {
                            message.channel.bulkDelete(2);
                            return;
                        }

                        console.log("var i1 : "+i1);
                    })
                }
            })
            break;

        case 'ban':
            try {
                if (!message.member.hasPermission('BAN_MEMBERS')) return;
            }catch (e) {
                message.channel.send("Vous ne pouvez pas taper ce message en dm");
                return;
            }
            if (!message.member.hasPermission('BAN_MEMBERS')) return;
            let out;
            let raison;
            let supr = args[0].length + prefix.length + 5;
            raison = message.content.slice(supr);

            out = args[0].substr(3, 18)

            message.guild.members.ban(out, {reason : raison})
                .then(user => {
                    const banmsg = new Discord.MessageEmbed()
                        .setColor('#3279d6')
                        .setTitle('Prefix')
                        .setAuthor('Little Bot', 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                        .addFields(
                            {name: user, value: 'a été bannis'},
                            )
                        .setTimestamp()
                        .setFooter('by Ismael Velay');

                    message.channel.send(banmsg);
                })
                .catch(console.error);

            break;

        case 'unban':
            try {
                if (!message.member.hasPermission('BAN_MEMBERS')) return;
            }catch (e) {
                message.channel.send("Vous ne pouvez pas taper ce message en dm");
                return;
            }

            if (!message.member.hasPermission('BAN_MEMBERS')) return;

            let out_unban;
            let raison_unban;
            let supr_unban = args[0].length + prefix.length + 5;
            raison_unban = message.content.slice(supr_unban);

            out_unban = args[0].substr(3, 18)

            message.guild.members.unban(out_unban, {reason : raison_unban})
                .then(user => {
                    const unbanmsg = new Discord.MessageEmbed()
                        .setColor('#3279d6')
                        .setTitle('Prefix')
                        .setAuthor('Little Bot', 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                        .addFields(
                            {name: user, value: 'a été débannis'},
                        )
                        .setTimestamp()
                        .setFooter('by Ismael Velay');

                    message.channel.send(unbanmsg);
                })
                .catch(console.error);

            break;

        case 'help':
            nblog++;
            const helpmsg = new Discord.MessageEmbed()
                .setColor('#3279d6')
                .setAuthor("Little Bot", 'https://cdn.discordapp.com/app-icons/774017612551684118/b8486bb4fedaddc5188872af659785cb.png')
                .addFields(
                    {name:'invite :' , value:'obtenir une invitations pour m\'inviter sur ton serveur',inline: true},
                    {name:'utilisation :' , value: `${prefix}invite`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'infoguild :' , value:'sert au membres du staff a obtenir des infos sur le bot',inline: true},
                    {name:'utilisation :' , value: `${prefix}infoguild`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'prefix :' , value:'sert au membres du staff pour changer le préfix',inline: true},
                    {name:'utilisation :' , value: `${prefix}prefix !`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'clear :' , value:'sert au membres du staff pour suprimer un certain nombre de messages',inline: true},
                    {name:'utilisation :' , value: `${prefix}clear 10`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'newembed :' , value:'sert à creer un embed',inline: true},
                    {name:'utilisation :' , value: `${prefix}newembed`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'clearchannel :' , value:'sert au staff pour réinitialiser un salon',inline: true},
                    {name:'utilisation :' , value: `${prefix}clearchannel`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'ban :' , value:'sert au staff pour bannire des membres',inline: true},
                    {name:'utilisation :' , value: `${prefix}ban @member une rason`,inline: true},
                    { name: '\u200B', value: '\u200B' },
                    {name:'unban :' , value:'sert au staff pour debannire des membres',inline: true},
                    {name:'utilisation :' , value: `${prefix}unban @member une rason`,inline: true}
                )
                .setFooter('by Ismael Velay');
            message.channel.send({embed:helpmsg})
    }
});

client.login("your token");
