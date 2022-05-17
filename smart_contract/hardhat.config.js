

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity : '0.8.0', // solidity version of smart contract
  networks : {
    ropsten : {
      url :"https://eth-ropsten.alchemyapi.io/v2/Mn1o4wfYENOBFm3nnicuRZrk9yaBK_xA", // alchemy url for the deployment of smart contract
      accounts : ['5891b493c71e777c3d64d82695e379e4738600dfcbce1dc272c6c08e3f094c35'] //private key
    }
  }
}