//https://eth-ropsten.alchemyapi.io/v2/I_frik69ASKBveasYTDmmLwHjcu76RgW



require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/I_frik69ASKBveasYTDmmLwHjcu76RgW',
      // accounts:['1546798328703c9053dbe206f104f215b54c7b5e16fd61fecd53415b808f9e03']
      accounts:['b7cc50d93b741feeb1891864c03af6a007ecfaf0b074dd012be825e70c37d6ab']
    }
  }
}