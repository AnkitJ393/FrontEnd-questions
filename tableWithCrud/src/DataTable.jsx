import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';

const DataTable = () => {
    const [formData, setFormData] = useState({ name: '', gender: '', age: '' });
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);
    const itemPerPage = 5;

    // Memoized filtered items
    const filteredItems = useMemo(() => {
        return data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const filteredData = useMemo(() => {
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredItems, currentPage, itemPerPage]);

    useEffect(() => {
        if (!editId || !tableRef.current) return;
        const editableRow = tableRef.current.querySelector(`[data-id='${editId}']`);
        editableRow?.focus();
    }, [editId]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (tableRef.current && !tableRef.current.contains(e.target)) {
                setEditId('');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddClick = () => {
        if (formData.name && formData.gender && formData.age) {
            const newItem = { id: Date.now(), ...formData };
            setData((prevData) => [...prevData, newItem]);
            setFormData({ name: '', age: '', gender: '' });
        }
    };

    const handleDelete = useCallback((id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        if (filteredData.length === 1 && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [filteredData.length, currentPage]);

    const handleEdit = useCallback((id, updatedData) => {
        if (!editId || editId !== id) return;
        setData((prevData) =>
            prevData.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
        );
    }, [editId]);

    const paginate = (index) => setCurrentPage(index);

    return (
        <div className="container">
            <div className="add-container">
                <div className="info-container">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="add" onClick={handleAddClick}>
                    Add
                </button>
            </div>
            <div className="search-table-container">
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search by name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <table ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((tableData) => (
                            <tr key={tableData.id}>
                                <td
                                    data-id={tableData.id}
                                    contentEditable={editId === tableData.id}
                                    onBlur={(e) =>
                                        handleEdit(tableData.id, { name: e.target.innerText })
                                    }
                                >
                                    {tableData.name}
                                </td>
                                <td
                                    data-id={tableData.id}
                                    contentEditable={editId === tableData.id}
                                    onBlur={(e) =>
                                        handleEdit(tableData.id, { gender: e.target.innerText })
                                    }
                                >
                                    {tableData.gender}
                                </td>
                                <td
                                    data-id={tableData.id}
                                    contentEditable={editId === tableData.id}
                                    onBlur={(e) =>
                                        handleEdit(tableData.id, { age: e.target.innerText })
                                    }
                                >
                                    {tableData.age}
                                </td>
                                <td className="actions">
                                    <button
                                        className="edit"
                                        onClick={() => setEditId(tableData.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete"
                                        onClick={() => handleDelete(tableData.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from(
                        { length: Math.ceil(filteredItems.length / itemPerPage) },
                        (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataTable;
