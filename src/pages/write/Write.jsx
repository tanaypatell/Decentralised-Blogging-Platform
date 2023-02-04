import { useState } from "react";
import "./write.css";
import { useContract } from "../../context/ContractProvider";
import ipfs from '../../ipfs'

export default function Write() {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [image, setImage] = useState();
  const [heroUrl, setHeroUrl] = useState();
  const [ipfsHash, setIpfsHash] = useState("");
  const [loading, setLoading] = useState(false)

  const { blogFactoryContract, userAccount } = useContract()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // submitfile()

    blogFactoryContract.methods.createBlog(title, para, ipfsHash).send({ from: userAccount.account }).then(r => {
      console.log(r)
      window.location = "/"
    })
  }

  const captureFile = (e) => {
    e.preventDefault()
    console.log(e.target.files)
    const file = e.target.files[0]
    const heroUrl = URL.createObjectURL(file);
    setHeroUrl(heroUrl)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setImage(Buffer(reader.result))
    }
  }
  const submitfile = (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(image)
    ipfs.files.add(image, (error, result) => {
      if (error) {
        console.error(error)
        return
      }
      console.log(result[0])
      setLoading(false)
      return setIpfsHash(result[0].hash)
    })
  }
  const handleCross = (e) => {
    e.preventDefault()
    setIpfsHash("")
    setHeroUrl("")
  }

  console.log("buffer", image, 'ipfs', ipfsHash)
  return (
    <div className="write">
      {heroUrl ?
        <div className="heroimage">
          <img
            className="writeImg"
            // src={`https://ipfs.infura.io/ipfs/${ipfsHash}`}
            src={heroUrl}
            alt=""
          />
          <div onClick={handleCross} className="herocross">X</div>
        </div> :
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "70vw", height: "250px", border: "1px solid black", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <input type="file" onChange={captureFile} />

          </div>
        </div>
      }
      {heroUrl ? <div className="herobtn">
        <button className="btn btn--tran" onClick={submitfile}>{loading ? 'Uploading' : `Ipfs Upload`}</button>
      </div> : <></>}

      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setPara(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit" onClick={handleSubmit} >
          Publish
        </button>
      </form>
    </div>
  );
}
