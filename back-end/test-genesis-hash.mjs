import { createHash } from "./src/utilities/hash.mjs";

const genesisHash = createHash(1, [], '######', 0, 3, 0);

console.log('GENESIS HASH:', genesisHash);