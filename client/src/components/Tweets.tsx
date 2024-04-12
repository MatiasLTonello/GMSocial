import { Tweet } from "./Main";
import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { Avatar, Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";

interface TweetsProps {
    tweets: Tweet[]
    likeTweet: (author: string, id: number) => Promise<void>;
    isLoading: boolean;
}

const Tweets = ({ tweets, likeTweet, isLoading }: TweetsProps) => {
  return (
    <Stack>
      {tweets.map((tweet: Tweet) => (
        <Flex key={tweet.id} className="tweet" p={4} borderBottom="1px solid" borderColor="gray.200">
          <Avatar size="md" mr={4} />
          <Box>
            <Text fontSize="md" fontWeight="bold">{tweet.author}</Text>
            <Text mt={2}>{tweet.content}</Text>
            <Flex alignItems="center" mt={2}>
              <IconButton onClick={() => likeTweet(tweet.author, tweet.id)} aria-label="Like" icon={<FiHeart />} variant="ghost" size="sm" colorScheme="red" mr={2} />
              <Text fontSize="sm">{String(tweet.likes)}  {tweet.likes === 1 ? 'like' : 'likes'}</Text>
            </Flex>
          </Box>
        </Flex>
      ))}
    </Stack >
  );
};
  
  export default Tweets;
  