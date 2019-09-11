const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
var PORT = process.env.PORT || 5000;

var BotStartTime;
var coins = [];
var players = [];
var coin = {};
var player = {};
var RoleList = [];
var newRole = {};
var ReaRoles = [];
var ReaRole = {};
var JoinCreate = {};
var JoinCreates = [];
var CreatedChannels = [];
var CreatedChannel = {};

function money(num)
{
    if (num % 100 >= 10 && num % 100 <= 20)
    {
        return ("монет");
    }
    else
    {
        if (num % 10 == 1)
        {
            return ("монета");
        }
        else
        {
            if (num % 10 == 2 || num % 10 == 3 || num % 10 == 4)
            {
                return("монеты");
            }
            else
            {
                return("монет");
            }
        }
    }
}

function money2(num)
{
    if (num % 100 >= 10 && num % 100 <= 20)
    {
        return ("монет");
    }
    else
    {
        if (num % 10 == 1)
        {
            return ("монету");
        }
        else
        {
            if (num % 10 == 2 || num % 10 == 3 || num % 10 == 4)
            {
                return("монеты");
            }
            else
            {
                return("монет");
            }
        }
    }
}

bot.on('ready', () => 
{
    let mm = new Date();
    let ms = mm.getTime();
    BotStartTime = ms;
    bot.user.setActivity('!!info');
    let co = fs.readFileSync("coins.json", "utf-8");
    if (co != "")
    {
        coins = JSON.parse(co);
    }
    let RoleL = fs.readFileSync("RoleList.json", "utf-8");
    if (RoleL != "")
    {
        RoleList = JSON.parse(RoleL);
    }
    let ReaR = fs.readFileSync("ReaRole.json", "utf-8");
    if (ReaR != "")
    {
        ReaRoles = JSON.parse(ReaR);
        let i;
        for (i = 0; i < ReaRoles.length; i++)
        {
            if (bot.channels.get(ReaRoles[i].chan))
            {
                bot.channels.get(ReaRoles[i].chan).fetchMessage(ReaRoles[i].mesid)
                    .then(msg =>
                    {
                        //console.log(msg.content + " = cached");
                    });
            }
        }
    }
    let jc = fs.readFileSync("JoinCreates.json", "utf-8");
    if (jc != "")
    {
        JoinCreates = JSON.parse(jc);
    }
    let cc = fs.readFileSync("CreatedChannels.json", "utf-8");
    if (cc != "")
    {
        CreatedChannels = JSON.parse(cc);
    }
    console.log('Loaded2');
});
bot.on('error', console.error);

