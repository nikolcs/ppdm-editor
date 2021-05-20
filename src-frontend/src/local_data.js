function delayResponse(result,args) {
    setTimeout(() => {
        args[args.length-2](result, {status : 'OK'});
    }, 100);
}

invokeAction = function (...args) {
    let data = null;
    switch (args[0]) {

        case "getAccount":
            data = {
                Id: "0014L00000Ax9V3QAJ",
                Name: "GenePoint",
                NumberOfEmployees: 265,
                Phone: "(650) 867-3450",
                Type: "Customer - Channel",
            }
            return delayResponse(data, args);

        case "getCPs":
            data = [
                {
                    "Id": "a1P4L000008rke0UAA",
                    "Name": "test",
                    "cspmb__Price_Item_Description__c": "Enjoy the best WiFi coverage at home with StarHub Broadband",
                    "cspmb__Price_Item_Code__c": "STH-BB-2000FB",
                    "Image_URL__c": "https://ppdmui1-dev-ed--c.visualforce.com/resource/1621434285000/cpimage0",
                    "Rating__c": 5,
                    "Displayed_One_Off_Price__c": 10,
                    "Displayed_Recurring_Price__c": 17,
                    "cspmb__Price_Item_Add_On_Price_Item_Association__r": [
                        {
                            "cspmb__Price_Item__c": "a1P4L000008rke0UAA",
                            "Id": "a1K4L000000g5nrUAA",
                            "Name": "PAO-2",
                            "CreatedById": "0054L000000y47iQAA",
                            "cspmb__Sequence__c": 0,
                            "cspmb__Add_On_Price_Item__c": "a0x4L000001M0mCQAS",
                            "cspmb__Add_On_Price_Item__r": {
                                "Name": "Add On 3",
                                "cspmb__Add_On_Price_Item_Description__c": "Add On 3 desc",
                                "Id": "a0x4L000001M0mCQAS"
                            }
                        },
                        {
                            "cspmb__Price_Item__c": "a1P4L000008rke0UAA",
                            "Id": "a1K4L000000g4WhUAI",
                            "Name": "PAO-0",
                            "CreatedById": "0054L000000y47iQAA",
                            "cspmb__Sequence__c": 0,
                            "cspmb__Add_On_Price_Item__c": "a0x4L000001M0g3QAC",
                            "cspmb__Add_On_Price_Item__r": {
                                "Name": "Add on 1",
                                "cspmb__Add_On_Price_Item_Description__c": "addon desc",
                                "Id": "a0x4L000001M0g3QAC"
                            }
                        },
                        {
                            "cspmb__Price_Item__c": "a1P4L000008rke0UAA",
                            "Id": "a1K4L000000g5nmUAA",
                            "Name": "PAO-1",
                            "CreatedById": "0054L000000y47iQAA",
                            "cspmb__Sequence__c": 0,
                            "cspmb__Add_On_Price_Item__c": "a0x4L000001M0mBQAS",
                            "cspmb__Add_On_Price_Item__r": {
                                "Name": "Add On 2",
                                "cspmb__Add_On_Price_Item_Description__c": "add on 2 desc",
                                "Id": "a0x4L000001M0mBQAS"
                            }
                        }
                    ]
                },
                {
                    "Id": "a1P4L000008rlhqUAA",
                    "Name": "cp 1",
                    "cspmb__Price_Item_Code__c": "STH-BB-1000FB"
                },
                {
                    "Id": "a1P4L000008rn4kUAA",
                    "Name": "iphone 9",
                    "cspmb__Price_Item_Code__c": "STH-BB-3000FH",
                    "Displayed_One_Off_Price__c": 50,
                    "Displayed_Recurring_Price__c": 25
                },
                {
                    "Id": "a1P4L000008rn4pUAA",
                    "Name": "Samsung S9",
                    "cspmb__Price_Item_Code__c": "STH-BB-3000FH",
                    "Displayed_One_Off_Price__c": 47,
                    "Displayed_Recurring_Price__c": 20
                },
                {
                    "Id": "a1P4L000008rli0UAA",
                    "Name": "cp3",
                    "cspmb__Price_Item_Code__c": "STH-BB-5000FB",
                    "Displayed_One_Off_Price__c": 12.6,
                    "Displayed_Recurring_Price__c": 13.54
                },
                {
                    "Id": "a1P4L000008rlhvUAA",
                    "Name": "cp 2",
                    "cspmb__Price_Item_Code__c": "STH-BB-1000FB",
                    "Displayed_One_Off_Price__c": 9,
                    "Displayed_Recurring_Price__c": 5
                },
                {
                    "Id": "a1P4L000008rlhwUAA",
                    "Name": "cp4",
                    "cspmb__Price_Item_Code__c": "STH-BB-3000FB",
                    "Displayed_One_Off_Price__c": 47,
                    "Displayed_Recurring_Price__c": 458
                }
            ]
            return delayResponse(data, args);

        case "getCPAOAs":
            data = [
                {
                    "Id": "a1K4L000000g4WhUAI",
                    "Name": "PAO-0"
                },
                {
                    "Id": "a1K4L000000g5nmUAA",
                    "Name": "PAO-1"
                },
                {
                    "Id": "a1K4L000000g5nrUAA",
                    "Name": "PAO-2"
                }
            ]
            return delayResponse(data, args);

        case "getCPAs":
            data = [
                {
                    "Id": "a134L000000kBb3QAE",
                    "Name": "CPA-00000"
                }
            ]
            return delayResponse(data, args);

        case "getCommercialProduct":
            data = {
                "id": "a1P4L000008rke0UAA",
                "name": "test",
                "pricingElementWrappers": [
                    {
                        "coppraWrappers": [
                            {
                                "id": "a1N4L000000kFVNUA2",
                                "name": "CPPRA-000015",
                                "recurringAdjustment": 15,
                                "targetPrice": "Sales"
                            },
                            {
                                "id": "a1N4L000000kFVMUA2",
                                "name": "CPPRA-000014",
                                "recurringAdjustment": 15,
                                "targetPrice": "List"
                            }
                        ],
                        "id": "a1S4L000001A0GhUAK",
                        "name": "PE-000016",
                        "type": "Recurring Charge"
                    },
                    {
                        "coppraWrappers": [
                            {
                                "id": "a1N4L000000kFWGUA2",
                                "name": "CPPRA-000029",
                                "oneOffAdjustment": 1,
                                "targetPrice": "Sales"
                            },
                            {
                                "id": "a1N4L000000kFWFUA2",
                                "name": "CPPRA-000028",
                                "oneOffAdjustment": 1,
                                "targetPrice": "List"
                            }
                        ],
                        "id": "a1S4L000001A0HGUA0",
                        "name": "PE-000023",
                        "type": "One-off Charge"
                    }
                ]
            }
            return delayResponse(data, args);

        case "getCPAOAssociation":
            data = {
                "id": "a1P4L000008rke0UAA",
                "name": "test",
                "pricingElementWrappers": [
                    {
                        "coppraWrappers": [
                            {
                                "id": "a1N4L000000kFVNUA2",
                                "name": "CPPRA-000015",
                                "recurringAdjustment": 15
                            },
                            {
                                "id": "a1N4L000000kFVMUA2",
                                "name": "CPPRA-000014",
                                "recurringAdjustment": 15
                            }
                        ],
                        "id": "a1S4L000001A0GhUAK",
                        "name": "PE-000016",
                        "type": "Recurring Charge"
                    },
                    {
                        "coppraWrappers": [
                            {
                                "id": "a1N4L000000kFWGUA2",
                                "name": "CPPRA-000029",
                                "oneOffAdjustment": 1
                            },
                            {
                                "id": "a1N4L000000kFWFUA2",
                                "name": "CPPRA-000028",
                                "oneOffAdjustment": 1
                            }
                        ],
                        "id": "a1S4L000001A0HGUA0",
                        "name": "PE-000023",
                        "type": "One-off Charge"
                    }
                ]
            }
            return delayResponse(data, args);

        case "getPackages":
            data = [
                {
                    "Id": "a1P4L000008rlhrUAA",
                    "Name": "package 3",
                    "cspmb__member_commercial_product_associations__r": [
                        {
                            "cspmb__parent_commercial_product__c": "a1P4L000008rlhrUAA",
                            "Id": "a134L000000kC2QQAU",
                            "Name": "CPA-00003",
                            "cspmb__member_commercial_product__c": "a1P4L000008rli0UAA",
                            "cspmb__member_commercial_product__r": {
                                "Name": "cp3",
                                "Id": "a1P4L000008rli0UAA"
                            }
                        }
                    ]
                },
                {
                    "Id": "a1P4L000008rke5UAA",
                    "Name": "test package",
                    "cspmb__member_commercial_product_associations__r": [
                        {
                            "cspmb__parent_commercial_product__c": "a1P4L000008rke5UAA",
                            "Id": "a134L000000kBb3QAE",
                            "Name": "CPA-00000",
                            "cspmb__member_commercial_product__c": "a1P4L000008rke0UAA",
                            "cspmb__member_commercial_product__r": {
                                "Name": "test",
                                "Id": "a1P4L000008rke0UAA"
                            }
                        }
                    ]
                },
                {
                    "Id": "a1P4L000008rli5UAA",
                    "Name": "package 1",
                    "cspmb__member_commercial_product_associations__r": [
                        {
                            "cspmb__parent_commercial_product__c": "a1P4L000008rli5UAA",
                            "Id": "a134L000000kC2GQAU",
                            "Name": "CPA-00001",
                            "cspmb__member_commercial_product__c": "a1P4L000008rlhqUAA",
                            "cspmb__member_commercial_product__r": {
                                "Name": "cp 1",
                                "Id": "a1P4L000008rlhqUAA"
                            }
                        }
                    ]
                },
                {
                    "Id": "a1P4L000008rliAUAQ",
                    "Name": "package 2",
                    "cspmb__member_commercial_product_associations__r": [
                        {
                            "cspmb__parent_commercial_product__c": "a1P4L000008rliAUAQ",
                            "Id": "a134L000000kC2LQAU",
                            "Name": "CPA-00002",
                            "cspmb__member_commercial_product__c": "a1P4L000008rlhvUAA",
                            "cspmb__member_commercial_product__r": {
                                "Name": "cp 2",
                                "Id": "a1P4L000008rlhvUAA"
                            }
                        }
                    ]
                }
            ]
            return delayResponse(data, args);

        case "updateRecurringPricing":
            // data =
            return delayResponse(data, args);

        case "updateOneOffPricing":
            // data =
            return delayResponse(data, args);

        default:
            return Promise.reject(`Couldn't find action ${args[0]}`);
    }
}

window.Visualforce = Visualforce = {remoting: {timeout: 1, Manager: {invokeAction: invokeAction}}}

Visualforce.remoting.timeout = 120000;
window.CS = window.CS || {};

window.CS.PPDM = {
    vfRemotingManager: Visualforce.remoting.Manager,
    actions: {
        getAccount: 'getAccount',
        getCPs: 'getCPs',
        getCPAOAs: 'getCPAOAs',
        getCPAs: 'getCPAs',
        getCommercialProduct: 'getCommercialProduct',
        getCPAOAssociation: 'getCPAOAssociation',
        saveNew: 'saveNew',
        getPackages: 'getPackages',
        updateRecurringPricing: 'updateRecurringPricing',
        updateOneOffPricing: 'updateOneOffPricing'
    },
    session: {
        id: 'Session_Id'
    },
    userInfo: {
        userId: '0051t000002X0ttAAC',
        themeDisplayed: 'Theme3',
        profileId: '00e1t000001iBh0AAE',
        profileName: 'System Administrator',
        roleId: '00E1t000000tWv7EAE',
        roleName: 'System Admin',
        userType: 'Standard',
    }
};
