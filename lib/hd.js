// © ALIP-AI | WhatsApp: 0812-4970-3469
// ⚠️ Do not remove this credit

const axios = require('axios')
const FormData = require('form-data')
const cheerio = require('cheerio')
const fs = require('fs');

async function imagetools(buffer, type) {
  try {
    const _type = ["removebg", "enhance", "upscale", "restore", "colorize"];

    if (!buffer || !Buffer.isBuffer(buffer)) {
      throw new Error("Image buffer is required");
    }

    if (!_type.includes(type)) {
      throw new Error(`Available types: ${_type.join(", ")}`);
    }

    const form = new FormData();
    form.append("file", buffer, `${Date.now()}_force.jpg`);
    form.append("type", type);

    const { data } = await axios.post(
      "https://imagetools.rapikzyeah.biz.id/upload",
      form,
      {
        headers: form.getHeaders(),
      }
    );

    const $ = cheerio.load(data);
    const res = $("img#memeImage").attr("src");

    if (!res) throw new Error("No result found");

    return res.startsWith("http")
      ? res
      : `https://imagetools.rapikzyeah.biz.id${res}`;
  } catch (error) {
    throw new Error(`[ImageTools Error] ${error.message}`);
  }
}

module.exports = { imagetools }
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
