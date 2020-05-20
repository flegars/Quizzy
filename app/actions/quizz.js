const axios = require('axios');
import Discord, { DiscordAPIError } from 'discord.js';

export default class QuizzAction {

    getQuestions(category = null, number = 3, level = 'medium') {
        return axios.get(`https://opentdb.com/api.php?amount=${number}&difficulty=${level}&type=multiple`)
        .then(function(response) {
            return response.data.results;
        })
    }

    RandomizeQuestions(answers) {
        const randomizedAnswers = [answers.correct_answer];
        for (let index = 0; index < answers.incorrect_answers.length; index++) {
            randomizedAnswers.push(answers.incorrect_answers[index]);
        }
        return this.Shuffle(randomizedAnswers);
    }

    Shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }

    WaitingQuestions(message) {
        this.getQuestions()
        .then(data => {
            const total = data.length;
            data.forEach((question, index) => {
                setTimeout(() => {
                    this.NextQuestion(message, question, index, total);
                }, 12000 * index);       
            })
        });
    }

    NextQuestion(message, question, index, total) {
        const questionEmbed = new Discord.MessageEmbed();
        const randomizedAnswers = this.RandomizeQuestions(question);

        questionEmbed
        .setAuthor(`Question #${index + 1} out of ${total}`)
        .setColor('#0099ff')
        .setThumbnail('https://thumbs.gfycat.com/ElatedVigilantKakapo-size_restricted.gif')
        .setDescription(question.question)
        .addFields(
            { name: 'Reponse 1⃣', value: randomizedAnswers[0], inline: true },
            { name: 'Reponse 2⃣', value: randomizedAnswers[1] },
            { name: 'Reponse 3⃣', value: randomizedAnswers[2], inline: true },
            { name: 'Reponse 4⃣', value: randomizedAnswers[3] },
        );
        
        return message.channel.send(questionEmbed)
            .then( message => {         
                message.react("1⃣");
                message.react("2⃣");
                message.react("3⃣");
                message.react("4⃣");
                message.delete({ timeout: 10000, reason: 'Remove question' });
                setTimeout(() => {
                    const answerIndex = this.FindCorrectAnswer(randomizedAnswers, question.correct_answer);
                    message.channel.send(`**Question #${index + 1}** : Response was ${answerIndex} **${question.correct_answer}**`);
                }, 10000)
            });
    }

    FindCorrectAnswer(randomizedAnswers, correctAnswer) {
        const answerIndex = randomizedAnswers.findIndex(answer => answer === correctAnswer);
        switch(answerIndex) {
            case 0:  
                return "1⃣";
            case 2:  
                return "2⃣";
            case 3:  
                return "3⃣";
            case 4:  
                return "4⃣";
        }
    }
}