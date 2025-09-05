const ChatMessage = require("../models/ChatMessage.js");

// predefined responses
const responses = {
    hello: "Hey there, how can I assist you?",
    pricing: "How much is bread?",
    default: "I am sorry, I don't understand your question."
};

// create: user sends a message + bot reply
exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ msg: "message required" });
        }

        // save user message
        const userMsg = await ChatMessage.create({ user: "user", message: text });

        // generate bot reply
        const lower = text.toLowerCase();
        let reply = responses.default;
        for (let key in responses) {
            if (lower.includes(key)) {
                reply = responses[key];
                break;
            }
        }

        // save bot reply
        const botMsg = await ChatMessage.create({ user: "bot", message: reply });

        // ✅ respond back to client
        res.json({ userMsg, botMsg, reply });

    } catch (err) {
        console.error("error in sendMessage:", err);
        res.status(500).json({ msg: "server error" });
    }
};

// read all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find();
        res.json(messages);
    } catch (err) {
        console.error("error in getMessages:", err);
        res.status(500).json({ msg: "server error" });
    }
};
//update edit a message by ID
exports.updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const updated = await ChatMessage.findByIdAndUpdate(
            id,
            { message },
            { new: true }
        );
        if (!updated) return res.status(404).json({ msg: "server error" });
        res.json(updated);
    } catch (err) {
        console.error("error in updateMessage:", err);
        res.status(500).json({ msg: "server error" });
    }
};
//DELETE:remove a message by id
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ChatMessage.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ msg: "message not found" });
        res.json({ msg: "message deleted", deleted });
        
    } catch (err) {
        console.error("error in deleteMessage:", err);
        res.status(500).json({ msg: "server error" })
    }
};