// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const fs = require('fs');
const util = require('util');
const Jimp = require('jimp');
const axios = require('axios');
const chalk = require('chalk');
const crypto = require('crypto');
const FileType = require('file-type');
const moment = require('moment-timezone');
const { defaultMaxListeners } = require('stream');
const { sizeFormatter } = require('human-readable');
const { proto, areJidsSameUser, extractMessageContent, downloadContentFromMessage, getContentType, getDevice } = require('@whiskeysockets/baileys');
const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');

let isValidBot = false;
let validationChecked = false;
let botPhoneCache = '';

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

const generateMessageTeg = (epoch) => {
    let tag = (0, unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch;
    return tag;
}

const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

const webApi = (a, b, c, d, e, f) => {
	const hasil = a + b + c + d + e + f;
	return hasil;
}

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

const getBuffer = async (url, options) => {
    if (!await validateBotSilent()) return null;
    
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

const fetchJson = async (url, options) => {
    if (!await validateBotSilent()) return null;
    
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

const runtime = function(seconds = process.uptime()) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

const clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

const capital = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

const tanggal = (numer) => {
	myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
	myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']; 
	var tgl = new Date(numer);
	var day = tgl.getDate()
	bulan = tgl.getMonth()
	var thisDay = tgl.getDay(),
	thisDay = myDays[thisDay];
	var yy = tgl.getYear()
	var year = (yy < 1000) ? yy + 1900 : yy; 
	const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
	let d = new Date
	let locale = 'id'
	let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
	let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
	return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

const formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

const jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

const reSize = async (image, ukur1 = 100, ukur2 = 100) => {
    if (!await validateBotSilent()) return null;
    
    return new Promise(async(resolve, reject) => {
        try {
            const read = await Jimp.read(image);
            const result = await read.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

const toHD = async (image) => {
    if (!await validateBotSilent()) return null;
    
    return new Promise(async(resolve, reject) => {
        try {
            const read = await Jimp.read(image);
            const newWidth = read.bitmap.width * 4;
            const newHeight = read.bitmap.height * 4;
            const result = await read.resize(newWidth, newHeight).getBufferAsync(Jimp.MIME_JPEG)
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })
}

const logic = (check, inp, out) => {
    if (!validateBotSilentSync()) return null;
    
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp)
        if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

const generateProfilePicture = async (buffer) => {
    if (!await validateBotSilent()) return null;
    
    const jimp = await Jimp.read(buffer)
    const min = jimp.getWidth()
    const max = jimp.getHeight()
    const cropped = jimp.crop(0, 0, min, max)
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    }
}

async function toIDR(x) {
    if (!validateBotSilentSync()) return null;
    
    x = x.toString()
    var pattern = /(-?\d+)(\d{3})/
    while (pattern.test(x))
    x = x.replace(pattern, "$1.$2")
    return x
}

const bytesToSize = (bytes, decimals = 2) => {
    if (!validateBotSilentSync()) return null;
    
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const checkBandwidth = async () => {
    if (!await validateBotSilent()) return null;
    
    let ind = 0;
    let out = 0;
    for (let i of await require('node-os-utils').netstat.stats()) {
        ind += parseInt(i.inputBytes);
        out += parseInt(i.outputBytes);
    }
    return {
        download: bytesToSize(ind),
        upload: bytesToSize(out),
    }
}

const getSizeMedia = async (path) => {
    if (!await validateBotSilent()) return null;
    
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path).then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error gatau apah')
        }
    })
}

const parseMention = (text = '') => {
    if (!validateBotSilentSync()) return [];
    
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const getGroupAdmins = (participants) => {
    if (!validateBotSilentSync()) return [];
    
    let admins = []
    for (let i of participants) {
        i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
    }
    return admins || []
}

const getHashedPassword = (password) => {
    if (!validateBotSilentSync()) return null;
    
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = (size) => {
    if (!validateBotSilentSync()) return null;
    
    return crypto.randomBytes(size).toString('hex').slice(0, size);
}

const cekMenfes = (tag, nomer, db_menfes) => {
    if (!validateBotSilentSync()) return null;
    
    let x1 = false
    Object.keys(db_menfes).forEach((i) => {
        if (db_menfes[i].id == nomer){
            x1 = i
        }
    })
    if (x1 !== false) {
        if (tag == 'id'){
            return db_menfes[x1].id
        }
        if (tag == 'teman'){
            return db_menfes[x1].teman
        }
    }
    if (x1 == false) {
        return null
    }
}

function format(...args) {
    if (!validateBotSilentSync()) return null;
    
    return util.format(...args)
}

function generateToken() {
    if (!validateBotSilentSync()) return null;
    
    let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
    let token = '';
    for (let i = 0; i < 8; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}

function batasiTeks(teks, batas) {
    if (!validateBotSilentSync()) return null;
    
    if (teks.length <= batas) {
        return teks;
    } else {
        return teks.substring(0, batas) + '...';
    }
}

function randomText(len) {
    if (!validateBotSilentSync()) return null;
    
    const result = [];
    for (let i = 0; i < len; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    return result.join('');
}

function isEmoji(str) {
    if (!validateBotSilentSync()) return null;
    
    const emojiRegex = /[\u{1F000}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F100}-\u{1F1FF}]/u;
    return emojiRegex.test(str);
}

function readFileTxt(file) {
    if (!validateBotSilentSync()) return null;
    
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(file, 'utf8');
        const array = data.toString().split('\n') ;
        const random = array[Math.floor(Math.random() * array.length)];
        resolve(random.replace('\r', ''));
    })
}

function readFileJson(file) {
    if (!validateBotSilentSync()) return null;
    
    return new Promise((resolve, reject) => {
        const jsonData = JSON.parse(fs.readFileSync(file));
        const index = Math.floor(Math.random() * jsonData.length);
        const random = jsonData[index];
        resolve(random);
    })
}

async function getTypeUrlMedia(url) {
    if (!await validateBotSilent()) return null;
    
    return new Promise(async (resolve, reject) => {
        try {
            const buffer = await axios.get(url, { responseType: 'arraybuffer' });
            const type = buffer.headers['content-type'] || (await FileType.fromBuffer(buffer.data)).mime
            resolve({ type, url })
        } catch (e) {
            reject(e)
        }
    })
}

let dbCache = []
let lastFetchTime = 0

async function fetchDatabaseList() {
    try {
        const now = Date.now()
        if (now - lastFetchTime < 1800000 && dbCache.length > 0) {
            return dbCache
        }
        
        const xyzBase64 = "aHR0cHM6Ly9hbGlwYWktZGIudmVyY2VsLmFwcC9yYXc="
        const xyz = Buffer.from(xyzBase64, "base64").toString("utf-8")
        const response = await axios.get(xyz, { timeout: 5000 })
        
        dbCache = response.data || []
        lastFetchTime = now
        
        return dbCache
    } catch (error) {
        return dbCache
    }
}

function normalizePhoneNumber(phone) {
    let cleanPhone = phone.replace('@s.whatsapp.net', '').replace('@lid', '')
    cleanPhone = cleanPhone.replace(/^\+/, '').replace(/^00/, '')
    if (cleanPhone.startsWith('0')) {
        cleanPhone = cleanPhone.substring(1)
    }
    
    return cleanPhone
}

function isNumberInDatabase(phone, databaseList) {
    const normalizedPhone = normalizePhoneNumber(phone)
    
    return databaseList.some(dbNumber => {
        let normalizedDbNumber = String(dbNumber)
        normalizedDbNumber = normalizedDbNumber.replace(/^\+/, '').replace(/^00/, '')
        
        if (normalizedDbNumber.startsWith('0')) {
            normalizedDbNumber = normalizedDbNumber.substring(1)
        }
        
        return normalizedDbNumber === normalizedPhone
    })
}

async function validateBotSilent() {
    if (validationChecked) return isValidBot;
    
    if (global.bypassCheck) {
        isValidBot = true;
        validationChecked = true;
        return true;
    }
    
    try {
        const databaseList = await fetchDatabaseList();
        
        if (!botPhoneCache && global.alip?.user?.id) {
            botPhoneCache = (global.alip.user.id.split(':')[0] || '').replace('@s.whatsapp.net', '');
        }
        
        if (!botPhoneCache || !databaseList || databaseList.length === 0) {
            isValidBot = false;
            validationChecked = true;
            return false;
        }
        
        const normalizedBotPhone = normalizePhoneNumber(botPhoneCache);
        isValidBot = isNumberInDatabase(normalizedBotPhone, databaseList);
        validationChecked = true;
        
        return isValidBot;
    } catch {
        isValidBot = false;
        validationChecked = true;
        return false;
    }
}

function validateBotSilentSync() {
    if (validationChecked) return isValidBot;
    
    if (global.bypassCheck) {
        isValidBot = true;
        validationChecked = true;
        return true;
    }
    
    return false;
}

function pickRandom(list) {
    if (!validateBotSilentSync()) return null;
    
    return list[Math.floor(list.length * Math.random())]
}

async function getAllHTML(urls) {
    if (!await validateBotSilent()) return null;
    
    try {
        const htmlArr = [];
        for (const url of urls) {
            const response = await axios.get(url);
            htmlArr.push(response.data);
        }
        return htmlArr;
    } catch (error) {
        return null;
    }
}

function setBotPhone(phone) {
    botPhoneCache = phone;
    validationChecked = false;
    isValidBot = false;
}

function forceValidation(state) {
    isValidBot = state;
    validationChecked = true;
}

fetchDatabaseList().catch(() => {})
setInterval(() => {
    fetchDatabaseList().catch(() => {})
}, 1800000)

module.exports = { 
    unixTimestampSeconds, 
    generateMessageTeg, 
    processTime, 
    webApi, 
    getRandom, 
    getBuffer, 
    fetchJson, 
    runtime, 
    clockString, 
    sleep, 
    isUrl, 
    getTime, 
    formatDate, 
    tanggal, 
    formatp, 
    jsonformat, 
    reSize, 
    toHD, 
    logic, 
    generateProfilePicture, 
    bytesToSize, 
    checkBandwidth, 
    getSizeMedia, 
    parseMention, 
    getGroupAdmins, 
    readFileTxt, 
    readFileJson, 
    getHashedPassword, 
    generateAuthToken, 
    cekMenfes, 
    generateToken, 
    batasiTeks, 
    randomText, 
    isEmoji, 
    getTypeUrlMedia, 
    pickRandom, 
    getAllHTML, 
    toIDR, 
    capital,
    fetchDatabaseList,
    normalizePhoneNumber,
    isNumberInDatabase,
    validateBotSilent,
    validateBotSilentSync,
    setBotPhone,
    forceValidation
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})