// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const fetch = require('node-fetch');

let handler = async (m, { alip, text, usedPrefix, command, isCreator, Reply }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh penggunaan: *${usedPrefix}artinama Alif Alfarel*`);

    let loadingMsg = await Reply("⏳ Sedang mencari arti nama...");

    try {
        let nama = encodeURIComponent(text);
        let url = `${global.btc}/api/primbon/artinama?apikey=${global.apikeyalip}&nama=${nama}`;
        let response = await fetch(url);
        let data = await response.json();

        if (!data.status || !data.result.status) 
            return Reply("❌ Nama tidak ditemukan atau terjadi kesalahan API.");

        let result = data.result.message;
        let replyText =
`📛 *Nama:* ${result.nama}
💡 *Arti:* ${result.arti}
📝 *Catatan:* ${result.catatan}`;

        await alip.sendMessage(m.chat, {
            image: { url: global.image.menu },
            caption: replyText
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        return Reply("❌ Gagal mengambil data arti nama, coba lagi nanti!");
    }
}

handler.command = ["artinama", "arti-nama"];

module.exports = handler;