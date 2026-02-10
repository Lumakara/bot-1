const fetch = require('node-fetch')

let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} 081249703469*`)

    await Reply("⏳ Sedang menganalisa nomor hoki...")

    try {
        let url = `https://api.botcahx.eu.org/api/primbon/nomerhoki?apikey=${global.apikeyalip}&nomer=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let data = await res.json()

        if (!data.status || !data.result.status) 
            return Reply("❌ Data tidak ditemukan atau API error.")

        let msg = data.result.message
        let hasil = 
`🔮 *ANALISA NOMOR HOKI*

📱 *Nomor:* ${msg.nomer_hp}
🔢 *Angka Shuzi:* ${msg.angka_shuzi}

✨ *Energi Positif*
• Kekayaan: ${msg.energi_positif.kekayaan}
• Kesehatan: ${msg.energi_positif.kesehatan}
• Cinta: ${msg.energi_positif.cinta}
• Kestabilan: ${msg.energi_positif.kestabilan}
• Persentase: ${msg.energi_positif.persentase}

⚠️ *Energi Negatif*
• Perselisihan: ${msg.energi_negatif.perselisihan}
• Kehilangan: ${msg.energi_negatif.kehilangan}
• Malapetaka: ${msg.energi_negatif.malapetaka}
• Kehancuran: ${msg.energi_negatif.kehancuran}
• Persentase: ${msg.energi_negatif.persentase}

📝 *Catatan:* ${msg.catatan}`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi error saat mengambil data nomor hoki.")
    }
}

handler.command = ["nomerhoki", "nohoki", "hoki"]

module.exports = handler