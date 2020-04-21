import Discord from 'discord.js';

export default class ChannelActions {

    /**
     * @param {Message} message
     * @param {String} name 
     * @param {String} type 
     * @param {String} parent 
     */
    createVoiceChannel(message, name, type, parent) {
        message.guild.channels.create(name, {
            "type": type,
            "parent": parent
        });
    }

}