import React from "react";
import css from "./styles/index.module.css"
import AddNewOwnerData from "./NewOwner";

const AllOwnerList = (props) => {

    const {data, newOwner, value, setNewOwner, addNewOwner, handelSubmit, remove} = props
    // console.log("user", user.toLowerCase())
    return(
        <>
        <div className={css.all_ownerlist_main}>
            <div className={css.all_ownerlist_conatiner}>
                {!newOwner && <div className={css.add_owner} onClick={addNewOwner}>Add New Owner</div>}
                {newOwner && <AddNewOwnerData value = {value} setNewOwner = {setNewOwner} handelCancel = {addNewOwner} 
                handelSubmit = {handelSubmit} />}
                <div className={css.all_ownerlist_conatiner_2}>
                    <h1>All Owner List: {data && data.length}</h1>
                </div>
                <div className={css.all_ownerlist_conatiner_2}>
                {data && data.map((item) => <div className={css.all_ownerlist_data}>
                    <div>{item}</div>
                    {<div className={css.remove_owner} onClick={() => remove(item)}>remove</div>}
                </div>)}
                </div>
            </div>
        </div>
        </>
    )
}

export default AllOwnerList