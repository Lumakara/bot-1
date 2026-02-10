const fetch = require('node-fetch')

let handler = async (m, { alip, command, isCreator, Reply }) => {
    await Reply("⏳ Mengambil berita terbaru CNBC...")

    try {
        let api = `https://api.botcahx.eu.org/api/news/cnbc?apikey=${global.apikeyalip}`
        let res = await fetch(api)
        let data = await res.json()

        if (!data.status || !data.result) return Reply("❌ Tidak ada berita ditemukan.")

        let berita = data.result.slice(0, 5) // ambil 5 berita teratas
        let list = berita.map((b, i) => 
            `*${i + 1}. ${b.berita}*\n🕒 ${b.berita_diupload}\n🔗 ${b.berita_url}`
        ).join("\n\n")

        let hasil = `📺 *BERITA CNBC TERBARU*\n\n${list}`

        await alip.sendMessage(m.chat, {
            image: { url: berita[0].berita_thumb },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        Reply("❌ Terjadi error saat mengambil berita.")
    }
}

handler.command = ["cnbc", "cnbcnews", "beritacnbc"]

module.exports = handler