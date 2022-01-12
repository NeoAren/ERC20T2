const dotenv = require('dotenv');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Load environment variables
dotenv.config();

// Get mnemonic and infura URL
const mnemonic = process.env.MNEMONIC;
const projectId = process.env.INFURA_PROJECT_ID;
const infuraUrl = 'https://kovan.infura.io/v3/' + projectId;

// Get development network host and port
const developmentHost = process.env.DEVELOPMENT_HOST;
const developmentPort = process.env.DEVELOPMENT_PORT;

// Configure networks and the compiler
module.exports = {
  networks: {
    development: {
      host: developmentHost,
      port: developmentPort,
      network_id: '*',
    },
    kovan: {
      provider: () => (
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: infuraUrl,
        })
      ),
      network_id: 42,
      networkCheckTimeout: 999999,
    },
  },
  compilers: {
    solc: {
      version: '0.8.10',
    }
  },
};
