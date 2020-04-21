const axios = require('axios');
import Discord, { DiscordAPIError } from 'discord.js';

export default class QuizzAction {

    getQuestions(category = null, number = 3, level = 'medium') {
        return axios.get(`https://opentdb.com/api.php?amount=${number}&difficulty=${level}&type=multiple`)
        .then(function(response) {
            return response.data.results;
        })
    }

    AwaitingQuestions(message) {
        this.getQuestions().then(data => {
            data.forEach((question, index) => {
                setTimeout(() => {
                    this.NextQuestion(message, question, index);
                }, 20000 * index);
                
            })
        });
    }

    NextQuestion(message, question, index) {
        const questionEmbed = new Discord.MessageEmbed();
        questionEmbed
        .setAuthor(`Question #${index}`)
        .setColor('#0099ff')
        .setTitle('0')
        .setDescription(question.question)
        .addFields(
            { name: 'Reponse 1⃣', value: question.correct_answer },
            { name: 'Reponse 2⃣', value: question.incorrect_answers[0] },
            { name: 'Reponse 3⃣', value: question.incorrect_answers[1] },
            { name: 'Reponse 4⃣', value: question.incorrect_answers[2] },
        )
        
        return message.channel.send(questionEmbed)
        .then((message) => {         
            this.makeCountdown(message);
            message.react("1⃣");
            message.react("2⃣");
            message.react("3⃣");
            message.react("4⃣");
        });
    }

    makeCountdown(message) {
        const receivedEmbed = message.embeds[0];
        const countdownEmbed = new Discord.MessageEmbed(receivedEmbed);
        for (let i = 1; i < 21; i++) {
            setTimeout(() => {
                message.edit(countdownEmbed.setTitle(`${i}`));
            }, 1000 * i)       
        }
    }
}