import HelpCommand from './commands/help';

export default class CommandParser {

    /**
     * @param {Message} message 
     */
    constructor (message) {
        this.message = message;
        this.msg = message.content.split(' ')[0];
    }

    /**
     * Used to parse message throught all commands available
     */
    analyzeMessage () {
        switch(this.msg) {
            case ";help":
                HelpCommand.parse(this.message);
                break;
        }
    }
}