const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
import { parseEther, formatEther } from '@ethersproject/units'
import { Buffer } from 'buffer'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { web3Provider } from 'src/lib/web3/helpers'
import { getBusinessMetrics, getMemberOrders } from 'src/lib/metrics'
import { getUsdcBalance } from 'src/lib/web3/tokens'
import {
  fetchMember,
  fetchMemberAndBlock,
  fetchMemberAndUpdateBan,
  fetchMemberAndGiveCredits,
} from 'src/lib/members'

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
        select: {
          title: true,
          owner: { select: { username: true } },
          minter: { select: { username: true } },
          openGraphImageSrc: true,
          marketSaleStatus: true,
          externalUrl: true,
          marketSales: { orderBy: { id: 'desc' }, take: 2 },
        },
      })
      if (!treasure) throw 'Treasure not found'

      const currentSale = treasure.marketSales[0]
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(treasure.title)
        .setDescription(
          `Market status: ${treasure.marketSaleStatus} ${
            currentSale ? `for $${currentSale.amount}` : ''
          }`
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
            name: 'tokenId',
            value: treasure.tokenId,
            inline: true,
          },
          {
            name: 'hashId',
            value: treasure.id,
            inline: true,
          }
        )
        .setImage(treasure.openGraphImageSrc)
      // interaction.editReply(JSON.stringify(treasure, undefined, 4))
      interaction.editReply({ embeds: [embed] })
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
      let member = await db.member.findUnique({
        where: { username },
        include: {
          treasuresOwned: true,
          treasuresMinted: true,
          marketSalesSold: true,
          marketSalesPurchased: true,
          mintPurchases: true,
          depositOrders: true,
        },
      })
      if (!member) throw 'Member not found'
      const details = {
        treasuresOwned: member.treasuresOwned,
        treasuresMinted: member.treasuresMinted,
        marketSalesSold: member.marketSalesSold,
        marketSalesPurchased: member.marketSalesPurchased,
        mintPurchases: member.mintPurchases,
        depositOrders: member.depositOrders,
      }
      Object.keys(details).map((key) => delete member[key])
      delete member.refreshToken

      let usdcBalance
      let etherBalance
      try {
        usdcBalance = await getUsdcBalance(member.address)
        etherBalance = await web3Provider.getBalance(member.address)
        etherBalance = formatEther(etherBalance)
      } catch {
        // Do nothing
      }
      let ramps = await db.ramp.findMany({
        where: { memberId: member.id },
        orderBy: { createdAt: 'desc' },
        include: { RampWithdraw: true },
      })
      ramps = ramps.map((ramp) => ({
        ...ramp,
        accessToken: 'REDACTED',
        refreshToken: 'REDACTED',
      }))
      const data = {
        member,
        web3: { etherBalance, usdcBalance },
        ...details,
        ramps,
      }
      interaction.editReply({
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
