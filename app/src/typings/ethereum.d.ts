import { ethers } from 'ethers';

/**
 * Ethereum global object override
 * The type definitions included in ethers are incomplete, and do not have
 * some functions supported, such as `on` for event listening.
 */

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
