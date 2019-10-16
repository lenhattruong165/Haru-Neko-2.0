// =============== R E Q U I R E M E N T =============
//const botconfig = require("botconfig.json");
const fs = require("fs");
const Discord = require("discord.js");
const _client = new Discord.Client();

const Prefix = "-"; //prefix of Bot.

const token = fs.readFileSync("./token/discordbot.txt", "utf8");

_client.login(token);

// =============== S O M E T H I N G E L S E =================

_client.commands =  new Discord.Collection();

fs.readdir("./commands/",  (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        _client.commands.set(props.help.name, props);
    });

});

//



// ========================= G I U L D C O N F I G ========================
_client.on('ready', async () => {
    let ctl = "Commands Loaded:`";
    fs.readdir("./commands/",  (err, files) => {

        if(err) console.log(err);
    
        let jsfile = files.filter(f => f.split(".").pop() === "js")
    
        jsfile.forEach((f, i) => {
            ctl = `${ctl}\n${f}`;
        });
        ctl = ""+ctl+"`";
    
    });
    console.log(`${_client.user.tag} is Online on ${_client.guilds.size} servers!`);
    _client.user.setGame("with Neko's Family.");
    const nekolog = _client.guilds.find("id", "530689610313891840").channels.find("id", "632098325683896330");

    nekolog.send("`===========================`");

    setTimeout( function () {
        nekolog.send("Loading...");
    }, 1);

    setTimeout( function () {
        nekolog.send(ctl);
    }, 500);

    setTimeout( function () {
        nekolog.send(`Load Successfully! I'm Online on ${_client.guilds.size} Servers!`);
    }, 1000);
    
    //setInterval()
    //_client.user.setActivity("with Neko's Family.", {type: "WATCHING"});
});

_client.on('guildMemberAdd', async (member) => {

    var userr = member;
    var memmacun = _client.guilds.get("530689610313891840").members.get(userr.id);//Get Members of guild Ma Cún.
    var memwwo = _client.guilds.get("465795320526274561").members.get(userr.id);// Get Members of guild WWO Simulation.

    if(member.guild.id == 530689610313891840){ //Guild Ma Cún.
        await member.guild.channels.find("id", "530689610313891843").sendMessage("Chào mừng "+member.toString()+" đã đến với **Ma Sói Discord - Ma Cún**!");
        await member.addRole(member.guild.roles.find("name", "Members"));
        await member.addRole(member.guild.roles.find("name", "Dân Làng"));

        const embed = new Discord.RichEmbed()
        .setAuthor(member.guild.name, member.guild.iconURL)
        .addField("Ma Sói Discord - Ma Cún", `Chào mừng bạn đã đến với Server Ma Cún.\nVui lòng hãy đọc các thông tin ở dưới đây để có thể hiểu biết về Server.\n- Luật Server: <#530699541192638475> \n- Luật Ma Sói: <#587643757441187858> \n- Cách Chơi Ma Sói: <#584981323920179200> \nChúc bạn vui vẻ trong Server!`)
        .setTimestamp()
        .setFooter("By Ma Cún Staff Team")
        .setColor("#00FF00");
        member.send(embed);
    }// End lines of Guild Ma Cún.

    if(member.guild.id == 580555457983152149){ //Guild Ma Cún - Game Server.
        //member.roles.has("rolename");
        member.addRole(member.guild.roles.find("name", "Người Chơi"));//Default role

        if(memmacun.roles.has("582788440161124353"))//id of dj role
        {
            member.addRole(member.guild.roles.find("name", "DJ"));
        }

        if(memmacun.roles.has("534583471704899585"))//id of quản trò role
        {
            member.addRole(member.guild.roles.find("name", "Quản Trò"));
        }

    }// End lines of Guild Ma Cún - Game Server.

    if(member.guild.id == 472261911526768642){ //Guild WWO Simulation - Game Server
        var check = "no";

        if(memwwo.roles.has("606123676668133428"))//id of Joining role
        {
            check = "yes";
        }

        if(memwwo.roles.has("606123620732895232"))//id of Mini Narrator role
        {
            check = "yes";
        }

        if(memwwo.roles.has("606123619999023114"))//id of Game Narrator role
        {
            check = "yes";
        }

        if(check == "no"){
            member.kick();
            member.sendMessage('You must have "Joining" role in WWO Simulation to join **WWO Simulation - Game Server**!');
            
            const embed = new Discord.RichEmbed()
            .setAuthor(member.guild.name, member.guild.iconURL)
            .addField("Join Dectected.", `**User:** ${_client.users.get(member.id).toString()}\n**Joining role:** No`)
            .setTimestamp()
            .setFooter(`${_client.users.get(member.id).tag} has been kicked`, _client.users.get(member.id).avatarURL())
            .setColor("#FF0000");
            _client.guilds.get("465795320526274561").channels.get("606123748738859008").send(embed);
        }
        else {
            var check = _client.users.get("155149108183695360").presence.status;
            if (check == "offline"){
                member.addRole(member.guild.roles.find("id", "606131215526789120"));
                if(memwwo.roles.has("606123620732895232")) { member.addRole(member.guild.roles.find("id", "606155761286119425")); }//Mini Narrator
                if(memwwo.roles.has("606123619999023114")) { member.addRole(member.guild.roles.find("id", "606140995897393164")); }//Game Narrator
            }
  
        }

    }// End lines of Guild WWO Simulation - Game Server.
    
    if(member.guild.id == 465795320526274561){ //Guild WWO Simulation.
        if (member.id == 326306397635477504){ member.addRole(member.guild.roles.find("id", "627546767516237827")); }
        var c = "Welcome "+member.toString()+" to the Werewolf Online Simulation server in Discord! To get started, invite your friends to play together, and ping any online Game Narrator. They will set up a game for you. If you do not want to be pinged when a game starts, go to <#606123783605977108> and click on 🎮! Also, do make sure to check <#606123774978293772>, <#606123778589851648> and ! We hope you have a nice time here!\n\nBTW, if you just joined and cannot talk in <#606123800253431808> or any other channel, your account has been automatically flagged as suspicious. If you joined less than 20 minutes ago, please check your DMs with <@!372022813839851520> (Prefix 😉 for the link to verify yourself. If you joined more than 20 minutes ago, go to <#618162028770623508>. The instructions on how to proceed will be there.";
        var check = _client.users.get("155149108183695360").presence.status;
        if (check == "offline")
        {
            member.guild.channels.get("606123796872560670").sendMessage(c);
            member.addRole(member.guild.roles.find("id", "606123686633799680"));
            member.addRole(member.guild.roles.find("id", "606123691889393705"));
            member.addRole(member.guild.roles.find("id", "606167032425218084"));
        }
    }

});

