// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const fs = require('fs');
const path = require('path');

class TicTacToe {
    constructor() {
        this.games = {};
        this.gameMessages = {};
    }

    getGameByChat(chatId) {
        for (const gameId in this.games) {
            if (this.games[gameId].chatId === chatId && this.games[gameId].status === 'playing') {
                return { gameId, game: this.games[gameId] };
            }
        }
        return null;
    }

    getPlayerGame(chatId, playerJid) {
        const normalizeJid = (jid) => {
            if (jid.endsWith('@lid')) {
                return jid.replace('@lid', '@s.whatsapp.net');
            }
            return jid;
        };

        const normalizedPlayerJid = normalizeJid(playerJid);

        for (const gameId in this.games) {
            const game = this.games[gameId];
            if (game.chatId === chatId && game.status === 'playing') {
                const normalizedX = normalizeJid(game.players.X);
                const normalizedO = normalizeJid(game.players.O);
                
                if (normalizedX === normalizedPlayerJid || normalizedO === normalizedPlayerJid) {
                    return { gameId, game };
                }
            }
        }
        return null;
    }

    getGameByMessageId(messageId) {
        const gameId = this.gameMessages[messageId];
        if (gameId && this.games[gameId]) {
            return { gameId, game: this.games[gameId] };
        }
        return null;
    }

    async handleNewGame(m, args, Reply, alip, isCreator, checkLimit, addLimit, isRegistered, isPrem, mess) {
        if (!m.isGroup) return 'Game ini hanya untuk grup!';
        
        if (!isRegistered(m.sender) && !isCreator) return mess.verifikasi;
        if (checkLimit(m.sender, isPrem(m.sender), isCreator)) return mess.limit;
        
        const activeGame = this.getGameByChat(m.chat);
        if (activeGame) {
            return 'Masih ada game aktif di grup ini!';
        }
        
        let targetUser = null;
        
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            targetUser = m.mentionedJid.map(id => {
                if (id.endsWith('@lid')) {
                    let p = m.metadata.participants.find(x => x.lid === id || x.id === id)
                    return p ? p.jid : null
                } else {
                    return id
                }
            }).filter(Boolean)[0];
        } else if (args[0]) {
            const num = args[0].replace(/[^0-9]/g, '');
            if (num.length >= 10) {
                targetUser = `${num}@s.whatsapp.net`;
            }
        } else {
            return 'Tag seseorang untuk bermain! Contoh: .ttt @user';
        }
        
        if (!targetUser) {
            return 'Tag seseorang untuk bermain! Contoh: .ttt @user';
        }

        const normalizeJid = (jid) => {
            if (jid.endsWith('@lid')) {
                return jid.replace('@lid', '@s.whatsapp.net');
            }
            return jid;
        };

        const player1 = normalizeJid(m.sender);
        const player2 = normalizeJid(targetUser);
        
        if (player1 === player2) {
            return 'Tidak bisa main sendiri!';
        }

        const p1Game = this.getPlayerGame(m.chat, player1);
        const p2Game = this.getPlayerGame(m.chat, player2);
        if (p1Game || p2Game) {
            return 'Salah satu pemain masih dalam game!';
        }
        
        addLimit(m.sender, isPrem(m.sender), isCreator);
        
