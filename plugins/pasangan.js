const fetch = require('node-fetch');

let handler = async (m, { alip, text, usedPrefix, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text || !text.includes(' ')) 
        return Reply(`❌ Contoh penggunaan: *.pasangan agus keyla*`);

    let loadingMsg = await Reply("⏳ Sedang mencari kecocokan pasangan...");

    try {
        let [cowo, cewe] = text.split` `;
        let url = `https://api.botcahx.eu.org/api/primbon/kecocokanpasangan?apikey=${global.apikeyalip}&cowo=${encodeURIComponent(cowo)}&cewe=${encodeURIComponent(cewe)}`;
        let response = await fetch(url);
        let data = await response.json();

        if (!data.status || !data.result.status) 
            return Reply("❌ Data pasangan tidak ditemukan atau terjadi kesalahan API.");

        let result = data.result.message;
        let replyText =
`💑 *Nama Anda:* ${result.nama_anda}
💞 *Nama Pasangan:* ${result.nama_pasangan}
🌟 *Sisi Positif:* ${result.sisi_positif}
⚠️ *Sisi Negatif:* ${result.sisi_negatif}
📝 *Catatan:* ${result.catatan}`;

        await alip.sendMessage(m.chat, {
            image: { url: result.gambar || global.image.menu },
            caption: replyText
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        return Reply("❌ Gagal mengambil data kecocokan pasangan, coba lagi nanti!");
    }
}

handler.command = ["pasangan", "kecocokanpasangan"];

module.exports = handler;