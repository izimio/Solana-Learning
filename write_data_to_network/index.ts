import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    Keypair,
} from "@solana/web3.js";
import fs from "fs"

const path = "../../.config/solana/id.json";
const TO = "BHoSFLLf6ymUgb1LaMqtr2SGsVKEbTgxsMyreU2hmU31"

const senderPk = fs.readFileSync(path, "utf-8");

const signer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(senderPk)));
const toPubkey = new PublicKey(TO);


const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const buildTransaction = async () => {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: signer.publicKey,
            toPubkey,
            lamports: 1000000,
        })
    );
    const sig = await sendAndConfirmTransaction(connection, transaction, [signer]);

    console.log(`Transaction sent with signature: ${sig}`);
}

buildTransaction()