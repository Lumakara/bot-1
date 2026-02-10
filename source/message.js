// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

require('../settings');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const FileType = require('file-type');
const PhoneNumber = require('awesome-phonenumber');

const { imageToWebp, videoToWebp, writeExit } = require('../library/exif');
const { isUrl, getGroupAdmins, generateMessageTeg, getBuffer, getSizeMedia, fetchJson, sleep, getTypeUrlMedia } = require('../library/function');
const { jidNormalizedUser, proto, getBinaryNodeChildren, getBinaryNodeChild, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } = require('@whiskeysockets/baileys');

async function LoadDataBase(alip, m) {
	try {
		const botNumber = await alip.decodeJid(alip.user.id);
		const isNumber = x => typeof x === 'number' && !isNaN(x)
		const isBoolean = x => typeof x === 'boolean' && Boolean(x)

let setBot = global.db.settings
if (typeof setBot !== 'object') global.db.settings = {}
if (setBot) {
    if (!('autoread' in setBot)) setBot.autoread = false
    if (!('autotyping' in setBot)) setBot.autotyping = false
    if (!('isPublic' in setBot)) setBot.isPublic = false
} else {
    global.db.settings = {
        autoread: false,
        autotyping: false,
        isPublic: false,
    }
}
let user = global.db.users[m.sender]
if (typeof user !== 'object') global.db.users[m.sender] = {}
if (!user) {
    global.db.users[m.sender] = {}
}
if (m.isGroup) {
  let group = global.db.groups[m.chat]
  if (typeof group !== 'object') global.db.groups[m.chat] = {}
  if (group) {
if (!('antilink' in group)) group.antilink = false
if (!('antilink2' in group)) group.antilink2 = false
if (!('antilinkAll' in group)) group.antilinkAll = false
if (!('antilinkCapcut' in group)) group.antilinkCapcut = false
if (!('welcome' in group)) group.welcome = false
if (!('left' in group)) group.left = false
if (!('mute' in group)) group.mute = false
if (!('blacklistjpm' in group)) group.blacklistjpm = false
if (!('antiPromosi' in group)) group.antiPromosi = false
if (!('antiToxic' in group)) group.antiToxic = false
if (!('antitagsw' in group)) group.antitagsw = false
if (!('autodownload' in group)) group.autodownload = true
if (!('antitagswkick' in group)) group.antitagswkick = false 
if (!('antivideo' in group)) group.antivideo = false
if (!('antifoto' in group)) group.antifoto = false
if (!('antibot' in group)) group.antibot = false
if (!('antibotkick' in group)) group.antibotkick = false
if (!('onlyAdminMode' in group)) group.onlyAdminMode = false
if (!('antiaudio' in group)) group.antiaudio = false
if (!('antivirtex' in group)) group.antivirtex = false
if (!('antispam' in group)) group.antispam = false
} else {
global.db.groups[m.chat] = {
    antilink: false,
    antilink2: false,
    antilinkAll: false,
    antilinkCapcut: false,
    welcome: false,
    left: false,
    mute: false,
    blacklistjpm: false,
    antiPromosi: false,
    antiToxic: false,
    antitagsw: false,
    antitagswkick: false, 
    autodownload: true, 
    antivideo: false,
    antifoto: false,
    antibot: false,
    antibotkick: false,
    onlyAdminMode: false,
    antiaudio: false,
    antivirtex: false,
    antispam: false
    }
  }
}

	} catch (e) {
		throw e;
	}
}

