// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const fetch = require('node-fetch')

let handler = async (m, { text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} https://fgsi.koyeb.app/pastebin/TwjPCAgq|password*`)

    let [url, password] = text.split("|")
    if (!url) return Reply("❌ Link pastebin tidak valid!")

    await Reply("⏳ Sedang mengambil data pastebin...")

    try {
        let api = `https://api.botcahx.eu.org/api/download/pastebin?apikey=${global.apikeyalip}&url=${encodeURIComponent(url)}${password ? `&password=${encodeURIComponent(password)}` : ''}`
        let res = await fetch(api)
        let data = await res.json()

        if (!data.status) return Reply("❌ Gagal ambil data. Cek link/password!")

        let hasil = data.result || "❌ Tidak ada hasil."

        if (hasil.length > 4000) {
            await alip.sendMessage(m.chat, {
                document: Buffer.from(hasil),
                mimetype: "text/plain",
                fileName: "pastebin.txt"
            }, { quoted: m })
        } else {
            Reply(`📄 *Hasil Pastebin:*\n\n${hasil}`)
        }
    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat mengambil data pastebin.")
    }
}

handler.command = ["pastebin", "getpastebin", "pb"]

module.exports = handler