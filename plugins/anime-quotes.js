// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const fetch = require('node-fetch')

let handler = async (m, { alip, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    try {
        let api = `https://api.siputzx.my.id/api/r/quotesanime`
        let res = await fetch(api)
        let data = await res.json()

        if (!data.status || !data.data) return Reply("❌ Tidak ada quotes ditemukan.")

        let q = data.data[Math.floor(Math.random() * data.data.length)]
        let hasil = `🎬 *ANIME QUOTES*\n\n` +
                    `💬 *Quote:* ${q.quotes}\n\n` +
                    `👤 *Karakter:* ${q.karakter}\n` +
                    `📺 *Anime:* ${q.anime}\n` +
                    `🎞️ *Episode:* ${q.episode}\n` +
                    `🔗 *Link:* ${q.link}`

        await alip.sendMessage(m.chat, {
            image: { url: q.gambar },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat mengambil quotes anime.")
    }
}

handler.command = ["quotesanime","animequotes","qanime"]
module.exports = handler