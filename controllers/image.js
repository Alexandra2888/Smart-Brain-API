const Clarifai = require('clarifai')

// object for calling face detection API
const app = new Clarifai.App({
    apiKey: 'f043c901d66a4c1394ae6d3c79e16d27\\n'
})

// send req to clarifai face detect api
const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => false) // how to return false + addt'l data?
}

// increment the user's entries prop, returns user's entry count
const handleEntry = (req, res, db) => {
    const { id } = req.body
    db('users')
        .where({id})
        .increment({entries:1})
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleEntry,
    handleApiCall
}
