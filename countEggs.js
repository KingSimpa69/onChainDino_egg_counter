const ethers = require('ethers');

const settings = require('./settings.json')
const provider = new ethers.JsonRpcProvider(settings.alchemy_rpc)
const contract = new ethers.Contract(settings.dino_address, settings.abi, provider);

async function callDinoEggs() {
    let totalEggs
  try {
    const maxSupply = await contract.maxSupply();
    for (let tokenId = 0; tokenId < maxSupply; tokenId++) {
      const result = await contract.DinoEggs(tokenId);
      console.log(`${tokenId}: ${result}`);
      totalEggs += parseInt(result)
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log(totalEggs + " total dino eggs!")
  }
}

callDinoEggs();
