import { BigNumber, ethers } from 'ethers';

export const parseUnits = (amount: string | number) => ethers.utils.parseUnits(amount.toString(), 18);

export const formatUnits = (amount: BigNumber) => ethers.utils.formatUnits(amount, 18);
