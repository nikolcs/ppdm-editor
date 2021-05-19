global with sharing class CSRemoteActionDelegation {

    @RemoteAction
    global static cspmb__Price_Item__c getCommercialProduct(String cpId) {
        List<cspmb__Price_Item__c> cpL = [SELECT Id, Name FROM cspmb__Price_Item__c WHERE Id = :cpId LIMIT 1];
        if (cpL.size() > 0) {
            cspmb__Price_Item__c cp = cpL[0];
            return cp;
        }
        return null;
    }

    @RemoteAction
    global static cspmb__Price_Item_Add_On_Price_Item_Association__c getCPAOAssociation(String cpaoaId) {
        List<cspmb__Price_Item_Add_On_Price_Item_Association__c> cpaoaL =
            [SELECT Id, Name, cspmb__Add_On_Price_Item__r.Name, cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c
            FROM cspmb__Price_Item_Add_On_Price_Item_Association__c WHERE Id = :cpaoaId LIMIT 1];
        if (cpaoaL.size() > 0) {
            cspmb__Price_Item_Add_On_Price_Item_Association__c cpaoa = cpaoaL[0];
            return cpaoa;
        }
        return null;
    }

    @RemoteAction
    global static List<cspmb__Price_Item__c> getPackages() {
        List<cspmb__Price_Item__c> packages =
        [SELECT Id, Name,
            (SELECT Id, Name, cspmb__member_commercial_product__r.Name FROM cspmb__member_commercial_product_associations__r)
        FROM cspmb__Price_Item__c WHERE cspmb__Role__c = 'Package'];

        if(packages!=null && !packages.isEmpty()){
            return packages;
        } else {
            return  new List<cspmb__Price_Item__c>();
        }
    }

    @RemoteAction
    global static List<cspmb__Price_Item__c> getCPs() {
        List<cspmb__Price_Item__c> cps =
            [SELECT Id,Name,
                (SELECT Id, Name, CreatedById, cspmb__Sequence__c, cspmb__Add_On_Price_Item__r.Name, cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c FROM cspmb__Price_Item_Add_On_Price_Item_Association__r)
            FROM cspmb__Price_Item__c WHERE cspmb__Role__c = 'Commercial Product'];
        if(cps!=null && !cps.isEmpty()){
            return cps;
        } else {
            return  new List<cspmb__Price_Item__c>();
        }
    }

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

    @RemoteAction
    global static void updateRecurringPricing(String productId) {

        List<cspmb__Pricing_Element_Type__c> recurringPETL =
            [SELECT Id, Name FROM cspmb__Pricing_Element_Type__c
            WHERE cspmb__type__c = 'Recurring Charge' AND Name = 'Recurring Charge' LIMIT 1];

        String recurringPETId = recurringPETL[0].Id;

        List<cspmb__Pricing_Element__c> recurringList =
            [SELECT Id, Name FROM cspmb__Pricing_Element__c
                WHERE cspmb__commercial_product__r.Id =: productId
                AND cspmb__pricing_element_type__r.cspmb__type__c = 'Recurring Charge'
                AND cspmb__pricing_element_type__r.Name = 'Recurring Charge'];

        if (recurringList.size() > 0) {
            return;
        } else {
            cspmb__Pricing_Element__c newRC = new cspmb__Pricing_Element__c();
            newRC.cspmb__pricing_element_type__c = recurringPETId;
            newRC.cspmb__commercial_product__c = productId;
            insert newRC;
        }
    }
}

