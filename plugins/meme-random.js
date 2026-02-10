const fetch = require('node-fetch')

let handler = async (m, { alip, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    try {
        let api = `https://api-faa.my.id/faa/meme`

        await alip.sendMessage(m.chat, {
            image: { url: api },
            caption: "🤣 Random Meme"
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat mengambil meme.")
    }
}

handler.command = ["meme", "randommeme"]

module.exports = handler