import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useContract } from "../../context/ContractProvider";


export default function Settings() {
  const [transfer, setTranfer] = useState()
  const [burn, setBurn] = useState()
  const [message, setMessage] = useState({ transfer: false, burn: false })
  const { tokenContract, userAccount, setRefresh } = useContract();

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!tokenContract) return
    console.log(transfer)
    tokenContract.methods.transferTo(transfer?.account, transfer?.amount).send({ from: userAccount.account }).then(r => {
      console.log(r)
      setMessage({ ...message, transfer: true })
      setRefresh(true)
      // window.location = "/"
    })
  }

  const handleBurn = async (e) => {
    e.preventDefault();
    if (!tokenContract) return

    tokenContract.methods.burn(burn).send({ from: userAccount.account }).then(r => {
      console.log(r)
      setMessage({ ...message, burn: true })
      setRefresh(true)
      // window.location = "/"
    })
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">

        <div className="settingbox">
          <h2 className="headerTitles">Tranfer</h2>
          <div>
            <div>Acount: </div>
            <input type="text" onChange={(e) => setTranfer({ ...transfer, account: e.target.value })} />
          </div>
          <div>
            <div>Amount: </div>
            <input type="text" onChange={(e) => setTranfer({ ...transfer, amount: parseInt(e.target.value) })} />
          </div>
          <button className="btn btn--tran" onClick={handleTransfer}>Transfer</button>
          {message?.transfer ? "Amount is Transfered" : ""}
        </div>
        <div className="settingbox">
          <h2 className="headerTitles">Burn</h2>
          <div>Burn Amount</div>
          <input type="text" onChange={(e) => setBurn(parseInt(e.target.value))} />
          <button className="btn btn--burn" onClick={handleBurn}>Burn</button>
        </div>
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}
