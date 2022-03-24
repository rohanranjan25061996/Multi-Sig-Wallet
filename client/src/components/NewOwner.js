import React from "react";
import css from "./styles/index.module.css"

const AddNewOwnerData = (props) => {

    const {value, setNewOwner, handelCancel, handelSubmit} = props
    return(
        <>
        <div className={css.new_owner_form}>
            <input placeholder="new onwer address" value={value} onChange={(e) =>  setNewOwner(e.target.value)} type= 'text' />
            <div className={css.submit} onClick={handelSubmit}>submit</div>
            <div className={css.cancel} onClick={handelCancel}>cancel</div>
        </div>
        </>
    )
}

export default AddNewOwnerData