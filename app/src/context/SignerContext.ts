import React from 'react';
import { Signer } from 'ethers';

// Context holding the signer object exposed by the web3 provider
export const SignerContext = React.createContext<Signer | null>(null);
