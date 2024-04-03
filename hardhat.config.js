require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/kNjHKV8HjLMyTV9ILSsSptwq9lK9g8vu`,
      accounts: ["18be7110b9439524d9e384a2ff5665cc55d13706df39b5d89c2e1ea549f3266f"]
    }
  }
};


