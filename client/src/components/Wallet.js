import React, {useState} from "react"
import { AuthContext } from "../contextApi/Auth"
import css from "./styles/index.module.css"
import {useMoralis} from "react-moralis"
import {checkOwner, getMoralisOption, getProviderWallet, refineTxData} from "../utils/helper"
import AllOwnerList from "./AllOwnerList"
import AllTransaction from "./AllTransaction"

const init = {
    _to: '',
    _value: ''
}

const Wallet = () => {

    const {Moralis} = useMoralis();
    const {setUserAddress, handelAuth, userAddress} = React.useContext(AuthContext)
    const [allOwnerList, setAllOwnerList] = useState([])
    const [addNewOwnerFlag, setNewOwnerFlag] = useState(false)
    const [newOwnerValue, setNewOwnervalue] = useState('')
    const [allTx, setAllTx] = useState([])
    const [newTx, setNewTx] = useState(init)
    const [newTxFlag, setNewTxFlag] = React.useState(false)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(0)
    const {logout} = useMoralis();
    React.useEffect(() => {
        getMultiSigWallet();
        getAllTxData();
        getLimit()
    }, [])

    const getLimit = async () => {
        setLoading(true)
        try{
            const providerWallet = getProviderWallet()
            const apprLimit = await providerWallet.approversLimit();
            let ll = apprLimit.toNumber();
            setLimit(ll)
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("==========error is getLimit function========", parseOk)
        }
    }

    const getMultiSigWallet = async () => {
        try{
            setLoading(true)
            const providerWallet = getProviderWallet();
            const ownerArr = await providerWallet.getAllOwnersList();
            if(ownerArr.length === 0){
                let payload = {
                    _owner: [userAddress],
                    _limit: 1
                }
                const option = getMoralisOption('multisigwallet', payload)
                const createWallet = await Moralis.executeFunction(option)
                await createWallet.wait();

                const getOwnerArr = await providerWallet.getAllOwnersList();
                setAllOwnerList(getOwnerArr)
                setLoading(false)

            }else{
                setAllOwnerList(ownerArr)
                setLoading(false)
            }
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("==========error is getMultiSigWallet function========", parseOk)
        }
    }

    const addNewOwnerFlagData = () => {
        setNewOwnervalue('')
        setNewOwnerFlag(prev => !prev)
    }

    const addNewTx = () => {
        setNewTx(init)
        setNewTxFlag(prev => !prev)
    }

    const addNewOwner = async () => {
        try{
            setLoading(true)
            if(newOwnerValue){
                let payload = {
                    _add: newOwnerValue
                }
                const option = getMoralisOption('addOwner', payload)
                const add = await Moralis.executeFunction(option)
                await add.wait();
                await getMultiSigWallet();
                addNewOwnerFlagData();
                setNewOwnervalue('')
                setLoading(false)
            }else{
                setLoading(false)
                alert(`Invalid new owner address ${newOwnerValue}`)
            }
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("=========addNewOwner==============", error)
        }
    }

    const removeOwnerFromList = async (address) => {
        try{
            setLoading(true)
            let payload = {
                _owner: address
            }
            const option = getMoralisOption('removeOwner', payload);
            const remove = await Moralis.executeFunction(option);
            await remove.wait();
            await getMultiSigWallet();
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("==========error is removeOwnerFromList function========", error)
        }
    }

    const handelChange = (e) => {
        const {name, value} = e.target;
        setNewTx({...newTx, [name]: value})
    }

    const getAllTxData = async() => {
        try{
            const providerWallet = getProviderWallet();
            const allTx = await providerWallet.getTransactionDetails();
            const data = refineTxData(allTx);
            setAllTx(data)
        }catch(error){
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("==========error is getAllTxData function========", parseOk)
        }
    }

    const submitNewTransaction = async () => {
        try{
            setLoading(true)
            if(newTx._to !== '' && newTx._value !== ''){
                const option = getMoralisOption('submitTransaction', newTx)
                const newtxData = await Moralis.executeFunction(option);
                await newtxData.wait();
                await getAllTxData();
                addNewTx()
                setLoading(false)
            }else{
                setLoading(false)
                alert("Invalid input for new transaction")
            }
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("==========error is submitNewTransaction function========", error)
        }
    }

    const approveTransaction = async (txId) => {
        setLoading(true)
        try{
            let payLoad = {
                _txId: txId,
            }
            const option = getMoralisOption('coniformTransaction', payLoad )
            const approveTx = await Moralis.executeFunction(option);
            await approveTx.wait();
            await getAllTxData();
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
            console.log("==========error is approveTransaction function========", error)
        }
    }

    const completeTheTx = async (txId) => {
        setLoading(true)
        try{
            let payload = {
                _txId: txId,
            }
            const option = getMoralisOption('executeTransaction', payload);
            const exe = await Moralis.executeFunction(option);
            await exe.wait();
            await getAllTxData();
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const logOutUser = () => {
        logout();
        setUserAddress("")
        handelAuth()
    }

    return(
        <>
         <div className={css.sign_out} onClick={logOutUser}> Sign Out</div>
        <div className={css.main}>
            {loading && <div className={css.loading}> Processing with request, please wait.......! </div>}
           {allOwnerList && allOwnerList.length !== 0 &&  <AllOwnerList data = {allOwnerList} newOwner = {addNewOwnerFlag} 
            setNewOwner = {setNewOwnervalue} value = {newOwnerValue} addNewOwner = {addNewOwnerFlagData}
            handelSubmit = {addNewOwner} remove = {removeOwnerFromList} user = {userAddress} />}
            <AllTransaction data = {allTx} newTx = {newTxFlag} handelChange = {handelChange} handelCancel = {addNewTx} 
            handelSubmit = {submitNewTransaction} form = {newTx} onClickNewTx = {addNewTx} pending = {limit}
            approve = {approveTransaction} completedTx = {completeTheTx}  />
        </div>
        </>
    )
}

export default Wallet