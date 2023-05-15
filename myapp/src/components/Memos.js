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

    //console.log(memos[0]);

return (
<>
<p>Message</p>
{memos.map((memo,i)=> {
    console.log("aaa rha h...");
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
                    <td>{memo.message}</td>            
                    <td>{String(memo.timestamp)}</td>
                    <td>{memo.from}</td>
                    
                </tr>
            </tbody>
        </table>
    )
})}
</>
)
}

export default Memos;