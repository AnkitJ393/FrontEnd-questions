
const useTraverseTree=()=>{

    const insertNode=function(tree,folderId,item,isFolder){

        if(tree.id===folderId && tree.isFolder){
            tree.items.unshift({
                id:new Date().getTime(),
                name:item,
                isFolder: isFolder,
                items:[]
            })

            return tree;
        }

        let latestNode=[];

        latestNode= tree.items.map((obj)=>{
            return insertNode(obj,folderId,item,isFolder);
        })

        console.log(latestNode)

        return {...tree,items:latestNode};
        
    }

    const deleteNode = (tree, folderId) => {
        if (tree.id === folderId) return null; // If the target node is found, delete it by returning null.
    
        const updatedItems = tree.items
            ?.map((item) => deleteNode(item, folderId)) // Recursively delete from children.
            .filter(Boolean); // Remove any null values to keep structure clean.
        
            console.log(updatedItems)
        return { ...tree, items: updatedItems  }; // Always ensure items is an array.
    };

    const renameNode=(tree,folderId,item)=>{
        if(tree.id===folderId){
            tree.name=item;
        
            return tree;
        }

        let latestNode=tree?.items.map((obj)=>renameNode(obj,folderId,item));

        return {...tree,items:latestNode};

    }
    
        

    return {insertNode,deleteNode,renameNode}
}


export default  useTraverseTree;