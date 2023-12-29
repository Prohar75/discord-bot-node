const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dev-info")
    .setDescription("Return an embed."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({
        iconURL: `https://cdn.discordapp.com/avatars/350213998626471939/5603a56e3866206dff77c7bc0ee2115d.webp?size=160`,
        name: "Prohar",
      })
      .setTitle(`Here is my github portfolio.`)
      .setThumbnail(
        `https://i.pinimg.com/originals/1e/a0/f7/1ea0f73fc0c9e8869fd32a5ff62b982f.gif`
      )
      .setURL(`https://github.com/Prohar75`)
      .setDescription(
        `Besides this bot, I have other projects. You may check it if you wish.`
      )
      .addFields([
        {
          name: "Other links below",
          value: "https://linktr.ee/prohar",
        },
      ])
      .setColor(0x1aa3ff)
      .setFooter({
        iconURL: "https://avatars.githubusercontent.com/u/139985228?v=4",
        text: "also check my youtube speedruns :3",
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
