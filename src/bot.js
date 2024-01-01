require("dotenv").config();
const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
});
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);

client.on(Events.GuildMemberAdd, async (member) => {
  const roleId = "1063138151889113099";

  const giveRole = member.guild.roles.cache.get(roleId);

  if (giveRole) {
    try {
      await member.roles.add(giveRole);
      console.log(`Added role ${giveRole.name} to ${member.user.tag}`);
    } catch (error) {
      console.error(`Error adding role: ${error.message}`);
    }
  } else {
    console.error(`Role with ID ${roleId} not found`);
  }
});

//join to create
/*
const joinschema = require("./Schemas/joinToCreate");
const joinChannelschema = require("./Schemas/joinToCreateChannels");

client.on(Event.VoiceStateUpdate, async (oldState, newState) => {
  try {
    if (newState.member.guild === null) return;
  } catch (err) {
    return;
  }

  const joindata = await joinschema.findOne({ Guild: newState.guild.id });
  const joinchanneldata = await joinChannelschema.findOne({
    Guild: newState.member.guild.id,
    User: newState.member.id,
  });

  const voicechannel = newState.channel;

  if (!joindata) return;

  if (!voicechannel) return;
  else {
    if (voicechannel.id === joindata.Channel) {
      if (joinchanneldata) {
        try {
          return await newState.member.send({
            content: `You already have a voice channel open right now!`,
            ephemeral: true,
          });
        } catch (error) {
          return;
        }
      } else {
        try {
          const channel = await newState.member.guild.channels.create({
            type: ChannelType.GuildVoice,
            name: `SLOT`,
            UserLimit: joindata.VoiceLimit,
            parent: joindata.Category
          });
          try {
            await newState.member.voice.setChannel(channel.id);
          } catch (error) {
            return;
          }

          setTimeout(() => {
            joinChannelschema.create(
              {
                Guild: newState.member.guild.id,
                Channel: channel.id,
                User: newState.member.id,
              },
              500
            );
          });
        } catch (error) {
          try {
            await newState.member.send({
              content: `I could not create your channel, I may be missing permissions`,
            });
          } catch (err) {
            return;
          }
          return;
        }

        try {
          const embed = new EmbedBuilder()
            .setAuthor({ name: "Join to Create System" })
            .setFooter({ text: "Channel Created" })
            .setTitle("> Channel Created")
            .addFields({
              name: "Channel Created",
              value: "> Your voice channel has been created",
            });

          await newState.member.send({ embeds: embed });
        } catch (error) {
          return;
        }
      }
    }
  }
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
  try {
    if (oldState.member.guild === null) return;
  } catch (err) {
    return;
  }
  const leavechanneldata = await joinChannelschema.findOne({
    Guild: oldState.member.guild.id,
    User: oldState.member.id
  });
  if (!leavechanneldata) return;
  else {
    const voicechannel = await oldState.member.guild.channels.cache.get(
      leavechanneldata.Channel
    );

    try {
      await voicechannel.delete();
    } catch (error) {
      return;
    }
    await joinChannelschema.deleteMany({
      Guild: oldState.guild.id,
      User: oldState.member.id,
    });
    try {
      const embed = new EmbedBuilder()
        .setAuthor({ name: "Jpin to Create System" })
        .setFooter({ text: "Channel Delete" })
        .setTitle("> Channel Deleted")
        .addFields({
          name: "Channel Deleted",
          value: "> Your voice channel has been Deleted",
        });

      await newState.member.send({ embeds: embed });
    } catch (error) {
      return;
    }
  }
});*/
