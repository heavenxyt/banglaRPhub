require('dotenv').config();
const { Client, IntentsBitField, Events, EmbedBuilder } = require('discord.js');

// Create a new client instance
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
  ],
});

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
});

// Handle messages
client.on(Events.MessageCreate, async message => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Simple command handling
  if (message.content.toLowerCase() === '!hello') {
    message.reply('Hello! Welcome to BANGLA RP HUB!');
  }
});

// Welcome message when a new member joins
client.on(Events.GuildMemberAdd, async member => {
  try {
    // Get all emojis from the cache
    const arrow_right = client.emojis.cache.get('1400925338418286783');
    const arrow_left = client.emojis.cache.get('1404937811404001382');
    const swordEmoji = client.emojis.cache.get('1356418634725069030');
    const welcomeEmoji = client.emojis.cache.get('986562286690918401');

    const welcomeEmbed = new EmbedBuilder()
      .setColor(0xFFD700)  // Dark theme color
      .setTitle('NEXT GENERATION GAMING COMMUNITY')
      .setDescription(`𝙃𝙀𝙔 ${swordEmoji ? swordEmoji.toString() : '<:40242wingandswordids:1356418634725069030>'} ${member.user.toString()} ${welcomeEmoji ? welcomeEmoji.toString() : '<a:emoji7:986562286690918401>'}\n𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 𝑩𝑨𝑵𝑮𝑳𝑨 𝑹𝑷 𝑯𝑼𝑩 𝙏𝙃𝘼𝙉𝙆𝙎 𝙁𝙊𝙍 𝙅𝙊𝙄𝙉𝙄𝙉𝙂!\n─────────────────────`)
      .addFields(
        { name: '\u200B', value: `${arrow_right ? arrow_right.toString() : '<a:arrow_mixedright:792237963903107092>'} 。゜✿ 𝘾𝙃𝘼𝙏 𝙕𝙊𝙉𝙀 ✿゜[。゜𝘾𝙇𝙄𝘾𝙆 ゜。](https://discord.com/channels/1400856764508803223/1400856765326823435) ${arrow_left ? arrow_left.toString() : '<a:arrow_mixedleft:792265670640271360>'}`},
        { name: '\u200B', value: `${arrow_right ? arrow_right.toString() : '<a:arrow_mixedright:792237963903107092>'} 。゜✿ 𝙍𝙀𝘼𝘿 𝙍𝙐𝙇𝙀𝙎 ✿゜[。゜𝘾𝙇𝙄𝘾𝙆 ゜。](https://discord.com/channels/1400856764508803223/1403489448934641825) ${arrow_left ? arrow_left.toString() : '<a:arrow_mixedleft:792265670640271360>'}` }
      )
      .setImage('https://cdn.discordapp.com/attachments/1115845679206633514/1404897160700366889/Firefly_Firefly_video_2025-08-08_21-20_422949_gtR.gif?ex=689cdbf0&is=689b8a70&hm=0829d6b3fbf72553780b90f7dbada967567b06ec501e181bc6f6e57b2fa606a5&')
      .setTimestamp()
      .setFooter({ text: 'Welcome to BANGLA RP HUB' });

    // Try to find a channel named "welcome" or "general"
    const welcomeChannel = member.guild.channels.cache.find(
      channel => channel.name.includes('welcome') || channel.name.includes('general')
    );

    if (welcomeChannel && welcomeChannel.isTextBased()) {
      // Add a 2-second delay before sending the welcome message
      await new Promise(resolve => setTimeout(resolve, 2000));
      await welcomeChannel.send({ embeds: [welcomeEmbed] });
      console.log(`Sent welcome message for ${member.user.tag}`);
    }
  } catch (error) {
    console.error('Error sending welcome message:', error);
  }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
