function successResponse(data, message) {
    return ({
        'success': true,
        'data': data,
        'message': message
    });
}

function errorResponse(data, message) {
    return ({
        'success': false,
        'data': data,
        'message': message
    });
}

const healthCheck = async (req, res) => {
    return res.json(successResponse('', 'API Works !!'));
}

module.exports = {
    healthCheck
}