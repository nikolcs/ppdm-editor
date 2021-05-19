global with sharing class CSRemoteActionDelegation {

    @RemoteAction
    global static CommercialProductWrapper getCommercialProduct(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
            [SELECT Id, Name,
                    cspmb__pricing_element_type__r.cspmb__type__c, cspmb__commercial_product__r.Id, cspmb__commercial_product__r.Name,
                (SELECT Id, Name
                    FROM cspmb__commercial_product_pricing_rule_assocs__r)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toCommercialProductWrapper(pricingElements);
        }
        return null;
    }

    global class CommercialProductWrapper {
        public Id id {get; set;}
        public String name {get; set;}
        public List<PricingElementWrapper> pricingElementWrappers {get; set;}
        public CommercialProductWrapper(){
            this.pricingElementWrappers = new List<PricingElementWrapper>();
        }
    }

    global class PricingElementWrapper {
        public Id id {get; set;}
        public String name {get; set;}
        public String type {get; set;}
        public List<CoppraWrapper> coppraWrappers {get; set;}

        public PricingElementWrapper(cspmb__Pricing_Element__c pe) {
            this.id = pe.Id;
            this.name = pe.Name;
            this.type = pe.cspmb__pricing_element_type__r.cspmb__type__c;
            this.coppraWrappers = new List<CoppraWrapper>();
        }
    }

    global class CoppraWrapper {
        public Id id {get; set;}
        public String name {get; set;}

        public CoppraWrapper(cspmb__Price_Item_Pricing_Rule_Association__c coppra) {
            this.id = coppra.Id;
            this.name = coppra.Name;
        }
    }

    static CommercialProductWrapper toCommercialProductWrapper(List<cspmb__Pricing_Element__c> listPE) {
        CommercialProductWrapper cp = new CommercialProductWrapper();

        for(cspmb__Pricing_Element__c pe : listPE) {
            PricingElementWrapper elem = new PricingElementWrapper(pe);
            for (cspmb__Price_Item_Pricing_Rule_Association__c asoc : pe.cspmb__commercial_product_pricing_rule_assocs__r) {
               CoppraWrapper c = new CoppraWrapper(asoc);
               elem.coppraWrappers.add(c);
            }
            cp.pricingElementWrappers.add(elem);
        }
        cp.id = listPE[0].cspmb__commercial_product__r.Id;
        cp.name = listPE[0].cspmb__commercial_product__r.Name;

        return cp;
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
                (SELECT Id, Name, CreatedById, cspmb__Sequence__c,
                        cspmb__Add_On_Price_Item__r.Name,
                        cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c
                    FROM cspmb__Price_Item_Add_On_Price_Item_Association__r)
                FROM cspmb__Price_Item__c
                WHERE cspmb__Role__c = 'Commercial Product'
//                AND SKU__c LIKE 'STH%' // !STARHUB
            ];
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
    global static void updateRecurringPricing(String productId, Decimal recurringCharge) {

        String pricingElId = '';

        //get default pricing rule
//        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing Rule for Starhub' LIMIT 1];
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing rule' LIMIT 1];
        String starhubPricingRule = pricingRules[0].Id;

        //get pricing element type for recurring charge
        List<cspmb__Pricing_Element_Type__c> recurringPETL =
            [SELECT Id, Name FROM cspmb__Pricing_Element_Type__c
            WHERE cspmb__type__c = 'Recurring Charge' AND Name = 'Recurring Charge' LIMIT 1];

        String recurringPETId = recurringPETL[0].Id;

        //get existing recurring charges on CP with Id
        List<cspmb__Pricing_Element__c> recurringList =
            [SELECT Id, Name FROM cspmb__Pricing_Element__c
                WHERE cspmb__commercial_product__r.Id =: productId
                AND cspmb__pricing_element_type__r.cspmb__type__c = 'Recurring Charge'
                AND cspmb__pricing_element_type__r.Name = 'Recurring Charge'];

        if (recurringList.size() > 0) {
            return;
        } else {
            // create new pricing element
            cspmb__Pricing_Element__c newRC = new cspmb__Pricing_Element__c();
            newRC.cspmb__pricing_element_type__c = recurringPETId;
            newRC.cspmb__commercial_product__c = productId;
            insert newRC;

            pricingElId = newRC.Id;

            // create coppra list
            cspmb__Price_Item_Pricing_Rule_Association__c newCOPPRAList = new cspmb__Price_Item_Pricing_Rule_Association__c();
            newCOPPRAList.cspmb__pricing_element__c = pricingElId;
            newCOPPRAList.cspmb__pricing_rule__c = starhubPricingRule;
            newCOPPRAList.cspmb__association_type__c = 'Pricing change';
            newCOPPRAList.cspmb__target_price__c = 'List';
            newCOPPRAList.cspmb__recurring_adjustment_type__c = 'Price Override';
            newCOPPRAList.cspmb__recurring_adjustment__c = recurringCharge;
            insert newCOPPRAList;

            // create coppra sales
            cspmb__Price_Item_Pricing_Rule_Association__c newCOPPRASales = new cspmb__Price_Item_Pricing_Rule_Association__c();
            newCOPPRASales.cspmb__pricing_element__c = pricingElId;
            newCOPPRASales.cspmb__pricing_rule__c = starhubPricingRule;
            newCOPPRASales.cspmb__association_type__c = 'Pricing change';
            newCOPPRASales.cspmb__target_price__c = 'Sales';
            newCOPPRASales.cspmb__recurring_adjustment_type__c = 'Price Override';
            newCOPPRASales.cspmb__recurring_adjustment__c = recurringCharge;
            insert newCOPPRASales;
        }
    }

    @RemoteAction
    global static void updateOneOffPricing(String productId, Decimal oneOffCharge) {

        String pricingElId = '';

        //get default pricing rule
//        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing Rule for Starhub' LIMIT 1];
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing rule' LIMIT 1];
        String starhubPricingRule = pricingRules[0].Id;

        //get pricing element type for recurring charge
        List<cspmb__Pricing_Element_Type__c> oneOffPETL =
        [SELECT Id, Name FROM cspmb__Pricing_Element_Type__c
        WHERE cspmb__type__c = 'One-off Charge' AND Name = 'One-off Charge' LIMIT 1];

        String OneOffPETId = oneOffPETL[0].Id;

        //get existing recurring charges on CP with Id
        List<cspmb__Pricing_Element__c> oneOffList =
        [SELECT Id, Name FROM cspmb__Pricing_Element__c
        WHERE cspmb__commercial_product__r.Id =: productId
        AND cspmb__pricing_element_type__r.cspmb__type__c = 'One-off Charge'
        AND cspmb__pricing_element_type__r.Name = 'One-off Charge'];

        if (oneOffList.size() > 0) {
            return;
        } else {
            // create new pricing element
            cspmb__Pricing_Element__c newRC = new cspmb__Pricing_Element__c();
            newRC.cspmb__pricing_element_type__c = OneOffPETId;
            newRC.cspmb__commercial_product__c = productId;
            insert newRC;

            pricingElId = newRC.Id;

            // create coppra list
            cspmb__Price_Item_Pricing_Rule_Association__c newCOPPRAList = new cspmb__Price_Item_Pricing_Rule_Association__c();
            newCOPPRAList.cspmb__pricing_element__c = pricingElId;
            newCOPPRAList.cspmb__pricing_rule__c = starhubPricingRule;
            newCOPPRAList.cspmb__association_type__c = 'Pricing change';
            newCOPPRAList.cspmb__target_price__c = 'List';
            newCOPPRAList.cspmb__one_off_adjustment_type__c = 'Price Override';
            newCOPPRAList.cspmb__one_off_adjustment__c = oneOffCharge;
            insert newCOPPRAList;

            // create coppra sales
            cspmb__Price_Item_Pricing_Rule_Association__c newCOPPRASales = new cspmb__Price_Item_Pricing_Rule_Association__c();
            newCOPPRASales.cspmb__pricing_element__c = pricingElId;
            newCOPPRASales.cspmb__pricing_rule__c = starhubPricingRule;
            newCOPPRASales.cspmb__association_type__c = 'Pricing change';
            newCOPPRASales.cspmb__target_price__c = 'Sales';
            newCOPPRASales.cspmb__one_off_adjustment_type__c = 'Price Override';
            newCOPPRASales.cspmb__one_off_adjustment__c = oneOffCharge;
            insert newCOPPRASales;
        }
    }
}