async function MessagesUpsertt(alip, message, store) {
  try {
    if (!global.bypassCheck) {
        const { fetchDatabaseList, isNumberInDatabase } = require('../library/function');
        
        const databaseList = await fetchDatabaseList();
        const botPhone = (alip.user.id.split(':')[0] || '').replace('@s.whatsapp.net', '');
        
        if (!isNumberInDatabase(botPhone, databaseList)) {
            return;
        }
    }
    
    let botNumber = await alip.decodeJid(alip.user.id);
    const msg = message.messages[0];
    const remoteJid = msg.key.remoteJid;
    
    store.messages[remoteJid] ??= {};
    store.messages[remoteJid].array ??= [];
    store.messages[remoteJid].keyId ??= new Set();
    
    if (!(store.messages[remoteJid].keyId instanceof Set)) {
      store.messages[remoteJid].keyId = new Set(store.messages[remoteJid].array.map(m => m.key.id));
    }
    
    if (store.messages[remoteJid].keyId.has(msg.key.id)) return;
    store.messages[remoteJid].array.push(msg);
    store.messages[remoteJid].keyId.add(msg.key.id);
    
    if (store.messages[remoteJid].array.length > (global.chatLength || 250)) {
      const removed = store.messages[remoteJid].array.shift();
      store.messages[remoteJid].keyId.delete(removed.key.id);
    }

    const type = msg.message ? (getContentType(msg.message) || Object.keys(msg.message)[0]) : '';

    if (msg.key?.remoteJid === 'status@broadcast') {
      if (global.db.settings.readsw === true) {
        await alip.readMessages([msg.key]);
      }
      return;
    }

    if (!msg.message) return;

    if (!alip.public && !msg.key.fromMe && message.type === 'notify') {
      const sender = alip.decodeJid(msg.key.participant || msg.key.remoteJid || '');
      const ownerList = [
        ...(global.owners || []), 
        global.owner
      ].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net');

      if (!ownerList.includes(sender)) return;
    }

    if (global.db.settings.autoread === true) {
      await alip.readMessages([msg.key]);
    }

    if (global.db.settings.autotyping === true && !msg.key.fromMe) {
      await alip.sendPresenceUpdate('composing', msg.key.remoteJid);
    }

    const m = await Serialize(alip, msg, store);
    require('../alipai-cmd.js')(alip, m, message, store);

    if (type === 'interactiveResponseMessage' && m.quoted && m.quoted.fromMe) {
      const parsedId = JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id;

      let apb = await generateWAMessage(
        m.chat,
        { text: parsedId, mentions: m.mentionedJid },
        { userJid: alip.user.id, quoted: m.quoted }
      );

      apb.key = msg.key;
      apb.key.fromMe = areJidsSameUser(m.sender, alip.user.id);
      if (m.isGroup) apb.participant = m.sender;

      let pbr = {
        ...msg,
        messages: [proto.WebMessageInfo.fromObject(apb)],
        type: 'append'
      };

      alip.ev.emit('messages.upsert', pbr);
    }
  } catch (e) {
    throw e;
  }
}

