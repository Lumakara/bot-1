// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const fs = require('fs');
const chalk = require('chalk');
const { version } = require("./package.json")
global.baileys = require('./package.json').dependencies['@whiskeysockets/baileys'] || 'unknown';
global.internalValidationKey = Buffer.from("LICENSE_VALIDATED").toString('base64');

// SETTING BOT
global.owner = '6285183518016'
global.versi = version
global.namaOwner = "ᴋᴜʟʟᴄᴏᴅᴇʀ"
global.packname = 'ᴋᴜʟʟᴄᴏᴅᴇʀ'
global.botname = '𝑳̴𝑼͟𝑴̴𝑨͟𝑲̴𝑨͟𝑹̴𝑨 𝑩̴𝑶͟𝑻▾'
global.botname2 = '𝑳̴𝑼͟𝑴̴𝑨͟𝑲̴𝑨͟𝑹̴𝑨 𝑩̴𝑶͟𝑻▾'

global.tempatDB = 'database.json' // Jangan ubah
global.botSecretKey = "alip-ai" // Jangan ubah

global.custompairing = "ALIPGGWP"; /* custom pairing lu */

// PAKASIR GATEWAY, GANTI PAKE PUNYA LU
global.slug = 'lumakara-store';
global.pkasirapikey = 'vv887w32RJ4tTn28xDcmRaop0YYZjKA4';

// ========= HARGA BUY PREM & SEWA BOT =========
global.harga = {
    prem: "5000",
    sewa: "10000"
}

// ======== APIKEY ALIP AI GAUSAH DI UBAH !!! ==============
global.apialip = "https://alipai-api.vercel.app"
global.btc = "https://api.botcahx.eu.org"
global.apikeyalip = "alipaiapikeybaru"
global.velyn = "https://velyn.mom"
global.apikeyvelyn = "zizzmarket"
global.yudzxml = "https://api.yydz.biz.id"
global.apikeyyud = "alipaixyudz"
global.termai = "https://api.termai.cc"
global.apitermai = "alipainewgen"

// ========PANEL SETTING !!!===============
global.egg = "15" // Egg ID
global.nestid = "5" // nest ID
global.loc = "1" // Location ID
global.domain = "https://lumakara.shanydev.web.id" // Domain lu
global.apikey = "ptla_qLs9rzEguQUZpkH4aBMUGuUTbxPj9OaVZ0MpDdDpvPR" //ptla
global.capikey = "ptlc_kfRDyZJWxGZZJVAyf8C101MCNm5T2961qhXCo4Arqs3" //ptlc
// ========================================

// Settings Link / Tautan
global.linkOwner = "https://wa.me/6285183518016"
global.linkGrup = "https://chat.whatsapp.com/Ikd1hr4JO9i6w5TlQRBzMH?mode=gi_c"

// Delay Jpm & Pushctc || 1000 = 1detik
global.delayJpm = 15000
global.delayPushkontak = 20000

// Settings Channel / Saluran
global.linkSaluran = "https://whatsapp.com/channel/0029VbAMjf51SWsyK2NmbC12"
global.idSaluran = "120363418916194798@newsletter"
global.namaSaluran = "𝑳̴𝑼͟𝑴̴𝑨͟𝑲̴𝑨͟𝑹̴𝑨 𝑩̴𝑶͟𝑻 OFC▾"


// Settings All Payment
global.dana = "085183518016" // ubah jadi nomor dana kalian 
global.gopay = "085183518016" // ubah jadi nomor gopay kalian


// Settings Image Url
global.image = {
// gambar menu awal
menu: "https://a.top4top.io/p_3692rlvcx1.jpg",
// menu v 2
menuv2: "https://a.top4top.io/p_3692rlvcx1.jpg", 
//banner welcome 
welcome: "https://c.top4top.io/p_36927rbg01.jpg", 
//banner left 
left: "https://e.top4top.io/p_3692wf91j1.jpg", 
// logo saat bot reply pesan
reply: "https://e.top4top.io/p_3692e58u31.jpg", 
canvas: "https://h.top4top.io/p_3692vcmjl1.jpg", 
// ubah jadi qris kalian
qris: "https://d.top4top.io/p_3692meimq1.jpg"
}
// Message Command 
global.mess = {
    limit: `🎀 *Limit habis*\nSilakan ketik *.claim* untuk klaim bonus limit\nAtau *.buyprem* untuk upgrade ke Premium.`,
    owner: `🎀 *Akses ditolak*\nFitur ini hanya tersedia untuk *Owner Bot*.`,
    verifikasi: `🎀 *Akses ditolak*\nSilakan ketik *.daftar nama,umur* untuk mengakses seluruh fitur bot.`,
    admin: `🎀 *Akses ditolak*\nFitur ini khusus untuk *Admin Grup*.`,
    botAdmin: `🎀 *Akses ditolak*\nBot harus menjadi *Admin Grup* untuk menjalankan fitur ini.`,
    group: `🎀 *Akses ditolak*\nFitur ini hanya dapat digunakan di dalam *Grup*.`,
    private: `🎀 *Akses ditolak*\nFitur ini hanya dapat digunakan di *Chat Pribadi*.`,
    prem: `🎀 *Akses ditolak*\nFitur ini hanya tersedia untuk *User Premium*.\nKetik *.prem* untuk informasi upgrade.`,
    wait: `🎀 *Mohon tunggu...*\nPermintaan sedang diproses.`,
    error: `🎀 *Terjadi kesalahan*\nSilakan coba kembali beberapa saat lagi.`,
    done: `🎀 *Berhasil*\nProses telah diselesaikan.`
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
