import makeWASocket, { Browsers, makeInMemoryStore, useMultiFileAuthState } from 'baileys'
// you can use this package to export a base64 image or a canvas element.
import QRCode from 'qrcode'
import P from 'pino'

async function main() {

    // DO NOT USE IN PROD!!!!
    const { state, saveCreds } = await useMultiFileAuthState("lib/baileys");
    const Sulluz = makeWASocket(
        {
            browser: Browsers.macOS("Sulluz"), // can be Windows/Ubuntu instead of macOS
            auth: state, // auth state of your choosing,
            logger: P() // you can configure this as much as you want, even including streaming the logs to a ReadableStream for upload or saving to a file
        }
    );


    Sulluz.ev.on('connection.update', async (x) => {
        const { connection, lastDisconnect, qr } = x;
        // on a qr event, the connection and lastDisconnect fields will be empty

        // In prod, send this string to your frontend then generate the QR there
        if (qr) {
            // as an example, this prints the qr code to the terminal
            console.log(await QRCode.toString(qr, { type: 'terminal' }));
        } 
    }

    )

} main();