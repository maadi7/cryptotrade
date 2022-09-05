import React,{ useState, useEffect } from "react";
import {ethers} from "ethers";

import {contractABI, contractAddress} from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum }  = window;

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContext = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContext;
}



export const TransactionProvider = ({children}) =>{

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);


    const handleChange = (e, name) =>{
        setFormData((prevState) =>({...prevState, [name]: e.target.value}));
    }
    const getAllTransactions = async () =>{
        try {
            if(!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) =>({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
            setTransactions(structuredTransactions);
            console.log(structuredTransactions);

        } catch (error) {
            console.log(error);

            throw new Error("NO Ethereum object.")
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try {
            if(!ethereum) return alert("Please install metamask");
    
            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            }
            else{
                console.log("No account Found");
            }
            
        } catch (error) {
            console.log(error);

            throw new Error("NO Ethereum object.")
            
        }
    }

    const checkIfTransactionsExist = async () =>{
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
            
        } catch (error) {
            console.log(error);

            throw new Error("NO Ethereum object.");
            
        }
    }

    const connectWallet = async () =>{
        try {
            if(!ethereum) return alert("Please install metamask");
            
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});

        setCurrentAccount(accounts[0]);


            
        } catch (error) {
            console.log(error);

            throw new Error("NO Ethereum object.")
        }

    }

    const sendTransaction = async () =>{
        
        try {
            if(!ethereum) return alert("Please install metamask");

            const {addressTo, amount, keyword, message} =formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log("Success");
            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

            window.reload();
            
        } catch (error) {
            console.log(error);

            throw new Error("NO Ethereum object.")
        }
    }

 

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[]);

    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, handleChange, formData, setFormData, sendTransaction, transactions, isLoading}} >
            {children}
        </TransactionContext.Provider>
    )
}