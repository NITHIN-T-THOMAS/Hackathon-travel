// Models
const models = require('../models/index');
const User = models.User;
// UUID
const uuid = require('uuid');

exports.userSignUp = async (parameters) => {

    return createUser(parameters.email, parameters.firstName, parameters.lastName, parameters.password, parameters.phone, null, 2).then(async (user) => {
        // console.log(user);
        return {
            "user": user,
        }
    }).catch((error) => {
        return error;
    });
}

const createUser = async (email, firstName, lastName, password, phone = null, profilePic = null, status = 2) => {
    try {
        
        const newUser = await models.User.create({
            uuid: uuid.v1(),
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone: phone,
            status: status,
            createdAt: Date().now,
            updatedAt: Date().now,
        });

        return {
            'user': newUser
        }

    }catch(err){
        console.log(err)
    }
}