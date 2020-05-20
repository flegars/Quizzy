import Command from './command'; 
import Discord from 'discord.js';
import QuizzActions from '../actions/quizz';

export default class NewGameCommand extends Command {
    static match(message) {
        return message.content.startsWith(';quizz');
    }

    static action(message) {
        const msg = '[React with 👌 to join the game]; Currently playing :';
        const quizzActions = new QuizzActions();

        message.channel.send(msg)
            .then(messageReaction => {
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '👌';
                };

                const reactionCollector = new Discord.ReactionCollector(messageReaction, filter, {
                    time: 15000
                });

                reactionCollector.on('collect', msgReact => {
                    msgReact.users
                    .fetch()
                    .then(users => {
                        msgReact.message.edit(msg + users.map(user => `<@${user.id}>`).toString());
                    });
                });

                reactionCollector.on('end', () => {
                    quizzActions.WaitingQuestions(message);
                });
            })
            .catch(() => console.error);
    }
}