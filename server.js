const express = require("express"); const crypto = require("crypto"); const cors = require("cors");

const app = express(); app.use(cors());

app.get("/sign", (req, res) => { const API_KEY = process.env.CLOUDINARY_API_KEY; const API_SECRET = process.env.CLOUDINARY_API_SECRET; const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME; const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

if (!API_KEY || !API_SECRET || !CLOUD_NAME || !UPLOAD_PRESET) { return res.status(500).json({ error: "Missing Cloudinary configuration in environment variables." }); }

const timestamp = Math.floor(Date.now() / 1000); const stringToSign = timestamp=${timestamp}&upload_preset=${UPLOAD_PRESET}; const signature = crypto.createHash("sha1").update(stringToSign + API_SECRET).digest("hex");

res.json({ cloudName: CLOUD_NAME, apiKey: API_KEY, uploadPreset: UPLOAD_PRESET, timestamp, signature }); });

const PORT = process.env.PORT || 3000; app.listen(PORT, () => { console.log(Signing service listening on port ${PORT}); });