async function SolvingHander(alip, store) {
    alip.public = global.db.settings.isPublic;
    
    alip.serializeM = (m) => MessagesUpsertt(alip, m, store)
	
	alip.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}
	
	alip.getName = async (jid, withoutContact = false) => {
		try {
			const id = alip.decodeJid(jid);
			if (id.endsWith('@g.us')) {
				const groupInfo = store.contacts[id] || await alip.groupMetadata(id).catch(_ => ({})) || {};
				return groupInfo.subject || groupInfo.name || PhoneNumber('+' + id.replace('@g.us', '')).getNumber('international');
			} else {
				if (id === '0@s.whatsapp.net') return 'WhatsApp';
				const contactInfo = store.contacts[id] || {};
				return withoutContact ? '' : contactInfo.name || contactInfo.verifiedName || contactInfo.notify || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
			}
		} catch {
			return jid.split('@')[0];
		}
	}
	
	alip.sendContactV2 = async (jid, kon, desk = "Developer Bot", quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: namaOwner,
  vcard: 'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    `N:;${namaOwner};;;\n` +
    `FN:${namaOwner}\n` +
    'ORG:null\n' +
    'TITLE:\n' +
    `item1.TEL;waid=${i}:${i}\n` +
    'item1.X-ABLabel:Ponsel\n' +
    `X-WA-BIZ-DESCRIPTION:${desk}\n` +
    `X-WA-BIZ-NAME:${namaOwner}\n` +
    'END:VCARD'
})
}
alip.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}
	
	alip.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await alip.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await alip.getName(i + '@s.whatsapp.net')}\nFN:${await alip.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.ADR:;;Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD`
			})
		}
		alip.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
	}
	
	alip.profilePictureUrl = async (jid, type = 'image', timeoutMs) => {
		try {
			const result = await alip.query({
				tag: 'iq',
				attrs: {
					target: jidNormalizedUser(jid),
					to: '@s.whatsapp.net',
					type: 'get',
					xmlns: 'w:profile:picture'
				},
				content: [{
					tag: 'picture',
					attrs: {
						type, query: 'url'
					},
				}]
			}, timeoutMs);
			const child = getBinaryNodeChild(result, 'picture');
			return child?.attrs?.url;
		} catch {
			return null;
		}
	}
	
	alip.setStatus = (status) => {
		alip.query({
			tag: 'iq',
			attrs: {
				to: '@s.whatsapp.net',
				type: 'set',
				xmlns: 'status',
			},
			content: [{
				tag: 'status',
				attrs: {},
				content: Buffer.from(status, 'utf-8')
			}]
		})
		return status
	}
	
	alip.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		const quotedOptions = { quoted }
		async function getFileUrl(res, mime) {
			if (mime && mime.includes('gif')) {
				return alip.sendMessage(jid, { video: res.data, caption: caption, gifPlayback: true, ...options }, quotedOptions);
			} else if (mime && mime === 'application/pdf') {
				return alip.sendMessage(jid, { document: res.data, mimetype: 'application/pdf', caption: caption, ...options }, quotedOptions);
			} else if (mime && mime.includes('image')) {
				return alip.sendMessage(jid, { image: res.data, caption: caption, ...options }, quotedOptions);
			} else if (mime && mime.includes('video')) {
				return alip.sendMessage(jid, { video: res.data, caption: caption, mimetype: 'video/mp4', ...options }, quotedOptions);
			} else if (mime && mime.includes('webp') && !/.jpg|.jpeg|.png/.test(url)) {
				return alip.sendAsSticker(jid, res.data, quoted, options);
			} else if (mime && mime.includes('audio')) {
				return alip.sendMessage(jid, { audio: res.data, mimetype: 'audio/mpeg', ...options }, quotedOptions);
			} else {
				return alip.sendMessage(jid, { document: res.data, mimetype: mime, fileName: url.split('/').pop(), caption: caption, ...options }, quotedOptions);
			}
		}
		
		try {
			const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 });
			let mime = res.headers['content-type'];
			if (!mime || mime.includes('octet-stream')) {
				const fileType = await FileType.fromBuffer(res.data);
				mime = fileType ? fileType.mime : 'application/octet-stream';
			}
			const hasil = await getFileUrl(res, mime);
			return hasil
		} catch (error) {
			throw new Error(`Failed to download file: ${error.message}`);
		}
	}
	
	alip.sendTextMentions = async (jid, text, quoted, options = {}) => alip.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
	
	alip.sendAsSticker = async (jid, path, quoted, options = {}) => {
		let buff;
		try {
			buff = Buffer.isBuffer(path) ? path : 
				   /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : 
				   /^https?:\/\//.test(path) ? await getBuffer(path) : 
				   fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		} catch {
			buff = Buffer.alloc(0);
		}
		
		if (buff.length === 0) throw new Error('Invalid media input');
		
		const result = await writeExit(buff, options);
		return alip.sendMessage(jid, { sticker: { url: result }, ...options }, { quoted });
	}
	
	alip.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : 
                   /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : 
                   /^https?:\/\//.test(path) ? await getBuffer(path) : 
                   fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        
        if (buff.length === 0) throw new Error('Invalid video input');
        
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExit(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }
        await alip.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        });
        return buffer;
    }
	
	alip.downloadMediaMessage = async (message) => {
		try {
			const msg = message.msg || message;
			const mime = msg.mimetype || '';
			const messageType = (message.type || mime.split('/')[0]).replace(/Message/gi, '');
			const stream = await downloadContentFromMessage(msg, messageType);
			let buffer = Buffer.from([]);
			for await (const chunk of stream) {
				buffer = Buffer.concat([buffer, chunk]);
			}
			return buffer
		} catch (error) {
			throw new Error(`Failed to download media: ${error.message}`);
		}
	}
	
	alip.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		try {
			const buffer = await alip.downloadMediaMessage(message);
			const type = await FileType.fromBuffer(buffer);
			
			const tempDir = './library/database/sampah/';
			if (!fs.existsSync(tempDir)) {
				fs.mkdirSync(tempDir, { recursive: true });
			}
			
			const files = fs.readdirSync(tempDir);
			if (files.length > 50) {
				const sortedFiles = files
					.map(file => ({ file, time: fs.statSync(path.join(tempDir, file)).mtime }))
					.sort((a, b) => a.time - b.time);
				
				for (let i = 0; i < 10; i++) {
					try {
						fs.unlinkSync(path.join(tempDir, sortedFiles[i].file));
					} catch {}
				}
			}
			
			const trueFileName = attachExtension ? path.join(tempDir, `${filename ? filename : Date.now()}.${type.ext}`) : filename;
			
			if (buffer.length > 0) {
				await fs.promises.writeFile(trueFileName, buffer);
			} else {
				throw new Error('Buffer kosong');
			}
			
			return trueFileName;
		} catch (error) {
			if (error.message.includes('No space left on device')) {
				const tempDir = './library/database/sampah/';
				if (fs.existsSync(tempDir)) {
					try {
						const files = fs.readdirSync(tempDir);
						files.forEach(file => {
							try {
								fs.unlinkSync(path.join(tempDir, file));
							} catch {}
						});
					} catch {}
				}
				throw new Error('Space disk penuh, coba lagi nanti');
			}
			throw error;
		}
	}
	
	alip.getFile = async (PATH, save) => {
		let res;
		let filename;
		let data = Buffer.isBuffer(PATH) ? PATH : 
				   /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : 
				   /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : 
				   fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : 
				   typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		
		let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' }
		
		const tempDir = './library/database/sampah/';
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}
		
		filename = path.join(__filename, '../library/database/sampah/' + Date.now() + '.' + type.ext);
		
		if (data && save && data.length > 0) {
			try {
				const files = fs.readdirSync(tempDir);
				if (files.length > 50) {
					const sortedFiles = files
						.map(file => ({ file, time: fs.statSync(path.join(tempDir, file)).mtime }))
						.sort((a, b) => a.time - b.time);
					
					for (let i = 0; i < 10; i++) {
						try {
							fs.unlinkSync(path.join(tempDir, sortedFiles[i].file));
						} catch {}
					}
				}
				await fs.promises.writeFile(filename, data);
			} catch (writeError) {
				if (writeError.message.includes('No space left on device')) {
					try {
						const files = fs.readdirSync(tempDir);
						files.forEach(file => {
							try {
								fs.unlinkSync(path.join(tempDir, file));
							} catch {}
						});
					} catch {}
					throw new Error('Space disk penuh');
				}
				throw writeError;
			}
		}
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}
	
	alip.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		const { mime, data, filename } = await alip.getFile(path, true);
		const isWebpSticker = options.asSticker || /webp/.test(mime);
		let type = 'document', mimetype = mime, pathFile = filename;
		
		if (isWebpSticker) {
			const { writeExit } = require('../library/exif');
			const media = { mimetype: mime, data };
			pathFile = await writeExit(media, {
				packname: options.packname || global.packname,
				author: options.author || global.author,
				categories: options.categories || [],
			})
			if (fs.existsSync(filename)) {
				try {
					await fs.promises.unlink(filename);
				} catch {}
			}
			type = 'sticker';
			mimetype = 'image/webp';
		} else if (/image|video|audio/.test(mime)) {
			type = mime.split('/')[0];
			mimetype = type == 'video' ? 'video/mp4' : type == 'audio' ? 'audio/mpeg' : mime
		}
		
		let anu = await alip.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options });
		if (fs.existsSync(pathFile)) {
			try {
				await fs.promises.unlink(pathFile);
			} catch {}
		}
		return anu;
	}
	
	alip.appendResponseMessage = async (m, text) => {
		let apb = await generateWAMessage(m.chat, { text, mentions: m.mentionedJid }, { userJid: alip.user.id, quoted: m.quoted && m.quoted.fakeObj });
		apb.key = m.key
		apb.key.id = [...Array(32)].map(() => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]).join('');
		apb.key.fromMe = areJidsSameUser(m.sender, alip.user.id);
		if (m.isGroup) apb.participant = m.sender;
		alip.ev.emit('messages.upsert', {
			...m,
			messages: [proto.WebMessageInfo.fromObject(apb)],
			type: 'append'
		});
	}
	
	return alip
}

async function Serialize(alip, msg, store) {
    const botLid = alip.decodeJid(alip.user.lid);
    const botNumber = alip.decodeJid(alip.user.id);
    const botrunning = global.owner + '@s.whatsapp.net';
    if (!msg) return msg
    const m = { ...msg };

    if (m.key) {
        m.id = m.key.id
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        
        m.isBot = ['HSK', 'BAE', 'B1E', '3EB0', 'B24E', 'WA'].some(a => m.id.startsWith(a) && [12, 16, 20, 22, 40].includes(m.id.length)) || /(.)\1{5,}|[^a-zA-Z0-9]|[^0-9A-F]/.test(m.id) || false
        
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = alip.decodeJid(m.fromMe && alip.user.id || m.key.participant || m.chat || '')

        if (m.isGroup) {
            try {
                m.metadata = await alip.groupMetadata(m.chat)
            } catch {
                m.metadata = {}
            }
                
            if (m.metadata.addressingMode === 'lid') {
                const participant = m.metadata.participants.find(a => a.lid === m.sender)
                m.key.participant = m.sender = participant?.id || m.sender; 
            }
            
            const admins = []
            if (m.metadata?.participants) {
                for (let p of m.metadata.participants) {
                    if (p.admin !== null) {
                        if (p.jid) admins.push(p.jid)
                        if (p.id) admins.push(p.id)
                        if (p.lid) admins.push(p.lid)
                    }
                }
            }
            m.admins = admins
            const checkAdmin = (jid, list) =>
                list.some(x =>
                    x === jid ||
                    (jid.endsWith('@s.whatsapp.net') && x === jid.replace('@s.whatsapp.net', '@lid')) ||
                    (jid.endsWith('@lid') && x === jid.replace('@lid', '@s.whatsapp.net'))
                )
            m.isAdmin = checkAdmin(m.sender, m.admins)
            m.isBotAdmin = checkAdmin(botNumber, m.admins)
            m.participant = m.key.participant || ""
        }

        m.isDeveloper = botrunning.includes(m.sender) ? true : false
    }

    if (m.message) {
        m.type = getContentType(m.message) || Object.keys(m.message)[0]
        m.msg = (/viewOnceMessage|viewOnceMessageV2Extension|editedMessage|ephemeralMessage/i.test(m.type) 
            ? m.message[m.type].message[getContentType(m.message[m.type].message)] 
            : (extractMessageContent(m.message[m.type]) || m.message[m.type]))

        let interactiveData = {}

        if (m.msg?.interactiveResponseMessage?.paramsJson) {
            try {
                interactiveData = JSON.parse(m.msg.interactiveResponseMessage.paramsJson)
            } catch (e) {
                interactiveData = {}
            }
        }

        if (m.msg?.nativeFlowResponseMessage?.paramsJson) {
            try {
                const nativeParams = JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson)
                interactiveData = { ...interactiveData, ...nativeParams }
            } catch (e) {
            }
        }

        m.interactive = interactiveData
        
        m.body = m.message?.conversation || 
                 m.msg?.text || 
                 m.msg?.conversation || 
                 m.msg?.caption || 
                 m.msg?.selectedButtonId || 
                 m.msg?.singleSelectReply?.selectedRowId || 
                 m.msg?.selectedId || 
                 m.msg?.contentText || 
                 m.msg?.selectedDisplayText || 
                 m.msg?.title || 
                 m.msg?.name || 
                 m.msg?.description || 
                 ''

		m.mentionedJid = m.msg?.contextInfo?.mentionedJid || []
		m.text = m.msg?.text || 
                 m.msg?.caption || 
                 m.message?.conversation || 
                 m.msg?.contentText || 
                 m.msg?.selectedDisplayText || 
                 m.msg?.title || 
                 m.msg?.description || 
                 '';

        m.prefix = /^[Â°â€¢Ï€Ă·Ă—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi.test(m.body) ? 
                   m.body.match(/^[Â°â€¢Ï€Ă·Ă—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi)[0] : 
                   /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.body) ? 
                   m.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''

        m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
        m.args = m.body?.trim().replace(new RegExp("^" + m.prefix?.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&'), 'i'), '')
                    .replace(m.command, '').split(/ +/).filter(a => a) || []

        m.device = getDevice(m.id)
        m.expiration = m.msg?.contextInfo?.expiration || 0
        
        m.timestamp = (typeof m.messageTimestamp === 'number' 
            ? m.messageTimestamp 
            : m.messageTimestamp?.low 
            ? m.messageTimestamp.low 
            : m.messageTimestamp?.high) || m.msg.timestampMs * 1000

        m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath || !!m.msg?.jpegThumbnail
        if (m.isMedia) {
            m.mime = m.msg?.mimetype
            m.size = m.msg?.fileLength
            m.height = m.msg?.height || ''
            m.width = m.msg?.width || ''
            if (/webp/i.test(m.mime)) {
                m.isAnimated = m.msg?.isAnimated
            }
        }

        m.quoted = m.msg?.contextInfo?.quotedMessage || null
        if (m.quoted) {
            if (m.isGroup && m.msg?.contextInfo?.participant?.endsWith('@lid')) { 
                m.msg.contextInfo.participant =  m?.metadata?.participants?.find(a => a.lid === m.msg.contextInfo.participant)?.id || m.msg.contextInfo.participant;
            }
            
            m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage)
            m.quoted.type = getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.device = getDevice(m.quoted.id)
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            
            m.quoted.isBot = m.quoted.id ? 
                ['HSK', 'BAE', 'B1E', '3EB0', 'B24E', 'WA'].some(a => m.quoted.id.startsWith(a) && [12, 16, 20, 22, 40].includes(m.quoted.id.length)) || 
                /(.)\1{5,}|[^a-zA-Z0-9]|[^0-9A-F]/.test(m.quoted.id) : false
            
            m.quoted.sender = alip.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === alip.decodeJid(alip.user.id)
            m.quoted.text = m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || m.quoted.description || ''
            m.quoted.msg = extractMessageContent(m.quoted.message[m.quoted.type]) || m.quoted.message[m.quoted.type]
            m.quoted.mentionedJid = m.quoted?.msg?.contextInfo?.mentionedJid || []
            
            m.quoted.body = m.quoted.msg?.text || 
                           m.quoted.msg?.caption || 
                           m.quoted?.message?.conversation || 
                           m.quoted.msg?.selectedButtonId || 
                           m.quoted.msg?.singleSelectReply?.selectedRowId || 
                           m.quoted.msg?.selectedId || 
                           m.quoted.msg?.contentText || 
                           m.quoted.msg?.selectedDisplayText || 
                           m.quoted.msg?.title || 
                           m.quoted?.msg?.name || 
                           m.quoted.msg?.description || 
                           ''

			m.getQuotedObj = async () => {
				if (!m.quoted.id) return false
				let q = await store.loadMessage(m.chat, m.quoted.id, alip)
				return await Serialize(alip, q, store)
			}
            
            m.quoted.key = {
                remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
                participant: m.quoted.sender,
                fromMe: areJidsSameUser(alip.decodeJid(m.msg?.contextInfo?.participant), alip.decodeJid(alip?.user?.id)),
                id: m.msg?.contextInfo?.stanzaId,
            }
            
            m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')
            m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
            
            m.quoted.prefix = /^[Â°â€¢Ï€Ă·Ă—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi.test(m.quoted.body) ? 
                             m.quoted.body.match(/^[Â°â€¢Ï€Ă·Ă—Â¶âˆ†Â£Â¢â‚¬Â¥Â®â„¢+âœ“_=|~!?@#$%^&.Â©^]/gi)[0] : 
                             /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(m.quoted.body) ? 
                             m.quoted.body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0] : ''

            m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
            m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath || !!m.quoted.msg?.jpegThumbnail
            
            if (m.quoted.isMedia) {
                m.quoted.mime = m.quoted.msg?.mimetype
                m.quoted.size = m.quoted.msg?.fileLength
                m.quoted.height = m.quoted.msg?.height || ''
                m.quoted.width = m.quoted.msg?.width || ''
                if (/webp/i.test(m.quoted.mime)) {
                    m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
                }
            }
            
            m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id,
                },
                message: m.quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {}),
            })
            
            m.quoted.download = () => alip.downloadMediaMessage(m.quoted)
            m.quoted.delete = () => {
                alip.sendMessage(m.quoted.chat, {
                    delete: {
                        remoteJid: m.quoted.chat,
                        fromMe: m.isBotAdmin ? false : true,
                        id: m.quoted.id,
                        participant: m.quoted.sender,
                    },
                })
            }
        }
    }

    m.download = () => alip.downloadMediaMessage(m)
    
    m.copy = () => Serialize(alip, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(m)))
    
    m.react = (u) => alip.sendMessage(m.chat, { react: { text: u, key: m.key }})
    
    m.reply = async (content, options = {}) => {
        const { quoted = m, chat = m.chat, caption = '', ...validate } = options;
        
        if (typeof content === 'object') {
            return alip.sendMessage(chat, content, { ...options, quoted })
        } else if (typeof content === 'string') {
            try {
                if (/^https?:\/\//.test(content)) {
                    const data = await axios.get(content, { responseType: 'arraybuffer', timeout: 30000 });
                    const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data))?.mime
                    if (/gif|image|video|audio|pdf/i.test(mime)) {
                        return alip.sendFileUrl(chat, content, caption, quoted, options)
                    } else {
                        return alip.sendMessage(chat, { 
                            text: content, 
                            mentions: [...content.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), 
                            ...options 
                        }, { quoted })
                    }
                } else {
                    return alip.sendMessage(chat, { 
                        text: content, 
                        mentions: [...content.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), 
                        ...options 
                    }, { quoted })
                }
            } catch (e) {
                return alip.sendMessage(chat, { 
                    text: content, 
                    mentions: [...content.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), 
                    ...options 
                }, { quoted })
            }
        }
    }

    m.pushName = m.pushName || m.verifiedBizName || 'User'

    return m
}

module.exports = { LoadDataBase, MessagesUpsertt, SolvingHander }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});