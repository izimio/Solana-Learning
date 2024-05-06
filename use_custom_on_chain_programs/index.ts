import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
    Keypair,
    TransactionInstruction,
} from "@solana/web3.js";
import fs from "fs"

const path = "../../.config/solana/id.json";
const TO = "BHoSFLLf6ymUgb1LaMqtr2SGsVKEbTgxsMyreU2hmU31"

const senderPk = fs.readFileSync(path, "utf-8");

const signer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(senderPk)));
const toPubkey = new PublicKey(TO);

const PROGRAMM_ADDRESS = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
const PROGRAM_DATA_ADDRESS = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod")


const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const ping = async () => {

    const transaction = new Transaction();

    const instruction = new TransactionInstruction({
        keys: [
            {
                pubkey: PROGRAM_DATA_ADDRESS,
                isSigner: false,
                isWritable: true
            }   
        ],
        programId: PROGRAMM_ADDRESS
    })
    transaction.add(instruction);

    const sig = await sendAndConfirmTransaction(connection, transaction, [
        signer
    ])
    console.log("tx", sig);
}

ping();