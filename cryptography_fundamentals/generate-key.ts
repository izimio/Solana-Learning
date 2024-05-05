import { Keypair } from "@solana/web3.js";
import fs from "fs";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

dotenv.config();

const generateKeyPair = () => {

    const keypair = Keypair.generate();

    console.log(`Public key: ${keypair.publicKey.toString()}`);
    console.log(`Secret key: ${keypair.secretKey.toString()}`);

    console.log(`✅ Generated keypair!`)
}

const loadKeyPairFile = () => {

    const path = "../../.config/solana/id.json";
    const secretKey = fs.readFileSync(path, "utf-8");

    if (!secretKey) {
        console.log(`❌ Secret key not found at ${path}`);
        return;
    }

    const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)));

    console.log(`Public key: ${keypair.publicKey.toString()}`);
    console.log(`Secret key: ${keypair.secretKey.toString()}`);

    console.log(`✅ Loaded keypair!`)
}

const loadKeyPairFromEnvironment = () => {

    const keypair = getKeypairFromEnvironment("PK");

    console.log(`Public key: ${keypair.publicKey.toString()}`);
    console.log(`Secret key: ${keypair.secretKey.toString()}`);

    console.log(`✅ Loaded keypair from environment!`)
}

loadKeyPairFromEnvironment()