"use client";

import {
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
  enhanceWalletWithAAConnector,
} from "@zerodevapp/wagmi/rainbowkit";

import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

import {
  ConnectButton,
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";

import { polygonMumbai, goerli } from "wagmi/chains";
import { createConfig, WagmiConfig, configureChains } from "wagmi";

import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

import { alchemyProvider } from "wagmi/providers/alchemy";

let projectId = "ddf26447-3e32-4129-8ae8-146806df5a76" || "";


function SocialWallet() { 

  const allowedChains = [polygonMumbai];

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    allowedChains,
    [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
  );

  const { wallets } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId,
    chains
  })

  const connectors = connectorsForWallets([  
    ...wallets,
    {
      groupName: "Social (AA)",
      wallets: [
        googleWallet({ options: { projectId } }),
        facebookWallet({ options: { projectId } }),
        githubWallet({ options: { projectId } }),
        discordWallet({ options: { projectId } }),
        twitchWallet({ options: { projectId } }),
        twitterWallet({ options: { projectId } }),
      ],
    },

    // For Web3 wallets like MetaMask, you can use them as they are (as EOA), or "wrap" them with AA using enhanceWalletWithAAConnector,
    //  in which case the wallet will be used as the signer/owner for your AA wallet
    /****************
     * In the context of enhancing a Web3 wallet like MetaMask with AA, it means "wrapping" the wallet with an AA connector.
     * This process effectively transforms the wallet from an EOA to a contract-based account, allowing it to be used as the signer/owner for an AA wallet.
     * ********** */
    // { https://github.com/HamzaAhmedSheikh/Web2-Auth-with-ZeroDev-Wagmi-and-Rainbowkit.git
    //   groupName: "EOA Wrapped with AA",
    //   wallets: [
    //     enhanceWalletWithAAConnector(metaMaskWallet({ chains }), {
    //       projectId: projectId,
    //     }),
    //   ],
    // },    
  ]);

  

  const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  return (
    <>      
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} modalSize={"compact"}>
          <ConnectButton           
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default SocialWallet;
