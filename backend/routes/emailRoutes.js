const express = require("express");
const router = express.Router();
const { sendEmailWithAttachment } = require("../controllers/emailController");

router.post("/send-email", sendEmailWithAttachment);

module.exports = router;