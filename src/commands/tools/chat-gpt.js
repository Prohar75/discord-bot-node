const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const puppeteer = require("puppeteer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat-gpt")
    .setDescription("Ask ChatGPT a question!")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("The prompt for the ai.")
        .setRequired(true)
    ),
  async execute(interaction, client, message) {
    const { options } = interaction;
    const prompt = options.getString("prompt");

    const thread = await interaction.channel.threads.create({
      name: `${prompt.substr(0, 20)}...`,
      autoArchiveDuration: 60,
      reason: `Your respond ${prompt}`,
    });
    if (thread.joinable) await thread.join();
    await thread.members.add(interaction.user.id);
    await interaction.reply({
      content: "Your thread succesfully has beed made!",
      ephemeral: true,
    });
    const newMessage = await thread.send({
      content: "loading your response... this could take some time",
    });

    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto("https://chat-app-f2d296.zapier.app/");

    const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';

    await page.waitForSelector(textBoxSelector);
    await page.type(textBoxSelector, prompt);

    await page.keyboard.press("Enter");

    await page.waitForSelector('[data-testid="final-bot-response"] p');

    var value = await page.$$eval(
      '[data-testid="final-bot-response"]',
      async (elements) => {
        return elements.map((element) => element.textContent);
      }
    );

    setTimeout(async () => {
      if (value.length == 0)
        return await interaction.editReply({
          content: "There was an error getting that response,",
        });
    }, 30000);

    value.shift();
    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle(`\> Your respond: ${prompt}`)
      .setDescription(`\`\`\`${value.join(`\n\n\n\n`)}\`\`\``);

    await newMessage.edit({ content: "", embeds: [embed] });

    browser.close();
  },
};
