global with sharing class CSRemoteActionDelegation {

    static final String PRICING_ELEMENT_TYPE_ONE_OFF = 'One-off Charge';
    static final String PRICING_ELEMENT_TYPE_NAME_ONE_OFF = 'One Off Charge';
    static final String PRICING_ELEMENT_TYPE_RECURRING = 'Recurring Charge';
    static final String PRICING_ELEMENT_TYPE_NAME_RECURRING = 'Recurring Charge';
    static final String NEW_PROMOTION_TYPE_RECURRING = 'Recurring Charge';
    static final String NEW_PROMOTION_TYPE_ONE_OFF = 'One Off Charge';
    static final String STARHUB_DEFAULT_PRICING_RULE = 'Default Pricing Rule for Starhub';

    static final Decimal TAX = 1; // 1 for now, leaving tax variable if something changes in the meantime

    @RemoteAction
    global static void syncInvoker() {
        PRESyncInvoker.getLastSynchronisations();
    }

    @RemoteAction
    global static CommercialProductWrapper getCommercialProduct(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
            [SELECT Id, Name,
                    cspmb__pricing_element_type__r.cspmb__type__c, cspmb__commercial_product__r.Id, cspmb__commercial_product__r.Name,
                (SELECT Id, Name,
                        cspmb__one_off_adjustment__c,
                        cspmb__recurring_adjustment__c,
                        cspmb__target_price__c,
                        cspmb__association_type__c,
                        cspmb__one_off_adjustment_type__c,
                        cspmb__recurring_adjustment_type__c,
                        cspmb__pricing_rule__r.Name,
                        cspmb__pricing_rule__r.Id,
                        cspmb__pricing_rule__r.cspmb__pricing_rule_code__c,
                        cspmb__pricing_rule__r.cspmb__description__c,
                        cspmb__pricing_rule__r.cspmb__predicate_logic__c,
                        cspmb__pricing_rule__r.cspmb__context__c
                    FROM cspmb__commercial_product_pricing_rule_assocs__r)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toCommercialProductWrapper(pricingElements);
        } else {
            return toCommercialProductWrapperWithoutPriceItem(cpId);
        }
    }

    @RemoteAction
    global static CommercialProductWrapper getCommercialProductPromotions(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
        [SELECT Id, Name,
                cspmb__pricing_element_type__r.cspmb__type__c, cspmb__commercial_product__r.Id, cspmb__commercial_product__r.Name,
        (SELECT Id, Name,
                cspmb__one_off_adjustment__c,
                cspmb__recurring_adjustment__c,
                cspmb__target_price__c,
                cspmb__association_type__c,
                cspmb__one_off_adjustment_type__c,
                cspmb__recurring_adjustment_type__c,
                cspmb__pricing_rule__r.Name,
                cspmb__pricing_rule__r.Id,
                cspmb__pricing_rule__r.cspmb__pricing_rule_code__c,
                cspmb__pricing_rule__r.cspmb__description__c,
                cspmb__pricing_rule__r.cspmb__predicate_logic__c,
                cspmb__pricing_rule__r.cspmb__context__c
        FROM cspmb__commercial_product_pricing_rule_assocs__r)
        FROM cspmb__Pricing_Element__c
        WHERE cspmb__commercial_product__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toCommercialProductWrapperWithPromotions(pricingElements);
        } else {
            return toCommercialProductWrapperWithoutPriceItem(cpId);
        }
    }

    @RemoteAction
    global static CommercialProductAssociationWrapper getCommercialProductAssociation(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
            [SELECT Id, Name,
                cspmb__pricing_element_type__r.cspmb__type__c, cspmb__commercial_product_association__r.Id, cspmb__commercial_product_association__r.Name,
                (SELECT Id, Name,
                        cspmb__one_off_adjustment__c,
                        cspmb__recurring_adjustment__c,
                        cspmb__target_price__c,
                        cspmb__association_type__c,
                        cspmb__one_off_adjustment_type__c,
                        cspmb__recurring_adjustment_type__c,
                        cspmb__pricing_rule__r.Name,
                        cspmb__pricing_rule__r.Id,
                        cspmb__pricing_rule__r.cspmb__pricing_rule_code__c,
                        cspmb__pricing_rule__r.cspmb__description__c,
                        cspmb__pricing_rule__r.cspmb__predicate_logic__c,
                        cspmb__pricing_rule__r.cspmb__context__c
                FROM cspmb__commercial_product_pricing_rule_assocs__r)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product_association__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toCommercialProductAssociationWrapper(pricingElements);
        } else {
            return toCommercialProductAssociationWrapperWithoutPriceItem(cpId);
        }
    }

    @RemoteAction
    global static AddOnAsocWrapper getAddOn(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
            [SELECT Id, Name,
                    cspmb__pricing_element_type__r.cspmb__type__c,
                    cspmb__commercial_product_add_on_association__r.Id,
                    cspmb__commercial_product_add_on_association__r.Name,
                    cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Name,
                    cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Id,

                (SELECT Id, Name,
                        cspmb__one_off_adjustment__c,
                        cspmb__recurring_adjustment__c,
                        cspmb__target_price__c,
                        cspmb__association_type__c,
                        cspmb__one_off_adjustment_type__c,
                        cspmb__recurring_adjustment_type__c,
                        cspmb__pricing_rule__r.Name,
                        cspmb__pricing_rule__r.Id,
                        cspmb__pricing_rule__r.cspmb__pricing_rule_code__c,
                        cspmb__pricing_rule__r.cspmb__description__c,
                        cspmb__pricing_rule__r.cspmb__predicate_logic__c,
                        cspmb__pricing_rule__r.cspmb__context__c
                FROM cspmb__commercial_product_pricing_rule_assocs__r)
                FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product_add_on_association__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toAddOnAsocWrapper(pricingElements);
        } else {
            return toAddOnAsocWrapperWithoutPriceItem(cpId);
        }
    }

    @RemoteAction
    global static AddOnAsocWrapper getAddOnPromotions(String cpId) {
        List<cspmb__Pricing_Element__c> pricingElements =
        [SELECT Id, Name,
                cspmb__pricing_element_type__r.cspmb__type__c,
                cspmb__commercial_product_add_on_association__r.Id,
                cspmb__commercial_product_add_on_association__r.Name,
                cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Id,
                cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Name,
            (SELECT Id, Name,
                cspmb__one_off_adjustment__c,
                cspmb__recurring_adjustment__c,
                cspmb__target_price__c,
                cspmb__association_type__c,
                cspmb__one_off_adjustment_type__c,
                cspmb__recurring_adjustment_type__c,
                cspmb__pricing_rule__r.Name,
                cspmb__pricing_rule__r.Id,
                cspmb__pricing_rule__r.cspmb__pricing_rule_code__c,
                cspmb__pricing_rule__r.cspmb__description__c,
                cspmb__pricing_rule__r.cspmb__predicate_logic__c,
                cspmb__pricing_rule__r.cspmb__context__c
            FROM cspmb__commercial_product_pricing_rule_assocs__r)
        FROM cspmb__Pricing_Element__c
        WHERE cspmb__commercial_product_add_on_association__r.Id = : cpId];
        if (pricingElements.size() > 0) {
            return toAddOnAsocWrapperWithPromotions(pricingElements);
        } else {
            return toAddOnAsocWrapperWithoutPriceItem(cpId);
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

    global class CommercialProductAssociationWrapper {
        public Id id {get; set;}
        public String name {get; set;}
        public List<PricingElementWrapper> pricingElementWrappers {get; set;}
        public CommercialProductAssociationWrapper(){
            this.pricingElementWrappers = new List<PricingElementWrapper>();
        }
    }

    global class AddOnAsocWrapper {
        public Id id {get; set;}
        public String name {get; set;}
        public List<PricingElementWrapper> pricingElementWrappers {get; set;}
        public String addOnName {get; set;}
        public Id addOnID {get; set;}
        public AddOnAsocWrapper(){
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
        public String associationType {get; set;}
        public String RecurringAdjustmentType {get; set;}
        public String OneOffAdjustmentType {get; set;}
        public String pricingRuleName {get; set;}
        public String pricingRuleId {get; set;}
        public String pricingRuleCode {get; set;}
        public String pricingRuleDescription {get; set;}
        public String pricingRulePredicateLogic {get; set;}
        public String pricingRuleContext {get; set;}

        public CoppraWrapper(cspmb__Price_Item_Pricing_Rule_Association__c coppra) {
            this.id = coppra.Id;
            this.name = coppra.Name;
            this.recurringAdjustment = coppra.cspmb__recurring_adjustment__c;
            this.oneOffAdjustment = coppra.cspmb__one_off_adjustment__c;
            this.targetPrice = coppra.cspmb__target_price__c;
            this.associationType = coppra.cspmb__association_type__c;
            this.RecurringAdjustmentType = coppra.cspmb__recurring_adjustment_type__c;
            this.OneOffAdjustmentType = coppra.cspmb__one_off_adjustment_type__c;
            this.pricingRuleName = coppra.cspmb__pricing_rule__r.Name;
            this.pricingRuleId = coppra.cspmb__pricing_rule__r.Id;
            this.pricingRuleCode = coppra.cspmb__pricing_rule__r.cspmb__pricing_rule_code__c;
            this.pricingRuleDescription = coppra.cspmb__pricing_rule__r.cspmb__description__c;
            this.pricingRulePredicateLogic = coppra.cspmb__pricing_rule__r.cspmb__predicate_logic__c;
            this.pricingRuleContext = coppra.cspmb__pricing_rule__r.cspmb__context__c;
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

    static CommercialProductAssociationWrapper toCommercialProductAssociationWrapper(List<cspmb__Pricing_Element__c> listPE) {
        CommercialProductAssociationWrapper cp = new CommercialProductAssociationWrapper();

        for(cspmb__Pricing_Element__c pe : listPE) {
            PricingElementWrapper elem = new PricingElementWrapper(pe);
            for (cspmb__Price_Item_Pricing_Rule_Association__c asoc : pe.cspmb__commercial_product_pricing_rule_assocs__r) {
                CoppraWrapper c = new CoppraWrapper(asoc);
                elem.coppraWrappers.add(c);
            }
            cp.pricingElementWrappers.add(elem);
        }
        cp.id = listPE[0].cspmb__commercial_product_association__r.Id;
        cp.name = listPE[0].cspmb__commercial_product_association__r.Name;

        return cp;
    }

    static CommercialProductWrapper toCommercialProductWrapperWithPromotions(List<cspmb__Pricing_Element__c> listPE) {
        CommercialProductWrapper cp = new CommercialProductWrapper();

        for(cspmb__Pricing_Element__c pe : listPE) {
            PricingElementWrapper elem = new PricingElementWrapper(pe);
            for (cspmb__Price_Item_Pricing_Rule_Association__c asoc : pe.cspmb__commercial_product_pricing_rule_assocs__r) {
                if (asoc.cspmb__pricing_rule__r.Name != STARHUB_DEFAULT_PRICING_RULE) {
                    CoppraWrapper c = new CoppraWrapper(asoc);
                    elem.coppraWrappers.add(c);
                }
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

    static CommercialProductAssociationWrapper toCommercialProductAssociationWrapperWithoutPriceItem(String id) {
        CommercialProductAssociationWrapper cpa = new CommercialProductAssociationWrapper();
        cspmb__Commercial_Product_Association__c commercialProductWAssociation = new cspmb__Commercial_Product_Association__c();

        List<cspmb__Commercial_Product_Association__c> commercialProductAsocList = [SELECT Id, Name FROM cspmb__Commercial_Product_Association__c WHERE Id=: id];

        if (commercialProductAsocList.size() > 0) {
            commercialProductWAssociation = commercialProductAsocList[0];
        }

        cpa.id = commercialProductWAssociation.Id;
        cpa.name = commercialProductWAssociation.Name;
        cpa.pricingElementWrappers = null;
        return cpa;
    }

    static AddOnAsocWrapper toAddOnAsocWrapper(List<cspmb__Pricing_Element__c> listPE) {
        AddOnAsocWrapper aoas = new AddOnAsocWrapper();

        for(cspmb__Pricing_Element__c pe : listPE) {
            PricingElementWrapper elem = new PricingElementWrapper(pe);
            for (cspmb__Price_Item_Pricing_Rule_Association__c asoc : pe.cspmb__commercial_product_pricing_rule_assocs__r) {
                CoppraWrapper c = new CoppraWrapper(asoc);
                elem.coppraWrappers.add(c);
            }
            aoas.pricingElementWrappers.add(elem);
        }
        aoas.id = listPE[0].cspmb__commercial_product_add_on_association__r.Id;
        aoas.name = listPE[0].cspmb__commercial_product_add_on_association__r.Name;
        aoas.addOnID = listPE[0].cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Id;
        aoas.addOnName = listPE[0].cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Name;

        return aoas;
    }

    static AddOnAsocWrapper toAddOnAsocWrapperWithPromotions(List<cspmb__Pricing_Element__c> listPE) {
        AddOnAsocWrapper aoas = new AddOnAsocWrapper();

        for(cspmb__Pricing_Element__c pe : listPE) {
            PricingElementWrapper elem = new PricingElementWrapper(pe);
            for (cspmb__Price_Item_Pricing_Rule_Association__c asoc : pe.cspmb__commercial_product_pricing_rule_assocs__r) {
                if (asoc.cspmb__pricing_rule__r.Name != STARHUB_DEFAULT_PRICING_RULE) {
                    CoppraWrapper c = new CoppraWrapper(asoc);
                    elem.coppraWrappers.add(c);
                }
            }
            aoas.pricingElementWrappers.add(elem);
        }
        aoas.id = listPE[0].cspmb__commercial_product_add_on_association__r.Id;
        aoas.name = listPE[0].cspmb__commercial_product_add_on_association__r.Name;
        aoas.addOnID = listPE[0].cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Id;
        aoas.addOnName = listPE[0].cspmb__commercial_product_add_on_association__r.cspmb__Add_On_Price_Item__r.Name;

        return aoas;
    }

    static AddOnAsocWrapper toAddOnAsocWrapperWithoutPriceItem(String id) {
        AddOnAsocWrapper aoas = new AddOnAsocWrapper();
        cspmb__Price_Item_Add_On_Price_Item_Association__c aoasWithoutPE = new cspmb__Price_Item_Add_On_Price_Item_Association__c();

        List<cspmb__Price_Item_Add_On_Price_Item_Association__c> aoasList = [SELECT Id, Name, cspmb__Add_On_Price_Item__r.Id, cspmb__Add_On_Price_Item__r.Name FROM cspmb__Price_Item_Add_On_Price_Item_Association__c WHERE Id=: id];

        if (aoasList.size() > 0) {
            aoasWithoutPE = aoasList[0];
        }

        aoas.id = aoasWithoutPE.Id;
        aoas.name = aoasWithoutPE.Name;
        aoas.addOnID = aoasWithoutPE.cspmb__Add_On_Price_Item__r.Id;
        aoas.addOnName = aoasWithoutPE.cspmb__Add_On_Price_Item__r.Name;
        aoas.pricingElementWrappers = null;
        return aoas;
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
                cspmb__Price_Item_Description__c,
                cspmb__Price_Item_Code__c,
                Image_URL__c,
                Rating__c,
                Displayed_One_Off_Price__c,
                Displayed_Recurring_Price__c,
            (SELECT Id, Name,
                    Displayed_One_Off_Price__c,
                    Displayed_Recurring_Price__c,
                    cspmb__member_commercial_product__r.Id,
                    cspmb__member_commercial_product__r.Name,
                    cspmb__member_commercial_product__r.cspmb__Price_Item_Description__c,
                    cspmb__member_commercial_product__r.cspmb__Price_Item_Code__c,
                    cspmb__member_commercial_product__r.Image_URL__c,
                    cspmb__member_commercial_product__r.Rating__c,
                    cspmb__member_commercial_product__r.Displayed_One_Off_Price__c,
                    cspmb__member_commercial_product__r.Displayed_Recurring_Price__c
            FROM cspmb__member_commercial_product_associations__r)
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
    global static List<cspmb__Pricing_Rule_Group__c> getPricingRuleGroups() {
        List<cspmb__Pricing_Rule_Group__c> prgList =
        [SELECT Id, Name, cspmb__pricing_rule_group_code__c, cspmb__priority__c,
            (SELECT Id, Name, cspmb__pricing_rule__r.Name
                FROM cspmb__pricing_rule_associations__r)
            FROM cspmb__Pricing_Rule_Group__c];

        if(prgList!=null && !prgList.isEmpty()){
            return prgList;
        } else {
            return  new List<cspmb__Pricing_Rule_Group__c>();
        }
    }

    // UPDATE CP CHARGES
    @RemoteAction
    global static void updateRecurringPricing(String productId, Decimal recurringCharge) {

        String pricingElId = '';
        String recurringPETId = '';

        // get default pricing rule
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name=:STARHUB_DEFAULT_PRICING_RULE LIMIT 1];
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
            Decimal roundHelper = recurringCharge * TAX;
            cp.Displayed_Recurring_Price__c = roundHelper; // .setScale(2); - if rounded is needed
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
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name=:STARHUB_DEFAULT_PRICING_RULE LIMIT 1];
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
            Decimal roundHelper = oneOffCharge * TAX;
            cp.Displayed_One_Off_Price__c = roundHelper;
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

    // UPDATE ADD ON CHARGES
    @RemoteAction
    global static void updateAddOnRecurringPricing(String productId, Decimal recurringCharge) {

        String pricingElId = '';
        String recurringPETId = '';

        // get default pricing rule Id
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name=:STARHUB_DEFAULT_PRICING_RULE LIMIT 1];
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

        // get AOAS to update displayed prices
        List<cspmb__Price_Item_Add_On_Price_Item_Association__c> addOnPriceItemAssociationsList =
        [SELECT Id, Name, Displayed_Recurring_Price__c FROM
                cspmb__Price_Item_Add_On_Price_Item_Association__c
            WHERE Id =: productId];
        if (addOnPriceItemAssociationsList.size() > 0) {
            cspmb__Price_Item_Add_On_Price_Item_Association__c aoas = addOnPriceItemAssociationsList[0];
            Decimal roundHelper = recurringCharge * TAX;
            aoas.Displayed_Recurring_Price__c = roundHelper;
            update(aoas);
        }

        // get existing recurring charges on selected ADAS that are of starhubPricingRule
        List<cspmb__Pricing_Element__c> recurringList =
        [SELECT Id, Name,
            (SELECT Id, Name, cspmb__recurring_adjustment__c
                FROM cspmb__commercial_product_pricing_rule_assocs__r
                WHERE cspmb__pricing_rule__c = :starhubPricingRule)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product_add_on_association__r.Id =: productId
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
            newRC.cspmb__commercial_product_add_on_association__c = productId;
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
    global static void updateAddOnOneOffPricing(String productId, Decimal oneOffCharge) {

        String pricingElId = '';
        String OneOffPETId = '';

        // get default pricing rule
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name=:STARHUB_DEFAULT_PRICING_RULE LIMIT 1];
        String starhubPricingRule = pricingRules[0].Id;

        // get pricing element type for recurring charge
        List<cspmb__Pricing_Element_Type__c> oneOffPETL =
        [SELECT Id, Name  FROM cspmb__Pricing_Element_Type__c
        WHERE cspmb__type__c = :PRICING_ELEMENT_TYPE_ONE_OFF AND Name = :PRICING_ELEMENT_TYPE_NAME_ONE_OFF LIMIT 1];

        if(oneOffPETL.size() > 0) {
            OneOffPETId = oneOffPETL[0].Id;
        }

        // get AOAS to update displayed prices
        List<cspmb__Price_Item_Add_On_Price_Item_Association__c> addOnPriceItemAssociationsList =
        [SELECT Id, Name, Displayed_One_Off_Price__c FROM cspmb__Price_Item_Add_On_Price_Item_Association__c WHERE Id =: productId];
        if (addOnPriceItemAssociationsList.size() > 0) {
            cspmb__Price_Item_Add_On_Price_Item_Association__c aoas = addOnPriceItemAssociationsList[0];
            Decimal roundHelper = oneOffCharge * TAX;
            aoas.Displayed_One_Off_Price__c = roundHelper;
            update(aoas);
        }

        // get existing recurring charges on selected AOAS that are of starhubPricingRule
        List<cspmb__Pricing_Element__c> oneOffList =
        [SELECT Id, Name,
            (SELECT Id, Name, cspmb__one_off_adjustment__c
                FROM cspmb__commercial_product_pricing_rule_assocs__r
                WHERE cspmb__pricing_rule__c = :starhubPricingRule)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product_add_on_association__r.Id =: productId
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
            newRC.cspmb__commercial_product_add_on_association__c = productId;
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

    @RemoteAction
    global static void createNewPromotion(String prgId, String prId, String cpId, Decimal amount, String type,
            String adjustmentType, String associationType, String activeProduct) {

        String pricingElId = '';

        // RECURRING
        if (type == NEW_PROMOTION_TYPE_RECURRING) {
            String recurringPETId = '';
            // get pricing element type for recurring charge
            List<cspmb__Pricing_Element_Type__c> recurringPETL =
                [SELECT Id, Name FROM cspmb__Pricing_Element_Type__c
                    WHERE cspmb__type__c = :PRICING_ELEMENT_TYPE_RECURRING
                    AND Name = :PRICING_ELEMENT_TYPE_NAME_RECURRING
                    LIMIT 1];

            if(recurringPETL.size() > 0) {
                recurringPETId = recurringPETL[0].Id;
            }

            List<cspmb__Pricing_Element__c> recurringList = new List<cspmb__Pricing_Element__c>();
            // find if PE for Recurring charge exist
            // either CP or Add On Association
            if(activeProduct == 'CP') {
                recurringList =
                    [SELECT Id, Name
                        FROM cspmb__Pricing_Element__c
                        WHERE cspmb__commercial_product__r.Id =: cpId
                        AND cspmb__pricing_element_type__r.cspmb__type__c = :PRICING_ELEMENT_TYPE_RECURRING
                        AND cspmb__pricing_element_type__r.Name = :PRICING_ELEMENT_TYPE_NAME_RECURRING];
            } else if(activeProduct == 'AddOn') {
                recurringList =
                    [SELECT Id, Name
                        FROM cspmb__Pricing_Element__c
                        WHERE cspmb__commercial_product_add_on_association__r.Id =: cpId
                        AND cspmb__pricing_element_type__r.cspmb__type__c = :PRICING_ELEMENT_TYPE_RECURRING
                        AND cspmb__pricing_element_type__r.Name = :PRICING_ELEMENT_TYPE_NAME_RECURRING];
            }

            // get existing PE Id with recurring charge type
            if (recurringList.size() > 0) {
                pricingElId = recurringList[0].Id;
            } else {
                // create new pricing element
                cspmb__Pricing_Element__c newRC = new cspmb__Pricing_Element__c();
                newRC.cspmb__pricing_element_type__c = recurringPETId;
                if(activeProduct == 'CP') {
                    newRC.cspmb__commercial_product__c = cpId;
                } else if (activeProduct == 'AddOn') {
                    newRC.cspmb__commercial_product_add_on_association__c = cpId;
                }
                insert newRC;

                pricingElId = newRC.Id;
            }

            // create coppra sales
            cspmb__Price_Item_Pricing_Rule_Association__c newCOPPRASales = new cspmb__Price_Item_Pricing_Rule_Association__c();
            newCOPPRASales.cspmb__pricing_element__c = pricingElId;
            newCOPPRASales.cspmb__pricing_rule__c = prId;
            newCOPPRASales.cspmb__target_price__c = 'Sales';
            newCOPPRASales.cspmb__recurring_adjustment__c = amount;
            newCOPPRASales.cspmb__recurring_adjustment_type__c = adjustmentType;
            newCOPPRASales.cspmb__association_type__c = associationType;
            insert newCOPPRASales;
        }

        // ONE OFF
        else if (type == NEW_PROMOTION_TYPE_ONE_OFF) {
            String oneOffPETId = '';

            // get pricing element type for one off charge
            List<cspmb__Pricing_Element_Type__c> oneOffPETL =
                [SELECT Id, Name FROM cspmb__Pricing_Element_Type__c
                    WHERE cspmb__type__c = :PRICING_ELEMENT_TYPE_ONE_OFF
                    AND Name = :PRICING_ELEMENT_TYPE_NAME_ONE_OFF
                    LIMIT 1];

            if(oneOffPETL.size() > 0) {
                oneOffPETId = oneOffPETL[0].Id;
            }

            List<cspmb__Pricing_Element__c> oneOffList = new List<cspmb__Pricing_Element__c>();

            // find if PE for One Off charge exist
            // either CP or Add On Association
            if(activeProduct == 'CP') {
                oneOffList = [
                        SELECT Id, Name
                        FROM cspmb__Pricing_Element__c
                        WHERE cspmb__commercial_product__r.Id = :cpId
                        AND cspmb__pricing_element_type__r.cspmb__type__c = :PRICING_ELEMENT_TYPE_ONE_OFF
                        AND cspmb__pricing_element_type__r.Name = :PRICING_ELEMENT_TYPE_NAME_ONE_OFF
                ];
            } else if (activeProduct == 'AddOn') {
                oneOffList = [
                        SELECT Id, Name
                        FROM cspmb__Pricing_Element__c
                        WHERE cspmb__commercial_product_add_on_association__r.Id = :cpId
                        AND cspmb__pricing_element_type__r.cspmb__type__c = :PRICING_ELEMENT_TYPE_ONE_OFF
                        AND cspmb__pricing_element_type__r.Name = :PRICING_ELEMENT_TYPE_NAME_ONE_OFF
                ];
            }

            // get existing PE Id with one off charge type
            if (oneOffList.size() > 0) {
                pricingElId = oneOffList[0].Id;
            } else {
                // create new pricing element
                cspmb__Pricing_Element__c newRC = new cspmb__Pricing_Element__c();
                newRC.cspmb__pricing_element_type__c = oneOffPETId;
                if(activeProduct == 'CP') {
                    newRC.cspmb__commercial_product__c = cpId;
                } else if (activeProduct == 'AddOn') {
                    newRC.cspmb__commercial_product_add_on_association__c = cpId;
                }

                insert newRC;

                pricingElId = newRC.Id;
            }

            // create coppra sales
            cspmb__Price_Item_Pricing_Rule_Association__c newCOPPRASales = new cspmb__Price_Item_Pricing_Rule_Association__c();
            newCOPPRASales.cspmb__pricing_element__c = pricingElId;
            newCOPPRASales.cspmb__pricing_rule__c = prId;
            newCOPPRASales.cspmb__target_price__c = 'Sales';
            newCOPPRASales.cspmb__one_off_adjustment__c = amount;
            newCOPPRASales.cspmb__one_off_adjustment_type__c = adjustmentType;
            newCOPPRASales.cspmb__association_type__c = associationType;
            insert newCOPPRASales;
        }

    }

    @RemoteAction
    global static void createNewPRG(String prgName, String prgCode, Integer prgPriority, String prDescription) {

        String newPRGId = '';
        String newPRId = '';

        // Create new PRG
        cspmb__Pricing_Rule_Group__c newPRG = new cspmb__Pricing_Rule_Group__c();
        newPRG.Name = prgName;
        newPRG.cspmb__pricing_rule_group_code__c = prgCode;
        newPRG.cspmb__priority__c = prgPriority;
        newPRG.cspmb__rule_group_compounding_type__c = 'Inclusive';
        insert newPRG;
        newPRGId = newPRG.Id;

        // Create new PR
        cspmb__Pricing_Rule__c newPR = new cspmb__Pricing_Rule__c();
        newPR.Name = prgName + ' Rule';
        newPR.cspmb__pricing_rule_code__c = prgCode + 'RULE';
        newPR.cspmb__context__c = 'Cart';
        newPR.cspmb__description__c = prDescription;
        insert newPR;
        newPRId = newPR.Id;

        // Create new PRG-PR ASOC
        cspmb__Pricing_Rule_Group_Rule_Association__c newPRGPRAsoc = new cspmb__Pricing_Rule_Group_Rule_Association__c();
        newPRGPRAsoc.cspmb__pricing_rule_group__c = newPRGId;
        newPRGPRAsoc.cspmb__pricing_rule__c = newPRId;
        insert newPRGPRAsoc;
    }

    @RemoteAction
    global static void updateRecurringPackageMemberPricing(String productId, Decimal recurringCharge) {

        String pricingElId = '';
        String recurringPETId = '';

        // get default pricing rule
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name=:STARHUB_DEFAULT_PRICING_RULE LIMIT 1];
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
        List<cspmb__Commercial_Product_Association__c> commercialProductsList =
        [SELECT Id, Name, Displayed_Recurring_Price__c FROM cspmb__Commercial_Product_Association__c WHERE Id =: productId];
        if (commercialProductsList.size() > 0) {
            cspmb__Commercial_Product_Association__c cp = commercialProductsList[0];
            Decimal roundHelper = recurringCharge * TAX;
            cp.Displayed_Recurring_Price__c = roundHelper; // .setScale(2); - if rounded is needed
            update(cp);
        }

        // get existing recurring charges on selected CP that are of starhubPricingRule
        List<cspmb__Pricing_Element__c> recurringList =
        [SELECT Id, Name,
            (SELECT Id, Name, cspmb__recurring_adjustment__c
                FROM cspmb__commercial_product_pricing_rule_assocs__r
                WHERE cspmb__pricing_rule__c = :starhubPricingRule)
            FROM cspmb__Pricing_Element__c
            WHERE cspmb__commercial_product_association__r.Id =: productId
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
            newRC.cspmb__commercial_product_association__c = productId;
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
    global static void updateOneOffPackageMemberPricing(String productId, Decimal oneOffCharge) {

        String pricingElId = '';
        String OneOffPETId = '';

        // get default pricing rule
        List<cspmb__Pricing_Rule__c> pricingRules = [SELECT Id, Name FROM cspmb__Pricing_Rule__c WHERE Name=:STARHUB_DEFAULT_PRICING_RULE LIMIT 1];
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
        List<cspmb__Commercial_Product_Association__c> commercialProductsList =
        [SELECT Id, Name, Displayed_One_Off_Price__c FROM cspmb__Commercial_Product_Association__c WHERE Id =: productId];
        if (commercialProductsList.size() > 0) {
            cspmb__Commercial_Product_Association__c cp = commercialProductsList[0];
            Decimal roundHelper = oneOffCharge * TAX;
            cp.Displayed_One_Off_Price__c = roundHelper;
            update(cp);
        }

        // get existing recurring charges on selected CP that are of starhubPricingRule
        List<cspmb__Pricing_Element__c> oneOffList =
        [SELECT Id, Name,
            (SELECT Id, Name, cspmb__one_off_adjustment__c
            FROM cspmb__commercial_product_pricing_rule_assocs__r
            WHERE cspmb__pricing_rule__c = :starhubPricingRule)
                FROM cspmb__Pricing_Element__c
                WHERE cspmb__commercial_product_association__r.Id =: productId
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
            newRC.cspmb__commercial_product_association__c = productId;
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
        return ;
    }
}

