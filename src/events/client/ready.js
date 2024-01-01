const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.mongoURL;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`Ready!!! ${client.user.tag} is logged in and online`);

        client.user.setPresence({
            status: "dnd",
          });
        client.user.setActivity('pidor',{
            type: ActivityType.Custom,
            name: 'customstatus',
            state: '/help to see all commands'
        });

        if(!mongoURL) return;

        await mongoose.connect(mongoURL || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if(mongoose.connect){
            console.log('I have connected to the db');
        }else{
            CommandInteractionOptionResolver.log("I cannot connect to the db right now...");
        }
    }
}