
import React, { useState } from 'react'

const Folder = ({handleRenameNode,handleDeleteNode,handleInsertNode,explorer}) => {


const [expand,setExpand]=useState(false);
const  [showInput,setShowInput]=useState({
    visible:false,
    isFolder:null
})

const [rename,setRename]=useState(false);
const [renameValue,setRenameValue]=useState(explorer.name);

const handleNewFolder=(e,isFolder)=>{
    e.stopPropagation();
    setExpand(true)
    setShowInput({
        visible:true,
        isFolder
    })
}

const onAddFolder=(e)=>{
    
    if(e.key === "Enter" && e.target.value){
        handleInsertNode(explorer.id,e.target.value,showInput.isFolder);
        setShowInput({ ...showInput, visible: false });
    }

}

const deleteFolder=(e)=>{
    e.stopPropagation();
    handleDeleteNode(explorer.id);
    setExpand(false)
}

const renameFolderFile=(e)=>{
    e.stopPropagation();
    setRename(prev=>!prev);
}

const onRenameFolder=(e)=>{
    e.stopPropagation();
    if(e.key === "Enter" && e.target.value){
        handleRenameNode(explorer.id,e.target.value);
        setRename(prev=>!prev);
    }
}


if(explorer.isFolder){
    return (
        <div style={{marginTop:5}}>
            <div className='folder' onClick={()=>setExpand(!expand)}>
                {!rename ?
                    <span >📁{explorer.name}</span> :
                    <span>📁<input type='text' className="inputContainer__input"
                           autoFocus value={renameValue} 
                           onChange={(e)=>setRenameValue(prev=>e.target.value)}
                           onBlur={(e)=>setRename(prev=>!prev)}
                           onKeyDown={onRenameFolder}
                       />
                       </span>
                    
                 }
                
                <div>
                    <button onClick={(e)=>handleNewFolder(e,true)}>Folder +</button>
                    <button onClick={(e)=>handleNewFolder(e,false)}>File +</button>
                   {explorer.id!==`1` &&  <button onClick={(e)=>deleteFolder(e)}>Delete 🗑️</button>}
                   <button onClick={(e)=>renameFolderFile(e)}>Rename</button>
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
               <Folder  handleRenameNode={handleRenameNode} handleDeleteNode={handleDeleteNode} handleInsertNode={handleInsertNode} explorer={item} key={item.id} />
            ))}
        </div>
        
        </div>

  )
    }
    else{
        return   <div className='file'>
            {!rename ?
                    <span>📄 {explorer.name}</span> :
                    
                    <input type='text' className="inputContainer__input"
                           autoFocus value={renameValue} 
                           onChange={(e)=>setRenameValue(prev=>e.target.value)}
                           onBlur={(e)=>setRename(prev=>!prev)}
                           onKeyDown={onRenameFolder}
                       />
                    
                 }
            <div>
                <button onClick={(e)=>deleteFolder(e)}>Delete 🗑️</button>
                <button onClick={(e)=>renameFolderFile(e)}>Rename</button>
                
            </div>
        </div>
    }
}

export default Folder