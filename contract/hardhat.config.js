require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
     url:"https://eth-rinkeby.g.alchemy.com/v2/7dhGJ8gyYAmoFO0vhPh95EhIArSePWJm",
     accounts:["29988f8fc39cda6beba54d14a5336e7201d8104e3be4657ae1481f2498e23e53"]
    }
  }
};
// PRIVATE_KEY = 29988f8fc39cda6beba54d14a5336e7201d8104e3be4657ae1481f2498e23e53
// RINKEBY_RPC_URL = https://eth-rinkeby.g.alchemy.com/v2/7dhGJ8gyYAmoFO0vhPh95EhIArSePWJm
// ETHERSCAN_API_KEY = 8PHTXVDVB825AEBXVAI3NVAUZ1ID8K3EW8
// PINATA_API_KEY = 66c1773ab7eda29f53d1
// PINATA_API_SECRET = 0e269b974a9af8aa9d8c4919afa11a163b59c9b3bb52c681b0e80257a60ce768
// UPLOAD_TO_PINARTA = false