
import { useState } from 'react';
import './App.css';
import explorer from './data/folderData';
import Folder from './components/Folder';
import useTraverseTree from './hooks/useTraverseTree';

function App() {

  const [explorerData,setExplorerData]=useState(explorer);
  const {insertNode,deleteNode,renameNode}=useTraverseTree();

  const handleInsertNode=(folderId,item,isFolder)=>{
      const finalTree=insertNode(explorerData,folderId,item,isFolder);
      setExplorerData(finalTree);
  }

  const handleDeleteNode=(folderId)=>{
    const finalTreeAfterDeletion=deleteNode(explorerData,folderId);
    setExplorerData(finalTreeAfterDeletion)
  }

  const handleRenameNode=(folderId,item)=>{
    const finalTree=renameNode(explorerData,folderId,item);

  }



  return (
  <div className='App'>
    <Folder handleRenameNode={handleRenameNode} handleDeleteNode={handleDeleteNode} handleInsertNode={handleInsertNode} explorer={explorerData}/>
  </div>
    
  );
}

export default App;
