// Models
const models = require('../models/index');
const User = models.User;

const fs = require('fs');

// UUID
const uuid = require('uuid');

// Services
const userServices = require('../services/userServices');

// Controllers
const controller = require('./controller.js');

exports.userSignUp = async (req, res) => {
    

    const register =await userRegistration(req.body.params);

    register.then((response) => {
            console.log('?????',response);
            return res.status(200).json({
            'isSuccess': true,
            'message': response
        });
        })
        .catch(error => {
            return error;
        });
}

const userRegistration = (parameters) => {
    return new Promise(function (resolve, reject) {
        userServices.userSignUp(parameters).then((result) => {
            console.log("<><><><><",result);
            resolve(result);
        }).catch((error) => {
            reject(error.message);
        });
    });
}


exports.predictions = async (req, res) => {

    const axios = require('axios');

    const apiUrl = 'http://20.55.240.27:9000/predictions'; // Replace with the actual API URL

    axios.get(apiUrl)
    .then((response) => {
        // Handle the API response here
        console.log('API Response:', response.data);

        let data = response.data;

        const mappedData = Object.entries(data.additional_data).map(([key, locations]) => {
        const predictionIndex = parseInt(key) - 1;
        const prediction = data.predictions[predictionIndex];
        return {
             locations: locations,
             score: prediction
            };
    });

    // Sort the mappedData array based on predictions in descending order
mappedData.sort((a, b) => b.prediction - a.prediction);

console.log("MAPPED",mappedData);

        return res.status(200).json({
            'isSuccess': true,
            'message': mappedData
        });
        
        })
        .catch((error) => {
            // Handle any errors that occurred during the API call
            console.error('Error:', error.message);
    });


}
