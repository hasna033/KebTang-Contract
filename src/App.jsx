import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import {ethers} from 'ethers';

//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

//import Navbar from './Navbar';
//import Users from './Users';


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

let kTContract;

function App() {

	//list of transection
	const [tranfer, setTransfer] = useState([
		{"id": 1, "uName": "List 1", "status": false},
		{"id": 2, "uName": "List 2", "status": false}
	]);

	// Temp State
	const [newTranfer, setNewTransfer] = useState('');
	const [updateData, setUpdateData] = useState('');

	// Add transfer
	const addTransfer = () => {
		if(newTranfer) {
			let num = tranfer.length + 1;
			let newEntry = { id: num, uName: newTranfer, status: false};
			setTransfer([...tranfer, newEntry]);
			setNewTransfer('');
		}
	}

	// Delete task
	const deleteTransfer = (id) => {
		let newList = tranfer.filter( list => list.id !== id);
		setTransfer(newList);
	}


  useEffect( () => {
    connect();
  }, [] );

    
  async function connect() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    kTContract = new ethers.Contract(ADDRESS, ABI, signer);
    console.log("Hello: ", kTContract);
  }

  async function getMessage() {
    const mesg = await kTContract.getMessage()
    setMessage(mesg);
    console.log("Get message: " + mesg)
  }

  async function setUIMessage() {
    const tx = await kTContract.setMessage(text);
    await tx.wait();
    await getMessage();
  }

  async function donate() {
    const tx = await kTContract.donate({value: ethers.utils.parseEther("0.001")});
    await tx.wait();
    console.log("Donate successful");
  }

  async function getBalance() {
    const balance = await kTContract.getBalance();
    console.log("Balance: " + balance);
  }

  return (
   <div className='container App'>

	   <br /> <br />
	   <h1> KEB-TANG </h1>
	   <br /> <br />

	   {/* Add transfer list Form */}

		<div className='row'>
			<div className='col'>
				<input 
					value={newTranfer}
					onChange={ (e) => setNewTransfer(e.target.value)}
					className='form-control form-control-lg' 
					/>
			</div>
			<div className='col-auto'>
				<button 
					onClick={addTransfer}
					className='btn btn-lg btn-success'
				>Transfer</button>
			</div>
		</div>
		<br />
	

	   {/* Display Kep-Tang */}

	   {tranfer && tranfer.length ? '' : 'No Transfer...'}

	   {tranfer && tranfer 
	   	  .sort((a,b) => a.id > b.id ? 1 : -1)
	   	  .map( (list, index) => {
			return(
				<React.Fragment key={list.id}>

					<div className="col listBg">
						<div className={list.status ? 'done' : ''}>
							<span className='listNumber'>{index + 1}</span>
							<span className='listText'>{list.uName}</span>
						</div>
						<div className='iconsWrap'>
							
							<span title='Delete'
								  onClick={() => deleteTransfer(list.id)}
							>
								<FontAwesomeIcon icon={faTrashCan}/>
							</span>
						</div>
					
					</div>

				</React.Fragment>
			)
		  })
	   }

     {/* <center>
      
     <input type="text" onChange={ (e) => setText(e.target.value)}/> <br />
     <button onClick={() => getMessage()}>Get message</button><br />
     <button onClick={() => setUIMessage()}>Set message</button>
	 <button onClick={() => donate()}>Donate</button>
	 <button onClick={() => getBalance()}>Balance</button>
     </center> */}
    
   </div>
  )
}

export default App
