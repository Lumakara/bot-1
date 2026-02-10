const fetch = require('node-fetch')

let handler = async (m, { alip, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    let text = (m.text || '').split(' ').slice(1).join(' ')
    if (!text) return Reply(`❌ Masukkan teks!\nContoh: .${command} alip ai`)

    try {
        m.reply("⏳ Sedang memproses...")

        let api = `https://api.botcahx.eu.org/api/ephoto/ytsilverbutton?apikey=${global.apikeyalip}&text=${encodeURIComponent(text)}`

        await alip.sendMessage(m.chat, {
            image: { url: api },
            caption: `✅ *YOUTUBE SILVER BUTTON*\nText: ${text}`
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat mengambil gambar.")
    }
}

handler.command = ["ytsilverbutton", "silverbutton"]

module.exports = handler