import { useState, useEffect } from 'react'
import {ethers} from 'ethers';
// import './App.css'



const ADDRESS = "0xCDecf16fDCD0FC7b3D3bf2010b8EF72052747d10";
const ABI = [
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let rieContract;

function App() {

  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  useEffect( () => {
    connect();
  }, [] );
  
  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    rieContract = new ethers.Contract(ADDRESS, ABI, signer);
    console.log("Hello: ", rieContract);
  }

  async function getMessage() {
    const mesg = await rieContract.getMessage()
    setMessage(mesg);
    console.log("Get message: " + mesg)
  }

  async function setUIMessage() {
    const tx = await rieContract.setMessage(text);
    await tx.wait();
    await getMessage();
  }

  async function donate() {
    const tx = await rieContract.donate({value: ethers.utils.parseEther("0.01")});
    await tx.wait();
    console.log("Donate successful");
  }

  async function getBalance() {
    
    console.log();
  }

  return (
   <div>
     <center>
      <h1>Hello:  {message}</h1>
     <input type="text" onChange={ (e) => setText(e.target.value)}/> <br />
     <button onClick={() => getMessage()}>Get message</button><br />
     <button onClick={() => setUIMessage()}>Set message</button>
     </center>
    
   </div>
  )
}

export default App
