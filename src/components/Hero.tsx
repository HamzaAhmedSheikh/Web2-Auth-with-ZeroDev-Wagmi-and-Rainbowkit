// "use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import SocialWallet from "./walletConnector";


const Hero = () => {
  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto container text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-indigo-500 md:text-5xl lg:text-6xl">
            Account Abstraction Task
          </h1>
          <p className="mb-8 text-2xl font-medium text-indigo-500 lg:text-xl sm:px-16 xl:px-48">
            Concepts, Transactions, Mint NFTs and SocialWallets
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            
            <SocialWallet />
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Hero;