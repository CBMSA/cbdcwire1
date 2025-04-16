const express = require('express');
const Web3 = require('web3');
const router = express.Router();
require('dotenv').config();

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);
const tradeABI = require('../abi/TradeContractABI.json');
const contractAddress = '0xYourSmartContractAddress'; // Replace with deployed address

const contract = new web3.eth.Contract(tradeABI, contractAddress);

router.post('/start-trade', async (req, res) => {
  const { buyer, seller, amount } = req.body;

  try {
    const deploy = contract.deploy({
      data: '0xYourContractBytecode', // Replace with actual bytecode
      arguments: [seller, web3.utils.toWei(amount, 'ether')]
    });

    const createTransaction = await web3.eth.accounts.signTransaction(
      {
        from: buyer,
        data: deploy.encodeABI(),
        gas: '3000000',
      },
      process.env.PRIVATE_KEY
    );

    const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    res.json({ status: 'Contract deployed', contractAddress: createReceipt.contractAddress });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Trade initiation failed' });
  }
});

module.exports = router;