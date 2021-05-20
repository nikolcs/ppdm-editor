global with sharing class CSRemoteActionDelegation {

    static final String PRICING_ELEMENT_TYPE_ONE_OFF = 'One-off Charge';
    static final String PRICING_ELEMENT_TYPE_NAME_ONE_OFF = 'One Off Charge';
    static final String PRICING_ELEMENT_TYPE_RECURRING = 'Recurring Charge';
    static final String PRICING_ELEMENT_TYPE_NAME_RECURRING = 'Recurring Charge';

    static final Decimal TAX = 1.7;

    @RemoteAction
    global static CommercialProductWrapper getCommercialProduct(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
            [SELECT Id, Name,
                    cspmb__pricing_element_type__r.cspmb__type__c, cspmb__commercial_product__r.Id, cspmb__commercial_product__r.Name,
                (SELECT Id, Name,
                        cspmb__one_off_adjustment__c,
                        cspmb__recurring_adjustment__c,
                        cspmb__target_price__c,
                        cspmb__pricing_rule__r.Name
                    FROM cspmb__commercial_product_pricing_rule_assocs__r)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toCommercialProductWrapper(pricingElements);
        } else {
            return toCommercialProductWrapperWithoutPriceItem(cpId);
        }
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
        public Decimal recurringAdjustment {get; set;}
        public Decimal oneOffAdjustment {get; set;}
        public String targetPrice {get; set;}
        public String pricingRuleName {get; set;}

        public CoppraWrapper(cspmb__Price_Item_Pricing_Rule_Association__c coppra) {
            this.id = coppra.Id;
            this.name = coppra.Name;
            this.recurringAdjustment = coppra.cspmb__recurring_adjustment__c;
            this.oneOffAdjustment = coppra.cspmb__one_off_adjustment__c;
            this.targetPrice = coppra.cspmb__target_price__c;
            this.pricingRuleName = coppra.cspmb__pricing_rule__r.Name;
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

    static CommercialProductWrapper toCommercialProductWrapperWithoutPriceItem(String id) {
        CommercialProductWrapper cp = new CommercialProductWrapper();
        cspmb__Price_Item__c commercialProduct = new cspmb__Price_Item__c();

        List<cspmb__Price_Item__c> commercialProductList = [SELECT Id, Name FROM cspmb__Price_Item__c WHERE Id=: id];

        if (commercialProductList.size() > 0) {
            commercialProduct = commercialProductList[0];
        }

        cp.id = commercialProduct.Id;
        cp.name = commercialProduct.Name;
        cp.pricingElementWrappers = null;
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
                    cspmb__Price_Item_Description__c,
                    cspmb__Price_Item_Code__c,
                    Image_URL__c,
                    Rating__c,
                    Displayed_One_Off_Price__c,
                    Displayed_Recurring_Price__c,
                (SELECT Id, Name,
                        Displayed_One_Off_Price__c,
                        Displayed_Recurring_Price__c,
                        cspmb__Add_On_Price_Item__r.Name,
                        cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c,
                        cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Code__c,
                        cspmb__Add_On_Price_Item__r.Image_URL__c
                FROM cspmb__Price_Item_Add_On_Price_Item_Association__r)
                FROM cspmb__Price_Item__c
                WHERE cspmb__Role__c = 'Commercial Product'
                AND cspmb__Price_Item_Code__c LIKE 'STH%' // !STARHUB
            ];
        if(cps!=null && !cps.isEmpty()){
            return cps;
        } else {
            return  new List<cspmb__Price_Item__c>();
        }
    }

    @RemoteAction
    global static void updateRecurringPricing(String productId, Decimal recurringCharge) {

        String pricingElId = '';
        String recurringPETId = '';

        // get default pricing rule
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing Rule for Starhub' LIMIT 1];
//        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing rule' LIMIT 1];
        String starhubPricingRule = pricingRules[0].Id;

        // get pricing element type for recurring charge
        List<cspmb__Pricing_Element_Type__c> recurringPETL =
            [SELECT Id, Name FROM cspmb__Pricing_Element_Type__c
                WHERE cspmb__type__c = :PRICING_ELEMENT_TYPE_RECURRING
                AND Name = :PRICING_ELEMENT_TYPE_NAME_RECURRING
                LIMIT 1];

        if(recurringPETL.size() > 0) {
            recurringPETId = recurringPETL[0].Id;
        }

        // get CP to update displayed prices
        List<cspmb__Price_Item__c> commercialProductsList =
        [SELECT Id, Name, Displayed_Recurring_Price__c FROM cspmb__Price_Item__c WHERE Id =: productId];
        if (commercialProductsList.size() > 0) {
            cspmb__Price_Item__c cp = commercialProductsList[0];
            cp.Displayed_Recurring_Price__c = recurringCharge * TAX;
            update(cp);
        }

        // get existing recurring charges on selected CP that are of starhubPricingRule
        List<cspmb__Pricing_Element__c> recurringList =
            [SELECT Id, Name,
                (SELECT Id, Name, cspmb__recurring_adjustment__c
                    FROM cspmb__commercial_product_pricing_rule_assocs__r
                    WHERE cspmb__pricing_rule__c = :starhubPricingRule)
                FROM cspmb__Pricing_Element__c
                WHERE cspmb__commercial_product__r.Id =: productId
                AND cspmb__pricing_element_type__r.cspmb__type__c = :PRICING_ELEMENT_TYPE_RECURRING
                AND cspmb__pricing_element_type__r.Name = :PRICING_ELEMENT_TYPE_NAME_RECURRING
                AND Id IN (SELECT cspmb__pricing_element__c
                                FROM cspmb__Price_Item_Pricing_Rule_Association__c
                                WHERE cspmb__pricing_rule__c = :starhubPricingRule)];

        if (recurringList.size() > 0 && recurringList[0].cspmb__commercial_product_pricing_rule_assocs__r.size() > 0) {
            for (cspmb__Price_Item_Pricing_Rule_Association__c coppra : recurringList[0].cspmb__commercial_product_pricing_rule_assocs__r) {
                coppra.cspmb__recurring_adjustment__c = recurringCharge;
                update coppra;
            }
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
        String OneOffPETId = '';

        // get default pricing rule
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing Rule for Starhub' LIMIT 1];
//        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name='Default Pricing rule' LIMIT 1];
        String starhubPricingRule = pricingRules[0].Id;

        // get pricing element type for recurring charge
        List<cspmb__Pricing_Element_Type__c> oneOffPETL =
        [SELECT Id, Name  FROM cspmb__Pricing_Element_Type__c
            WHERE cspmb__type__c = :PRICING_ELEMENT_TYPE_ONE_OFF AND Name = :PRICING_ELEMENT_TYPE_NAME_ONE_OFF LIMIT 1];

        if(oneOffPETL.size() > 0) {
            OneOffPETId = oneOffPETL[0].Id;
        }

        // get CP to update displayed prices
        List<cspmb__Price_Item__c> commercialProductsList =
        [SELECT Id, Name, Displayed_One_Off_Price__c FROM cspmb__Price_Item__c WHERE Id =: productId];
        if (commercialProductsList.size() > 0) {
            cspmb__Price_Item__c cp = commercialProductsList[0];
            cp.Displayed_One_Off_Price__c = oneOffCharge * TAX;
            update(cp);
        }

        // get existing recurring charges on selected CP that are of starhubPricingRule
        List<cspmb__Pricing_Element__c> oneOffList =
        [SELECT Id, Name,
            (SELECT Id, Name, cspmb__one_off_adjustment__c
                FROM cspmb__commercial_product_pricing_rule_assocs__r
                WHERE cspmb__pricing_rule__c = :starhubPricingRule)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product__r.Id =: productId
            AND cspmb__pricing_element_type__r.cspmb__type__c = :PRICING_ELEMENT_TYPE_ONE_OFF
            AND cspmb__pricing_element_type__r.Name = :PRICING_ELEMENT_TYPE_NAME_ONE_OFF
            AND Id IN (SELECT cspmb__pricing_element__c
                            FROM cspmb__Price_Item_Pricing_Rule_Association__c
                            WHERE cspmb__pricing_rule__c = :starhubPricingRule)];

        // edit existing pricing element if exist
        if (oneOffList.size() > 0 && oneOffList[0].cspmb__commercial_product_pricing_rule_assocs__r.size() > 0) {
            for (cspmb__Price_Item_Pricing_Rule_Association__c coppra : oneOffList[0].cspmb__commercial_product_pricing_rule_assocs__r) {
                coppra.cspmb__one_off_adjustment__c = oneOffCharge;
                update(coppra);
            }
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
        return;
    }
}

