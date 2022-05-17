import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionsContract;    
}



export const TransactionProvider = ({ children }) => {
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [currentAccount, setCurrentAccount] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions,setTransactions] = useState([]);
 
    const handleChange = (e, name) => {
        setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    }

    const getAllTransaction = async() => {
        try{
            if(!ethereum) return alert("Please install Metamask");
            const transactionsContract = getEthereumContract();
            const avaiableTransactions = await transactionsContract.getAllTransactions();
            const structuredTransactions = avaiableTransactions.map((transaction) => ({
                addressTo: transaction.reciever,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)

            }))
            setTransactions(structuredTransactions);
        }catch(error) {
            console.log("ERROR",error);
        }
    }

    const checkIsWalletConnected = async () => { 
        try {
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransaction();
            } else {

                console.log("No account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");

        }
    }

    const checkIfTransactionsExist = async () => {
        try{

            const transactionsContract = getEthereumContract()
            const transactionsCount = await transactionsContract.getTransactionCounter();
            window.localStorage.setItem("transactionCount", transactionsCount)
        }catch(error) {
            console.log(error);
            throw new Error("No ethereum object");
        }

    }  

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
          if (ethereum) {
            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
    
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [{
                from: currentAccount,
                to: addressTo,
                gas: "0x5208",
                value: parsedAmount._hex,
              }],
            });
    
            const transactionHash = await transactionsContract.addtoBlockChain(addressTo, parsedAmount, message, keyword);
    
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);
    
            const transactionsCount = await transactionsContract.getTransactionCounter();
    
            setTransactionCount(transactionsCount.toNumber());
            window.location.reload();
            
          } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
    

    useEffect(() => {
        checkIsWalletConnected();
        checkIfTransactionsExist();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount,formData,handleChange,sendTransaction,transactions,isLoading,transactionCount }}>
            {children}
        </TransactionContext.Provider>
    )
}