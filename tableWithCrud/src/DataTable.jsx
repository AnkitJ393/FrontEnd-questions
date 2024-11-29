import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

const DataTable = () => {

    const [formData,setFormData]=useState({
        name:'',
        gender:'',
        age:''
    })

    const [data,setData]=useState([]);
    const [editId, setEditId]=useState('');
    const [searchTerm,setSearchTerm]=useState('');
    const [currentPage,setCurrentPage]=useState(1);
    const outsideClick=useRef(false);
    const itemPerPage=5;
    const indexOfLastItem=currentPage*itemPerPage;
    const indexOfFirstItemPerPage=indexOfLastItem-itemPerPage;

    let filtereditems=data.filter((item)=>{
       return  item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    let filteredData=filtereditems.slice(indexOfFirstItemPerPage,indexOfLastItem);

    
    useEffect(()=>{
        if (!editId) return;
        const selectedtable=document.querySelectorAll(`[id='${editId}']`);
        selectedtable[0].focus();
    },[editId])

    useEffect(()=>{
        const handleClickOutside=(e)=>{
            if(outsideClick.current && !outsideClick.current.contains(e.target)){
                setEditId(false);
            }
        }
        document.addEventListener('click',handleClickOutside);
        return ()=>{
            document.removeEventListener('click',handleClickOutside)
        }
    },[])
    
    useEffect(()=>{
       setCurrentPage(1);
    },[searchTerm])


    const handleInputChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleAddClick=(e)=>{
        if(formData.name && formData.gender && formData.age){
            const newItem={
                id:Date.now(),
                name :formData.name,
                gender:formData.gender,
                age:formData.age    
            }
            setData([...data,newItem]);
            setFormData({name:'',age:'',gender:''}); 
                       
        }
    }

     const handleDelete=(id)=>{
        if(filteredData.length===1 && currentPage!==1){
            setCurrentPage(prev=>prev-1);
        }
            setData(data.filter((item)=>item.id!==id));
    }

    const handleEdit=(id,updatedData)=>{
        if(!editId || editId!==id){
            return;
        }

        const updatedList=data.map((item)=>item.id===id ? {...item,...updatedData}:item);
        setData(updatedList); 
    }

    const handleSearchTerm=(e)=>{
        setSearchTerm(e.target.value)
    }

    const paginate=(index)=>{
        setCurrentPage(index)
    }

  return (
    <div className='container'>
        <div className='add-container'>
            <div className="info-container">
                <input type="text" placeholder='Name' name='name' value={formData.name} onChange={handleInputChange}/>
                <input type="text" placeholder='Age' name='age' value={formData.age} onChange={handleInputChange}/>
                <input type="text" placeholder='Gender' name='gender' value={formData.gender} onChange={handleInputChange}/>    
            </div>
            <button className='add' onClick={handleAddClick}>Add</button>
        </div>
        <div className="search-table-container">
            <input type="text" value={searchTerm} placeholder='Search by name' onChange={handleSearchTerm} className='search-input' />

            <table ref={outsideClick}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        filteredData.map((tableData)=>{
                            return <tr key={tableData.id}> 
                                <td id={tableData.id}  contentEditable={editId===tableData.id} onBlur={(e)=>handleEdit(tableData.id,{name:e.target.innerText})}>{tableData.name}</td>
                                <td id={tableData.id}  contentEditable={editId===tableData.id} onBlur={(e)=>handleEdit(tableData.id,{gender:e.target.innerText})}>{tableData.gender}</td>
                                <td id={tableData.id}  contentEditable={editId===tableData.id} onBlur={(e)=>handleEdit(tableData.id,{age:e.target.innerText})}>{tableData.age}</td>
                                <td className='actions'>
                                    <button className='edit'  onClick={()=>setEditId(tableData.id)}>Edit</button>
                                    <button className='delete' onClick={()=>handleDelete(tableData.id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({length : Math.ceil(filtereditems.length/itemPerPage)},(_,index)=>{
                    return <button
                        key={index+1}
                        onClick={()=>paginate(index+1)}
                        style={{
                            backgroundColor:currentPage===index+1 &&'lightGreen'
                        }}
                    >
                        {index+1}
                    </button>
                })
            }
            </div>
        </div>
    </div>
  )
}

export default DataTable