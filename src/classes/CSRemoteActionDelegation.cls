global with sharing class CSRemoteActionDelegation {

    @RemoteAction
    global static Account getAccount(String accountName) {
        Account account = [SELECT Id, Name, Phone, Type, NumberOfEmployees
        FROM Account WHERE Name = :accountName];
        return account;
    }


    @RemoteAction
    global static cspmb__Price_Item__c getCommercialProduct(String cpId) {
        cspmb__Price_Item__c cp = [SELECT Id, Name
        FROM cspmb__Price_Item__c WHERE Id = :cpId];
        return cp;
    }

    @RemoteAction
    global static List<cspmb__Price_Item__c> getCPs() {
        //function should be static and global else it will throw error
        List<cspmb__Price_Item__c> cp1 =
            [SELECT Id,Name,
                (SELECT Id, Name, cspmb__Add_On_Price_Item__r.Name FROM cspmb__Price_Item_Add_On_Price_Item_Association__r)
            FROM cspmb__Price_Item__c];
        if(cp1!=null && !cp1.isEmpty()){
            return cp1;
        }else{
            return  new List<cspmb__Price_Item__c>();
        }
    }


//    SELECT Id, Name, RecordTypeId, Type, Owner.FirstName, Owner.Id, Owner.LastName, Owner.Name, Owner.Username,
//            (SELECT Id, BillingStreet, CurrencyIsoCode, EndDate, OwnerExpirationNotice, StartDate, Status FROM Contracts),
//            (SELECT Id, Body, IsPrivate, Title FROM Notes),
//            (SELECT Id, Name, FirstName, LastName FROM Contacts)
//            FROM Account


    @RemoteAction
    global static List<cspmb__Price_Item_Add_On_Price_Item_Association__c> getCPAOAs() {
        //function should be static and global else it will throw error
        List<cspmb__Price_Item_Add_On_Price_Item_Association__c> cpaoa1 = [SELECT Id,Name FROM cspmb__Price_Item_Add_On_Price_Item_Association__c];
        if(cpaoa1!=null && !cpaoa1.isEmpty()){
            return cpaoa1;
        }else{
            return  new List<cspmb__Price_Item_Add_On_Price_Item_Association__c>();
        }
    }

    @RemoteAction
    global static List<cspmb__Commercial_Product_Association__c> getCPAs() {
        //function should be static and global else it will throw error
        List<cspmb__Commercial_Product_Association__c> cpa1 = [SELECT Id,Name FROM cspmb__Commercial_Product_Association__c];
        if(cpa1!=null && !cpa1.isEmpty()){
            return cpa1;
        }else{
            return  new List<cspmb__Commercial_Product_Association__c>();
        }
    }

//    @RemoteAction
//    global static List<cspmb__Price_Item__c> createNewCP() {
//        //function should be static and global else it will throw error
//        List<cspmb__Commercial_Product_Association__c> cpa1 = [SELECT Id,Name FROM cspmb__Commercial_Product_Association__c];
//        if(cpa1!=null && !cpa1.isEmpty()){
//            return cpa1;
//        }else{
//            return  new List<cspmb__Commercial_Product_Association__c>();
//        }
//    }


//    @RemoteAction
//    global static String saveData(String jsonData, String recordId) {
//
//        //get the stack we want to save.
//        Stack__c s = [
//                SELECT Id, Roles__c
//                FROM Stack__c
//                WHERE Id = :recordId LIMIT 1];
//        s.Roles__c = jsonData;
//
//        try {
//            update s
//        }catch (Exception e){
//            return e;
//        }
//        return 'success';
//    }

    @RemoteAction
    global static String saveNew(String name, String role) {
        // get list of commercial products
        cspmb__Price_Item__c[] cpList = [SELECT Id, Name FROM cspmb__Price_Item__c];
        //get the stack we want to save.
        cspmb__Price_Item__c newCP = new cspmb__Price_Item__c(Name = name, cspmb__Role__c = role);

        cpList.add(newCP);
        try {
            upsert cpList;
        } catch (Exception e)
        {
            return e.getStackTraceString();
        }
        return 'success';
    }

    // public static Map<Id, SObject> upsertAddons(List<cspmb__Add_On_Price_Item__c> records, Boolean reselectRecords) {
    //     return new AddonGridController().upsertRecords(records, reselectRecords);
    // }
}