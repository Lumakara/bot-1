const fetch = require('node-fetch')

let handler = async (m, { alip, command, text, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    let [name, quote] = text.split(",")
    if (!name || !quote) return Reply(`📌 Format salah!\nContoh: .fakexnxx Nelson Mandela, Keberanian adalah kemenangan atas rasa takut`)
    try {
        let api = `https://api.siputzx.my.id/api/canvas/fake-xnxx?name=${encodeURIComponent(name.trim())}&quote=${encodeURIComponent(quote.trim())}&likes=69&dislikes=0`

        await alip.sendMessage(m.chat, {
            image: { url: api },
            caption: `🌀 Fake XNXX\n👤 Nama: ${name.trim()}\n💬 Komentar: ${quote.trim()}`
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat membuat fake XNXX.")
    }
}

handler.command = ["fakexnxx"]

module.exports = handler