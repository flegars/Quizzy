import HelpCommand from './commands/help';
import NewGameCommand from './commands/game';
import ConfigCommand from './commands/config';

export default class CommandParser {

    /**
     * @param {Message} message 
     */
    constructor (message) {
        this.message = message;
        this.messageContent = message.content.split(' ')[0];
    }

    /**
     * Used to parse message through all commands available
     */
    analyzeMessage () {
        switch(this.messageContent) {
            case ";help":
                HelpCommand.parse(this.message);
                break;
            case ";quizz":
                NewGameCommand.parse(this.message);
                break;
            case ";config":
                ConfigCommand.parse(this.message);
                break;
        }
    }
}