
const Connect = ({account, connectWallet, shortAddress}: any) => {
    return (
        <div>
          <div>
            {!account ? (
              <button id="connectWalletBtn" onClick={connectWallet}>
                Connect Wallet
              </button>
            ) : (
              <div id="userAddress">Connected: {shortAddress(account)}</div>
            )}
          </div>
          <div id="connectMessage">
            {!account ? "Please connect your wallet to tweet." : ""}
          </div>
        </div>
      );
    };

export default Connect