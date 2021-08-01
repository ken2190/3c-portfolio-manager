import { sub, getTime } from 'date-fns';
import dotProp from 'dot-prop';

import { TconfigValues } from '@/types/config';

const configSchema = {
    apis: {
        type: "object",
        properties: {
            threeC: {
                type: "object",
                properties: {
                    key: {
                        type: ["string", "null"],
                        default: ""
                    },
                    secret: {
                        type: ["string", "null"],
                        default: ""
                    }
                }
            }
        }
    },
    general: {
        type: "object",
        properties: {
            defaultCurrency: {
                type: "string",
                default: "USD"
            },
            globalLimit: {
                type: "number",
                default: 250000
            }
        }
    },
    syncStatus: {
        type: "object",
        properties: {
            deals: {
                type: "object",
                properties: {
                    "lastSyncTime": {
                        type: ["number", "null"],
                        minimum: 0
                    }
                } 
            }
        }  
    },
    statSettings: {
        type: "object",
        properties: {
            startDate: {
                type: "number",
                default: "",
            },
            account_id: {
                type: ["array"],

            }
        }
    }
}



const defaultConfig:TconfigValues = {
    "apis": {
        "threeC": {
            "key": "",
            "secret": ""
        }
    },
    "general": {
        "defaultCurrency": "USD",
        "globalLimit": 250000
    },
    "syncStatus": {
        "deals": {
            "lastSyncTime": null,
        }
    },
    "statSettings": {
        "startDate": getTime(sub(new Date(), { days: 90 })),
        "account_id": [],
    }
}

// finding the data that exists based on the dotprop.
const findConfigData = ( config:object , path:string ) => {
    console.log('running find data')
    console.log({ config, path })
    if (dotProp.has(config, path)) return dotProp.get(config, path)
    return ""
}


export {
    defaultConfig,
    configSchema,
    findConfigData
}
