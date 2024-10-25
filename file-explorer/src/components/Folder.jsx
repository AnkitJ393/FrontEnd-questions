import React, { useState } from 'react'

const Folder = ({handleInsertNode,explorer}) => {


const [expand,setExpand]=useState(false);
const  [showInput,setShowInput]=useState({
    visible:false,
    isFolder:null
})

const handleNewFolder=(e,isFolder)=>{
    e.stopPropagation();
    setExpand(true)
    setShowInput({
        visible:true,
        isFolder
    })
}

const onAddFolder=(e)=>{
    console.log(e.key)
    if(e.key === "Enter" && e.target.value){
        handleInsertNode(explorer.id,e.target.value,showInput.isFolder);
        setShowInput({ ...showInput, visible: false });
    }

}


if(explorer.isFolder){
    return (
        <div style={{marginTop:5}}>
            <div className='folder' onClick={()=>setExpand(!expand)}>
                <span>📁 {explorer.name}</span>
                <div>
                    <button onClick={(e)=>handleNewFolder(e,true)}>Folder +</button>
                    <button onClick={(e)=>handleNewFolder(e,false)}>File +</button>
                </div>
            </div>


        <div className='' style={{display: expand?'block':'none',paddingLeft: 25 }}> 
        {
            showInput.visible && (
                <div className="inputContainer">
                    <span>{showInput.isFolder ? '📁' : '📄'}</span>
                    <input
                        type="text"
                        className="inputContainer__input"
                        autoFocus
                        onKeyDown={onAddFolder}
                        onBlur={()=> setShowInput({ ...showInput, visible: false })}
                    />
                </div>
            )
        }


            {explorer.items.map((item)=>(
               <Folder handleInsertNode={handleInsertNode} explorer={item} key={item.id} />
            ))}
        </div>
        
        </div>

  )
    }
    else{
        return <span className='file'>📄 {explorer.name}</span>
    }
}

export default Folder