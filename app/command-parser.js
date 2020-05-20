import HelpCommand from './commands/help';
import NewGameCommand from './commands/game';

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

        }
    }
}