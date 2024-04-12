import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const AddTweet = ({ contract, account, getTweets }: any) => {
  const [newTweet, setNewTweet] = useState("");
  const [loading, setLoading] = useState(false);

  async function createTweet(tweet: any) {
    if (!contract || !account) {
      console.error(
        "Web3 or contract not initialized or account not connected."
      );
      return;
    }
    try {
      setLoading(true);
      await contract.methods.createTweet(tweet).send({ from: account });
      getTweets();
    } catch (error) {
      console.error("User rejected request:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={8}>
      <form
        id="tweetForm"
        onSubmit={(e) => {
          e.preventDefault();
          createTweet(newTweet);
        }}
      >
        <Stack spacing={4}>
          <Textarea
            id="tweetContent"
            rows={4}
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
          />
          <br />
          <Button
            colorScheme="twitter"
            id="tweetSubmitBtn"
            isLoading={loading}
            isDisabled={loading}
            type="submit"
          >
            {loading ? <div className="spinner"></div> : <>Tweet</>}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddTweet;
