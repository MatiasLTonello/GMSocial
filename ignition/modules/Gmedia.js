const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("GmediaModule", (m) => {

  const gmediaContract = m.contract("Gmedia", ["0x2db2EDe3585212519A5AD5FBDe99035549115711"]);

  return { gmediaContract };
});
