// App.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import './App.css';  // Import your CSS file for styling

const injectedConnector = new InjectedConnector();

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const { account } = await injectedConnector.activate();
        setAccount(account);
      } else {
        throw new Error("No Ethereum provider found. Make sure MetaMask is installed and unlocked.");
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div className="app-container">
      <div className="background-image"></div>
      <div className="content-container">
        <h1>Token Airdrop App</h1>
        <p>Connected Account: {account}</p>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </div>
  );
}

export default App;
