const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')


//GET all contacts
//@routes  /api/contact
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id})
    return res.status(200).json(contacts)
})

//POST  contact
//@routes  /api/contact
const addContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ msg: "all fields required" })
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id :req.user.id
    })
    return res.status(200).json(contact)
})

//GET by id contact
//@routes  /api/contact
const getContactById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    return res.status(200).json(contact)
})

//PUT update contact
//@routes  /api/contact
const updateContactById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user not authorised to perform this action")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    return res.status(201).json(updateContact)
})


//DELETE  contact by id
//@routes  /api/contact
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user not authorised to perform this action")
    }

    await Contact.findByIdAndDelete(id)
    return res.status(200).json({ msg: `deleted contact ${req.params.id}` })
})

module.exports = {
    getContacts,
    addContact,
    getContactById,
    updateContactById,
    deleteContact
}