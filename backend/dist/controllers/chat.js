"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = exports.getChatSession = exports.getSessionHistory = exports.sendMessage = exports.createChatSession = void 0;
const ChatSession_1 = require("../models/ChatSession");
const groq_1 = require("@langchain/groq");
const uuid_1 = require("uuid");
const logger_1 = require("../utils/logger");
const client_1 = require("../inngest/client");
const User_1 = require("../models/User");
const mongoose_1 = require("mongoose");
// Initialize Groq API
const groq = new groq_1.ChatGroq({
    apiKey: process.env.GROQ_API_KEY || "gsk_...",
    model: "llama3-8b-8192", // or "mixtral-8x7b-32768" or "llama3-70b-8192"
});
// Create a new chat session
const createChatSession = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res
                .status(401)
                .json({ message: "Unauthorized - User not authenticated" });
        }
        const userId = new mongoose_1.Types.ObjectId(req.user.id);
        const user = await User_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Generate a unique sessionId
        const sessionId = (0, uuid_1.v4)();
        const session = new ChatSession_1.ChatSession({
            sessionId,
            userId,
            startTime: new Date(),
            status: "active",
            messages: [],
        });
        await session.save();
        res.status(201).json({
            message: "Chat session created successfully",
            sessionId: session.sessionId,
        });
    }
    catch (error) {
        logger_1.logger.error("Error creating chat session:", error);
        res.status(500).json({
            message: "Error creating chat session",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.createChatSession = createChatSession;
// Send a message in the chat session
const sendMessage = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { message } = req.body;
        const userId = new mongoose_1.Types.ObjectId(req.user.id);
        logger_1.logger.info("Processing message:", { sessionId, message });
        // Find session by sessionId
        const session = await ChatSession_1.ChatSession.findOne({ sessionId });
        if (!session) {
            logger_1.logger.warn("Session not found:", { sessionId });
            return res.status(404).json({ message: "Session not found" });
        }
        if (session.userId.toString() !== userId.toString()) {
            logger_1.logger.warn("Unauthorized access attempt:", { sessionId, userId });
            return res.status(403).json({ message: "Unauthorized" });
        }
        // Create Inngest event for message processing
        const event = {
            name: "therapy/session.message",
            data: {
                message,
                history: session.messages,
                memory: {
                    userProfile: {
                        emotionalState: [],
                        riskLevel: 0,
                        preferences: {},
                    },
                    sessionContext: {
                        conversationThemes: [],
                        currentTechnique: null,
                    },
                },
                goals: [],
                systemPrompt: `You are an AI therapist assistant. Your role is to:
        1. Provide empathetic and supportive responses
        2. Use evidence-based therapeutic techniques
        3. Maintain professional boundaries
        4. Monitor for risk factors
        5. Guide users toward their therapeutic goals`,
            },
        };
        logger_1.logger.info("Sending message to Inngest:", { event });
        // Send event to Inngest for logging and analytics
        await client_1.inngest.send(event);
        // Process the message directly using Groq
        const model = groq;
        const prompt = `You are an AI therapist assistant. Your role is to:
    1. Provide empathetic and supportive responses
    2. Use evidence-based therapeutic techniques
    3. Maintain professional boundaries
    4. Monitor for risk factors
    5. Guide users toward their therapeutic goals

    User message: ${message}
    
    Previous conversation context: ${JSON.stringify(session.messages.slice(-5))}
    
    Please provide a therapeutic response that is helpful, empathetic, and professional.`;
        try {
            const result = await model.invoke(prompt);
            const responseText = result.content.toString().trim();
            // Add the message and response to the session
            session.messages.push({
                role: "user",
                content: message,
                timestamp: new Date(),
            });
            session.messages.push({
                role: "assistant",
                content: responseText,
                timestamp: new Date(),
            });
            await session.save();
            res.json({
                message: "Message sent successfully",
                response: responseText,
                sessionId: session.sessionId,
            });
        }
        catch (error) {
            logger_1.logger.error("Error processing message with Groq:", error);
            res.status(500).json({
                message: "Error processing message",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
    catch (error) {
        logger_1.logger.error("Error in sendMessage:", error);
        res.status(500).json({
            message: "Error processing message",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.sendMessage = sendMessage;
// Get chat session history
const getSessionHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = new mongoose_1.Types.ObjectId(req.user.id);
        const session = (await ChatSession_1.ChatSession.findById(sessionId).exec());
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        if (session.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        res.json({
            messages: session.messages,
            startTime: session.startTime,
            status: session.status,
        });
    }
    catch (error) {
        logger_1.logger.error("Error fetching session history:", error);
        res.status(500).json({ message: "Error fetching session history" });
    }
};
exports.getSessionHistory = getSessionHistory;
const getChatSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        logger_1.logger.info(`Getting chat session: ${sessionId}`);
        const chatSession = await ChatSession_1.ChatSession.findOne({ sessionId });
        if (!chatSession) {
            logger_1.logger.warn(`Chat session not found: ${sessionId}`);
            return res.status(404).json({ error: "Chat session not found" });
        }
        logger_1.logger.info(`Found chat session: ${sessionId}`);
        res.json(chatSession);
    }
    catch (error) {
        logger_1.logger.error("Failed to get chat session:", error);
        res.status(500).json({ error: "Failed to get chat session" });
    }
};
exports.getChatSession = getChatSession;
const getChatHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = new mongoose_1.Types.ObjectId(req.user.id);
        // Find session by sessionId instead of _id
        const session = await ChatSession_1.ChatSession.findOne({ sessionId });
        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        if (session.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        res.json(session.messages);
    }
    catch (error) {
        logger_1.logger.error("Error fetching chat history:", error);
        res.status(500).json({ message: "Error fetching chat history" });
    }
};
exports.getChatHistory = getChatHistory;
