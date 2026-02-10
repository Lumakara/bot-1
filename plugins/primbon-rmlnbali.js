const fetch = require('node-fetch')

let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} alip.1/6/2006|ujang.2/7/2005*`)

    await Reply("⏳ Sedang meramal jodoh Bali...")

    try {
        let [p1, p2] = text.split("|")
        if (!p1 || !p2) return Reply(`❌ Format salah!\n\n*.${command} nama1.tanggal/bulan/tahun|nama2.tanggal/bulan/tahun*`)

        let [nama1, tgl1] = p1.split(".")
        let [nama2, tgl2] = p2.split(".")

        if (!nama1 || !tgl1 || !nama2 || !tgl2) return Reply(`❌ Format salah!\n\n*.${command} alip.1/6/2006|ujang.2/7/2005*`)

        let [tanggal1, bulan1, tahun1] = tgl1.split("/")
        let [tanggal2, bulan2, tahun2] = tgl2.split("/")

        let url = `https://api.botcahx.eu.org/api/primbon/ramalanjodohbali?apikey=${global.apikeyalip}&nama1=${encodeURIComponent(nama1)}&tanggal1=${tanggal1}&bulan1=${bulan1}&tahun1=${tahun1}&nama2=${encodeURIComponent(nama2)}&tanggal2=${tanggal2}&bulan2=${bulan2}&tahun2=${tahun2}`
        
        let res = await fetch(url)
        let data = await res.json()

        if (!data.status || !data.result.status) 
            return Reply("❌ Data tidak ditemukan atau API error.")

        let msg = data.result.message
        let hasil = 
`💑 *RAMALAN JODOH BALI*

👤 *Nama Anda:* ${msg.nama_anda.nama}
📅 *Tanggal Lahir:* ${msg.nama_anda.tgl_lahir}

👥 *Nama Pasangan:* ${msg.nama_pasangan.nama}
📅 *Tanggal Lahir:* ${msg.nama_pasangan.tgl_lahir}

📖 *Hasil Ramalan:*
${msg.result}

📝 *Catatan:* ${msg.catatan}`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi error saat mengambil data ramalan jodoh Bali.")
    }
}

handler.command = ["ramalanjodohbali", "jodohbali"]

module.exports = handler