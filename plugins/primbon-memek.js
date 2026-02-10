let handler = async (m, { alip, text, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan:\n\n*.scanmemek Alif*`)

    await Reply("⏳ Memproses data memek...")

    try {
        const nama = text.trim()

        // Data “primbon”
        const aroma = ["bau amis kuat", "aroma manis misterius", "bau lembap samar", "aroma tajam menyengat"]
        const ukuran = ["kecil rapuh", "sedang proporsional", "besar mengintimidasi", "luas mengagumkan"]
        const tekstur = ["licin lembab", "kenyal elastis", "berserat halus", "lembut dan hangat"]
        const efek = ["menarik perhatian lawan jenis", "menimbulkan rasa geli", "memancing tawa mendadak", "membuat penasaran orang sekitar"]
        const nasib = ["akan membawa keberuntungan terselubung", "menjadi misteri keluarga", "menjadi topik pembicaraan hangat", "mendapat perhatian tak terduga"]

        let hasil = 
`🔞 *SCAN MEMEK*

👤 Nama: ${nama}

🌸 Aroma: ${aroma[Math.floor(Math.random() * aroma.length)]}
📏 Ukuran: ${ukuran[Math.floor(Math.random() * ukuran.length)]}
💦 Tekstur: ${tekstur[Math.floor(Math.random() * tekstur.length)]}
⚠️ Efek: ${efek[Math.floor(Math.random() * efek.length)]}
📖 Nasib: ${nasib[Math.floor(Math.random() * nasib.length)]}

📝 *Catatan:* Hasil bersifat prediksi primbon dan hiburan.`

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: hasil
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        return Reply("❌ Terjadi kesalahan saat memindai.")
    }
}

handler.command = ["scanmemek", "memekprimbon", "memekscan"]

module.exports = handler