        const gameId = `ttt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        this.games[gameId] = {
            board: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            players: { X: m.sender, O: targetUser },
            currentPlayer: 'X',
            chatId: m.chat,
            moves: 0,
            status: 'playing',
            startedAt: Date.now(),
            lastMove: Date.now()
        };
        
        let p1Name = m.pushName || player1.split('@')[0];
        let p2Name = 'Player';
        
        try {
            const groupMetadata = await alip.groupMetadata(m.chat);
            const participant2 = groupMetadata.participants.find(p => {
                const normalizedId = normalizeJid(p.id);
                return normalizedId === player2;
            });
            if (participant2) {
                p2Name = participant2.notify || participant2.id.split('@')[0];
            }
        } catch (e) {
            p2Name = targetUser.split('@')[0];
        }
        
        const gameMessage = `🎮 TIC TAC TOE

❌ Player X: @${p1Name}
⭕ Player O: @${p2Name}

${this.getBoardDisplay(this.games[gameId].board)}

Papan:
1️⃣2️⃣3️⃣
4️⃣5️⃣6️⃣
7️⃣8️⃣9️⃣

Giliran: @${p1Name} (❌)

Ketik angka 1-9 untuk jalan`;

        const sentMsg = await alip.sendMessage(m.chat, {
            text: gameMessage,
            mentions: [m.sender, targetUser]
        }, { quoted: m });
        
        this.gameMessages[sentMsg.key.id] = gameId;
        this.games[gameId].messageId = sentMsg.key.id;
        
        setTimeout(() => {
            if (this.games[gameId] && this.games[gameId].status === 'playing') {
                delete this.games[gameId];
                delete this.gameMessages[sentMsg.key.id];
                alip.sendMessage(m.chat, {
                    text: `⏰ Game ${p1Name} vs ${p2Name} dibatalkan!`,
                    mentions: [m.sender, targetUser]
                });
            }
        }, 15 * 60 * 1000);
        
        return null;
    }

    async handleMove(m, text, Reply, alip) {
        if (!m.isGroup) return;
        if (!text || !/^[1-9]$/.test(text.trim())) return;
        
        const normalizeJid = (jid) => {
            if (jid.endsWith('@lid')) {
                return jid.replace('@lid', '@s.whatsapp.net');
            }
            return jid;
        };

        const playerJid = normalizeJid(m.sender);
        
        const playerGame = this.getPlayerGame(m.chat, playerJid);
        if (!playerGame) return;
        
        const { gameId, game } = playerGame;
        
        if (game.status !== 'playing') return;
        
        const getPlayerJid = (symbol) => {
            const jid = game.players[symbol];
            return normalizeJid(jid);
        };
        
        if (getPlayerJid(game.currentPlayer) !== playerJid) return;
        
        const position = parseInt(text) - 1;
        
        if (position < 0 || position > 8) return;
        if (game.board[position] !== ' ') return;
        
        game.board[position] = game.currentPlayer;
        game.moves++;
        game.lastMove = Date.now();
        
        const winner = this.checkWinner(game.board);
        
        if (winner) {
            game.status = 'finished';
            game.winner = winner;
            
            const winnerJid = normalizeJid(game.players[winner]);
            const winnerName = winnerJid.split('@')[0];
            const loserJid = normalizeJid(game.players[winner === 'X' ? 'O' : 'X']);
            
            const resultMessage = `🎉 @${winnerName} MENANG!\n\n${this.getBoardDisplay(game.board)}`;
            
            await alip.sendMessage(m.chat, {
                text: resultMessage,
                mentions: [winnerJid, loserJid]
            });
            
            delete this.games[gameId];
            delete this.gameMessages[game.messageId];
            
        } else if (game.moves === 9) {
            game.status = 'finished';
            game.winner = 'draw';
            
            const p1Jid = normalizeJid(game.players.X);
            const p2Jid = normalizeJid(game.players.O);
            
            const resultMessage = `🤝 SERI!\n\n${this.getBoardDisplay(game.board)}`;
            
            await alip.sendMessage(m.chat, {
                text: resultMessage,
                mentions: [p1Jid, p2Jid]
            });
            
            delete this.games[gameId];
            delete this.gameMessages[game.messageId];
            
        } else {
            game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
            
            const nextPlayerJid = normalizeJid(game.players[game.currentPlayer]);
            const nextPlayerName = nextPlayerJid.split('@')[0];
            
            const updateMessage = `🎮 TIC TAC TOE

${this.getBoardDisplay(game.board)}

Giliran: @${nextPlayerName} (${game.currentPlayer === 'X' ? '❌' : '⭕'})

Ketik angka 1-9`;
            
            await alip.sendMessage(m.chat, {
                text: updateMessage,
                mentions: [nextPlayerJid]
            });
        }
        
        return null;
    }

    async handleReplyMove(m, body, Reply, alip) {
        if (!m.isGroup) return;
        if (!m.quoted) return;
        if (!body || !/^[1-9]$/.test(body.trim())) return;
        
        const quotedId = m.quoted.key.id;
        const gameData = this.getGameByMessageId(quotedId);
        
        if (!gameData) return;
        
        const { gameId, game } = gameData;
        
        const normalizeJid = (jid) => {
            if (jid.endsWith('@lid')) {
                return jid.replace('@lid', '@s.whatsapp.net');
            }
            return jid;
        };

        const playerJid = normalizeJid(m.sender);
        
        const getPlayerJid = (symbol) => {
            const jid = game.players[symbol];
            return normalizeJid(jid);
        };
        
        if (game.status !== 'playing') return;
        
        if (getPlayerJid(game.currentPlayer) !== playerJid) return;
        
        const position = parseInt(body) - 1;
        
        if (position < 0 || position > 8) return;
        if (game.board[position] !== ' ') return;
        
        game.board[position] = game.currentPlayer;
        game.moves++;
        game.lastMove = Date.now();
        
        const winner = this.checkWinner(game.board);
        
        if (winner) {
            game.status = 'finished';
            game.winner = winner;
            
            const winnerJid = normalizeJid(game.players[winner]);
            const winnerName = winnerJid.split('@')[0];
            const loserJid = normalizeJid(game.players[winner === 'X' ? 'O' : 'X']);
            
            const resultMessage = `🎉 @${winnerName} MENANG!\n\n${this.getBoardDisplay(game.board)}`;
            
            await alip.sendMessage(m.chat, {
                text: resultMessage,
                mentions: [winnerJid, loserJid]
            });
            
            delete this.games[gameId];
            delete this.gameMessages[game.messageId];
            
        } else if (game.moves === 9) {
            game.status = 'finished';
            game.winner = 'draw';
            
            const p1Jid = normalizeJid(game.players.X);
            const p2Jid = normalizeJid(game.players.O);
            
            const resultMessage = `🤝 SERI!\n\n${this.getBoardDisplay(game.board)}`;
            
            await alip.sendMessage(m.chat, {
                text: resultMessage,
                mentions: [p1Jid, p2Jid]
            });
            
            delete this.games[gameId];
            delete this.gameMessages[game.messageId];
            
        } else {
            game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
            
            const nextPlayerJid = normalizeJid(game.players[game.currentPlayer]);
            const nextPlayerName = nextPlayerJid.split('@')[0];
            
            const updateMessage = `🎮 TIC TAC TOE

${this.getBoardDisplay(game.board)}

Giliran: @${nextPlayerName} (${game.currentPlayer === 'X' ? '❌' : '⭕'})

Ketik angka 1-9`;
            
            await alip.sendMessage(m.chat, {
                text: updateMessage,
                mentions: [nextPlayerJid]
            });
        }
    }

    checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    getBoardDisplay(board) {
        const symbols = {
            'X': '❌',
            'O': '⭕',
            ' ': '⬜'
        };

        let display = '';
        for (let i = 0; i < 9; i++) {
            display += symbols[board[i]];
            if ((i + 1) % 3 === 0 && i < 8) display += '\n';
        }
        return display;
    }

    async handleResign(m, Reply) {
        if (!m.isGroup) return 'Hanya untuk grup!';
        
        const normalizeJid = (jid) => {
            if (jid.endsWith('@lid')) {
                return jid.replace('@lid', '@s.whatsapp.net');
            }
            return jid;
        };

        const playerJid = normalizeJid(m.sender);
        const userGames = this.getPlayerGame(m.chat, playerJid);
        
        if (!userGames) return 'Kamu tidak sedang bermain!';
        
        const { gameId, game } = userGames;
        
        const winnerSymbol = game.players.X === m.sender ? 'O' : 'X';
        const winnerJid = normalizeJid(game.players[winnerSymbol]);
        const loserJid = playerJid;
        
        const winnerName = winnerJid.split('@')[0];
        const loserName = loserJid.split('@')[0];
        
        delete this.games[gameId];
        if (game.messageId) {
            delete this.gameMessages[game.messageId];
        }
        
        return `🏳️ @${loserName} menyerah!\n🎉 @${winnerName} menang!`;
    }

    async handleBoard(m, Reply) {
        if (!m.isGroup) return 'Hanya untuk grup!';
        
        const normalizeJid = (jid) => {
            if (jid.endsWith('@lid')) {
                return jid.replace('@lid', '@s.whatsapp.net');
            }
            return jid;
        };

        const playerJid = normalizeJid(m.sender);
        const userGames = this.getPlayerGame(m.chat, playerJid);
        
        if (!userGames) return 'Kamu tidak sedang bermain!';
        
        const { game } = userGames;
        
        const p1Name = normalizeJid(game.players.X).split('@')[0];
        const p2Name = normalizeJid(game.players.O).split('@')[0];
        
        return `🎮 TIC TAC TOE

❌ X: @${p1Name}
⭕ O: @${p2Name}

${this.getBoardDisplay(game.board)}

Giliran: ${game.currentPlayer === 'X' ? p1Name : p2Name}
Langkah: ${game.moves}/9`;
    }

    async handleCleanup(Reply) {
        const now = Date.now();
        let cleaned = 0;
        
        for (const gameId in this.games) {
            const game = this.games[gameId];
            if (now - game.lastMove > 15 * 60 * 1000) {
                delete this.games[gameId];
                if (game.messageId) {
                    delete this.gameMessages[game.messageId];
                }
                cleaned++;
            }
        }
        
        return `Bersihkan ${cleaned} game timeout`;
    }
}

module.exports = new TicTacToe();
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
