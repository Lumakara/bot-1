const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
require('../settings');

const http = require('http');
const https = require('https');

const httpAgent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 30000,
    maxSockets: 10,
    maxFreeSockets: 5,
    timeout: 20000
});

const httpsAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 30000,
    maxSockets: 10,
    maxFreeSockets: 5,
    timeout: 20000
});

const apiClient = axios.create({
    timeout: 30000,
    httpAgent: httpAgent,
    httpsAgent: httpsAgent,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Connection': 'keep-alive'
    }
});

const TEMP_DIR = path.join(__dirname, '..', 'tmp');

function initTempDir() {
    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
    
    try {
        const files = fs.readdirSync(TEMP_DIR);
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        
        for (const file of files) {
            const filePath = path.join(TEMP_DIR, file);
            try {
                const stats = fs.statSync(filePath);
                if (now - stats.mtimeMs > oneHour) {
                    fs.unlinkSync(filePath);
                }
            } catch (e) {}
        }
        
        if (files.length > 20) {
            const sortedFiles = files.map(file => ({
                name: file,
                time: fs.statSync(path.join(TEMP_DIR, file)).mtimeMs
            })).sort((a, b) => a.time - b.time);
            
            for (let i = 0; i < sortedFiles.length - 20; i++) {
                try {
                    fs.unlinkSync(path.join(TEMP_DIR, sortedFiles[i].name));
                } catch (e) {}
            }
        }
    } catch (e) {}
}

initTempDir();

async function startSession() {
    try {
        const { data } = await apiClient.post(
            "https://chatgpt4online.org/wp-json/mwai/v1/start_session",
            {},
            {
                headers: {
                    "Origin": "https://chatgpt4online.org",
                    "Referer": "https://chatgpt4online.org/",
                    "Content-Type": "application/json"
                }
            }
        );

        if (!data.success) throw new Error("start_session failed");

        return {
            sessionId: data.sessionId,
            nonce: data.restNonce
        };
    } catch (error) {
        return null;
    }
}

