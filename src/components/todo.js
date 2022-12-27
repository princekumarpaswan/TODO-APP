import { useState, useEffect } from "react"
import "./style.css";

// getting the locol data

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")
    if (lists) {
        return JSON.parse(lists)
    } else {
        return [];
    }
}


const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setEdititem] = useState("");
    const [toggleBtn, setToggeBtn] = useState(false)

    //add items to new state array

    const addItem = () => {
        if (!inputData) {
            alert("please fill the data")
        }
        else if (inputData && toggleBtn) {
            setItems(
                items.map((e) => {
                    if (e.id === isEditItem) {
                        return { ...e, name: inputData }
                    } else {
                        return e;
                    }
                })
            )
            setInputData([])
            setEdititem(null);
            setToggeBtn(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }

    // edit item button 

    const editItems = (index) => {

        const item_todo_edited = items.find((element) => {
            return element.id === index;
        });

        setInputData(item_todo_edited.name)
        setEdititem(index);
        setToggeBtn(true)

    }



    // deleting the Item
    const deleteItem = (id) => {
        const updatedItem = items.filter((e) => {
            return e.id !== id;
        })
        setItems(updatedItem)
    }

    // removing All the elements
    const removeAll = () => {
        setItems([])
    }

    // adding local storage

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])



    return (
        <>
            <div className="main-div" >
                <div className="child-div" >
                    <figure>
                        <img src="./todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here 🤞</figcaption>
                    </figure>
                    <div className="addItems">


                        <input type="text" placeholder="📝 Add Items"
                            className="form-control" value={inputData} onChange={(e) => { setInputData(e.target.value) }} />

                        {
                            toggleBtn ? (<i className="far fa-edit" aria-hidden="true" onClick={addItem} ></i>) :
                                (<i className="fa fa-plus" aria-hidden="true" onClick={addItem} ></i>)
                        }


                    </div>
                    {/* show our Items */}
                    <div className="showItems" >
                        {
                            items.map((element, index) => {
                                return (
                                    <div className="eachItem" key={index} >
                                        <h3>{element.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit" aria-hidden="true"
                                                onClick={() => { editItems(element.id) }} ></i>


                                            <i className="far fa-trash-alt" aria-hidden="true"
                                                onClick={() => { deleteItem(element.id) }} ></i>
                                        </div>
                                    </div>
                                )
                            })
                        }




                    </div>



                    {/* Remove all button */}
                    <div className="showItems" >
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} >
                            <span>CHECK LIST</span>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo