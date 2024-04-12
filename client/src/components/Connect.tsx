import { Button, Text } from "@chakra-ui/react";

const Connect = ({account, connectWallet, shortAddress}: any) => {
    return (
        <div>
          <div>
            {!account ? (
              <Button colorScheme='twitter' id="connectWalletBtn" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Text id="userAddress">Connected: {shortAddress(account)}</Text>
            )}
          </div>
          <div id="connectMessage">
            {!account ? <Text>Please connect your wallet to tweet.</Text> : ""}
          </div>
        </div>
      );
    };

export default Connect