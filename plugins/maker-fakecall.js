const axios = require('axios');
const fs = require('fs');
const { ImageUploadService } = require('node-upload-images');

let handler = async (m, { alip, text, Reply, command, isCreator }) => {
  if (!isRegistered(m.sender) && !isCreator)
    return Reply(global.mess.verifikasi);
if (checkLimit(m.sender, global.isPrem(m.sender), isCreator))
return Reply(global.mess.limit);
addLimit(m.sender, global.isPrem(m.sender), isCreator);

    if (!text) return Reply(`❌ Contoh: .${command} Nama|Durasi (balas/kirim gambar)`);

    try {
        // Cek gambar (reply / kirim)
        let qmsg = m.quoted ? m.quoted : m;
        let mime = (qmsg.msg || qmsg).mimetype || '';
        if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
            return Reply('🍁 Balas gambar atau kirim gambar dengan caption perintah!');
        }

        // Download & upload gambar
        let media = await alip.downloadAndSaveMediaMessage(qmsg);
        const service = new ImageUploadService('pixhost.to');
        let { directLink } = await service.uploadFromBinary(fs.readFileSync(media), 'media.png');
        await fs.unlinkSync(media);

        // Pisah argumen nama|durasi
        let [nama, durasi] = text.split('|').map(s => s && s.trim());
        if (!nama || !durasi) {
            return Reply(`🍂 Format salah!\n\n🧩 Contoh: .${command} Nama|Durasi`);
        }

        // URL API Fakecall
        let url = `https://api.zenzxz.my.id/maker/fakecall?nama=${encodeURIComponent(nama)}&durasi=${encodeURIComponent(durasi)}&avatar=${encodeURIComponent(directLink)}`;

        // Fetch hasil
        let response = await axios.get(url, { responseType: 'arraybuffer' });
        let buffer = Buffer.from(response.data, "binary");

        // Kirim hasil fakecall
        await alip.sendMessage(m.chat, {
            image: buffer,
            caption: `✨ *Fake Call Berhasil Dibuat!*\n\n👤 Nama: ${nama}\n⏰ Durasi: ${durasi} detik`
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        Reply("❌ Gagal membuat fakecall, coba lagi nanti.");
    }
}

handler.command = ["fakecall"];
handler.tags = ["maker"];
handler.help = ["fakecall <nama|durasi>"];

module.exports = handler;