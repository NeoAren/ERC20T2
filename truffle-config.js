const dotenv = require('dotenv');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Load environment variables
dotenv.config();

// Load mnemonic and infura project id
const mnemonic = process.env.MNEMONIC;
const projectId = process.env.INFURA_PROJECT_ID;
const infuraUrl = 'https://kovan.infura.io/v3/' + projectId;

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",     // Localhost (default: none)
    //   port: 8545,            // Standard Ethereum port (default: none)
    //   network_id: "*",       // Any network (default: none)
    // },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, infuraUrl),
      network_id: 42,
    },
  },
  compilers: {
    solc: {
      version: "0.8.10",
    }
  },
};
