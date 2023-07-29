// API response methods for Web Apps
const successResponse = (res, data, message = "success", code = 200) => {
    if (data == null) {
        return res.status(200).json({
            'isSuccess': true,
            'message': message
        });
    }
    return res.status(200).json({
        'isSuccess': true,
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
    console.log('Test')
    // return res.json(successResponse('', 'API Works !!'));
    return res.status(200).json({
            'isSuccess': true,
            'message': 'API working'
        })
}

module.exports = {
    healthCheck
}