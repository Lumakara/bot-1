const fetch = require('node-fetch')

let handler = async (m, { alip, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    try {
        let api = `https://api-alipclutch.vercel.app/random/waifu?apikey=${global.apikeyalip}`

        await alip.sendMessage(m.chat, {
            image: { url: api },
            caption: "💖 Random Waifu"
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat mengambil waifu.")
    }
}

handler.command = ["waifu", "randomwaifu"]

module.exports = handler