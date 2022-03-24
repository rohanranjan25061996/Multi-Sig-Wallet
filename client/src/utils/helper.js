import {ethers} from "ethers"
import {MSWABI} from "../ABI/MultiSigWallet"
import {encrypt, decrypt} from "aes256"

export const getProvider = () => {
    const provider = new ethers.providers.JsonRpcBatchProvider(process.env.REACT_APP_RINKEBY_NEWTORK_URL);
    return provider
}

export const getSigner = () => {
    const provider = getProvider();
    const signer = provider.getSigner(process.env.REACT_APP_MY_ADDRESS);
    return signer
}

export const getProviderWallet = () => {
    const provider = getProvider();
    const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MSWABI, provider );
    return wallet
}

export const getSignerWallet = async () => {
    const signer = getSigner();
    const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MSWABI, signer );
    return wallet
}

export const getMoralisOption = (functionName, params) => {
    if(functionName && params){
        let option = {
            contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
            abi: MSWABI,
            functionName: `${functionName}`,
            params: {...params}
        }
        return option
    }else{
        return null
    }
}

export const encryptData = (data) => {
    return encrypt(process.env.REACT_APP_SALT, data.toString())
}

export const decryptData = (data) => {
    return decrypt(process.env.REACT_APP_SALT, data)
}

export const refineTxData = (data) => {
    if(data){
        let arr = []
        let obj = {}
        data?.forEach((item) => {
            obj = {
                executed: item.executed,
                id: item.id.toNumber(),
                limit: item.limit.toNumber(),
                to: item.to,
                value: item.value.toNumber()
            }
            arr.push(obj)
            obj = {}
        })

        return arr
    }
}