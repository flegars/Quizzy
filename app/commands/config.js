import Command from './command';

export default class ConfigCommand extends Command {
    static match(message) {
        return message.content.startsWith(';config');
    }

    static action(message) {
         //Don't do that, kids
         const categories = ['1. General Knowledge', '2. Books', '3. Film', '4. Music',  '5. Musicales & theatres', '6. Television', '7. Video games', '8. Board games', '9. Science & Nature',
         '10. Computers', '11. Maths', '12. Mythology', '13. Sports', '14. Geography', '15. History', '16. Politics', '17. Art', '18. Celebrities', '19. Animals',  '20. Everything'
         ];
         const difficulties = ['1. Easy', '2. Medium',  '3. Hard'];

        if(message.content == ';config') {
            var msg = '**To define which category you prefer on the server you must specifiy one of these :** \n \n (*eg: ;config category 5*) \n \n';
            categories.forEach(category => { msg += category + '\n ' });

            msg += '\n**To define which difficulty you prefer on the server you must specify one of these :** \n \n  (*eg: ;config difficulty 1*) \n \n'
            difficulties.forEach(difficulty => { msg += difficulty + '\n ' });

            return message.channel.send(msg);
        }

        if(message.content.startsWith(';config category') || message.content.startsWith(';config difficulty')) {
            const parameter = message.content.split(' ')[1];
            const value = parseInt(message.content.split(' ')[2]);

            message.delete();
            return message.channel.send(`**${parameter} set to ${parameter == 'category' ? categories[value - 1] : difficulties[value - 1]}**`)
        }
        
    }
}