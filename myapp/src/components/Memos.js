import { useState,useEffect } from "react"
const Memos=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;


    useEffect(()=>{
        const memosMessage=async()=>{
            
            const memos= await contract.getmemos()
            setMemos(memos);
        }
        contract && memosMessage()
        
    },[contract])

 

return (
<>
<p style={{textAlign:"center",marginTop:"20px",fontSize:"20px"}}>Messages</p>
{memos.map((memo,i)=> {
    
    return(
        <table key={i}>
            <tbody>
                <tr> 
                    <td style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",}} >{memo.name}</td>


                    <td style={{
                      backgroundColor: "whitesmoke",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",}}>{memo.message}</td>  


                    <td style={{
                      backgroundColor: "lightskyblue",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",}}>{new Date(memo.timestamp * 1000).toLocaleString()}</td>


                    <td style={{
                      backgroundColor:"lightpink",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",}}>{memo.from}</td>
                    
                </tr>
            </tbody>
        </table>
    )
})}
</>
)
}

export default Memos;