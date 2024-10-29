import process from 'process';

// Import and initialize Supabase
import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

// Access environment variables using NEXT_PUBLIC_ prefix
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Correct usage
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY; // Correct usage
const supabase = createClient(supabaseUrl, supabaseKey);

const forwarderOrigin = 'http://localhost:4200';

const initialize = () => {
    const connectButton = document.getElementById('connectWallet');
    const { ethereum } = window;

    const onboardMetaMaskClient = async () => {
        if (!isMetamaskInstalled()) {
            // Prompt the user to install MetaMask
            console.log("MetaMask is not installed :(");
            connectButton.value = "Click here to install MetaMask";
            connectButton.onclick = installMetaMask;
        } else {
            console.log("MetaMask is installed! Hurray!");
            connectButton.onclick = connectMetaMask;
        }
    };

    const connectMetaMask = async () => {
        connectButton.disabled = true;
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            connectButton.value = "Connected";
            console.log("accounts: ", accounts);
            const walletAddress = accounts[0];

            // Now store the wallet address in Supabase
            await storeWalletAddress(walletAddress);
        } catch (error) {
            console.error("Error occurred while connecting to MetaMask: ", error);
            connectButton.disabled = false;
        }
    };

    // Function to store wallet address using Supabase
    const storeWalletAddress = async (walletAddress) => {
        const { data, error } = await supabase
            .from('wallets')
            .insert([{ address: walletAddress }]);

        if (error) {
            console.error('Error storing wallet address:', error);
        } else {
            console.log('Wallet address stored successfully:', data);
        }
    };

    const isMetamaskInstalled = () => {
        return ethereum && ethereum.isMetaMask;
    };

    const installMetaMask = () => {
        const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
        connectButton.value = "Installation in progress";
        connectButton.disabled = true;
        onboarding.startOnboarding();
    };

    onboardMetaMaskClient();
};

window.addEventListener('DOMContentLoaded', initialize);
