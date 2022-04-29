import React, {useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import {ethers} from 'ethers';

import './App.css';

const ADDRESS = "0x0B47841653B28142a219B2656567E19A314b0E1d";
const ABI = [
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
		"name": "transfer1",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transfer2",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "transfer3",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

let kTContract;

function App() {
    //list of transection
    const [tranfer, setTransfer] = useState([]);

    // New list of transection
    const [newTranfer, setNewTransfer] = useState('');

    // Record transection
    const addTransfer = () => {
		if(newTranfer) {
			let num = tranfer.length + 1;
			let newEntry = { id: num, uName: newTranfer, amount: 0.01};
			setTransfer([...tranfer, newEntry]);
			setNewTransfer('');
		}
	}

    // Delete List of transection
    const deleteTransfer = (id) => {
		let newList = tranfer.filter( list => list.id !== id);
		setTransfer(newList);
	}

	// Connect with Smart contract && sign by Metamask
    useEffect( () => {
      connect();
    }, [] );

    async function connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      kTContract = new ethers.Contract(ADDRESS, ABI, signer);
      alert("Connection successful ^^", kTContract);
    }

	// choice 1: amount = 0.01 Ether
    async function transfer1() {
      const tx = await kTContract.transfer1({value: ethers.utils.parseEther("0.01")});
      await tx.wait();
      alert("Transfer 0.01 ether successful!!");
      
    }

	// choice 2: amount = 0.001 Ether
    async function transfer2() {
      const tx2 = await kTContract.transfer2({value: ethers.utils.parseEther("0.001")});
      await tx2.wait();
      alert("Transfer 0.001 ether successful!!");
    }

	// choice 3: amount = 0.0001 Ether
    const transfer3 = async () => {
      const tx3 = await kTContract.transfer3({value: ethers.utils.parseEther("0.0001")});
      await tx3.wait();
      alert("Transfer 0.0001 ether successful!!");
    };

	// Check total balance of all transection
    async function getBalance() {
      const balance = await kTContract.getBalance();
      alert("Total Balance: " + balance);
    }

    return (
		// User Interface
     	<div className='container App'> <br />
         	<h1> KEB-TANG SYSTEM </h1> <br />
         	<img src="\src\p3.png" alt="80" height="80" />
			<form>
				<br />
				<h5>Please enter information</h5>
			</form>

			{/* Add transfer list Form */}
			<div className='row'>
              	<div className='col'>
                  	<input 
						value={newTranfer}
						onChange={ (e) => setNewTransfer(e.target.value)}
						className='form-control form-control-lg' 
						placeholder="Enter your name"
						/><br />

                      	<h6>Please select the amount you want.</h6> <br />
						<div>
							<button onClick={() => transfer1()} class="btn btn-outline-success">0.01 Ether</button>
							<button onClick={() => transfer2()} class="btn btn-outline-success">0.001 Ether</button>
							<button onClick={() => transfer3()} class="btn btn-outline-success">0.0001 Ether</button>
						</div><br />
                       <button 
                          onClick={addTransfer}
                          className='btn btn-lg btn-success'
                       >Record Transections</button>
              	</div>
          	</div><br />

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
									<span className='listValue'>{list.amount + ' Ether'}</span>
								</div>
								<div className='iconsWrap'>
									<span title='Delete' onClick={() => deleteTransfer(list.id)}>
										<FontAwesomeIcon icon={faTrashCan}/>
									</span>
								</div>
							</div>
                  		</React.Fragment>
              		)
            	})
         	}
          	<button onClick={() => getBalance()} className='btn btn-lg btn-success'>Total Balance</button>
     	</div>
    )
}
export default App
