const fetch = require('node-fetch')

let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} 1/3/2006*`)

    await Reply("⏳ Sedang meramal nasib lu...")

    try {
        let [tanggal, bulan, tahun] = text.split("/")
        if (!tanggal || !bulan || !tahun) return Reply(`❌ Format salah!\n\n*.${command} 1/3/2006*`)

        let url = `https://api.botcahx.eu.org/api/primbon/ramalannasib?apikey=${global.apikeyalip}&tanggal=${tanggal}&bulan=${bulan}&tahun=${tahun}`
        let res = await fetch(url)
        let data = await res.json()

        if (!data.status || !data.result.status)
            return Reply("❌ Data tidak ditemukan atau API error.")

        let msg = data.result.message
        let hasil =
`🔮 *RAMALAN NASIB*

📅 *Tanggal Lahir:* ${tanggal}-${bulan}-${tahun}
🌟 *Angka Akar:* ${msg.angka_akar}
🍀 *Angka Keberuntungan:* ${msg.angka_keberuntungan}

✨ *Sifat:*
${msg.sifat}

🔥 *Elemen:*
${msg.elemen}

📝 *Analisa:*
${msg.analisa}

📌 *Catatan:*
${msg.catatan}`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi error saat mengambil data ramalan nasib.")
    }
}

handler.command = ["ramalannasib", "nasib", "ramalan"]

module.exports = handler