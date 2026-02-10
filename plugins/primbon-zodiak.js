const fetch = require('node-fetch')

let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} pisces*`)

    await Reply("⏳ Sedang membaca zodiak lu...")

    try {
        let url = `https://api.siputzx.my.id/api/primbon/zodiak?zodiak=${encodeURIComponent(text)}`
        let res = await fetch(url)
        let data = await res.json()

        if (!data.status || !data.data)
            return Reply("❌ Data tidak ditemukan atau API error.")

        let z = data.data
        let hasil =
`♓ *ZODIAK ${text.toUpperCase()}*

✨ *Zodiak:* ${z.zodiak}
🔢 *Nomor Keberuntungan:* ${z.nomor_keberuntungan}
🌸 *Aroma Keberuntungan:* ${z.aroma_keberuntungan}
🪐 *Planet Mengitari:* ${z.planet_yang_mengitari}
🌼 *Bunga Keberuntungan:* ${z.bunga_keberuntungan}
🎨 *Warna Keberuntungan:* ${z.warna_keberuntungan}
💎 *Batu Keberuntungan:* ${z.batu_keberuntungan}
🌊 *Elemen Keberuntungan:* ${z.elemen_keberuntungan}

💞 *Pasangan Zodiak:*
${z.pasangan_zodiak}`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi error saat mengambil data zodiak.")
    }
}

handler.command = ["zodiak", "ramalanzodiak", "bintang"]

module.exports = handler