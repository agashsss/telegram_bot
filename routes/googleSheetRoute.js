const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/QuestionsController')
const MeetingController = require('../controllers/MeetingController')
const ClientController = require('../controllers/ClientController')


//questions

router.get('/questions', QuestionsController.getAllQuestions)
router.get('/questions/:row', QuestionsController.getQuestion)

//questions
//HistoryOfMeetings

router.get('/meetings', MeetingController.getAllMeetings)
router.get('/meetings/:row', MeetingController.getMeeting)
router.post('/meetings', MeetingController.addMeeting)
router.delete('/meetings/:row', MeetingController.deleteMeetingByRow)

//HistoryOfMeetings
//clients

router.get('/clients', ClientController.getAllClients)
router.get('/clients/:row', ClientController.getClientByRow)
router.post('/clients', ClientController.addClient)
router.patch('/clients/:row', ClientController.updateClientByRow)
router.delete('/clients/:row', ClientController.deleteClientByRow)

//clients

module.exports = router
