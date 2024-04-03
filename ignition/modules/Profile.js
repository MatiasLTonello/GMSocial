const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("ProfileModule", (m) => {

  const profileContract = m.contract("Profile", []);

  return { profileContract };
});
