import { useState } from "react";
import { Link } from "react-router-dom";
import { useContract } from "../../context/ContractProvider";
import "./sidebar.css";

export default function Sidebar({ author }) {
  const [tip, setTip] = useState()
  const [message, setmessage] = useState(false)
  const { userAccount, tokenContract, setRefresh } = useContract()

  const handleTip = (e) => {
    e.preventDefault()

    tokenContract.methods.transferTo(author, tip).send({ from: userAccount.account }).then(r => {
      console.log(r)
      setmessage(true)
      setTip("")
      setRefresh(true)
      // window.location = "/"
    })

  }

  return (
    <div className="sidebar">
      {/* <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div> */}
      <div className="sidebarItem">
        <div className="sidebartip">
          <div className="sidebarTitle">Tip</div>
          <input value={tip} type="text" onChange={(e) => setTip(e.target.value)} />
          <button className="btn btn--tran" onClick={handleTip}>Tip</button>
          {message ? <div>Thanks For You Support.</div> : <></>}
        </div>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
