import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";


const getBalance = async () => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const address = new PublicKey('GaBWNHUuKpGso9YJTg4xYGZizaUQNZ7W77yBUNNMHuYJ');
    const balance = await connection.getBalance(address);

    console.log(`The balance of the account at ${address} is ${balance / LAMPORTS_PER_SOL} SOLS`);
    console.log(`✅ Finished!`)
}

const getBalanceMainet = async () => {
    let address;

    try {
        address = new PublicKey('BHoSFLLf6ymUgb1');
    } catch (error) {
        console.error(`Invalid public key`);
        return;
    }
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const balance = await connection.getBalance(address);

    console.log(`The balance of the account at ${address} is ${balance / LAMPORTS_PER_SOL} SOLS`);
    console.log(`✅ Finished!`)
}

getBalanceMainet()