import abi from "./contract/chai.json";
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import './App.css';


function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    Contract:null,
  });
  const [account,setaccount]=useState("none");
  useEffect(()=>{
    const connectwallet=async()=>{
      const contractaddress="0x41ab93276B2a90951447a0a44321Df62c1cDffA5";
      const contractABI=abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum){
          const account=await ethereum.request({
            method:"eth_requestAccounts",
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider =new ethers.providers.Web3Provider(ethereum);
          const signer=provider.getSigner();
          const contract=new ethers.Contract(
            contractaddress,
            contractABI,
            signer
          );
          setaccount(account);
          setState({provider,signer,contract});
        }
        else{
          alert("please install metamask");
        }

      }
      catch(error){
        console.log(error);
      }


    };
    connectwallet();
  },[])
  

  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <div style={{textAlign:"center",fontSize:"50px",backgroundColor:"burlywood",boxShadow:"10px"}}>Buy Me Chai</div>
      
      <p
        className="text-muted lead "
        style={{  marginLeft: "5px",textAlign:"center",fontSize:"25px",backgroundColor:"lavender" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
       <Buy state={state}></Buy>
        <Memos state={state} ></Memos>
      </div>
    </div>
  );
}

export default App;
