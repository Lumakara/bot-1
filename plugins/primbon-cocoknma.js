const fetch = require('node-fetch')

let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);
    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} Alif Alfarel.1/3/2006*`)

    await Reply("⏳ Sedang menghitung kecocokan nama...")

    try {
        let [nama, tgl] = text.split(".")
        if (!nama || !tgl) return Reply(`❌ Format salah!\n\n*.${command} Nama Lengkap.tanggal/bulan/tahun*`)

        let [tanggal, bulan, tahun] = tgl.split("/")
        if (!tanggal || !bulan || !tahun) return Reply(`❌ Format salah!\n\n*.${command} Alif Alfarel.1/3/2006*`)

        let url = `https://api.botcahx.eu.org/api/primbon/kecocokannama?apikey=${global.apikeyalip}&nama=${encodeURIComponent(nama)}&tanggal=${tanggal}&bulan=${bulan}&tahun=${tahun}`

        let res = await fetch(url)
        let data = await res.json()

        if (!data.status || !data.result.status)
            return Reply("❌ Data tidak ditemukan atau API error.")

        let msg = data.result.message
        let hasil =
`🔮 *KECOCOKAN NAMA*

👤 *Nama:* ${msg.nama}
📅 *Tanggal Lahir:* ${msg.tgl_lahir}

✨ *Life Path:* ${msg.life_path}
🎯 *Destiny:* ${msg.destiny}
💖 *Destiny Desire:* ${msg.destiny_desire}
😎 *Personality:* ${msg.personality}

📊 *Persentase Kecocokan:*
${msg.persentase_kecocokan}

📝 *Catatan:* ${msg.catatan}`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi error saat mengambil data kecocokan nama.")
    }
}

handler.command = ["kecocokannama", "cocoknama", "namacocok"]

module.exports = handler