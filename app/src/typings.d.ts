import { ethers } from 'ethers';

export interface EthereumEvent {
  connect: unknown;
  disconnect: unknown;
  accountsChanged: Array<string>;
  chainChanged: string;
  message: unknown
}

type EventKeys = keyof EthereumEvent;
type EventHandler<K extends EventKeys> = (event: EthereumEvent[K]) => void;

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider & {
      selectedAddress: string;
      on<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
      removeListener<K extends EventKeys>(event: K, eventHandler: EventHandler<K>): void;
      enable(): Promise<any>;
      request: (request: { method: string, params?: Array<any> }) => Promise<any>
    };
  }
}
