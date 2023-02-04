import React, { useContext, useState, useEffect, createContext, useCallback } from 'react'
import BlogFactory from '../abis/BlogFactory.json'
import BCToken from '../abis/BCToken.json'
import Web3 from 'web3';

const ContractContext = createContext();

export function useContract() {
    return useContext(ContractContext)
}
export function ContractProvider({ children }) {
    const [userAccount, setUserAccount] = useState()
    const [blogFactoryContract, setblogFactoryContract] = useState()
    const [tokenContract, setTokenContract] = useState()
    const [balance, setBalance] = useState()
    const [refresh, setRefresh] = useState(false)
    // const web3 = window.web3

    useEffect(() => {

        const loadWeb3 = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
            }
            if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
                console.log('Please use Metamask!!')
            }
        }

        const loadBlockchainData = async () => {

            const web3 = window.web3
            //Account which is connected to website
            const accounts = await web3.eth.getAccounts()
            setUserAccount({ account: accounts[0] })

            //network ID
            console.log(web3)
            const networkId = await web3.eth.net.getId()
            console.log(networkId)
            const networkData = BlogFactory.networks[networkId]
            const tokenNetworkData = BCToken.networks[networkId]

            if (networkData) {
                //Fetch Contract
                const abi = BlogFactory.abi
                const address = networkData.address
                const contract = new web3.eth.Contract(abi, address)
                setblogFactoryContract(contract)

                //token contract
                const tokenAbi = BCToken.abi
                const tokenAddress = tokenNetworkData.address
                const TokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)
                setTokenContract(TokenContract)
                //console.log(contract)
                //const memeHash = await contract.methods.get().call()
                //this.setState({memeHash})
            }
            else {
                // window.alert("Smart contract not deployed to detected network")
                console.log("Smart contract not deployed to detected network")

            }
        }

        loadWeb3()
        // getAccount()
        loadBlockchainData()
    }, [])

    useEffect(async () => {
        if (!tokenContract) return
        const balance = await tokenContract.methods.balanceOfUser(userAccount?.account).call()
        console.log(balance)
        setBalance(balance)
        setRefresh(false)
    })


    const value = {
        blogFactoryContract,
        userAccount,
        tokenContract,
        balance,
        refresh,
        setRefresh
    }
    return (
        <ContractContext.Provider value={value}>
            {children}
        </ContractContext.Provider>
    )
}