import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  contractAddress,
  profileContactAddress,
} from "../AddressABI/contractAddress";
import { abi } from "../../../artifacts/contracts/Gmedia.sol/Gmedia.json";
import { profileContractAbi } from "../AddressABI/profileContractAbi";
import Connect from "./Connect";
import AddTweet from "./AddTweet";
import Tweets from "./Tweets";
import ProfileCreation from "./ProfileCreation";
import { Heading, Spinner, Stack } from "@chakra-ui/react";
import Navbar from "./Navbar";

export interface Tweet {
  author: string; // Dirección Ethereum del autor del tweet
  content: string; // Contenido del tweet
  timestamp: number; // Marca de tiempo del tweet (UNIX timestamp)
  likes: number; // Número de likes del tweet
  id: any; // Identificador único del tweet
}

const Main = () => {
  const [contractInstance, setContractInstance] = useState<any>(null);
  const [tempWeb3, setTempWeb3] = useState<any>(null);
  const [profileContract, setProfileContract] = useState<any>(null);
  const [profileExists, setProfileExists] = useState(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const tempWeb3 = new Web3(window.ethereum);
        setTempWeb3(tempWeb3);
        const contract = new tempWeb3.eth.Contract(abi, contractAddress);
        const profileContract = new tempWeb3.eth.Contract(
          profileContractAbi.abi,
          profileContactAddress
        );
        setProfileContract(profileContract);
        const accounts = await tempWeb3.eth.getAccounts();
        if (accounts.length > 0) {
          setContractInstance(contract);
          setConnectedAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const loadTweets = async () => {
    if (!tempWeb3 || !contractInstance) {
      console.error("Web3 or contract not initialized.");
      return;
    }
    try {
      setIsLoading(true);
      const ownerTweets = await contractInstance.methods
        .getAllTweets(connectedAccount)
        .call();
      setTweets(ownerTweets);
    } catch (error) {
      console.error("Error loading tweets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  async function getProfile() {
    if (!tempWeb3 || !profileContract || !connectedAccount) {
      console.error(
        "Web3 or profileContract not initialized or connectedAccount not connected."
      );
      return;
    }

    const profile = await profileContract.methods
      .getProfile(connectedAccount)
      .call();
    setIsLoading(false);
    return profile.displayName;
  }

  async function checkProfile() {
    const userProfile = await getProfile();

    setProfileExists(userProfile);
  }

  const likeTweet = async (author: string, id: number) => {
    try {
      setIsLoading(true);
      await contractInstance.methods
        .likeTweet(author, id)
        .send({ from: connectedAccount });
      await loadTweets(); // Actualizar la lista de tweets después de dar like
    } catch (error) {
      console.error("Error liking tweet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function shortAddress(address: any, startLength = 6, endLength = 4) {
    if (address === connectedAccount && profileExists) {
      return profileExists;
    } else if (address) {
      return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }
  }

  useEffect(() => {
    if (contractInstance && connectedAccount) {
      if (profileExists) {
        loadTweets();
      } else {
        checkProfile();
      }
    }
  }, [contractInstance, connectedAccount, profileExists]);

  return (
    <Stack w="100%" align={"center"} spacing={12}>
      <Navbar />
      <Connect
        connectWallet={handleConnectWallet}
        account={connectedAccount}
        shortAddress={shortAddress}
      />
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      {!isLoading && connectedAccount && profileExists ? (
        <Stack spacing={12} boxShadow={"md"} p={4}>
          <AddTweet
            contract={contractInstance}
            account={connectedAccount}
            getTweets={loadTweets}
          />
          <Tweets tweets={tweets} likeTweet={likeTweet} isLoading={isLoading} />
        </Stack>
      ) : (
        connectedAccount &&
        !isLoading && (
          <ProfileCreation
            account={connectedAccount}
            profileContract={profileContract}
            checkProfile={checkProfile}
          />
        )
      )}
    </Stack>
  );
};

export default Main;
