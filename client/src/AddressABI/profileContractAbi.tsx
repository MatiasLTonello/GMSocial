export const profileContractAbi = {
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getProfile",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "displayName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "bio",
              "type": "string"
            }
          ],
          "internalType": "struct Profile.UserProfile",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "profiles",
      "outputs": [
        {
          "internalType": "string",
          "name": "displayName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "bio",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_displayName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_bio",
          "type": "string"
        }
      ],
      "name": "setProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
}
