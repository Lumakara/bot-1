// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const { MessagesUpsertt } = require('./source/message.js');
const fs = require('fs');
const chalk = require('chalk');
const { proto, areJidsSameUser } = require('@whiskeysockets/baileys');

async function initializHandler(alip, store) {
    async function getProfilePicture(jid) {
        try {
            const url = await alip.profilePictureUrl(jid, 'image');
            if (url && !url.includes('undefined') && !url.includes('null')) {
                return url;
            }
        } catch {}
        return 'https://telegra.ph/file/a059a6a734ed202c879d3.jpg';
    }

    alip.ev.on('messages.upsert', async (message) => {
        await MessagesUpsertt(alip, message, store);
    });

    alip.ev.on('group-participants.update', async (update) => {
        try {
            const { id, participants, action } = update;
            const groupData = global.db.groups[id];
            if (!groupData) return;
            
            const welcomeFile = './library/database/welcome.json';
            const leftFile = './library/database/left.json';
            const metadata = await alip.safeGroupMetadata(id);
            if (!metadata || !metadata.subject) return;
            
            const groupName = metadata.subject;

            if (groupData.welcome && action === 'add') {
                const welcomeDB = fs.existsSync(welcomeFile) ? JSON.parse(fs.readFileSync(welcomeFile)) : {};
                
                for (let n of participants) {
                    const teksWelcome = welcomeDB[id]?.welcomeText || `*yah si @user join bete gua jing*`;
                    
                    const teks = teksWelcome
                        .replace(/@user/g, `@${n.split('@')[0]}`)
                        .replace(/@group/g, groupName);

                    await alip.sendMessage(id, {
                        text: teks,
                        contextInfo: {
                            mentionedJid: [n],
                            isForwarded: true,
                            forwardingScore: 9999,
                            businessMessageForwardInfo: { businessOwnerJid: global.owner + "@s.whatsapp.net" },
                            forwardedNewsletterMessageInfo: { 
                                newsletterName: global.botname, 
                                newsletterJid: global.idSaluran 
                            },
                            externalAdReply: {
                                title: global.botname,
                                body: `© Powered by ${global.namaOwner}`,
                                thumbnailUrl: await getProfilePicture(n),
                                sourceUrl: global.linkMenu || null
                            }
                        }
                    });
                }
            } 
            else if (groupData.left && action === 'remove') {
                const leftDB = fs.existsSync(leftFile) ? JSON.parse(fs.readFileSync(leftFile)) : {};
                
                for (let n of participants) {
                    const teksLeft = leftDB[id]?.leftText || `*goodbye kacung @user 👋*`;
                    
                    const teks = teksLeft
                        .replace(/@user/g, `@${n.split('@')[0]}`)
                        .replace(/@group/g, groupName);

                    await alip.sendMessage(id, {
                        text: teks,
                        contextInfo: {
                            mentionedJid: [n],
                            isForwarded: true,
                            forwardingScore: 9999,
                            businessMessageForwardInfo: { businessOwnerJid: global.owner + "@s.whatsapp.net" },
                            forwardedNewsletterMessageInfo: { 
                                newsletterName: global.botname, 
                                newsletterJid: global.idSaluran 
                            },
                            externalAdReply: {
                                title: global.botname,
                                body: `© Powered by ${global.namaOwner}`,
                                thumbnailUrl: await getProfilePicture(n),
                                sourceUrl: global.linkMenu || null
                            }
                        }
                    });
                }
            }

        } catch (err) {
            console.log('❌ Error di handler group-participants.update:', err);
        }
    });
    
    alip.ev.on("groups.update", (updates) => {
        for (const update of updates) {
            const id = update.id;
            if (store.groupMetadata[id]) {
                store.groupMetadata[id] = { ...(store.groupMetadata[id] || {}), ...(update || {}) };
            }
        }
    });
}

module.exports = { initializHandler };

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
});