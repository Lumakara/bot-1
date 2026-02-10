const fetch = require('node-fetch')

let handler = async (m, { alip, command, isCreator, Reply, text }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} jokowi*`)

    try {
        let api = `https://api.siputzx.my.id/api/m/sertifikat-tolol?text=${encodeURIComponent(text)}`
        await alip.sendMessage(m.chat, {
            image: { url: api },
            caption: `🖼️ *SERTIFIKAT*\n\n${text}`
        }, { quoted: m })
    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat membuat sertifikat.")
    }
}

handler.command = ["sertifikat-tolol","sertifikattolol","sertifikat"]
module.exports = handler