bot.on('voiceStateUpdate', (oldMember, newMember) =>
{
    let a, b, c, d;
    if (oldMember.voiceChannel)
    {
        c = oldMember.guild;
    }
    else
    {
        c = "1";
    }
    a = oldMember.voiceChannelID;
    b = newMember.voiceChannelID;
    if (newMember.voiceChannelID == 596326662207963177 || newMember.voiceChannelID == 515025122277589002)
    {
        b = undefined;
    }
    if (oldMember.voiceChannelID == 596326662207963177 || oldMember.voiceChannelID == 515025122277589002)
    {
        a = undefined;
    }
    if ((a == undefined || a == null)  && !(b == undefined || b == null))
    {
        player.identifier = oldMember.id;
        let mm = new Date();
        let ms = mm.getTime();
        player.entryTime = ms;
        players.push(player);
        player = {};
    }
    if (c)
    {
        if (!(a == undefined || a == null)  && !(b == undefined || b == null))
        {
            let i;
            let found;
            found = true;
            for (i = players.length - 1; i >= 0; i--)
            {
                if (players[i].identifier == oldMember.id)
                {
                    let j;
                    let mm = new Date();
                    let ms = mm.getTime();
                    lastQuantity = Math.floor((ms - players[i].entryTime) / (60 * 1000));
                    let bool;
                    bool = true;
                    for (j = 0; j < coins.length; j++)
                    {
                        if (coins[j].serverMember == players[i].identifier && coins[j].guild == c)
                        {
                            coins[j].quantity = coins[j].quantity + lastQuantity;
                            bool = false;
                            break;
                        }
                    }
                    if (bool)
                    {
                        coin.serverMember = players[i].identifier;
                        coin.quantity = lastQuantity;
                        coin.guild = c.id;
                        coins.push(coin);
                        coin = {};
                    }
                    players.splice(i, 1);
                    found = false;
                    break;
                }
            }
            if (found)
            {
                let j;
                let mm = new Date();
                let ms = mm.getTime();
                lastQuantity = Math.floor((ms - BotStartTime) / (60 * 1000));
                let bool;
                bool = true;
                for (j = 0; j < coins.length; j++)
                {
                    if (coins[j].serverMember == oldMember.id && coins[j].guild == c)
                    {
                        coins[j].quantity = coins[j].quantity + lastQuantity;
                        bool = false;
                        break;
                    }
                }
                if (bool)
                {
                    coin.serverMember = oldMember.id;
                    coin.quantity = lastQuantity;
                    coin.guild = c.id;
                    coins.push(coin);
                    coin = {};
                }
            }
            player.identifier = newMember.id;
            let mm = new Date();
            let ms = mm.getTime();
            player.entryTime = ms;
            players.push(player);
            player = {};
        }
        if (!(a == undefined || a == null)  && (b == undefined || b == null))
        {
            let i;
            let found;
            found = true;
            for (i = players.length - 1; i >= 0; i--)
            {
                if (players[i].identifier == oldMember.id)
                {
                    let j;
                    let mm = new Date();
                    let ms = mm.getTime();
                    lastQuantity = Math.floor((ms - players[i].entryTime) / (60 * 1000));
                    let bool;
                    bool = true;
                    for (j = 0; j < coins.length; j++)
                    {
                        if (coins[j].serverMember == players[i].identifier && coins[j].guild == oldMember.guild.id)
                        {
                            coins[j].quantity = coins[j].quantity + lastQuantity;
                            bool = false;
                            break;
                        }
                    }
                    if (bool)
                    {
                        coin.serverMember = players[i].identifier;
                        coin.quantity = lastQuantity;
                        coin.guild = c.id;
                        coins.push(coin);
                        coin = {};
                    }
                    players.splice(i, 1);
                    found = false;
                    break;
                }
            }
            if (found)
            {
                let j;
                let mm = new Date();
                let ms = mm.getTime();
                lastQuantity = Math.floor((ms - BotStartTime) / (60 * 1000));
                let bool;
                bool = true;
                for (j = 0; j < coins.length; j++)
                {
                    if (coins[j].serverMember == oldMember.id && coins[j].guild == oldMember.guild)
                    {
                        coins[j].quantity = coins[j].quantity + lastQuantity;
                        bool = false;
                    }
                }
                if (bool)
                {
                    coin.serverMember = oldMember.id;
                    coin.quantity = lastQuantity;
                    coin.guild = c.id;
                    coins.push(coin);
                    coin = {};
                }
            }
        }
    }
    let i, j;
    for (i = 0; i < JoinCreates.length; i++)
    {
        if (JoinCreates[i].channel == newMember.voiceChannelID)
        {
            let boolean;
            boolean = 0;
            for (j = 0; j < CreatedChannels.length; j++)
            {
                if (CreatedChannels[j].member == newMember.id)
                {
                    boolean = 1;
                    break;
                }
            }
            if (boolean != 1)
            {
                let category;
                category = newMember.voiceChannel.parentID;
                let guild = newMember.voiceChannel.guild;
                guild.createChannel(JoinCreates[i].name + ' игрока ' + newMember.displayName, { type: 'voice', userLimit: JoinCreates[i].limit })
                    .then(chan => 
                    {
                        chan.setParent(category);
                        chan.overwritePermissions(newMember.guild.members.get(newMember.id), 
                            {
                                'VIEW_CHANNEL': true, 'CONNECT': true, 'SPEAK': true, 'MANAGE_CHANNELS': true
                            });
                        chan.overwritePermissions(newMember.guild.defaultRole, 
                            {
                                'MANAGE_CHANNELS': false
                            });
                        newMember.setVoiceChannel(chan.id);
                        CreatedChannel.channel = chan.id;
                        CreatedChannel.member = newMember.id;
                        CreatedChannels.push(CreatedChannel);
                        CreatedChannel = {};
                    });
            }
            break;
        }
    }
    setTimeout(function()
    {
        for (i = 0; i < CreatedChannels.length; i++)
        {
            if (bot.channels.get(CreatedChannels[i].channel) != undefined)
            {
                if (bot.channels.get(CreatedChannels[i].channel).members.size == 0)
                {
                    bot.channels.get(CreatedChannels[i].channel).delete();
                    CreatedChannels.splice(i, 1);
                    i--;
                }
            }
            else
            {
                CreatedChannels.splice(i, 1);
                i--;
            }
        }
    }, 3000);
});

