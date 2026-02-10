const fetch = require("node-fetch");

let handler = async (m, { alip, text, command, Reply }) => {
    if (!text) return Reply(`❌ Contoh: *.otakudesu naruto*`);

    await Reply(`🔍 Mencari anime *${text}* di Otakudesu...`);

    try {
        let api = `https://api.siputzx.my.id/api/anime/otakudesu/search?s=${encodeURIComponent(text)}`;
        let res = await fetch(api);
        let data = await res.json();

        if (!data.status || !data.data.length) return Reply(`❌ Anime *${text}* tidak ditemukan.`);

        let anime = data.data[0]; 
        let hasil = `🎬 *${anime.title}*\n\n📌 Status: ${anime.status}\n⭐ Rating: ${anime.rating}\n🎭 Genre: ${anime.genres}\n🔗 Link: ${anime.link}`;

        await alip.sendMessage(m.chat, {
            image: { url: anime.imageUrl },
            caption: hasil
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        Reply("❌ Terjadi error saat mencari anime.");
    }
};

handler.command = ["otakudesu", "anime", "carianime"];

module.exports = handler;