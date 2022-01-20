import { useContext } from 'react';
import { SignerContext } from '../context/SignerContext';

// Get the signer object exposed by the web3 provider
export const useSigner = () => {
  const signer = useContext(SignerContext);
  if (!signer) throw new Error('Signer was not in context.');
  return signer;
};
