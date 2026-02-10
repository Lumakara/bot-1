// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

let handler = async ( m, { alip, isCreator, example, Reply }) => {
if (m.isGroup) {
if (!isCreator && !m.isAdmin) return Reply(mess.admin)
if (!m.quoted) return m.reply("reply pesannya")
if (m.quoted.fromMe) {
alip.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender}})
} else {
if (!m.isBotAdmin) return Reply(mess.botAdmin)
alip.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender}})
}} else {
if (!isCreator) return Reply(mess.owner)
if (!m.quoted) return m.reply(example("reply pesan"))
alip.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.quoted.id, participant: m.quoted.sender}})
}
}

handler.command = ["delete", "del"]

module.exports = handler
