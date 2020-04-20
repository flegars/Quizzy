import Command from './command';

export default class HelpCommand extends Command 
{
    static match(message) {
        return message.content.startsWith(";help");
    }

    static action(message) {
        console.log("ça fonctionne");
    }

}