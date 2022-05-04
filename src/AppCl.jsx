import React, { Component } from 'react';
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlogFactory from './abis/BlogFactory.json'

//import { render } from 'react-dom';

const currentUser = true;
class Appcl extends Component {


  componentWillMount = async () => {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //Account which is connected to website
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)

    //network ID
    const networkId = await web3.eth.net.getId()
    console.log(networkId)
    const networkData = BlogFactory.networks[networkId]

    if (networkData) {
      //Fetch Contract
      // const abi = BlogFactory.abi
      // const address = networkData.address
      // const contract = new web3.eth.Contract(abi, address)
      // this.setState({ contract })
      // console.log(contract)
      //const memeHash = await contract.methods.get().call()
      //this.setState({memeHash})
    }
    else {
      window.alert("Smart contract not deployed to detected network")
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
    };
  }


  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      // window.alert('Please use Metamask!!')
      console.log("Please use Metamask!!")
    }
  }






  render() {
    return (
      <Router>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/posts">
            <Homepage />
          </Route>
          <Route path="/register">
            {currentUser ? <Homepage /> : <Register />}
          </Route>
          <Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
          <Route path="/post/:id">
            <Single />
          </Route>
          <Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
          <Route path="/settings">
            {currentUser ? <Settings /> : <Login />}
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default Appcl;