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
                    "Id": "a1P4L000008rlIKUAY",
                    "Name": "New Master product from React3"
                },
                {
                    "Id": "a1P4L000008rke0UAA",
                    "Name": "test",
                    "cspmb__Price_Item_Add_On_Price_Item_Association__r": [
                        {
                            "cspmb__Price_Item__c": "a1P4L000008rke0UAA",
                            "Id": "a1K4L000000g4WhUAI",
                            "Name": "PAO-0",
                            "cspmb__Add_On_Price_Item__c": "a0x4L000001M0g3QAC"
                        }
                    ]
                },
                {
                    "Id": "a1P4L000008rke5UAA",
                    "Name": "test package"
                },
                {
                    "Id": "a1P4L000008rlNGUAY",
                    "Name": "New Master product from React3"
                }
            ]
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

