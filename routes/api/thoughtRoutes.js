const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

router.use('/').get(getThoughts).post(createThought)
router.use('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
router.use('/:thoughtId/reactions').post(createReaction)
router.use('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router