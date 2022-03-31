import React from "react";
import CreateNewTx from "./CreateNewtx";
import css from "./styles/index.module.css";
import {encryptData} from "../utils/helper"

const AllTransaction = (props) => {
    const {data, newTx, handelChange, handelSubmit, handelCancel, form, onClickNewTx, 
        pending, approve, completedTx} = props

        // console.log("data, pending => ", data, pending)

    return(
        <>
        <div className={css.all_tx_main}>
            <div className={css.all_tx_container}>
                {!newTx && <div className={css.add_owner} onClick={onClickNewTx}>Add New Transaction</div>}
                {newTx && <CreateNewTx form = {form} handelCancel = {handelCancel} handelChange = {handelChange}
                handelSubmit = {handelSubmit} />}
                <div className={css.all_tx_conatiner_2}>
                <h1>All Tx List: {data && data.length}</h1>
                </div>
                {data && data.length !== 0 && <div className={css.all_tx_conatiner_2}>
                    <table>
                        <tr>
                            <th>Transaction Id</th>
                            <th>Payee Address</th>
                            <th>Approve By</th>
                            <th>Pending By</th>
                            <th>Status</th>
                            <th>Amount(wei)</th>
                            <th>Action</th>
                        </tr>
                        {data && data.map((item) => <tr key={item.id}>
                            <td>{encryptData(item.id)}</td>
                            <td>{item.to}</td>
                            <td>{item.limit}</td>
                            <td>{!item.executed ? pending - item.limit < 0 ? 0 : pending - item.limit : 0}</td>
                            <td>{item.executed ? 'Completed' : 'Pending'}</td>
                            <td>{item.value}</td>
                            <td>
                                {!item.executed ? <div className={css.add_owner} 
                                onClick={item.limit == pending ? () => completedTx(item.id) : () => approve(item.id)}>{item.limit == pending ? 'submit tx' : 'approve tx'}</div>
                            : <div className={css.add_owner}>done</div>}
                            </td>
                        </tr>)}
                    </table>
                </div>}
            </div>
        </div>
        </>
    )
}

export default AllTransaction