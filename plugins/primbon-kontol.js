let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);
    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.${command} Alif*`)

    await Reply("⏳ Sedang melakukan SCAN...")

    try {
        const nama = text
        const panjang = Math.floor(Math.random() * 30) + 1
        const kondisi = ["kering dan retak", "basah lengket", "berbulu aneh", "bau amis tajam", "berlumut sedikit"]
        const bau = ["amonia kuat", "bau sampah", "aroma basi", "bau keringat campur tanah", "bau pesing"]
        const warna = ["hijau lumut", "coklat gelap", "ungu pekat", "kuning pudar", "abu-abu berlendir"]
        const kemungkinan = ["menyebabkan rasa jijik mendalam", "membuat semua orang menjauh", "rawan infeksi", "mengundang serangga", "membuat muntah"]
        
        const result =
`🧪 *SCAN DETAIL*

👤 Nama: ${nama}
📏 Panjang: ${panjang} cm
🩸 Kondisi: ${kondisi[Math.floor(Math.random() * kondisi.length)]}
👃 Aroma: ${bau[Math.floor(Math.random() * bau.length)]}
🎨 Warna: ${warna[Math.floor(Math.random() * warna.length)]}
⚠️ Risiko: ${kemungkinan[Math.floor(Math.random() * kemungkinan.length)]}
📝 Catatan: Hasil scan ini menunjukkan kondisi yang perlu diwaspadai.`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: result
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi error saat melakukan scan.")
    }
}

handler.command = ["scankontol", "kontolscan"]

module.exports = handler