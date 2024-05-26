import Irys from '@irys/sdk';
import { DEVNET_PROVIDER_URL } from '../constants';

export async function getIrys() {
	const network = process.env.NEXT_PUBLIC_IRYS_ENVIRONMENT === "production" ? "mainnet" : "devnet";
	const providerUrl = process.env.NEXT_PUBLIC_IRYS_ENVIRONMENT === "production" ? "" : DEVNET_PROVIDER_URL;
	const token = "matic"; //token usado pra pagar o nó do arweave
	const privateKey = process.env.PRIVATE_KEY;
 
	const irys = new Irys({
		network,
		token,
		key: privateKey,
		config: { providerUrl },
	});

	return irys;
};