_client.on('guildMemberRemove', async (member) =>{

    if(member.guild.id == 530689610313891840){
        member.guild.channels.find("id", "530689610313891843").sendMessage("Tạm biệt **"+_client.users.get(member.id).tag+"** và cảm ơn bạn đã tham gia!");
    }

    if (member.guild.id == 472261911526768642){
        if (GlobalFunction.prototype.hoster == member.id){
            makeannounce("none");
            GlobalFunction.prototype.hoster = null;
            setTimeout( () => {
                _client.guilds.get("472261911526768642").channels.get("606422958721859585").send("= = = = = = E N D = = = = = =");
            }, 1000);
        }
    }

});

// ========================== C O M M A N D S ============================

_client.on('message', async (message) => {
    if(!message.guild) return;
    
    if(message.content.toLowerCase() == "~nya"){
        const client = require('nekos.life');
        const neko = new client();

        const nya = await neko.sfw.catText();

        message.channel.send(`${message.author.toString()}, Nya~!! ${nya.cat}`);
    }

    if(!message.content.startsWith(Prefix)) return;
    if(message.author.bot) return;

    let args = message.content.slice(Prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    /*let prefix = Prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);*/

    let commandfile = _client.commands.get(cmd);
    if (commandfile) commandfile.run(_client, message, args);

    if (cmd === "hi"){
        message.channel.sendMessage('Hi There!!');
    }

    if (cmd === "says"){
        if(message.author.tag != "Neko Cyan#1717") return;

        await message.channel.sendMessage(args.slice(0).join(" "));
    }

    if (cmd === "test"){
        var check = _client.users.get("155149108183695360").presence.status;
        if (check == "offline")
        {
            message.channel.sendMessage("Dyno is Offline!");
        }
    }

    if(cmd === "getrole"){
        if(message.guild.id != 472261911526768642) return;

        if(!args[0]) return message.channel.sendMessage(`Command Syntax: ${Prefix}getrole <Narrator / MiniNarrator`);

        let member = message.guild.members.get(message.author.id);
        let role = message.guild.roles;

        if(args[0].toLowerCase() == "narrator") {
            if (!member.roles.has("606140995897393164")) return message.channel.sendMessage("Denied! You are not Permission to use this Command.");
            member.addRole(role.get("606139219395608603"));
        }

        if(args[0].toLowerCase() == "mininarrator") {
            if (!member.roles.has("606155761286119425")) return message.channel.sendMessage("Denied! You are not Permission to use this Command.");;
            member.addRole(role.get("606276949689499648"));
        }
    }

    if(cmd === "removerole"){
        if(message.guild.id != 472261911526768642) return;

        if(!args[0]) return message.channel.sendMessage(`Command Syntax: ${Prefix}remove <Narrator / MiniNarrator`);

        let member = message.guild.members.get(message.author.id);
        let role = message.guild.roles;

        if(args[0].toLowerCase() == "narrator") {
            if (!member.roles.has("606139219395608603")) return message.channel.sendMessage("Denied! You are not Permission to use this Command.");
            member.removeRole(role.get("606139219395608603"));
        }

        if(args[0].toLowerCase() == "mininarrator") {
            if (!member.roles.has("606276949689499648")) return message.channel.sendMessage("Denied! You are not Permission to use this Command.");;
            member.removeRole(role.get("606276949689499648"));
        }
    }

    if(cmd === "thang"){
        if(message.guild.id != 580555457983152149) return;

        if(!message.guild.members.get(message.author.id).hasPermission("MANAGE_ROLES")) return;

        let alluser = message.guild.members;

        alluser.forEach(element => {
            if(element.roles.get("580556538821869599")){
                element.addRole(message.guild.roles.get("580556401789763604"));
            }
        });
    }

    if(cmd === "ketthuc"){
        if(message.guild.id != 580555457983152149) return;

        if(!message.guild.members.get(message.author.id).hasPermission("MANAGE_ROLES")) return;

        let alluser = message.guild.members;

        alluser.forEach(element => {
            if(element.roles.get("580559280583737369")){
                element.removeRole(message.guild.roles.get("580559280583737369"));
            }
        });
    }

    if(cmd === "test2"){
        if( message.author.id != 628825440538198019 & message.author.id != 454492255932252160) return;
        if(!args[0]) return;
        if(args[0] == "1"){
            await message.channel.send("1");
            await message.channel.send("2");
            await message.channel.send("3");
        }
        if(args[0] == "2"){
            message.channel.send("1").then( () =>{
                message.channel.send("2").then ( () => {
                    message.channel.send("3");
                });
            });
        }
        if(args[0] == "3"){
            setTimeout( () => {
                message.channel.send("1");
            }, 1000);

            setTimeout( () => {
                message.channel.send("2");
            }, 1000);

            setTimeout( () => {
                message.channel.send("3");
            }, 1000);
        }
    }

    if(cmd === "exec"){
        if( message.author.id != 628825440538198019 & message.author.id != 454492255932252160) return;
        if(!args[0]) return;

        require("child_process").execSync(args.join(" "));

        /*require("child_process").exec(args.join(" "), (stderr, stdout) => {
            if (stderr) {
                message.channel.send(`${stderr}`).catch(err => channel.send(`${stderr}`));
            }
            else {
                if (typeof output !== "string") stdout = require("util").inspect(stdout, { depth: 1 });
            }
        });*/
    }

    if(cmd === "test3"){
        if(args[0].toLowerCase() == "test1"){
            if(!args[1]) return message.channel.sendMessage(GlobalFunction.prototype._test);
            else { GlobalFunction.prototype._test = args.slice(1).join(" "); message.channel.sendMessage(`Set to ${args.slice(1).join(" ")}`)}
        }

        if(args[0].toLowerCase() == "test2"){
            if(!args[1]) return message.channel.sendMessage(GlobalFunction.prototype._test2);
            else { GlobalFunction.prototype._test2 = args.slice(1).join(" "); message.channel.sendMessage(`Set to ${args.slice(1).join(" ")}`)}
        }
    }

    if(cmd === "bo" || cmd === "botowner"){
        if (message.author.id != 454492255932252160 & message.author.id != 628825440538198019) return;
        if(!args[0]) return message.channel.sendMessage(`Your choice.`);
        let arg0 = args[0];
        let arg1 = args[1];
        let arg2 = args[2];
        if(arg0.toLowerCase() == "setactivity" || arg0.toLowerCase() == "sa"){
            if(!arg1) return message.channel.sendMessage(`Syntax: ${Prefix}${cmd} ${arg0} <stream/listen/watch/play> <Name Activity>`);
            if(!arg2) return message.channel.sendMessage(`Syntax: ${Prefix}${cmd} ${arg0} ${arg1} <Name Activity>`);
            if(arg1.toLowerCase() == "stream" || arg1.toLowerCase() == "streamming") return _client.user.setActivity(args.slice(2).join(" "), {type: "STREAMING"});
            else if(arg1.toLowerCase() == "listen" || arg1.toLowerCase() == "listening") return _client.user.setActivity(args.slice(2).join(" "), {type: "LISTENING"});
            else if(arg1.toLowerCase() == "watch" || arg1.toLowerCase() == "watching") return _client.user.setActivity(args.slice(2).join(" "), {type: "WATCHING"});
            else if(arg1.toLowerCase() == "play" || arg1.toLowerCase() == "playing") return _client.user.setActivity(args.slice(2).join(" "), {type: "PLAYING"});
            else return message.channel.sendMessage(`Syntax: ${Prefix}${cmd} ${arg0} <stream/listen/watch/play> <Name Activity>`);
        }
        else if (arg0.toLowerCase() == "simsimicount" || arg0.toLowerCase() == "ssmc"){
            if(!arg1) return message.channel.sendMessage(`Syntax: ${Prefix}${cmd} ${arg0} <show/set> <Number Requested>`);
            if(!arg2 & arg1.toLowerCase() != "show") return message.channel.sendMessage(`Syntax: ${Prefix}${cmd} ${arg0} ${arg1} <Number Requested>`);
            let count = fs.readFileSync("./simsimicount.txt", "utf8");
            let count2 = fs.readFileSync("./wwosimsimicount.txt", "utf8");
            let mathcount1 = parseInt(count);
            let mathcount2 = parseInt(count2);
            if(arg1.toLowerCase() == "show") { message.channel.sendMessage(`**__API Requested.__**\nMa Cún has ${count}. \nWWO Simulation has ${count2}.\nTotal: ${Math.floor(mathcount1 + mathcount2)}.`); }
            else if(arg1.toLowerCase() == "set") {
                let tocount = args.slice(2).join(" ");
                let parsecount = parseInt(tocount);
                fs.writeFile("./simsimicount.txt", parsecount.toString());
                message.channel.sendMessage(`Set value to ${parsecount}`);
            }
            else return message.channel.sendMessage(`Syntax: ${Prefix}${cmd} ${arg0} <show/set> <Number Requested>`);
        }
        else if (arg0.toLowerCase() == "neko"){
            /*const request = require("request");
            request('https://nekos.life/api/neko', function (error, response,body) {
                if(!error && response.statusCode == 200){
                    const gettext = JSON.parse(body); 
                    const embed = new Discord.RichEmbed()

                    .setTitle("**Neko ╰(´︶`)╯♡**")
                    .setImage(gettext.neko)
                    .setTimestamp()
                    .setFooter("Powered by nekos.life")
                    .setColor("#FF33FF");
                    
                    message.channel.sendEmbed(embed);
                }
                else if (error) { message.channel.sendMessage(error); }
                else message.channel.sendMessage(response.statusMessage);
            });*/
            if (!arg1) {
                const client = require('nekos.life');
                const neko = new client();

                var nekos = await neko.sfw.neko();

                const embed = new Discord.RichEmbed()

                    .setTitle("**Neko ╰(´︶`)╯♡**")
                    .setImage(nekos.url)
                    .setTimestamp()
                    .setFooter("Powered by nekos.life")
                    .setColor("#FF33FF");
                    
                    message.channel.sendEmbed(embed);
            }
            else if(arg1.toLowerCase() == "link" || arg1.toLowerCase() == "url"){
                const client = require('nekos.life');
                const neko = new client();

                var nekos = await neko.sfw.neko();

                message.channel.send(nekos.url);
            }
            else return;
        }
        else if (arg0.toLowerCase() == "setavatar"){
            if (!arg1) return message.channel.send(`Syntax: ${Prefix}${cmd} ${arg0} <AvatarURL>`);
            
            _client.user.setAvatar(args.slice(1).join(" ")).catch( err => {
                message.channel.send(err);
            });

            message.channel.send("Done.");
        }
        else if (arg0.toLowerCase() == "preview"){
            const embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .addField("Ma Sói Discord - Ma Cún", `Chào mừng bạn đã đến với Server Ma Cún.\nVui lòng hãy đọc các thông tin ở dưới đây để có thể hiểu biết về Server.\n- Luật Server: <#530699541192638475> \n- Luật Ma Sói: <#587643757441187858> \n- Cách Chơi Ma Sói: <#584981323920179200> \nChúc bạn vui vẻ trong Server!`)
            .setTimestamp()
            .setFooter("By Ma Cún Staff Team")
            .setColor("#00FF00");
            message.channel.send(embed);
        }
        else return message.channel.sendMessage("Data from Command not Found!");

    }

    if(cmd === "s"){

        if(message.guild.id != 530689610313891840) return;

        if(message.channel.id != 631469262095122442) return;

        if(!args[0]) return message.channel.sendMessage(`${message.author.toString()}, không có lời gì để nhắn thì đừng dùng lệnh =.=`).then(msg => msg.delete(5000));

        const simkey = fs.readFileSync("./token/simsimi.txt", "utf8");

        var request = require('request');

        var headers = {
            'Content-Type': 'application/json',
            'x-api-key': simkey
        };
        
        var dataString = `{ "utext": "${args.join(" ")}", "lang": "vn", "atext_bad_prob_max": 0.0 }`;
        
        var options = {
            url: 'https://wsapi.simsimi.com/190410/talk',
            method: 'POST',
            headers: headers,
            body: dataString
        };
        
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let mymsg = JSON.parse(body);
                message.channel.sendMessage(`${message.author.toString()}\n${mymsg.atext}`);

                let count = fs.readFileSync("./simsimicount.txt", "utf8");
                let parsecount = parseInt(count);
                let mathcount = Math.floor(parsecount + 1);
                fs.writeFile("./simsimicount.txt", mathcount.toString());
            }
        });
        
        //áwait message.channel.sendMessage(returnmsg).catch(err => message.channel.sendMessage(err));
    }

    /*if(message.content == 'hi')
    {
        /đụ nhau hông
        /nau^

    }*/

    // ======================================== W W O S I M U L A T I O N ========================================

    var wwosim = _client.guilds.get("465795320526274561");
    var wwosimgs = _client.guilds.get("472261911526768642");
    // Role ID.
    var player = "606123686633799680";
    var rankedwarn = "606123691889393705";
    var joining = "606123676668133428";
    var gamenarrator = "606123619999023114";
    var mininarrator = "606123620732895232";
    // Channel ID.
    var gamewarning = "606123818305585167";
    // User ID.
    var narratorbot = "470020987866578964";
    // Informations.

    if (message.guild.id == 465795320526274561){//WWO Sim Guild
        
        var user = message.author;
        
        // Commands.        
        if (cmd == "gwhost") {

            if (message.channel.id != 606123748738859008) return;
            if (!message.guild.members.get(user.id).roles.has(gamenarrator) & !message.guild.members.get(user.id).roles.has(mininarrator)) return message.channel.send("This Command require Game Narrator or Mini Narrator roles.");

            var check = message.guild.members.get(narratorbot).presence.status;

            if (GlobalFunction.prototype.gamecode != null){
                await message.channel.send("Game Code `"+GlobalFunction.prototype.gamecode+"` is Hosting.");
            }
            else if(args[0].toLowerCase() == "manual") {
                GlobalFunction.prototype.gamecode = args.slice(1).join(" ");
                GlobalFunction.prototype.hoster = user.id;
                await message.guild.roles.get(player).setMentionable(true);
                await message.guild.channels.get(gamewarning).send(""+message.guild.roles.get(player).toString()+", we are now starting game "+args.slice(1).join(" ")+"! Our host will be "+message.author.toString()+". Type `-join "+args.slice(1).join(" ")+"` to enter the game in <#606123821656702987>. If you don't want to get pinged for future games, go to <#606123783605977108> and click on the :video_game: Icon.");
                await message.guild.channels.get(gamewarning).send("Note: Game will start with Manual.");
                await message.guild.roles.get(player).setMentionable(false);

                await wwosimgs.channels.get("606422958721859585").send("= = = = = S T A R T = = = = =");
            }
            else if (check == "offline")
            {
                await message.channel.send("Narrator Bot is Offline so you can't host at this time.");
            }
            else
            {
                GlobalFunction.prototype.gamecode = args.join(" ");
                GlobalFunction.prototype.hoster = user.id;
                await message.guild.roles.get(player).setMentionable(true);
                await message.guild.channels.get(gamewarning).send(""+message.guild.roles.get(player).toString()+", we are now starting game "+args.join(" ")+"! Our host will be "+message.author.toString()+". Type `-join "+args.join(" ")+"` to enter the game in <#606123821656702987>. If you don't want to get pinged for future games, go to <#606123783605977108> and click on the :video_game: Icon.");
                await message.guild.roles.get(player).setMentionable(false);

                await wwosimgs.channels.get("606422958721859585").send("= = = = = S T A R T = = = = =");
            }
        }

        if (cmd == "rwhost") {

            if (message.channel.id != 606123748738859008) return;
            if (!message.guild.members.get(user.id).roles.has(gamenarrator)) return message.channel.send("This Command require Game Narrator role.");

            var check = message.guild.members.get(narratorbot).presence.status;

            if (GlobalFunction.prototype.gamecode != null){
                await message.channel.send("Game Code `"+GlobalFunction.prototype.gamecode+"` is Hosting.");
            }
            else if (check == "offline")
            {
                await message.channel.send("Narrator Bot is Offline so you can't host at this time.");
            }
            else
            {
                let count = fs.readFileSync("./rankedseason.txt", "utf8");
                GlobalFunction.prototype.hoster = user.id;
                GlobalFunction.prototype.gamecode = `RS.${count}[${args.join(" ")}]`;
                await message.guild.roles.get(rankedwarn).setMentionable(true);
                await message.guild.channels.get(gamewarning).send(""+message.guild.roles.get(rankedwarn).toString()+", we are now starting game "+GlobalFunction.prototype.gamecode+"! Our host will be "+message.author.toString()+". Type `-join "+GlobalFunction.prototype.gamecode+"` to enter the game in <#606123821656702987>. If you don't want to get pinged for future games, go to <#606123783605977108> and click on the :video_game: Icon.");
                await message.guild.roles.get(rankedwarn).setMentionable(false);
            
                await wwosimgs.channels.get("606422958721859585").send("= = = = = S T A R T = = = = =");
            }
        }

        if (cmd == "gwcancel" || cmd == "rwcancel"){
            if (message.channel.id != 606123748738859008) return;
            if (cmd == "rwcancel" & !message.guild.members.get(user.id).roles.has(gamenarrator)) return message.channel.send("This Command require Game Narrator role.");
            if (!message.guild.members.get(user.id).roles.has(gamenarrator) & !message.guild.members.get(user.id).roles.has(mininarrator)) return message.channel.send("This Command require Game Narrator or Mini Narrator roles.");
            if (GlobalFunction.prototype.gamecode == null) return message.channel.send("No Game Hosting at this time.");

            await message.guild.channels.get(gamewarning).send("Game "+GlobalFunction.prototype.gamecode+" was cancelled, sorry for any inconvenience caused");
            GlobalFunction.prototype.gamecode = null;
            GlobalFunction.prototype.hoster = null;

            var alluser = message.guild.members;
            alluser.forEach(e => {
                if (e.roles.has(joining)){
                    e.removeRole(message.guild.roles.get(joining));
                }
            });
        }

        if(cmd == "join"){
            if(message.guild.id != wwosim.id) return;
            if(GlobalFunction.prototype.gamecode == null) return message.channel.send("No Game Hosting at this time.");
            if(message.channel.id != 606123821656702987) return message.channel.send("This Command only work when use in <#606123821656702987>");
            var gc = ""+GlobalFunction.prototype.gamecode+"";
            if(gc.toLowerCase() != args.join(" ").toLowerCase()) return message.channel.send("Game Code to join is wrong! (Game code is `"+GlobalFunction.prototype.gamecode+"`)")

            message.guild.members.get(message.author.id).addRole(message.guild.roles.get(joining));
            message.guild.channels.get("606123824743841793").send(`${message.author.tag} joins match ${GlobalFunction.prototype.gamecode}\nUser ID: ${message.author.id}`);
        }

        if (cmd == "ss"){
        
        if(message.channel.id != 633343924693368865) return;
        if(!args[0]) return message.channel.sendMessage(`${message.author.toString()}, Do not use this command if you don't want to chat with me =.=`).then(msg => msg.delete(5000));

        const simkey = fs.readFileSync("./token/simsimi.txt", "utf8");

        var request = require('request');

        var headers = {
            'Content-Type': 'application/json',
            'x-api-key': simkey
        };
        
        var dataString = `{ "utext": "${args.join(" ")}", "lang": "en", "atext_bad_prob_max": 0.0 }`;
        
        var options = {
            url: 'https://wsapi.simsimi.com/190410/talk',
            method: 'POST',
            headers: headers,
            body: dataString
        };
        
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let mymsg = JSON.parse(body);
                message.channel.sendMessage(`${message.author.toString()}\n${mymsg.atext}`);

                let count = fs.readFileSync("./wwosimsimicount.txt", "utf8");
                let parsecount = parseInt(count);
                let mathcount = Math.floor(parsecount + 1);
                fs.writeFile("./wwosimsimicount.txt", mathcount.toString());
            }
        });
        }

    }//WWO Sim Guild

    if (message.guild.id == 472261911526768642){//WWO Sim Game Server Guild

        var user = message.author;

        if (cmd == "srole"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            if (GlobalFunction.prototype.gamestatus == "hosting") return;
            
            GlobalFunction.prototype.gamestatus = "hosting";
            await message.channel.send("Game Start has been announced.");
            await wwosim.channels.get("606123748738859008").send("Game Start has been announced.");
            await wwosim.channels.get(gamewarning).send("Game now starting, you can no longer join.");
        }

        if (cmd == "end" || cmd == "nee"){            
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            
            if (GlobalFunction.prototype.gamestatus == "hosting" & GlobalFunction.prototype.gamecode != null & GlobalFunction.prototype.won != null){
                await wwosim.channels.get(gamewarning).send(`Game ${GlobalFunction.prototype.gamecode} ended - ${GlobalFunction.prototype.won} won the match!`);
                GlobalFunction.prototype.gamecode = null;
                GlobalFunction.prototype.won = null;
                GlobalFunction.prototype.gamestatus = null;

                var allusersim = wwosim.members;
                allusersim.forEach( e => {
                    if (wwosim.members.get(e.id).roles.has(joining)){
                        wwosim.members.get(e.id).removeRole(wwosim.roles.get(joining));
                    }
                });

                makeannounce("start");
            }
            else if (GlobalFunction.prototype.gamestatus == "hosting" & GlobalFunction.prototype.gamecode != null & GlobalFunction.prototype.won == null){
                message.channel.send(`${message.author.toString()}, Can't Announce game end. (Team to win is Missing).\nAfter choose team to win, use -endt to announce game end.`);
            }
            else if (GlobalFunction.prototype.gamecode != null & GlobalFunction.prototype.won == null)
            {
                GlobalFunction.prototype.gamestatus = null;
            }
            else
            {
                GlobalFunction.prototype.gamecode = null;
                GlobalFunction.prototype.gamestatus = null;
                GlobalFunction.prototype.won = null;
                GlobalFunction.prototype.hoster = null;
            }
        }

        if (cmd == "endt"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            if (GlobalFunction.prototype.gamecode == null) return message.channel.send("You need use me to host then command will work.");
            if (GlobalFunction.prototype.gamestatus != "hosting") return message.channel.send("Game is not Starting.");
            else if (GlobalFunction.prototype.gamestatus == "hosting" & GlobalFunction.prototype.gamecode != null & GlobalFunction.prototype.won != null)
            {
                await wwosim.channels.get(gamewarning).send(`Game ${GlobalFunction.prototype.gamecode} ended - ${GlobalFunction.prototype.won} won the match!`);
                GlobalFunction.prototype.gamecode = null;
                GlobalFunction.prototype.won = null;
                GlobalFunction.prototype.gamestatus = null;

                var allusersim = wwosim.members;
                allusersim.forEach( e => {
                    if (wwosim.members.get(e.id).roles.has(joining)){
                        wwosim.members.get(e.id).removeRole(wwosim.roles.get(joining));
                    }
                });
                makeannounce("start");
            }
            else return message.channel.send(`${message.author.toString()}, Choose team to won before use this Command.`);
        }

        if (cmd == "ends"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            if (GlobalFunction.prototype.hoster == null) return;
            GlobalFunction.prototype.hoster = null;
            wwosimgs.channels.get("606422958721859585").send("= = = = = = E N D = = = = = =");
            makeannounce("none");
        }

        if (cmd == "getplayers"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            
            var counting = 1;
            var result = "";
            while(counting <= 16)
            {
                var letcount = ""+counting+"";
                var checkuser = message.guild.members.find("nickname", ""+letcount+"");
                if (checkuser){
                    if (result == "") { result = `${letcount} - ${checkuser.user.tag}`; }
                    else { result = `${result}\n${letcount} - ${checkuser.user.tag}` }
                }
                counting++;
            }
            message.channel.send(result);
        }

        if (cmd == "vwin"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            if(GlobalFunction.prototype.gamecode == null) return;
            if(GlobalFunction.prototype.gamestatus == null) return;

            GlobalFunction.prototype.won = "Village";
            message.guild.channels.get("606132999389708330").send(`Game Over - ${GlobalFunction.prototype.won} won!`);
        }

        if (cmd == "wwin"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            if(GlobalFunction.prototype.gamecode == null) return;
            if(GlobalFunction.prototype.gamestatus == null) return;

            GlobalFunction.prototype.won = "Werewolves";
            message.guild.channels.get("606132999389708330").send(`Game Over - ${GlobalFunction.prototype.won} won!`);
        }

        if(cmd == "win"){
            if (!message.guild.members.get(user.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");
            if(GlobalFunction.prototype.gamecode == null) return;
            if(GlobalFunction.prototype.gamestatus == null) return;

            GlobalFunction.prototype.won = args.join(" ");
            message.guild.channels.get("606132999389708330").send(`Game Over - ${GlobalFunction.prototype.won} won!`);
        }

    }//WWO Sim Game Server Guild

    if (cmd == "rs"){
        if (message.guild.id != wwosim.id & message.guild.id != wwosimgs.id) return;
        if (!wwosim.members.get(message.author.id).hasPermission("ADMINISTRATOR")) return message.channel.send("This Command require Administrator permission in WWO Simulation.");

        var count = fs.readFileSync("./rankedseason.txt", "utf8");
        if (!args[0]) {
            const embed = new Discord.RichEmbed()
            .addField("Ranked Game!", `Now is Season ${count}`)
            .setColor("#00FF00");
            message.channel.send(embed);
        }
        else {
            fs.writeFile("./rankedseason.txt", args.join(" "));
            const embed = new Discord.RichEmbed()
            .addField("Ranked Game!", `Changed to Season ${args.join(" ")}`)
            .setColor("#00FF00");
            message.channel.send(embed);
        }
    }

    if (cmd == "kickasync") {
        if (!wwosim.members.get(message.author.id).hasPermission("KICK_MEMBERS")) return message.channel.send("This Command require KickMember permission.");
        if (!args[0]) return;
        if (args[0].toLowerCase() != "yes") return;

        var counting = 16;
        message.channel.send("Kicking players with Nickname 16 to 1.");
        while(counting >= 1)
        {
            var letcount = ""+counting+"";
            var checkuser = message.guild.members.find("nickname", ""+letcount+"");
            if (checkuser){
                checkuser.kick(`-kickasync by ${message.author.tag}`);             
            }
            counting--;
        }
        message.channel.send("Done.");
    }

    if (cmd == "recover"){
        if (message.guild.id != wwosim.id & message.guild.id != wwosimgs.id) return;
        if (!wwosim.members.get(message.author.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");

        if (!args[0]) {
            const embed = new Discord.RichEmbed()
            .addField("Recover!\n-recover <Number> <Text>", `1 - Game Hoster (ID or Mention).\n2 - Game Code.\n3 - Team Won.\n4 - Game Status (Default when hosting is "hosting").`)
            .setColor("#00FF00");
            message.channel.send(embed);
        }
        else if (!args[1]){
            const embed = new Discord.RichEmbed()
                .addField("Error!", `Text is Missing.`)
                .setColor("#FF0000");
                message.channel.send(embed);
        }
        else{
            if (args[1].toLowerCase() == "null") {
                if (args[0] == "1"){
                    GlobalFunction.prototype.hoster = null;
                    const embed = new Discord.RichEmbed()
                        .addField("Done!", `Game Hoster now changed to null.`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                }
                else if (args[0] == "2"){
                    GlobalFunction.prototype.gamecode = null;
                    const embed = new Discord.RichEmbed()
                        .addField("Done!", `Game Code now changed to null.`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                }
                else if (args[0] == "3"){
                    GlobalFunction.prototype.won = null;
                    const embed = new Discord.RichEmbed()
                        .addField("Done!", `Team Won now changed to null.`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                }
                else if (args[0] == "4"){
                    GlobalFunction.prototype.gamestatus = null;
                    const embed = new Discord.RichEmbed()
                        .addField("Done!", `Game Status now changed to null.`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                }
                else {
                    const embed = new Discord.RichEmbed()
                        .addField("Error!", "`"+args[0]+"` from Number not Found.")
                        .setColor("#FF0000");
                        message.channel.send(embed);
                }
            }
            else {
                if (args[0] == "1"){
                    let getuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]) || message.guild.members.find("displayName", args.slice(1).join(" ")));
                    if (!getuser) { 
                        const embed = new Discord.RichEmbed()
                        .addField("Error!", `Can't Recover!\nReason: User not Found.`)
                        .setColor("#FF0000");
                        message.channel.send(embed);
                    }
                    else {
                        GlobalFunction.prototype.hoster = getuser.id;
                        const embed = new Discord.RichEmbed()
                        .addField("Done!", `Game Hoster now changed to ${getuser.toString()}`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                    }
                }
                else if (args[0] == "2"){
                    GlobalFunction.prototype.gamecode = args.slice(1).join(" ");
                    const embed = new Discord.RichEmbed()
                        .addField("Done!", `Game Code now changed to ${args.slice(1).join(" ")}`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                }
                else if (args[0] == "3"){
                    GlobalFunction.prototype.won = args.slice(1).join(" ");
                    const embed = new Discord.RichEmbed()
                        .addField("Done!", `Team Won now changed to ${args.slice(1).join(" ")}`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                }
                else if (args[0] == "4"){
                    if(args[1].toLowerCase() == "hosting") {
                        GlobalFunction.prototype.gamestatus = "hosting";
                        const embed = new Discord.RichEmbed()
                        .addField("Done!", `Game Status now changed to hosting.`)
                        .setColor("#00FF00");
                        message.channel.send(embed);
                    }
                    else {
                        const embed = new Discord.RichEmbed()
                        .addField("Error!", "Game Status only accept `hosting` or `null`.")
                        .setColor("#FF0000");
                        message.channel.send(embed);
                    }
                }
                else {
                    const embed = new Discord.RichEmbed()
                        .addField("Error!", "`"+args[0]+"` from Number not Found.")
                        .setColor("#FF0000");
                        message.channel.send(embed);
                }
            }
        }
    }

    if(cmd == "status"){
        if (message.guild.id != wwosim.id & message.guild.id != wwosimgs.id) return;
        if (!wwosim.members.get(message.author.id).hasPermission("MANAGE_ROLES")) return message.channel.send("This Command require ManageRole permission.");

        var userr;
        if (GlobalFunction.prototype.hoster != null) { userr = message.guild.members.get(GlobalFunction.prototype.hoster).toString(); }
        else userr = null;

        const embed = new Discord.RichEmbed()
        .addField("Status of GlobalFunction - Running", `Game Hoster: ${userr}\nGame Code: ${GlobalFunction.prototype.gamecode}\nTeam Won: ${GlobalFunction.prototype.won}\nGame Status: ${GlobalFunction.prototype.gamestatus}`)
        .setColor("#00FFFF");
        message.channel.send(embed);
    }

    // ============================================ E N D W W O S I M ============================================



});// this is _client.on('message', (message))

class GlobalFunction
{
    constructor(msg) {
        this._test = msg;
        this._test2 = msg;

        //WWO Simulation.
        this.hoster = msg;
        this.gamecode = msg;
        this.gamestatus = msg;
        this.won = msg;
        //End WWO Simulation.
    }

}

var timeannounce;

function getmakeannounce() {
    timeannounce = setTimeout(function(){
        _client.guilds.get("472261911526768642").channels.get("606422958721859585").send("= = = = = = E N D = = = = = ="); 
        GlobalFunction.prototype.hoster = null;
    }, 30000);
}

function makeannounce(msg) {
    if (msg == "start") return getmakeannounce();
    else return clearTimeout(timeannounce)
}