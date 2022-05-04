const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
import { Buffer } from 'buffer'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { getExplorerBaseUrlFromName } from '@treasure-chess/web3-helpers'
import { getBusinessMetrics } from 'src/lib/metrics'
import {
  fetchMemberAndBlock,
  fetchMemberAndUpdateBan,
  fetchMemberAndGiveCredits,
  getMemberRawData,
} from 'src/lib/members'

const EXPLORER_BASE_URL = getExplorerBaseUrlFromName(
  process.env.ETHEREUM_NETWORK_NAME
)

const commands = [
  {
    data: new SlashCommandBuilder()
      .setName('block')
      .setDescription(`Prevent a member's games from being minted`)
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to block')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const member = await fetchMemberAndBlock(username, true)
      // fetchMemberAndBlock doesn't throw errors, so we must do it manually
      if (!member) throw 'Member not found'
      const blockedMemberCount = await db.member.count({
        where: { blocked: true },
      })
      interaction.editReply(
        `**${username}** is now blocked. \`Blocked members: ${blockedMemberCount.toLocaleString()}\``
      )
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription(`Update a member's banned status`)
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to ban')
          .setRequired(true)
      )
      .addBooleanOption((option) =>
        option
          .setName('banned')
          .setDescription('"True" to ban, "False" to remove a ban')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const isBanned = interaction.options.getBoolean('banned')
      const member = await fetchMemberAndUpdateBan(username, isBanned)
      // fetchMemberAndBlock doesn't throw errors, so we must do it manually
      if (!member) throw 'Member not found'
      const bannedMemberCount = await db.member.count({
        where: { banned: true },
      })
      if (isBanned)
        return interaction.editReply(
          `**${username}** is now banned. \`Banned members: ${bannedMemberCount.toLocaleString()}\``
        )
      interaction.editReply(
        `**${username}** is no longer banned. \`Banned members: ${bannedMemberCount.toLocaleString()}\``
      )
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('credit')
      .setDescription('Increase mint credits')
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to credit')
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName('int')
          .setDescription('How many credits')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const creditsToGive = interaction.options.getInteger('int')
      const member = await fetchMemberAndGiveCredits(username, creditsToGive)
      if (!member) throw 'Member not found'
      interaction.editReply(
        `${username} got +${creditsToGive} mint credits, for a total of ${member.mintCredits}`
      )
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('treasure')
      .setDescription('Get data for a specific Treasure')
      .addStringOption((option) =>
        option
          .setName('id')
          .setDescription('tokenId or hash ID')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const tokenId = interaction.options.getString('id')
      let id
      if (tokenId.startsWith('0x')) id = tokenId
      const treasure = await db.treasure.findUnique({
        where: { ...(id ? { id } : { tokenId: Number(tokenId) }) },
        include: {
          owner: { select: { username: true } },
          minter: { select: { username: true } },
          marketSales: { orderBy: { id: 'desc' } },
          mintPurchase: true,
        },
      })
      if (!treasure) throw 'Treasure not found'
      logger.debug({ custom: treasure })
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(treasure.title)
        .setDescription(
          `\`tokenId\` **#${treasure.tokenId}**
${EXPLORER_BASE_URL}token/${treasure.id}`
        )
        .setURL(`https://treasure.chess.com/treasures/${tokenId}`)
        .addFields(
          {
            name: 'Owner',
            value: treasure.owner.username,
            inline: true,
          },
          {
            name: 'Minter',
            value: treasure.minter.username,
            inline: true,
          },
          {
            name: 'Market Status',
            value: treasure.marketSaleStatus,
            inline: true,
          }
        )
        .setImage(treasure.openGraphImageSrc)
      interaction.editReply({
        embeds: [embed],
        files: [
          {
            name: `treasure_${treasure.tokenId}_${new Date()
              .toJSON()
              .slice(0, 16)}.json`,
            attachment: Buffer.from(JSON.stringify(treasure, undefined, 4)),
          },
        ],
      })
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('metrics')
      .setDescription('Get business metrics'),
    execute: async (interaction) => {
      const metrics = await getBusinessMetrics()
      interaction.editReply({
        files: [
          {
            name: `metrics_${new Date().toJSON().slice(0, 16)}.json`,
            attachment: Buffer.from(JSON.stringify(metrics, undefined, 4)),
          },
        ],
      })
    },
  },
  {
    data: new SlashCommandBuilder()
      .setName('member')
      .setDescription('Get member raw data')
      .addStringOption((option) =>
        option
          .setName('username')
          .setDescription('Who to view')
          .setRequired(true)
      ),
    execute: async (interaction) => {
      const username = interaction.options.getString('username')
      const data = await getMemberRawData(username)
      const { member } = data
      let description = `${EXPLORER_BASE_URL}address/${member.address}`
      if (member.twitchUsername)
        description += `\n📺 https://twitch.tv/${member.twitchUsername}`
      if (member.banned) description += '\n **BANNED !!!** '
      if (member.blocked) description += '\n **BLOCKED !!!** '
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(username)
        .setDescription(description)
        .setURL(`https://treasure.chess.com/members/${username}`)
        .addFields(
          {
            name: 'Mint credits',
            value: `${member.mintCredits}`,
          },
          {
            name: 'Wallet',
            value: `USDC: **$${
              data.web3.usdcBalance
            }** ETH: **${data.web3.etherBalance.substring(0, 8)}**`,
          },
          {
            name: 'Owned',
            value: `${data.treasuresOwned.length}`,
            inline: true,
          },
          {
            name: 'Purchased',
            value: `${data.marketSalesPurchased.length}`,
            inline: true,
          },
          {
            name: 'Sold',
            value: `${data.marketSalesSold.length}`,
            inline: true,
          }
        )
        .setThumbnail(member.imageSrc)
      interaction.editReply({
        embeds: [embed],
        files: [
          {
            name: `member_${username}_${new Date().toJSON().slice(0, 16)}.json`,
            attachment: Buffer.from(JSON.stringify(data, undefined, 4)),
          },
        ],
      })
    },
  },
]

export default commands