bot.on('message', (message) => 
{
    if (message && !message.author.bot)
    {
        if (message.member)
        {
            if (message.content.indexOf("!!money") >= 0 && message.content.indexOf("!!money") < message.content.length)
            {
                let id;
                if (message.content.indexOf("@") >= 0 && message.content.indexOf("@") < message.content.length)
                {
                    id = message.content.substring(message.content.indexOf('@') + 1, message.content.indexOf('>'));
                }
                else
                {
                    id = message.member.id;
                }
                if (id[0] != '&')
                {
                    if (id[0] == '!')
                    {
                        id = id.slice(1);
                    }
                    if (message.channel.guild.members.get(id))
                    {
                        if (message.channel.guild.members.get(id).user.bot == false)
                        {
                            let i;
                            let bool;
                            bool = true;
                            for (i = 0; i < coins.length; i++)
                            {
                                if (coins[i].serverMember == id && coins[i].guild == message.channel.guild.id)
                                {
                                    let Embed = new Discord.RichEmbed();
                                    Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                                    Embed.addField('У ' + message.channel.guild.members.get(id).displayName + ' ' + coins[i].quantity + ' '+ money(coins[i].quantity), 'Для получения списка возможных покупок, напиши !!purchases');
                                    message.member.send(Embed);
                                    bool = false;
                                    break;
                                }
                            }
                            if (bool)
                            {
                                let Embed = new Discord.RichEmbed();
                                Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                                Embed.addField('У ' + message.channel.guild.members.get(id).displayName + ' нет монет', 'Для получения списка возможных покупок, напиши !!purchases');
                                message.member.send(Embed);
                            }
                        }
                        else
                        {
                            message.member.send('Такого игрока не найдено! Проверь, верно ли ты упомянул игрока.');
                        }
                    }
                    else
                    {
                        message.member.send('Такого игрока не найдено! Проверь, верно ли ты упомянул игрока.');
                    }
                }
                else
                {
                    message.member.send('Такого игрока не найдено! Проверь, верно ли ты упомянул игрока.');
                }
            }
            if (message.content.indexOf("!!addRoleList") >= 0 && message.content.indexOf("!!addRoleList") < message.content.length && (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513))
            {
                //!!addRoleList @упоминание цена
                let i, role, priceRole, msg;
                msg = message.content;
                for (i = 0; i < msg.length; i++)
                {
                    if (msg[i] == '&' && msg[i - 1] == '@')
                    {
                        i++;
                        role = msg.substring(i, msg.indexOf(">"));
                        break;
                    }
                }
                for (i = msg.length - 1; i >= 0; i--)
                {
                    if (msg[i] == ' ')
                    {
                        i++;
                        priceRole = msg.slice(i);
                        break;
                    }
                }
                newRole.identify = role;
                newRole.price = priceRole;
                newRole.guild = message.channel.guild.id;
                RoleList.push(newRole);
                newRole = {};
                let Embed = new Discord.RichEmbed();
                Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                let s;
                s = "";
                for (i = 0; i < RoleList.length; i++)
                {
                    if (RoleList[i].guild == message.channel.guild.id)
                    {
                        s = s + bot.guilds.get(RoleList[i].guild).roles.get(RoleList[i].identify).name + ' за ' +  RoleList[i].price + ' ' + money2(RoleList[i].price) + '\n';
                    }
                }
                if (s.length != 0)
                {
                    Embed.addField('Список товаров, доступных для покупки за монеты на этом сервере:', s);
                }
                else
                {
                    Embed.addField('Список товаров, доступных для покупки за монеты на этом сервере:', 'Нет ролей, доступных к покупке');
                }
                message.member.send(Embed);
            }
            if (message.content.indexOf("!!deleteRoleList") >= 0 && message.content.indexOf("!!deleteRoleList") < message.content.length && (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513))
            {
                //!!deleteRoleList @упоминание
                let i, role;
                for (i = 0; i < message.content.length; i++)
                {
                    if (message.content[i] == '&' && message.content[i - 1] == '@')
                    {
                        i++;
                        role = message.content.substring(i, message.content.indexOf(">"));
                        break;
                    }
                }
                for (i = 0; i < RoleList.length; i++)
                {
                    if (RoleList[i].identify == role && RoleList[i].guild == message.channel.guild.id)
                    {
                        RoleList.splice(i, 1);
                        break;
                    }
                }
                let Embed = new Discord.RichEmbed();
                Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                let s;
                s = "";
                for (i = 0; i < RoleList.length; i++)
                {
                    if (RoleList[i].guild == message.channel.guild.id)
                    {
                        s = s + bot.guilds.get(RoleList[i].guild).roles.get(RoleList[i].identify).name + ' за ' +  RoleList[i].price + ' ' + money2(RoleList[i].price) + '\n';
                    }
                }
                if (s.length != 0)
                {
                    Embed.addField('Список товаров, доступных для покупки за монеты на этом сервере:', s);
                }
                else
                {
                    Embed.addField('Список товаров, доступных для покупки за монеты на этом сервере:', 'Нет ролей, доступных к покупке');
                }
                message.member.send(Embed);
            }
            if (message.content == "!!purchases")
            {
                let Embed = new Discord.RichEmbed();
                Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                let s;
                s = "";
                for (i = 0; i < RoleList.length; i++)
                {
                    if (RoleList[i].guild == message.channel.guild.id)
                    {
                        s = s + bot.guilds.get(RoleList[i].guild).roles.get(RoleList[i].identify).name + ' за ' +  RoleList[i].price + ' ' + money2(RoleList[i].price) + '\n';
                    }
                }
                if (s.length != 0)
                {
                    Embed.addField('Список товаров, доступных для покупки за монеты на этом сервере:', s);
                }
                else
                {
                    Embed.addField('Список товаров, доступных для покупки за монеты на этом сервере:', 'Нет ролей, доступных к покупке');
                }
                message.member.send(Embed);
            }
            if (message.content.indexOf("!!give") >= 0 && message.content.indexOf("!!give") < message.content.length)
            {
                //!!give @упоминание_игрока количество
                if (message.content.indexOf(">") && message.mentions)
                {
                    let i, user, number;
                    try
                    {
                        user = message.mentions.members.first().id;
                        if (user[0] == '!')
                        {
                            user = user.slice(1);
                        }
                        if (user[0] != '&')
                        {
                            for (i = message.content.length - 1; i >= 0; i--)
                            {
                                if (message.content[i] == ' ')
                                {
                                    i++;
                                    number = Number(message.content.substring(i, message.content.length));
                                    if(number < 0)
                                    {
                                        number = number * (-1);
                                    }
                                    break;
                                }
                            }
                            let bool;
                            bool = true;
                            for (i = 0; i < coins.length; i++)
                            {
                                if (coins[i].serverMember == message.member.id && coins[i].guild == message.channel.guild.id)
                                {
                                    if (coins[i].quantity >= number)
                                    {
                                        let j;
                                        let boo;
                                        boo = true;
                                        for (j = 0; j < coins.length; j++)
                                        {
                                            if (coins[j].serverMember == user && coins[i].guild == message.channel.guild.id)
                                            {
                                                coins[j].quantity = coins[j].quantity + number;
                                                coins[i].quantity = coins[i].quantity - number;
                                                boo = false;
                                                message.member.send('Готово');
                                                break;
                                            }
                                        }
                                        if (boo)
                                        {
                                            coins[i].quantity = coins[i].quantity - number;
                                            coin.serverMember = user;
                                            coin.quantity = number;
                                            coin.guild = message.channel.guild.id;
                                            coins.push(coin);
                                            coin = {};
                                            message.member.send('Готово');
                                        }
                                    }
                                    else
                                    {
                                        message.member.send('У вас недостаточно монет');
                                    }
                                    bool = false;
                                    break;
                                }
                            }
                            if (bool)
                            {
                                message.member.send('У вас недостаточно монет');
                            }
                        }
                    }
                    catch (e)
                    {
                        console.log(e);
                    }
                }
            }
            if (message.content.indexOf("!!remove") >= 0 && message.content.indexOf("!!remove") < message.content.length && (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513))
            {
                //!!remove @упоминание_игрока количество (-1 = всё)
                if (message.content.indexOf(">"))
                {
                    let i, user, number;
                    for (i = 0; аi < message.content.length; i++)
                    {
                        if (message.content[i - 1] == '@')
                        {
                            user = message.content.substring(i, message.content.indexOf(">"));
                            break;
                        }
                    }
                    if (user[0] == '!')
                    {
                        user = user.slice(1);
                    }
                    if (user[0] != '&')
                    {
                        for (i = message.content.length - 1; i >= 0; i--)
                        {
                            if (message.content[i] == ' ')
                            {
                                i++;
                                number = Number(message.content.substring(i, message.content.length));
                                break;
                            }
                        }
                        let bool;
                        bool = true;
                        for (i = 0; i < coins.length; i++)
                        {
                            if (coins[i].serverMember == user && coins[i].guild == message.channel.guild.id)
                            {
                                if (number == "-1")
                                {
                                    coins[i].quantity = 0;
                                }
                                else
                                {
                                    if (coins[i].quantity <= number)
                                    {
                                        coins[i].quantity = 0;
                                    }
                                    else
                                    {
                                        coins[i].quantity = coins[i].quantity - number;
                                    }
                                }
                                bool = false;
                                break;
                            }
                        }
                        if (bool)
                        {
                            coin.serverMember = user;
                            coin.guild = message.channel.guild.id;
                            if (number >= -1)
                            {
                                coin.quantity = 0;
                            }
                            else
                            {
                                coin.quantity = number * (-1);
                            }
                            coins.push(coin);
                            coin = {};
                        }
                        message.member.send('Готово');
                    }
                }
            }
            if (message.content.indexOf("!!buy") >= 0 && message.content.indexOf("!!buy") < message.content.length)
            {
                let i, role;
                if (message.mentions.roles.first() != undefined)
                {
                    role = message.mentions.roles.first().id;
                    let roleCheck;
                    roleCheck = true;
                    if (message.member.roles.has(role))
                    {
                        message.member.send('У вас уже есть эта роль!');
                    }
                    else
                    {
                        for (i = 0; i < RoleList.length; i++)
                        {
                            if (RoleList[i].identify == role && RoleList[i].guild == message.channel.guild.id)
                            {
                                roleCheck = false;
                                let j;
                                let moneyCheck;
                                moneyCheck = true;
                                for (j = 0; j < coins.length; j++)
                                {
                                    if (coins[j].serverMember == message.member.id && coins[j].guild == message.channel.guild.id)
                                    {
                                        if (coins[j].quantity >= RoleList[i].price)
                                        {
                                            coins[j].quantity = coins[j].quantity - RoleList[i].price;
                                            message.member.addRole(role);
                                            message.member.send('Роль куплена!');
                                        }
                                        else
                                        {
                                            message.member.send('У вас недостаточно монет!');
                                        }
                                        moneyCheck = false;
                                        break;
                                    }
                                }
                                if (moneyCheck)
                                {
                                    message.member.send('У вас недостаточно монет!');
                                }
                                break;
                            }
                        }
                        if (roleCheck)
                        {
                            message.member.send('Эта роль не продаётся');
                        }
                    }
                }
            }
            if (message.content.indexOf('!!ReaRole') >= 0 && message.content.indexOf('!!ReaRole') < message.content.length && (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513))
            {
                //!!ReaRole.#idСообщения#.~id-канала~.{@&роль,цены}{@роль,цены}{@роль,цены}
                let mess, j, ID, channelID, rol, pric;
                mess = message.content;
                mess = mess + '@ ';
                ID = "";
                for (j = 0; j < mess.length; j++)
                {
                    if (mess[j] == '#')
                    {
                        j++;
                        ID = "";
                        while (mess[j] != '#')
                        {
                            ID = ID + mess[j];
                            j++;
                        }
                        j = j + 3;
                        channelID = "";
                        while (mess[j] != "~")
                        {
                            channelID = channelID + mess[j];
                            j++;
                        }
                        mess = mess.slice(j);
                        break;
                    }
                }
                while (mess.indexOf('&') >= 0 && mess.indexOf('&') < mess.length)
                {
                    j = mess.indexOf('&');
                    rol = mess.substring(j + 1, mess.indexOf(">"));
                    j = mess.indexOf(">") + 1;
                    pric = mess.substring(j + 1, mess.indexOf("}"));
                    mess = mess.slice(mess.indexOf("}") + 1);
                    ReaRole.chan = channelID;
                    ReaRole.mesid = ID;
                    ReaRole.RoleID = rol;
                    ReaRole.emoji = "need";
                    ReaRole.price = pric;
                    ReaRoles.push(ReaRole);
                    ReaRole = {};
                }
                let s;
                s = "";
                for (j = 0; j < ReaRoles.length; j++)
                {
                    if (ReaRoles[j].emoji == "need")
                    {
                        s = s + '<@&' + ReaRoles[j].RoleID + '> ';
                    }
                }
                message.channel.send(s);
                setTimeout(function() 
                {
                    let i;
                    for (i = 0; i < ReaRoles.length; i++)
                    {
                        if (ReaRoles[i].emoji == "need")
                        {
                            ReaRoles.splice(i, 1);
                        }
                    }
                }, 60 * 60 * 1000);
            }
            if (message.content == "!!info")
            {
                if (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513)
                {
                    let Embed = new Discord.RichEmbed();
                    Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                    Embed.addField('Список команд:', '1). !!money - узнать количество монет у Вас.\n2.1). !!addRoleList - добавить новую роль к покупке (только для администраторов)\n2.2). !!deleteRoleList - удалить роль из списка доступных к покупке (только для администраторов)\n3). !!purchases - узнать список ролей, доступных для покупки на данном сервере\n4). !!give - передать часть своих монет другому усатнику сервера \n5). !!remove - снять у игрока часть монет (только для администраторов) \n6). !!buy - купить роль\n7). !!output - вывод всех данных (только для администраторов)\n8). !!ReaRole - создать покупку роли по реакции (только для администраторов)');
                    Embed.addField('Использование команд(точка=пробел):', '1). !!money\n2.1). !!addRoleList.@упоминание-роли.цена\n2.2). !!deleteRoleList.@упоминание-роли\n3). !!purchases\n4). !!give.@упоминание-игрока.количество-монет\n5). !!remove.@упоминание-игрока.количество(-1=всё)\n6). !!buy.@упоминание-роли\n7). !!output\n8). !!ReaRole.#idСообщения#.~id-канала~.{@роль,цены}{@роль,цены}{@роль,цены}');
                    message.member.send(Embed);
                }
                else
                {
                    let Embed = new Discord.RichEmbed();
                    Embed.setColor('#' + Math.floor(Math.random() * 16777215).toString(16));
                    Embed.addField('Список команд:', '1). !!money - узнать количество монет у Вас.\n2). !!purchases - узнать список ролей, доступных для покупки на данном сервере\n3). !!give - передать часть своих монет другому усатнику сервера \n4). !!buy - купить роль');
                    Embed.addField('Использование команд(точка=пробел):', '1). !!money\n2). !!purchases\n3). !!give.@упоминание-игрока.количество-монет\n4). !!buy.@упоминание-роли');
                    message.member.send(Embed);
                }
            }
            if (message.content == "!!output" && (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513))
            {
                bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("**НОВОЕ ВЫКИДЫВАНИЕ**");
                let a;
                let coi = JSON.stringify(coins);
                fs.writeFileSync("coins.json", coi);
                bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*coins.json*");
                while (coi.length > 0)
                {
                    if (coi.length > 1800)
                    {
                        a = coi.substring(0, 1800);
                        coi = coi.slice(1800, coi.length);
                    }
                    else
                    {
                        a = coi.substring(0, coi.length);
                        coi = "";
                    }
                    if (a.length != 0)
                    {
                        bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
                    }
                }
                let RoleLi = JSON.stringify(RoleList);
                fs.writeFileSync("RoleList.json", RoleLi);
                bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*RoleList.json*");
                while (RoleLi.length > 0)
                {
                    if (RoleLi.length > 1800)
                    {
                        a = RoleLi.substring(0, 1800);
                        RoleLi = RoleLi.slice(1800, RoleLi.length);
                    }
                    else
                    {
                        a = RoleLi.substring(0, RoleLi.length);
                        RoleLi = "";
                    }
                    if (a.length != 0)
                    {
                        bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
                    }
                }
                let ReaRol = JSON.stringify(ReaRoles);
                fs.writeFileSync("ReaRole.json", ReaRol);
                bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*ReaRole.json*");
                while (ReaRol.length > 0)
                {
                    if (ReaRol.length > 1800)
                    {
                        a = ReaRol.substring(0, 1800);
                        ReaRol = ReaRol.slice(1800, ReaRol.length);
                    }
                    else
                    {
                        a = ReaRol.substring(0, ReaRol.length);
                        ReaRol = "";
                    }
                    if (a.length != 0)
                    {
                        bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
                    }
                }
                let JoinCreat = JSON.stringify(JoinCreates);
                fs.writeFileSync("JoinCreates.json", JoinCreat);
                bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*JoinCreates.json*");
                while (JoinCreat.length > 0)
                {
                    if (JoinCreat.length > 1800)
                    {
                        a = JoinCreat.substring(0, 1800);
                        JoinCreat = JoinCreat.slice(1800, JoinCreat.length);
                    }
                    else
                    {
                        a = JoinCreat.substring(0, JoinCreat.length);
                        JoinCreat = "";
                    }
                    if (a.length != 0)
                    {
                        bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
                    }
                }
                let CreatedChanne = JSON.stringify(CreatedChannels);
                fs.writeFileSync("CreatedChannels.json", CreatedChanne);
                bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*CreatedChannels.json*");
                while (CreatedChanne.length > 0)
                {
                    if (CreatedChanne.length > 1800)
                    {
                        a = CreatedChanne.substring(0, 1800);
                        CreatedChanne = CreatedChanne.slice(1800, CreatedChanne.length);
                    }
                    else
                    {
                        a = CreatedChanne.substring(0, CreatedChanne.length);
                        CreatedChanne = "";
                    }
                    if (a.length != 0)
                    {
                        bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
                    }
                }
                message.channel.send(":ok_hand:");
            }
            if (message.content.indexOf("!!link") >= 0 && message.content.indexOf("!!link") < message.content.length && message.member.id == 387653546134208513)
            {
                //!!link <название-массива> {id канала}(idСообщния)(idСообщния)(idСообщния)(idСообщния)(idСообщния)(idСообщния)(idСообщния)
                let a, b, c, d, s, summ;
                s = message.content;
                a = s.substring(s.indexOf('<') + 1, s.indexOf('>'));
                b = s.substring(s.indexOf('{') + 1, s.indexOf('}'));
                s = s.slice(s.indexOf('}') + 1);
                summ = "";
                while (s.length != 0)
                {
                    c = s.substring(s.indexOf('(') + 1, s.indexOf(')'));
                    d = bot.channels.get(b).messages.get(c).content;
                    summ = summ + d;
                    s = s.slice(s.indexOf(')') + 1);
                }
                if (a == "coins")
                {
                    if (summ != "")
                    {
                        coins = JSON.parse(summ);
                    }
                }
                if (a == "RoleList")
                {
                    if (summ != "")
                    {
                        RoleList = JSON.parse(summ);
                    }
                }
                if (a == "ReaRoles")
                {
                    if (summ != "")
                    {
                        ReaRoles = JSON.parse(summ);
                        let i;
                        for (i = 0; i < ReaRoles.length; i++)
                        {
                            if (bot.channels.get(ReaRoles[i].chan))
                            {
                                bot.channels.get(ReaRoles[i].chan).fetchMessage(ReaRoles[i].mesid)
                                    .then(msg =>
                                    {
                                        console.log("cached");
                                    });
                            }
                        }
                    }
                }
                if (a == "JoinCreates")
                {
                    if (summ != "")
                    {
                        JoinCreates = JSON.parse(summ);
                    }
                }
                if (a == "CreatedChannels")
                {
                    if (summ != "")
                    {
                        CreatedChannels = JSON.parse(summ);
                    }
                }
                message.channel.send(':ok_hand:');
            }
            if (message.content.indexOf("!!cach") >= 0 && message.content.indexOf("!!cach") < message.content.length && message.member.id == 387653546134208513)
            {
                //!!cach <название-массива> {id канала}(idСообщния)
                let b, c, s;
                s = message.content;
                b = s.substring(s.indexOf('{') + 1, s.indexOf('}'));
                s = s.slice(s.indexOf('}') + 1);
                while (s.length != 0)
                {
                    c = s.substring(s.indexOf('(') + 1, s.indexOf(')'));
                    bot.channels.get(b).fetchMessage(c)
                        .then(msg =>
                        {
                            console.log('cached');
                        });
                    s = s.slice(s.indexOf(')') + 1);
                }
                message.channel.send(':ok_hand:');
            }
            if (message.content.indexOf('!!JoinCreate') >= 0 && message.content.indexOf('!!JoinCreate') < message.content.length && (message.member.hasPermission("ADMINISTRATOR") || message.member.id == 387653546134208513))
            {
                //!!JoinCreate #id_голосового_канала назввание_создаваемого +лимит+
                let m, text, voice, lim;
                m = message.content;
                m = m.slice(m.indexOf('#') + 1);
                voice = m.substring(0, m.indexOf(' '));
                m = m.slice(m.indexOf(' ') + 1);
                text = m.substring(0, m.indexOf('+'));
                m = m.slice(m.indexOf('+') + 1);
                lim = m.substring(0, m.indexOf('+'));
                JoinCreate.name = text;
                JoinCreate.channel = voice;
                JoinCreate.limit = lim;
                JoinCreates.push(JoinCreate);
                JoinCreate = {};
            }
        }
    }
});

