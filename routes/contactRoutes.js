const express = require('express')
const router = express.Router()
const {
    getContacts,
    addContact,
    getContactById,
    updateContactById,
    deleteContact
} = require('../controllers/contactController.js')
const validateToken = require('../middlewares/validateToken.js')

router.use(validateToken)
//get contacts || post contact
router.route("/").get(getContacts).post(addContact)

//get certain contact by id || update contact by id || delete
router.route("/:id").get(getContactById).put(updateContactById).delete(deleteContact)
module.exports = router;