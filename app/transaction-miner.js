class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain
    this.transactionPool = transactionPool
    this.wallet = wallet
    this.pubsub = pubsub
  }

  mineTransactions() {
    // TODO: 
    
    // get the transaction pool's valid transactions

    // generate the miner's reward

    // add a block consisting of these txs to the blockchain

    // broadcast the updated blockchain

    // clear the pool
  }
}

module.exports = TransactionMiner