setInterval(function()
{
    bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("**НОВОЕ ВЫКИДЫВАНИЕ**");
    let a;
    let coi = JSON.stringify(coins);
    fs.writeFileSync("coins.json", coi);
    bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*coins.json*");
    while (coi.length > 0)
    {
        if (coi.length > 1800)
        {
            a = coi.substring(0, 1800);
            coi = coi.slice(1800, coi.length);
        }
        else
        {
            a = coi.substring(0, coi.length);
            coi = "";
        }
        if (a.length != 0)
        {
            bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
        }
    }
    let RoleLi = JSON.stringify(RoleList);
    fs.writeFileSync("RoleList.json", RoleLi);
    bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*RoleList.json*");
    while (RoleLi.length > 0)
    {
        if (RoleLi.length > 1800)
        {
            a = RoleLi.substring(0, 1800);
            RoleLi = RoleLi.slice(1800, RoleLi.length);
        }
        else
        {
            a = RoleLi.substring(0, RoleLi.length);
            RoleLi = "";
        }
        if (a.length != 0)
        {
            bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
        }
    }
    let ReaRol = JSON.stringify(ReaRoles);
    fs.writeFileSync("ReaRole.json", ReaRol);
    bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*ReaRole.json*");
    while (ReaRol.length > 0)
    {
        if (ReaRol.length > 1800)
        {
            a = ReaRol.substring(0, 1800);
            ReaRol = ReaRol.slice(1800, ReaRol.length);
        }
        else
        {
            a = ReaRol.substring(0, ReaRol.length);
            ReaRol = "";
        }
        if (a.length != 0)
        {
            bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
        }
    }
    let JoinCreat = JSON.stringify(JoinCreates);
    fs.writeFileSync("JoinCreates.json", JoinCreat);
    bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*JoinCreates.json*");
    while (JoinCreat.length > 0)
    {
        if (JoinCreat.length > 1800)
        {
            a = JoinCreat.substring(0, 1800);
            JoinCreat = JoinCreat.slice(1800, JoinCreat.length);
        }
        else
        {
            a = JoinCreat.substring(0, JoinCreat.length);
            JoinCreat = "";
        }
        if (a.length != 0)
        {
            bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
        }
    }
    let CreatedChanne = JSON.stringify(CreatedChannels);
    fs.writeFileSync("CreatedChannels.json", CreatedChanne);
    bot.guilds.get('550934487861821450').channels.get('615967228210446336').send("*CreatedChannels.json*");
    while (CreatedChanne.length > 0)
    {
        if (CreatedChanne.length > 1800)
        {
            a = CreatedChanne.substring(0, 1800);
            CreatedChanne = CreatedChanne.slice(1800, CreatedChanne.length);
        }
        else
        {
            a = CreatedChanne.substring(0, CreatedChanne.length);
            CreatedChanne = "";
        }
        if (a.length != 0)
        {
            bot.guilds.get('550934487861821450').channels.get('615967228210446336').send(a);
        }
    }
}, 10 * 60 * 1000);

