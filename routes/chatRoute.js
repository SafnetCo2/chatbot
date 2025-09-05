const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController")



router.post("/message", chatController.sendMessage);



//read all messages
router.get("/messages", chatController.getMessages);
//update a message
router.put("/messages/:id", chatController.updateMessage);
//delete a message
router.delete("/message/:id", chatController.deleteMessage);

module.exports = router;