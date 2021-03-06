const Commando = require('discord.js-commando');
const Settings = require('../GlobalSettings');
const sqlite = require('sqlite');
const path = require('path');

/**
 * Prepare the database for storing settings and attach it to the Discord client so we can access
 * it.
 *
 * This SettingsProvider is for settings that are specific to individual discord servers or specific
 * to the bot itself. Use GlobalSettings for settings that are assigned or managed from outside the
 * Discord bot, such as tokens, prefixes, or a list of roles.
 *
 * @param {Commando.CommandoClient} client
 */
async function setupSettingsProvider(client) {
  const databasePath = path.join(__dirname, Settings.DATABASE_NAME);

  /** @type {sqlite.Database} */
  const db = await sqlite.open(databasePath);
  const settingsProvider = new Commando.SQLiteProvider(db);
  client.setProvider(settingsProvider);
}

const settingKeys = {
  DEFAULT_LOGGING_CHANNEL: 'guild.loggingChannel',
  DEFAULT_ROLE_ASSIGNMENT_CHANNEL: 'guild.roles.roleAssignmentChannel',
  ROLE_ASSIGNMENT_MESSAGES: 'guild.roles.roleAssignmentMessages',
};

const redditKeys = {
  REDDIT_INSTANCES: 'guild.reddit.instances',
};

/** @type {string[]} */
const settingNames = Object.getOwnPropertyNames(settingKeys).map((key) => settingKeys[key]);
const redditNames = Object.getOwnPropertyNames(redditKeys).map((key) => redditKeys[key]);

module.exports = {
  setupSettingsProvider,
  settingsKeys: settingKeys,
  settingNames: settingNames,
  redditKeys: redditKeys,
  redditNames: redditNames,
};
