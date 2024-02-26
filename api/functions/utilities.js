const {initializeApp, cert} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const admin = require('firebase-admin');

const crypto = require("crypto");
const password = ''

module.exports = {
  initFirebase,
  getIp,
  encryptString,
  decryptString,
  logRequest,
  addToReqLog,
  delay,
  ipWithinRateLimit
};

function getIp(req) {
  let ip = false;
  const ipOptions = {
      ip: req.ip || false,
      header: req.headers['x-forwarded-for'] || false,
      remoteAddress: req.connection.remoteAddress || false
  };
  for (let key in ipOptions) {
      if (ipOptions[key] && ipOptions[key].startsWith('::ffff:')) {
          ip = ipOptions[key];
          break;
      }
  }
  if (!ip) {
      ip = ipOptions.ip ||
          ipOptions.header ||
          ipOptions.remoteAddress || false
  }
  return ip;
};

async function initFirebase() {
  if (!admin.apps.length) {
    initializeApp();
  }
  const db = await getFirestore();
  return db;
}

function encryptString(str) {
  const key = crypto.scryptSync(password, "salt", 32);
  // Generate a random initialization vector (IV)
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  // Encrypt the string and convert it to hex
  let encrypted = cipher.update(str, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

function decryptString(str) {
  // Split the input string into the iv and the encrypted data
  const [ivHex, encrypted] = str.split(":");
  const iv = Buffer.from(ivHex, "hex");

  // Generate the key from the password and a salt
  const key = crypto.scryptSync(password, "salt", 32);
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

async function logRequest(req) {
  const db = await initFirebase();

  // Encrypt the body of the request to ensure encryption at rest
  let encryptedBody = encryptString(JSON.stringify(req.body));
  const ip = getIp(req);
  let requestData = {
    ip,
    time: new Date(),
    url: req.url,
    method: req.method,
    body: encryptedBody,
  };
  try {
    const requestCollection = db.collection("api-requests");
    let reqId = await requestCollection.add(requestData);
    return reqId.id;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

async function addToReqLog(docId, addition) {
  console.log('adding to req log')
  const db = await initFirebase();
  try {
    const requestCollection = db.collection("api-requests");
    await requestCollection.doc(docId).update(addition);
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function ipWithinRateLimit(ip, maxRequests=5, minutes=3) {
  const db = await initFirebase();
  try {
    const requestCollection = db.collection("api-requests");
    const currentTime = new Date();
    const startTime = new Date(currentTime - minutes * 60 * 1000);

    // This double where filtering requires a composite index
    // To create, execute this function, and firebase will log a link to create it
    const querySnapshot = await requestCollection
      .where("ip", "==", ip)
      .where("time", ">=", startTime)
      .get();

    if (querySnapshot.size >= maxRequests+1) {
      return false;
    }

    return true;

  } catch (err) {
    console.error(err.message);
    throw new Error(err.message);
  }
}
