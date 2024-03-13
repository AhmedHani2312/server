// // recommendationController.js
// const axios = require('axios');
// const connection = require('../connection'); // Adjust as per your directory structure

// exports.getRecommendations = async (req, res) => {
//     const { preferences } = req.body; // Get user preferences from the request body

//     // Constructing the prompt for the ChatGPT model based on user preferences
//     let prompt = 'Please provide a list of university recommendations based on the following criteria: ';
//     for (const [criteria, value] of Object.entries(preferences)) {
//         prompt += `${criteria}: ${value}, `;
//     }

//     try {
//         const openaiResponse = await axios.post(
//             'https://api.openai.com/v1/engines/davinci-002/completions',
//             {
//                 prompt: prompt,
//                 max_tokens: 100,
//                 temperature: 0.5,
//             },
//             {
//                 headers: {
//                     'Authorization': 'Bearer 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'
//                 }
//             }
//         );
//         // Transform OpenAI's response as needed and send it back
//         res.json({ recommendations: openaiResponse.data.choices[0].text.trim() }); // Ensure the response is properly formatted
//     } catch (error) {
//         console.error('Error getting recommendations:', error);
//         res.status(500).send('Failed to fetch recommendations');
//     }
// };


//recommendationController.js
const axios = require('axios');

const API_KEY = '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';

exports.getRecommendations = async (req, res) => {
    try {
        const { features, country } = req.body;
        const prompt = `Provide 3 to 5 university recommendations in ${country} with features: ${features.join(", ")}. For each university, include ranking, a clickable link to the university, and reasons for recommendation and also give a breif about the university in the begining of the response. Please make the university name in Bold then leave a line and start giving the requested information for the university. Thank you`;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo-0613',
            messages: [{ "role": "user", "content": prompt }],
            max_tokens: 500,
            temperature: 0.5,
        }, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });

        res.json({ recommendations: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error fetching recommendations:', error.response ? error.response.data : error);
        res.status(500).send('Failed to fetch recommendations');
    }
};
