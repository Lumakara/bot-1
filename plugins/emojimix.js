const { Sticker } = require('wa-sticker-formatter')
const fetch = require('node-fetch')

let handler = async (m, { alip, text, usedPrefix, command, isCreator }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return m.reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);
    if (!text || !text.includes('+')) return m.reply(`*contoh penggunaan .emojimix 😭+😂*`)

    let [l, r] = text.split`+`
    if (!l || !r) return m.reply('Kedua emoji harus diisi!')

    try {
        const response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&
            contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(l)}_${encodeURIComponent(r)}`)
        
        if (!response.ok) throw await response.text()

        let json = await response.json()
        if (!json.results || json.results.length === 0) throw 'Gagal mendapatkan emoji mix! cobalah gunakan emoji lain'

        let stickerUrl = json.results[0].url
        let stickerBuffer = await createSticker(stickerUrl)
        
        await alip.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
    } catch (e) {
        console.error(e)
        return m.reply('Terjadi kesalahan saat membuat stiker, coba lagi nanti!')
    }
}

async function createSticker(url) {
    return (new Sticker(url, {
        type: 'full',
        pack: 'Sticker Pack',
        author: 'Bot',
        quality: 80
    })).toBuffer()
}

handler.command = ["emojimix"]

module.exports = handler