import React from "react";
import css from "./styles/index.module.css";


const CreateNewTx = (props) => {

    const {form, handelChange, handelSubmit, handelCancel} = props

    return(
        <>
        <div className={css.new_owner_form_tx}>
            <input placeholder="enter payee address" value={form._to} name={"_to"} onChange = {handelChange} />
            <input placeholder="enter amount to pay" value={form._value} name={"_value"} onChange = {handelChange} />
            <div className={css.submit} onClick={handelSubmit}>submit</div>
            <div className={css.cancel} onClick={handelCancel}>cancel</div>
        </div>
        </>
    )
}

export default CreateNewTx