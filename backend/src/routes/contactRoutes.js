const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContactById,
  updateContactStatus,
} = require('../controllers/contactController');

router.route('/')
  .post(submitContact)
  .get(getContacts);

router.route('/:id')
  .get(getContactById);

router.route('/:id/status')
  .patch(updateContactStatus);

module.exports = router;
