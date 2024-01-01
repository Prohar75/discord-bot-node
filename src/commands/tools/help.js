const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Return a command list."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`List of commands.`)
      .addFields([
        {
          name: "/dev-info",
          value: "Shows info about developer.",
        },
        {
            name: "/Chat-gpt",
            value: "answers any quiestion (now it works only like a\nsingle quiestion, not like compleate chat).",
        },
        {
            name: "/Tip-of-a-day",
            value: "gives you a tip.",
        }
      ])
      .setColor(0x1aa3ff)
    await interaction.reply({
      embeds: [embed],
    });
  },
};
