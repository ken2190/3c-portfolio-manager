import React, { useState, useEffect } from 'react';
import dotProp from 'dot-prop';

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core';

import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';

import { accountDataAll } from '@/utils/3Commas';
import { useGlobalState } from '@/app/Context/Config';
import { defaultConfig, findConfigData } from '@/utils/defaultConfig';
import { Type_Query_Accounts } from '@/types/3Commas'


const accountIdPath = 'statSettings.account_id'

// initializing a state for each of the two props that we are using.
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



const AccountDropdown = () => {
    const state = useGlobalState()
    const { config, state: { accountID, updateAccountID } } = state;


    /**
     * TODO 
     * - Move this into the config element and pass it down, or pull from the data element.
     */
    const [accountData, changeAccountData] = useState<Type_Query_Accounts[] | undefined>()
    const [select, selectElement] = useState<number[]>([])

    // @ts-ignore
    useEffect(() => {
        let mounted = true
        accountDataAll()
            .then((data: Type_Query_Accounts[]) => {
                if (mounted) {
                    // removing duplicate accounts
                    const filteredAccounts = Array.from(new Set(data.map(a => a.account_id))).map(id => data.find(a => a.account_id === id))

                    // @ts-ignore
                    changeAccountData(filteredAccounts)

                }
            })
        return () => mounted = false
    }, [])

    useEffect(() => {
        const findAccounts = findConfigData(config, accountIdPath);
        if(findAccounts !== ""){
            selectElement(findAccounts)
        }
        

    }, [config])

    const returnAccountNames = (accountData, accountIdArray) => {
        return accountData.filter(e => accountIdArray.includes(e.account_id)).map(e => e.account_name).join(', ')
    }

    // const [select, selectElement] = useState(() => accountID)


    // changing the select value
    const handleChange = (event) => {
        updateAccountID(event.target.value)
        selectElement(event.target.value)
        console.log(event.target.value)
    };


    return (
        <FormControl >
            <InputLabel>Account Filter</InputLabel>


            <Select
                multiple
                value={select}
                onChange={handleChange}
                input={<Input />}
                renderValue={() => (accountData.length > 0) ? returnAccountNames(accountData, select) : ""}
                MenuProps={MenuProps}
            >
                {/* Need to think through All because it's now a selector. */}
                {/* <MenuItem value=""></MenuItem> */}
                {accountData.map((account) => (
                    <MenuItem key={account.account_id} value={account.account_id}>
                        <Checkbox checked={select.indexOf(account.account_id) > -1} />
                        <ListItemText primary={account.account_name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )



}

export default AccountDropdown