bot.on('messageReactionAdd', (reaction, user) =>
{
    if(!reaction) return; 
    if(!user) return;
    if (!user.bot && reaction.message.channel.guild)
    {
        let mess, reac, mem;
        mess = reaction.message.id;
        reac = reaction.emoji.identifier;
        mem = reaction.message.channel.guild.members.get(user.id);
        if (mem != undefined)
        {
            let j, i;
            for (j = 0; j < ReaRoles.length; j++)
            {
                if (ReaRoles[j].mesid == mess && ReaRoles[j].emoji == "need" && mem.hasPermission("ADMINISTRATOR"))
                {
                    ReaRoles[j].emoji = reac;
                    reaction.message.react(ReaRoles[j].emoji);
                    break;
                }
                else
                {
                    if (ReaRoles[j].mesid == mess && ReaRoles[j].emoji == reac)
                    {
                        let guild = reaction.message.channel.guild;
                        let pole;
                        pole = guild.roles.get(ReaRoles[j].RoleID);
                        if (guild.members.get(user.id).roles.has(pole))
                        {
                            message.member.send('У вас уже есть эта роль!');
                        }
                        else
                        {
                            let bool;
                            bool = true;
                            for (i = 0; i < coins.length; i++)
                            {
                                if (coins[i].serverMember == user.id && coins[i].guild == reaction.message.channel.guild.id)
                                {
                                    if (coins[i].quantity >= ReaRoles[j].price)
                                    {
                                        guild.members.get(coins[i].serverMember).addRole(pole);
                                        coins[i].quantity = coins[i].quantity - ReaRoles[j].price;
                                        guild.members.get(coins[i].serverMember).send('Роль куплена!');
                                    }
                                    else
                                    {
                                        guild.members.get(coins[i].serverMember).send('У вас недостаточно монет!');
                                    }
                                    bool = false;
                                    break;
                                }
                            }
                            if (bool)
                            {
                                guild.members.get(user.id).send('У вас недостаточно монет!');
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
});

bot.login('NjE0NDc5NTA3NDQ5MTg0Mjg3.XWfrKA.wiDTEQRnpmeFT7NZXhAzJfqnWdY');
//bot.login('NjE1NTEyMzEzNjUwMjE2OTcx.XWPHxQ.ihz6YhgX6asiZJYeWrotsGndnzM');