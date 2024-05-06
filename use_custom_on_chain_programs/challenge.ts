

import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "@solana/web3.js";
import fs from "fs"

const path = "../../.config/solana/id.json"

const content = JSON.parse(fs.readFileSync(path, "utf8"));

const signer = Keypair.fromSecretKey(Uint8Array.from(content));

const connection = new Connection("https://api.devnet.solana.com", "processed")

const getBalance = async (publicKey: PublicKey) => {

    const balance = await connection.getBalance(publicKey);

    console.log("Balance of: ", publicKey.toBase58(), balance / LAMPORTS_PER_SOL);
}

const main = async () => {

    const newAccount = Keypair.generate();

    await getBalance(newAccount.publicKey);
    await getBalance(signer.publicKey);

    const transaction = new Transaction();

    transaction.add(
        SystemProgram.transfer({
            fromPubkey: signer.publicKey,
            toPubkey: newAccount.publicKey,
            lamports: LAMPORTS_PER_SOL
        })
    )

    const sig = await sendAndConfirmTransaction(connection, transaction, [signer])

    sig
    await getBalance(newAccount.publicKey);
    await getBalance(signer.publicKey);
}

main()