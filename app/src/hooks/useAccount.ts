import { useCallback, useEffect, useState } from 'react';
import { useSigner } from './useSigner';

// Get the account address of the current user
export const useAccount = () => {
  const signer = useSigner();

  // Loading state and account address
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<string>();

  // Update the account with the latest signer address
  const updateAccount = useCallback(async () => {
    setLoading(true);
    setAccount(await signer.getAddress());
    setLoading(false);
  }, [signer]);

  // Keep account up-to-date
  useEffect(() => {
    updateAccount();
    window.ethereum.on('accountsChanged', updateAccount);
    return () => {
      window.ethereum.removeListener('accountsChanged', updateAccount);
    };
  }, [signer, updateAccount]);

  return { loading, account };
};