async function getAiResponse(prompt, imageBuffer = null) {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const session = await startSession();
            if (!session) continue;

            const fileIds = [];

            if (imageBuffer) {
                try {
                    const FormData = require('form-data');
                    const form = new FormData();

                    form.append("purpose", "vision");
                    form.append("file", imageBuffer, { filename: `image_${Date.now()}.png` });

                    const { data } = await apiClient.post(
                        "https://chatgpt4online.org/wp-json/mwai-ui/v1/files/upload",
                        form,
                        {
                            headers: {
                                "Origin": "https://chatgpt4online.org",
                                "Referer": "https://chatgpt4online.org/",
                                "X-WP-Nonce": session.nonce,
                                ...form.getHeaders()
                            }
                        }
                    );

                    if (data?.data?.id) {
                        fileIds.push(data.data.id);
                    }
                } catch (uploadErr) {}
            }

            const payload = {
                botId: "chatbot-qm966k",
                customId: null,
                session: session.sessionId,
                chatId: Math.random().toString(36).slice(2),
                contextId: 5410,
                messages: [
                    {
                        id: "start",
                        role: "assistant",
                        content: "Hi! How can I help you?",
                        who: "AI: ",
                        timestamp: Date.now(),
                        key: "start"
                    }
                ],
                newMessage: prompt,
                newFileId: null,
                newFileIds: fileIds,
                stream: false
            };

            const { data } = await apiClient.post(
                "https://chatgpt4online.org/wp-json/mwai-ui/v1/chats/submit",
                payload,
                {
                    headers: {
                        "Origin": "https://chatgpt4online.org",
                        "Referer": "https://chatgpt4online.org/",
                        "X-WP-Nonce": session.nonce,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            if (data.success && data.reply) {
                return data.reply;
            }
            
        } catch (err) {
            if (attempt === 3) break;
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
    
    const fallbacks = [
        "Maaf, server AI sedang sibuk. Coba lagi nanti ya.",
        "Aku lagi mengalami gangguan koneksi. Tanyakan hal lain dulu.",
        "Waduh, otakku lagi loading. Ulangi pertanyaannya ya?",
        "Gagal menghubungi server AI. Coba beberapa saat lagi."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

async function generateVN(text, voice = "bella") {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await apiClient.get(`${global.termai}/api/text2speech/elevenlabs`, {
                params: {
                    text,
                    voice,
                    key: `${global.apitermai}`
                },
                responseType: "arraybuffer"
            });
            
            return Buffer.from(response.data);
            
        } catch (e) {
            if (attempt === 3) {
                return null;
            }
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
    return null;
}

async function getImageFromMessage(msg) {
    try {
        if (msg.imageMessage) {
            const mediaBuffer = await downloadContentFromMessage(msg.imageMessage, 'image');
            let bufferArray = [];
            for await (const chunk of mediaBuffer) {
                bufferArray.push(chunk);
            }
            return Buffer.concat(bufferArray);
        }
    } catch (e) {}
    return null;
}

async function downloadImageFromMessage(m) {
    try {
        let imageBuffer = null;
        
        if (m.message?.imageMessage) {
            imageBuffer = await getImageFromMessage(m.message);
        } else if (m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
            imageBuffer = await getImageFromMessage(m.message.extendedTextMessage.contextInfo.quotedMessage);
        } else if (m.quoted?.msg?.imageMessage) {
            imageBuffer = await getImageFromMessage(m.quoted.msg);
        } else if (m.quoted?.imageMessage) {
            imageBuffer = await getImageFromMessage(m.quoted);
        }
        
        return imageBuffer;
    } catch (e) {
        return null;
    }
}

function getTextFromMessage(m) {
    let text = '';
    
    if (m.text) {
        text = m.text.trim();
    } else if (m.message?.extendedTextMessage?.text) {
        text = m.message.extendedTextMessage.text.trim();
    } else if (m.message?.conversation) {
        text = m.message.conversation.trim();
    } else if (m.quoted?.text) {
        text = m.quoted.text.trim();
    }
    
    return text;
}

function containsImageQuestion(text) {
    if (!text) return false;
    
    const imageKeywords = [
        'gambar', 'foto', 'photo', 'pict', 'pic', 
        'apakah ini', 'ini apa', 'what is this', 'apa ini',
        'lihat gambar', 'liat gambar', 'lihat foto', 'liat foto',
        'coba lihat', 'coba liat', 'analisis', 'analisa',
        'jelaskan gambar', 'jelaskan foto', 'deskripsikan gambar',
        'apa yang ada di', 'apa yang terlihat', 'identifikasi'
    ];
    
    const lowercaseText = text.toLowerCase();
    
    for (const keyword of imageKeywords) {
        if (lowercaseText.includes(keyword)) {
            return true;
        }
    }
    
    return false;
}

function checkHasImage(m) {
    return !!(m.message?.imageMessage || 
             m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage ||
             m.quoted?.msg?.imageMessage ||
             m.quoted?.imageMessage);
}

function extractShortName(fullName) {
    if (!fullName || typeof fullName !== 'string') return 'Kamu';
    const name = fullName.trim();
    if (name.length <= 10) return name;
    const spaceIndex = name.indexOf(' ');
    if (spaceIndex > 0 && spaceIndex <= 6) {
        return name.substring(0, spaceIndex);
    }
    return name.substring(0, 6);
}

function cleanAiResponse(text) {
    if (!text) return text;
    let cleaned = text
        .replace(/\*\*/g, '')
        .replace(/__/g, '')
        .replace(/.*?/g, '')
        .replace(/\n\s*\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
        cleaned = cleaned.slice(1, -1);
    }
    const lines = cleaned.split('\n');
    if (lines.length > 1 && lines[0].trim().endsWith(':')) {
        cleaned = lines.slice(1).join('\n').trim();
    }
    return cleaned;
}

class AutoAiHandler {
    constructor(alipInstance) {
        this.alip = alipInstance;
        this.settingsPath = './library/database/autoai_settings.json';
        this.groupHistoriesPath = './library/database/autoai_group_histories.json';
        this.userContextPath = './library/database/autoai_user_context.json';
        this.settings = this.loadSettings();
        this.groupHistories = this.loadGroupHistories();
        this.userContexts = this.loadUserContexts();
        
        this.activeConversations = {};
        this.conversationTimeouts = {};
        this.processing = false;
        
        setInterval(() => {
            this.cleanupOldData();
        }, 3600000);
        
        setInterval(() => {
            this.testAPIs();
        }, 300000);
    }

    loadSettings() {
        try {
            if (!fs.existsSync(this.settingsPath)) {
                const defaultSettings = { 
                    enabledGroups: {},
                    voiceSettings: {},
                    config: {
                        maxGroupHistory: 15,
                        maxUserContext: 5,
                        responseDelay: 800,
                        minResponseLength: 2,
                        conversationTimeout: 300000
                    }
                };
                fs.writeFileSync(this.settingsPath, JSON.stringify(defaultSettings, null, 2));
                return defaultSettings;
            }
            const data = fs.readFileSync(this.settingsPath, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            return { 
                enabledGroups: {}, 
                voiceSettings: {}, 
                config: {
                    maxGroupHistory: 15,
                    maxUserContext: 5,
                    responseDelay: 800,
                    minResponseLength: 2,
                    conversationTimeout: 300000
                }
            };
        }
    }

    loadGroupHistories() {
        try {
            if (!fs.existsSync(this.groupHistoriesPath)) {
                return {};
            }
            const data = fs.readFileSync(this.groupHistoriesPath, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            return {};
        }
    }

    loadUserContexts() {
        try {
            if (!fs.existsSync(this.userContextPath)) {
                return {};
            }
            const data = fs.readFileSync(this.userContextPath, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            return {};
        }
    }

    saveSettings() {
        try {
            fs.writeFileSync(this.settingsPath, JSON.stringify(this.settings, null, 2));
        } catch (e) {}
    }

    saveGroupHistories() {
        try {
            fs.writeFileSync(this.groupHistoriesPath, JSON.stringify(this.groupHistories, null, 2));
        } catch (e) {}
    }

    saveUserContexts() {
        try {
            fs.writeFileSync(this.userContextPath, JSON.stringify(this.userContexts, null, 2));
        } catch (e) {}
    }

    testAPIs() {
        Promise.all([
            apiClient.get(`${global.termai}/api/text2speech/elevenlabs`, {
                params: { text: 'test', voice: 'bella', key: `${global.apitermai}` }
            }).catch(() => null),
            apiClient.post(
                "https://chatgpt4online.org/wp-json/mwai/v1/start_session",
                {}
            ).catch(() => null)
        ]);
    }

    isEnabledInGroup(groupId) {
        return this.settings.enabledGroups[groupId]?.enabled === true;
    }

    getGroupMode(groupId) {
        return this.settings.enabledGroups[groupId]?.mode || 'text';
    }

    getGroupVoice(groupId) {
        return this.settings.voiceSettings[groupId] || 'echilling';
    }

    setGroupVoice(groupId, voice) {
        const validVoices = [
            "bella", "echilling", "adam", "prabowo", "thomas_shelby",
            "michi_jkt48", "jokowi", "megawati", "nokotan", "boboiboy",
            "yanzgpt", "keqing", "yanami_anna"
        ];
        if (!validVoices.includes(voice)) return false;
        if (!this.settings.voiceSettings) {
            this.settings.voiceSettings = {};
        }
        this.settings.voiceSettings[groupId] = voice;
        this.saveSettings();
        return true;
    }

    enableInGroup(groupId, mode = 'text') {
        if (!['text', 'vn'].includes(mode)) {
            return false;
        }
        if (!this.settings.enabledGroups[groupId]) {
            this.settings.enabledGroups[groupId] = {
                enabled: true,
                mode: mode,
                enabledAt: Date.now(),
                lastUsed: Date.now()
            };
        } else {
            this.settings.enabledGroups[groupId].enabled = true;
            this.settings.enabledGroups[groupId].mode = mode;
            this.settings.enabledGroups[groupId].enabledAt = Date.now();
        }
        this.saveSettings();
        return true;
    }

    disableInGroup(groupId) {
        if (this.settings.enabledGroups[groupId]) {
            this.settings.enabledGroups[groupId].enabled = false;
            this.settings.enabledGroups[groupId].disabledAt = Date.now();
            this.saveSettings();
        }
        return true;
    }

    updateLastUsed(groupId) {
        if (this.settings.enabledGroups[groupId]) {
            this.settings.enabledGroups[groupId].lastUsed = Date.now();
            this.saveSettings();
        }
    }

    getGroupHistory(groupId) {
        if (!this.groupHistories[groupId]) {
            this.groupHistories[groupId] = [];
        }
        const maxHistory = this.settings.config?.maxGroupHistory || 15;
        if (this.groupHistories[groupId].length > maxHistory) {
            this.groupHistories[groupId] = this.groupHistories[groupId].slice(-maxHistory);
        }
        return this.groupHistories[groupId];
    }

    addToGroupHistory(groupId, userName, userId, message) {
        const history = this.getGroupHistory(groupId);
        history.push({
            user: userName,
            userId: userId,
            message: message,
            timestamp: Date.now()
        });
        this.saveGroupHistories();
        if (this.activeConversations[groupId]) {
            clearTimeout(this.conversationTimeouts[groupId]);
            this.conversationTimeouts[groupId] = setTimeout(() => {
                delete this.activeConversations[groupId];
            }, this.settings.config?.conversationTimeout || 300000);
        }
    }

    addAiToGroupHistory(groupId, response) {
        const history = this.getGroupHistory(groupId);
        history.push({
            user: 'AI',
            userId: 'ai',
            message: response,
            timestamp: Date.now()
        });
        this.saveGroupHistories();
    }

    getUserContext(userId, groupId) {
        const key = `${groupId}:${userId}`;
        if (!this.userContexts[key]) {
            this.userContexts[key] = [];
        }
        const maxContext = this.settings.config?.maxUserContext || 5;
        if (this.userContexts[key].length > maxContext) {
            this.userContexts[key] = this.userContexts[key].slice(-maxContext);
        }
        return this.userContexts[key];
    }

    addUserContext(userId, groupId, userName, message, aiResponse) {
        const key = `${groupId}:${userId}`;
        const context = this.getUserContext(userId, groupId);
        context.push({
            userName: userName,
            userMessage: message,
            aiResponse: aiResponse,
            timestamp: Date.now()
        });
        this.saveUserContexts();
    }

    clearGroupHistory(groupId) {
        delete this.groupHistories[groupId];
        this.saveGroupHistories();
        return true;
    }

    clearUserContext(userId, groupId) {
        const key = `${groupId}:${userId}`;
        delete this.userContexts[key];
        this.saveUserContexts();
        return true;
    }

    cleanupOldData() {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        for (const groupId in this.groupHistories) {
            const history = this.groupHistories[groupId];
            if (history.length > 0) {
                const lastTime = history[history.length - 1].timestamp;
                if (now - lastTime > oneDay) {
                    delete this.groupHistories[groupId];
                }
            }
        }
        for (const key in this.userContexts) {
            const context = this.userContexts[key];
            if (context.length > 0) {
                const lastTime = context[context.length - 1].timestamp;
                if (now - lastTime > oneDay) {
                    delete this.userContexts[key];
                }
            }
        }
        for (const groupId in this.activeConversations) {
            if (now - this.activeConversations[groupId] > (this.settings.config?.conversationTimeout || 300000)) {
                delete this.activeConversations[groupId];
            }
        }
        this.saveGroupHistories();
        this.saveUserContexts();
    }

    isReplyToBot(m) {
        if (!m.quoted) return false;
        const quoted = m.quoted;
        if (quoted.fromMe === true) return true;
        if (quoted.participant && quoted.participant === this.alip.user.id) return true;
        if (quoted.sender && quoted.sender === this.alip.user.id) return true;
        const quotedText = quoted.text || '';
        if (quotedText.includes(global.botname) && quoted.fromMe === undefined) {
            return true;
        }
        return false;
    }

    shouldRespond(m) {
        if (!m.text || m.text.trim().length < 2) return false;
        if (m.isGroup && global.gameSessions && global.gameSessions[m.chat]) {
            return false;
        }
        if (m.isGroup && global.mathQuizSessions && global.mathQuizSessions[m.sender]) {
            return false;
        }
        return this.isReplyToBot(m);
    }

    buildGroupPrompt(groupId, currentMessage, userName, userId) {
        const history = this.getGroupHistory(groupId);
        const userContext = this.getUserContext(userId, groupId);
        const groupHistoryText = history.length > 0 
            ? `\n\nPercakapan grup sebelumnya:\n${history.slice(-8).map(entry => 
                `${entry.user}: ${entry.message}`
            ).join('\n')}`
            : '';
        const userContextText = userContext.length > 0
            ? `\n\nKonteks dengan ${userName}:\n${userContext.slice(-3).map(ctx =>
                `${userName}: ${ctx.userMessage}\nAI: ${ctx.aiResponse}`
            ).join('\n')}`
            : '';
        const isActiveConversation = this.activeConversations[groupId] ? ' (sedang aktif ngobrol)' : '';
        
        const prompt = `Kamu adalah ${global.botname} - AI asisten yang asik, friendly, dan nyambung dengan percakapan grup.

Kamu sedang ada di grup WhatsApp${isActiveConversation}.

Nama user yang ngobrol sekarang: ${userName}
User ID: ${userId}${groupHistoryText}${userContextText}

GAYA BICARA DI GRUP:
- Santai dan friendly kayak temen grup
- Nyambung dengan percakapan sebelumnya
- Bisa ngerespon ke multiple user
- Lucu tapi sopan
- Bahasa sehari-hari yang natural
- Kadang kasih reaksi atau pertanyaan balik
- Jangan terlalu formal

ATURAN UTAMA:
1. Jangan jadi pusat perhatian, ikuti alur obrolan
2. Bisa merespon ke siapa saja di grup
3. Jangan terlalu panjang, cukup 1-3 kalimat
4. Sesuaikan dengan mood percakapan
5. Kalau lagi serius, ikut serius. Kalau lagi santai, ikut santai.

PESAN TERBARU DARI ${userName}: "${currentMessage}"

Sekarang jawab dengan natural dan nyambung dengan percakapan grup.`;
        
        return prompt;
    }

    formatResponse(response, userName) {
        let formatted = cleanAiResponse(response);
        if (!formatted) return null;
        const shortName = extractShortName(userName);
        if (formatted.toLowerCase().startsWith(shortName.toLowerCase())) {
            formatted = formatted.substring(shortName.length).trim();
            if (formatted.startsWith(',')) formatted = formatted.substring(1).trim();
        }
        if (formatted.toLowerCase().startsWith('ai:') || formatted.toLowerCase().startsWith('assistant:')) {
            formatted = formatted.substring(formatted.indexOf(':') + 1).trim();
        }
        return formatted.trim();
    }

    async processMessage(m, isCmd, isCreator, isPremium) {
        if (this.processing) return;
        this.processing = true;
        
        try {
            if (!m.isGroup) return;
            if (!m.text || m.isBot || isCmd || m.fromMe) return;
            if (m.isGroup && global.gameSessions && global.gameSessions[m.chat]) {
                return;
            }
            if (m.isGroup && global.mathQuizSessions && global.mathQuizSessions[m.sender]) {
                return;
            }
            const groupId = m.chat;
            if (!this.isEnabledInGroup(groupId)) return;
            if (!this.shouldRespond(m)) return;
            
            this.updateLastUsed(groupId);
            this.activeConversations[groupId] = Date.now();
            
            await this.alip.sendMessage(groupId, { react: { text: "💭", key: m.key } });
            
            const userId = m.sender;
            const userName = m.pushName || userId.split('@')[0];
            const userMessage = getTextFromMessage(m);
            const groupMode = this.getGroupMode(groupId);
            const groupVoice = this.getGroupVoice(groupId);
            
            let imageBuffer = null;
            if (checkHasImage(m) || containsImageQuestion(userMessage)) {
                imageBuffer = await downloadImageFromMessage(m);
            }
            
            const prompt = this.buildGroupPrompt(groupId, userMessage, userName, userId);
            
            let aiResponseRaw = await getAiResponse(prompt, imageBuffer);
            
            if (!aiResponseRaw) {
                aiResponseRaw = "Hmm, aku lagi mikir nih. Coba ulangi ya?";
            }
            
            const formattedResponse = this.formatResponse(aiResponseRaw, userName) || aiResponseRaw;
            
            this.addToGroupHistory(groupId, userName, userId, userMessage);
            this.addAiToGroupHistory(groupId, formattedResponse);
            this.addUserContext(userId, groupId, userName, userMessage, formattedResponse);
            
            await this.sendGroupResponse(groupId, m, formattedResponse, userName, groupMode, groupVoice);
            
        } catch (err) {
        } finally {
            this.processing = false;
        }
    }

    async sendGroupResponse(groupId, originalMsg, response, userName, mode, voice) {
        const delay = this.settings.config?.responseDelay || 800;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (mode === 'vn') {
            try {
                await this.alip.sendPresenceUpdate('recording', groupId);
                const vnBuffer = await generateVN(response, voice);
                if (vnBuffer) {
                    await this.alip.sendMessage(groupId, { 
                        audio: vnBuffer, 
                        mimetype: 'audio/mpeg', 
                        ptt: true 
                    }, { quoted: originalMsg });
                    await this.alip.sendPresenceUpdate('paused', groupId);
                    return;
                }
            } catch (vnErr) { 
                await this.alip.sendPresenceUpdate('paused', groupId);
            }
        }

        await this.alip.sendPresenceUpdate('composing', groupId);
        await this.alip.sendMessage(groupId, {
            text: response
        }, { quoted: originalMsg });
        await this.alip.sendPresenceUpdate('paused', groupId);
    }

    handleCommand(m, text) {
        if (!m.isGroup) return '❌ Command ini hanya untuk grup!';
        const isAdmin = m.isAdmin || m.isDeveloper || m.sender.includes(global.owner);
        if (!isAdmin) return '❌ Hanya admin grup yang bisa atur AutoAI!';
        const args = text.split(' ');
        const action = args[0]?.toLowerCase();
        if (!action) {
            const isEnabled = this.isEnabledInGroup(m.chat);
            const mode = this.getGroupMode(m.chat);
            const voice = this.getGroupVoice(m.chat);
            const history = this.getGroupHistory(m.chat);
            return `🤖 *STATUS AUTOAI GRUP*

Status: ${isEnabled ? '✅ AKTIF' : '❌ NONAKTIF'}
Mode: ${mode.toUpperCase()}
Suara VN: ${voice}
Memory Grup: ${history.length} pesan

PERINTAH:
• .autoai on text → Aktifkan mode text (reply only)
• .autoai on vn → Aktifkan mode voice note (reply only)
• .autoai off → Matikan AutoAI
• .autoai clear → Hapus memory grup
• .autoai voice <nama> → Ganti suara VN
• .autoai voices → Daftar suara tersedia
• .autoai status → Detail status`;
        }
        if (action === 'on') {
            const mode = args[1]?.toLowerCase() || 'text';
            if (!['text', 'vn'].includes(mode)) {
                return '❌ Mode harus: text atau vn';
            }
            const success = this.enableInGroup(m.chat, mode);
            if (success) {
                return `✅ *AutoAI diaktifkan!*

Mode: ${mode.toUpperCase()}
AI hanya merespons jika pesan di-reply.

${mode === 'vn' ? '🎤 Mode voice note aktif' : '💬 Mode text aktif'}`;
            }
            return '❌ Gagal mengaktifkan AutoAI';
        }
        if (action === 'off') {
            this.disableInGroup(m.chat);
            return '✅ *AutoAI dimatikan*';
        }
        if (action === 'clear' || action === 'reset') {
            const groupCleared = this.clearGroupHistory(m.chat);
            const userCleared = this.clearUserContext(m.sender, m.chat);
            if (this.activeConversations[m.chat]) {
                delete this.activeConversations[m.chat];
            }
            if (groupCleared || userCleared) {
                return '🧹 *Memory percakapan grup dihapus*';
            }
            return '❌ Gagal menghapus memory';
        }
        if (action === 'voice' || action === 'suara') {
            if (args.length < 2) {
                return `❌ Format: .autoai voice <nama_suara>

Contoh: .autoai voice bella

Ketik .autoai voices untuk lihat daftar.`;
            }
            const voice = args[1].toLowerCase();
            const success = this.setGroupVoice(m.chat, voice);
            if (success) {
                return `✅ Suara VN diubah ke: *${voice}*`;
            }
            return '❌ Suara tidak valid!';
        }
        if (action === 'voices' || action === 'listvoice') {
            const voices = [
                "bella", "echilling", "adam", "prabowo", "thomas_shelby",
                "michi_jkt48", "jokowi", "megawati", "nokotan", "boboiboy",
                "yanzgpt", "keqing", "yanami_anna"
            ];
            const voiceList = voices.map((v, i) => `${i + 1}. ${v}${v === 'bella' ? ' (default)' : ''}`).join('\n');
            return `🎤 *DAFTAR SUARA VN*

${voiceList}

Gunakan: .autoai voice <nama>
Contoh: .autoai voice jokowi`;
        }
        if (action === 'status') {
            const isEnabled = this.isEnabledInGroup(m.chat);
            const mode = this.getGroupMode(m.chat);
            const voice = this.getGroupVoice(m.chat);
            const history = this.getGroupHistory(m.chat);
            const hasActiveConvo = this.activeConversations[m.chat] ? '✅' : '❌';
            return `📊 *DETAIL STATUS GRUP*

• Aktif: ${isEnabled ? '✅' : '❌'}
• Mode: ${mode.toUpperCase()}
• Suara VN: ${voice}
• Sedang Ngobrol: ${hasActiveConvo}
• Memory Grup: ${history.length} pesan
• Reply Only: ✅

🎯 *Percakapan terakhir:*
${history.slice(-5).map((entry, i) => 
    `${i+1}. ${entry.user}: ${entry.message.substring(0, 30)}${entry.message.length > 30 ? '...' : ''}`
).join('\n')}`;
        }
        return `❓ *BANTUAN AUTOAI GRUP*

Gunakan:
• .autoai → Status grup
• .autoai on text → Aktifkan mode text (reply only)
• .autoai on vn → Aktifkan mode voice note (reply only)
• .autoai off → Matikan
• .autoai clear → Hapus memory grup
• .autoai voice <nama> → Ganti suara
• .autoai voices → Daftar suara
• .autoai status → Detail status`;
    }
}

module.exports = AutoAiHandler;

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})