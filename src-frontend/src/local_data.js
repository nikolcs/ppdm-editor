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
                    "Id": "a1P4L000008rke5UAA",
                    "Name": "test package"
                },
                {
                    "Id": "a1P4L000008rlhqUAA",
                    "Name": "cp 1"
                },
                {
                    "Id": "a1P4L000008rli0UAA",
                    "Name": "cp3"
                },
                {
                    "Id": "a1P4L000008rlhvUAA",
                    "Name": "cp 2"
                },
                {
                    "Id": "a1P4L000008rlhwUAA",
                    "Name": "cp4"
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
                "Id": "a1P4L000008rke0UAA",
                "Name": "test"
            }
            return delayResponse(data, args);

        case "getCPAOAssociation":
            data = {
                "Id": "a1K4L000000g5nrUAA",
                "Name": "PAO-2",
                "cspmb__Add_On_Price_Item__c": "a0x4L000001M0mCQAS",
                "cspmb__Add_On_Price_Item__r": {
                    "Name": "Add On 3",
                    "cspmb__Add_On_Price_Item_Description__c": "Add On 3 desc",
                    "Id": "a0x4L000001M0mCQAS"
                }
            }
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
