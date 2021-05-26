import React from 'react';
import {
    CSIcon,
    CSLabel,
    CSSection,
    CSTable,
    CSTableHeader,
    CSTableBody,
    CSTableRow,
    CSTableCell,
    CSDropdown,
    CSToggle,
    CSButton,
    CSInputSearch,
    CSModal,
    CSModalHeader,
    CSModalBody,
    CSModalFooter,
    CSInputText,
    CSLookup,
    CSTabGroup,
    CSTab, CSSpinner,
    CSSelect, CSOption
} from '@cloudsense/cs-ui-components';

import {VFRemotingService} from '../remote'

class CPGrid extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
    }

    state = {
        showManagePromotionsModal: false,
        showNewPromotionModal: false,
        showCreateNewPRG: false,

        searchTerm: '',
        activeTab: 'CPs',
        showAddons: true,
        showCPs: true,

        Packages: '',
        CPs: '',
        Promotions: '',

        activeProduct: '',

        oneOffPriceEditable: true,
        recurringPriceEditable: true,

        detailsName: '',
        detailsId: '',
        detailsRecurringCharge: '',
        detailsOneOffCharge: '',

        pricingRuleGroupLookup: {},
        newPromotionPricingRuleGroup: '',
        newPromotionPricingRule: '',
        newPromotionPricingRuleId: '',
        newPromotionPricingAmount: '',
        newPromotionPricingType: 'Recurring Charge',
        newPromotionPricingPriority: '',
        newPromotionCode: '',
        newPromotionAdjustmentType: 'Absolute Discount',
        newPromotionAssociationType: 'Pricing change',

        newPRGName: '',
        newPRGCode: '',
        newPRGPriority: '',
        newPRGDescription: '',

        chargesSaving: false
    };

    handleTabClick = (tabName) => {
        if (tabName === 'CPs') {
            VFRemotingService.getCPs().then(
                result => {
                    this.setState({CPs: result});
                    console.log("getCPs in CPtabClick");
                }
            );
            this.setState({
                searchTerm: this.state.activeTab === 'Packages' ? '' : this.state.searchTerm,
                activeTab: 'CPs'
            })
        }
        if (tabName === 'Packages') {
            VFRemotingService.getPackages().then(
                result => {
                    this.setState({Packages: result});
                    console.log("getPackages in PackagesTabClick");
                }
            );
            this.setState({
                searchTerm: this.state.activeTab === 'CPs' ? '' : this.state.searchTerm,
                activeTab: 'Packages'
            })
        }
        if (tabName === 'PLM') {
            this.setState({
                searchTerm: '',
                activeTab: 'PLM'
            })
        }
    }


    handleInputOnChange = (event) => {
        this.setState({ detailsName: event.target.value});
    }
    onChangeRecurring = (event) => {
        this.setState({ detailsRecurringCharge: event.target.value});
    }
    onChangeOneOff = (event) => {
        this.setState({ detailsOneOffCharge: event.target.value});
    }


    /* CREATE NEW PROMOTION ONCHANGE HANDLERS */
    onChangeLookup = (result) => {
        this.setState(
            { newPromotionPricingRuleGroup: result,
                newPromotionPricingRule: result.cspmb__pricing_rule_associations__r?.[0].cspmb__pricing_rule__r.Name,
                newPromotionPricingRuleId: result.cspmb__pricing_rule_associations__r?.[0].cspmb__pricing_rule__r.Id,
                newPromotionPricingPriority: result.cspmb__priority__c
        });
        console.log(this.state.newPromotionPricingRuleGroup);
    }
    onChangeNewPromotionPricingAmount = (event) => {
        this.setState({ newPromotionPricingAmount: event.target.value});
    }
    onChangeNewPromotionPricingType = (option) => {
        this.setState({ newPromotionPricingType: option});
        console.log(option);
    }

    onChangeNewPromotionAdjustmentType = (option) => {
        this.setState({ newPromotionAdjustmentType: option});
    }

    onChangeNewPromotionAssociationType = (option) => {
        this.setState({ newPromotionAssociationType: option});
    }

    closeNewPromotionModal = () => {
        this.setState({
            showNewPromotionModal: false,
            newPromotionPricingRuleGroup: '',
            newPromotionPricingAmount: '',
            newPromotionPricingType: 'Recurring Charge',
            newPromotionPricingRule: '',
            newPromotionPricingRuleId: '',
            newPromotionPricingPriority: '',
            newPromotionAdjustmentType: 'Absolute Discount',
            newPromotionAssociationType: 'Pricing change',
        })
    }

    /* used for CP and Addon new promotion modal save */
    saveNewPromotion = () => {
        console.log("saveNewPromotion");
        VFRemotingService.createNewPromotion(
            this.state.newPromotionPricingRuleGroup.Id,
            this.state.newPromotionPricingRuleId,
            this.state.Promotions.id,
            this.state.newPromotionPricingAmount,
            this.state.newPromotionPricingType,
            this.state.newPromotionAdjustmentType,
            this.state.newPromotionAssociationType,
            this.state.activeProduct).then(
            result => {
                console.log("createNewPromotion in saveNewPromotion")
                console.log(result);
                if (this.state.activeProduct === 'CP') {
                    this.handleOnPromotionOpen(this.state.Promotions.id);
                } else if (this.state.activeProduct === 'AddOn') {
                    this.handleOnAddonPromotionOpen(this.state.Promotions.id);
                }
                this.closeNewPromotionModal();
            })
    }

    /* CREATE NEW PRICE GROUP RULE ONCHANGE HANDLERS */
    onChangeNewPRGName = (event) => {
        this.setState({ newPRGName: event.target.value});
    }
    onChangeNewPRGCode = (event) => {
        this.setState({ newPRGCode: event.target.value});
    }
    onChangeNewPRGPriority = (event) => {
        this.setState({ newPRGPriority: event.target.value});
    }
    onChangenewPRGDescription = (event) => {
        this.setState({ newPRGDescription: event.target.value});
    }

    closeNewPRGModal = () => {
        this.setState({
            showCreateNewPRG: false,
            newPRGName: '',
            newPRGCode: '',
            newPRGPriority: '',
            newPRGDescription: '',
        })
    }

    saveNewPRG = () => {
        console.log("saveNewPRG");
        VFRemotingService.createNewPRG(
            this.state.newPRGName,
            this.state.newPRGCode,
            this.state.newPRGPriority,
            this.state.newPRGDescription).then(
            result => {
                console.log("createNewPRG in saveNewPRG")
                console.log(result);

                VFRemotingService.getPricingRuleGroups().then(
                    result => {
                        console.log("getPricingRuleGroups in createNewPromotionHandler")
                        console.log(result);
                        let lookupHelper = {
                            columns: [
                                {key: 'Name', label: 'Name'},
                                {key: 'cspmb__pricing_rule_group_code__c', label: 'Code'}
                            ],
                            data: result
                        }
                        this.setState({pricingRuleGroupLookup: lookupHelper});
                        console.log(this.state.pricingRuleGroupLookup);
                        this.closeNewPRGModal();
                    }
                );
                // this.handleOnPromotionOpen(this.state.Promotions.id);
            })
    }

    prepopulateCreateNewPriceGroupRule = () => {
        this.setState({
            newPRGName: 'Huawei Spring 20%',
            newPRGCode: 'SPRING20',
            newPRGPriority: '500',
        });
    }

    openModalManagePromotions = () => {
        this.setState({showManagePromotionsModal: true});
    }

    /* HANDLE BUTTON LINK CLICKS */
    handlePRRClick = (id) => {
        window.open(`/lightning/r/cspmb__Pricing_Rule__c/${id}/view`);
    }
    handlePRARClick = (id) => {
        window.open(`/lightning/r/cspmb__Price_Item_Pricing_Rule_Association__c/${id}/view`);
    }

    handleCPandPKGNameClick = (id) => {
        window.open(`/lightning/r/cspmb__Price_Item__c/${id}/view`);
    }
    handleAddonNameClick = (id) => {
        window.open(`/lightning/r/cspmb__Price_Item_Add_On_Price_Item_Association__c/${id}/view`);
    }

    closeModal = () => {
        this.setState({
            showManagePromotionsModal: false,

            activeProduct: '',

            detailsName: '',
            detailsId: '',
            detailsRecurringCharge: '',
            detailsOneOffCharge: '',

            Promotions: '',

        });
        setTimeout(() => {
            this.setState( {
                oneOffPriceEditable: true,
                recurringPriceEditable: true,
            })
        }, 150);
    }

    // onClosePromotionsModal = () => {
    //     this.setState({
    //         showManagePromotionsModal: false,
    //     })
    //     this.closeModal();
    // }

    handleSave = () => {
        console.log("handleSave");
        const promises = [];
        this.setState({chargesSaving : true});
        if (this.state.detailsRecurringCharge) {
            const updateRecurring = VFRemotingService.updateRecurringPricing(this.state.detailsId, this.state.detailsRecurringCharge || 0).then();
            promises.push(updateRecurring);
        }
        if (this.state.detailsOneOffCharge) {
            const updateOneOff = VFRemotingService.updateOneOffPricing(this.state.detailsId, this.state.detailsOneOffCharge || 0).then();
            promises.push(updateOneOff);
        }

        Promise.all(promises).then( () => {
            VFRemotingService.getCPs().then(
                result => {
                    this.setState({CPs: result, chargesSaving: false});
                    console.log("getCPs");
                    console.log(result);
                    setTimeout(() => {
                        this.setState( {
                            showSuccessIndicator: true
                        }, () =>
                            setTimeout( () => {
                                this.setState({
                                    showSuccessIndicator: false
                                })
                            }, 750)
                        )
                    }, 1);
                }
            )
        })
    }

    handlePackageMemberSave = () => {
        console.log("handlePackageMemberSave");
        const promises = [];
        this.setState({chargesSaving : true});
        if (this.state.detailsRecurringCharge) {
            const updateRecurring = VFRemotingService.updateRecurringPackageMemberPricing(this.state.detailsId, this.state.detailsRecurringCharge || 0).then();
            promises.push(updateRecurring);
        }
        if (this.state.detailsOneOffCharge) {
            const updateOneOff = VFRemotingService.updateOneOffPackageMemberPricing(this.state.detailsId, this.state.detailsOneOffCharge || 0).then();
            promises.push(updateOneOff);
        }

        Promise.all(promises).then( () => {
            VFRemotingService.getPackages().then(
                result => {
                    this.setState({Packages: result, chargesSaving: false});
                    console.log("getPackages");
                    console.log(result);
                    setTimeout(() => {
                        this.setState( {
                                showSuccessIndicator: true
                            }, () =>
                                setTimeout( () => {
                                    this.setState({
                                        showSuccessIndicator: false
                                    })
                                }, 750)
                        )
                    }, 1);
                }
            )
        })
    }

    handleAddOnSave = () => {
        console.log("handleAddOnSave");
        const promises = [];
        this.setState({chargesSaving : true});
        if (this.state.detailsRecurringCharge) {
            const updateRecurring = VFRemotingService.updateAddOnRecurringPricing(this.state.detailsId, this.state.detailsRecurringCharge || 0).then();
            promises.push(updateRecurring);
        }
        if (this.state.detailsOneOffCharge) {
            const updateOneOff = VFRemotingService.updateAddOnOneOffPricing(this.state.detailsId, this.state.detailsOneOffCharge || 0).then();
            promises.push(updateOneOff);
        }

        Promise.all(promises).then( () => {
            VFRemotingService.getCPs().then(
                result => {
                    this.setState({CPs: result, chargesSaving: false});
                    console.log("getCPs");
                    console.log(result);
                    setTimeout(() => {
                        this.setState( {
                                showSuccessIndicator: true
                            }, () =>
                                setTimeout( () => {
                                    this.setState({
                                        showSuccessIndicator: false
                                    })
                                }, 750)
                        )
                    }, 1);
                }
            )
        })
    }

    /* Popup save button handler */
    handleCPSave = () => {
        console.log("handleDropdownSave");
        this.handleSave();
    }

    /* Popup close button handler */
    handlePopupClose = () => {
        console.log("handlePopupClose");
        /* close dropdown here */

    }

    onSearchChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    /* PROMOTIONS HANDLER */
    handleBtnPromotions = (id) => {
        console.log("handleBtnPromotions called")
        this.handleOnPromotionOpen(id);
        this.openModalManagePromotions();
    }

    handleOnPromotionOpen = (id) => {
        VFRemotingService.getCommercialProductPromotions(id).then(
            result => {
                this.setState({
                    Promotions: result,
                    activeProduct: 'CP'
                });
                console.log("getCommercialProductPromotions in handleOnPromotionOpen")
                console.log(result);

            })
    }

    handleBtnAddonPromotions = (id) => {
        console.log("handleBtnAddonPromotions called")
        this.handleOnAddonPromotionOpen(id);
        this.openModalManagePromotions();
    }

    handleOnAddonPromotionOpen = (id) => {
        VFRemotingService.getAddOnPromotions(id).then(
            result => {
                this.setState({
                    Promotions: result,
                    activeProduct: 'AddOn'
                });
                console.log("getAddonPromotions in handleOnAddonPromotionOpen")
                console.log(result);

            })
    }

    createNewPromotionHandler = () => {
        // non-ux stuff

        VFRemotingService.getPricingRuleGroups().then(
            result => {
                console.log("getPricingRuleGroups in createNewPromotionHandler")
                console.log(result);
                let lookupHelper = {
                    columns: [
                        {key: 'Name', label: 'Name'},
                        {key: 'cspmb__pricing_rule_group_code__c', label: 'Code'}
                    ],
                    data: result
                }
                this.setState({pricingRuleGroupLookup: lookupHelper});
                console.log(this.state.pricingRuleGroupLookup);
                this.setState({showNewPromotionModal: true})
            }
        );
    }

    componentDidMount() {
        VFRemotingService.getCPs().then(
            result => {
                this.setState({CPs: result});
                console.log("getCPs");
                console.log(result);
            }
        );
        VFRemotingService.getPackages().then(
            result => {
                this.setState({Packages: result});
                console.log("getPackages");
                console.log(result);
            }
        );
    }

    showCPAndAddons = (cp, byAddons) => {
        if (this.state.searchTerm) {
            if (
                (cp.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (cp.cspmb__Price_Item_Code__c || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (cp.cspmb__Price_Item_Description__c || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (cp.Rating__c || '').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (cp.Displayed_One_Off_Price__c || '').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (cp.Displayed_Recurring_Price__c || '').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase())

                || (this.state.showAddons && byAddons && cp.cspmb__Price_Item_Add_On_Price_Item_Association__r &&
                    cp.cspmb__Price_Item_Add_On_Price_Item_Association__r.filter(addon =>
                        (addon.Displayed_One_Off_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (addon.Displayed_Recurring_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (addon.cspmb__Add_On_Price_Item__r.Name ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (addon.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (addon.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Code__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                    ).length > 0
                )
            ) {
                return true;
            } else {
                return false;
            }
        } else return true;
    }
    showPackageAndCPs = (pkg, byCPs) => {
        if (this.state.searchTerm) {
            if (
                (pkg.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (pkg.cspmb__Price_Item_Code__c || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (pkg.cspmb__Price_Item_Description__c || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (pkg.Rating__c || '').toString().toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (pkg.Displayed_One_Off_Price__c || '').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (pkg.Displayed_Recurring_Price__c || '').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase())

                || (this.state.showCPs && byCPs && pkg.cspmb__member_commercial_product_associations__r &&
                    pkg.cspmb__member_commercial_product_associations__r.filter(cp =>
                        (cp.cspmb__member_commercial_product__r.Displayed_One_Off_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (cp.cspmb__member_commercial_product__r.Displayed_Recurring_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (cp.cspmb__member_commercial_product__r.Name ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (cp.cspmb__member_commercial_product__r.Rating__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (cp.cspmb__member_commercial_product__r.cspmb__Price_Item_Code__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        (cp.cspmb__member_commercial_product__r.cspmb__Price_Item_Description__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                    ).length > 0
                )
        ) {
                return true;
            } else {
                return false;
            }
        } else return true;
    }

    rowSortCP(ob1, ob2) {
        if(ob1.Name.toLowerCase() < ob2.Name.toLowerCase()) { return -1; }
        if(ob1.Name.toLowerCase() > ob2.Name.toLowerCase()) { return 1; }
        return 0;
    }
    rowSortPackage(ob1, ob2) {
        if(ob1.Name.toLowerCase() < ob2.Name.toLowerCase()) { return -1; }
        if(ob1.Name.toLowerCase() > ob2.Name.toLowerCase()) { return 1; }
        return 0;
    }
    rowSortAddon(ob1, ob2) {
        if(ob1.cspmb__Add_On_Price_Item__r.Name.toLowerCase() < ob2.cspmb__Add_On_Price_Item__r.Name.toLowerCase()) { return -1; }
        if(ob1.cspmb__Add_On_Price_Item__r.Name.toLowerCase() > ob1.cspmb__Add_On_Price_Item__r.Name.toLowerCase()) { return 1; }
        return 0;
    }

    toggleShowAddons = () => {
        this.setState({showAddons: !this.state.showAddons});
    }

    toggleShowCPs = () => {
        this.setState({showCPs: !this.state.showCPs});
    }

    render() {
        const handleOnPackageClick = (id) => {
            VFRemotingService.getCommercialProduct(id).then(
                result => {
                    console.log("getCommercialProduct in handleOnPackageClick")
                    console.log(result);
                    this.setState({detailsName: result.Name, activeProduct: 'Package'});
                }
            );
        }

        const handleOnCPEditClick = (id) => {
            VFRemotingService.getCommercialProduct(id).then(
                result => {
                    console.log("getCommercialProduct in handleOnCPEditClick")
                    console.log(result);
                    let recurringHelper = '';
                    let oneOffHelper = '';
                    if (result) {
                        result.pricingElementWrappers?.map((pe) => {
                            if (pe.type === 'One-off Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List' && coppra.pricingRuleName === 'Default Pricing Rule for Starhub') {
                                        oneOffHelper = coppra.oneOffAdjustment;
                                    }
                                })
                            }
                            if (pe.type === 'Recurring Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List' && coppra.pricingRuleName === 'Default Pricing Rule for Starhub') {
                                        recurringHelper = coppra.recurringAdjustment;
                                    }
                                })
                            }
                        })
                        this.setState({
                            detailsRecurringCharge: recurringHelper,
                            detailsOneOffCharge: oneOffHelper,
                            detailsName: result.name,
                            detailsId: result.id,
                            activeProduct: 'CP'
                        });
                    }

                }
            );
        }

        const handleOnPackageMemberClick = (id) => {
            VFRemotingService.getCommercialProductAssociation(id).then(
                result => {
                    console.log("getCommercialProductAssociation in handleOnPackageMemberClick")
                    console.log(result);
                    let recurringHelper = '';
                    let oneOffHelper = '';
                    if (result) {
                        result.pricingElementWrappers?.map((pe) => {
                            if (pe.type === 'One-off Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List' && coppra.pricingRuleName === 'Default Pricing Rule for Starhub') {
                                        oneOffHelper = coppra.oneOffAdjustment;
                                    }
                                })
                            }
                            if (pe.type === 'Recurring Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List' && coppra.pricingRuleName === 'Default Pricing Rule for Starhub') {
                                        recurringHelper = coppra.recurringAdjustment;
                                    }
                                })
                            }
                        })
                        this.setState({
                            detailsRecurringCharge: recurringHelper,
                            detailsOneOffCharge: oneOffHelper,
                            detailsName: result.name,
                            detailsId: result.id,
                            activeProduct: 'CP'
                        });
                    }

                }
            );
        }

        const handleOnAOEditClick = (id) => {
            VFRemotingService.getAddOn(id).then(
                result => {
                    console.log("getAddons in handleOnAOEditClick")
                    console.log(result);
                    let recurringHelper = '';
                    let oneOffHelper = '';
                    if (result) {
                        result.pricingElementWrappers?.map((pe) => {
                            if (pe.type === 'One-off Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List' && coppra.pricingRuleName === 'Default Pricing Rule for Starhub') {
                                        oneOffHelper = coppra.oneOffAdjustment;
                                    }
                                })
                            }
                            if (pe.type === 'Recurring Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List' && coppra.pricingRuleName === 'Default Pricing Rule for Starhub') {
                                        recurringHelper = coppra.recurringAdjustment;
                                    }
                                })
                            }
                        })
                        this.setState({
                            detailsRecurringCharge: recurringHelper,
                            detailsOneOffCharge: oneOffHelper,
                            detailsName: result.name,
                            detailsId: result.id,
                            activeProduct: 'AOAS'
                        });
                    }
                }
            );
        }

        const getProductNameValue = () => {
            return this.state.detailsName;
        }

        const getProductRecurringCharge = () => {
            return this.state.detailsRecurringCharge;
        }

        const clearState = () => {
            this.setState({
                activeProduct: '',
                detailsName: '',
                detailsId: '',
                detailsRecurringCharge: '',
                detailsOneOffCharge: ''
            });
        }

        let chargesDropdown = (id) =>
            <CSDropdown
                mode="custom"
                iconOrigin="cs"
                iconName="currency_dollar"
                onDropdownOpen={() => handleOnCPEditClick(id)}
                onDropdownClose={() => clearState()}
            >
                <div className="dropdown-charges">
                    <CSInputText
                        label="One-Off Charge"
                        value={this.state.detailsOneOffCharge}
                        onChange={this.onChangeOneOff}
                    />
                    <CSInputText
                        label="Recurring Charge"
                        value={this.state.detailsRecurringCharge}
                        onChange={this.onChangeRecurring}
                    />
                    <div className="dropdown-footer">
                        { this.state.chargesSaving &&
                            <CSSpinner color="brand" size="small" inline />
                        }
                        { !this.state.chargesSaving && this.state.showSuccessIndicator ?
                            <CSIcon className="success-icon" name="success" color="#009540" /> : null
                        }
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                            onClick={this.handleCPSave}
                        />
                    </div>
                </div>
            </CSDropdown>

        let addOnChargesDropdown = (id) =>
            <CSDropdown
                mode="custom"
                iconOrigin="cs"
                iconName="currency_dollar"
                onDropdownOpen={() => handleOnAOEditClick(id)}
                onDropdownClose={() => clearState()}
            >
                <div className="dropdown-charges">
                    <CSInputText
                        label="One-Off Charge"
                        value={this.state.detailsOneOffCharge}
                        onChange={this.onChangeOneOff}
                    />
                    <CSInputText
                        label="Recurring Charge"
                        value={this.state.detailsRecurringCharge}
                        onChange={this.onChangeRecurring}
                    />
                    <div className="dropdown-footer">
                        { this.state.chargesSaving &&
                        <CSSpinner color="brand" size="small" inline />
                        }
                        { !this.state.chargesSaving && this.state.showSuccessIndicator ?
                            <CSIcon className="success-icon" name="success" color="#009540" /> : null
                        }
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                            onClick={this.handleAddOnSave}
                        />
                    </div>
                </div>
            </CSDropdown>

        let chargesDropdownMock = (oneOff, recurring) =>
            <CSDropdown
                mode="custom"
                iconOrigin="cs"
                iconName="currency_dollar"
                onDropdownClose={() => clearState()}
            >
                <div className="dropdown-charges">
                    <CSInputText
                        label="One-Off Charge"
                        value={oneOff ? Number(oneOff / 1.07).toFixed(2) : '0'}
                    />
                    <CSInputText
                        label="Recurring Charge"
                        value={recurring ? Number(recurring / 1.07).toFixed(2) : '0'}
                    />
                    <div className="dropdown-footer">
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                        />
                    </div>
                </div>
            </CSDropdown>

        let chargesPackageMemberDropdown = (id) =>
            <CSDropdown
                mode="custom"
                iconOrigin="cs"
                iconName="currency_dollar"
                onDropdownOpen={() => handleOnPackageMemberClick(id)}
                onDropdownClose={() => clearState()}
            >
                <div className="dropdown-charges">
                    <CSInputText
                        label="One-Off Charge"
                        value={this.state.detailsOneOffCharge}
                        onChange={this.onChangeOneOff}
                    />
                    <CSInputText
                        label="Recurring Charge"
                        value={this.state.detailsRecurringCharge}
                        onChange={this.onChangeRecurring}
                    />
                    <div className="dropdown-footer">
                        { this.state.chargesSaving &&
                        <CSSpinner color="brand" size="small" inline />
                        }
                        { !this.state.chargesSaving && this.state.showSuccessIndicator ?
                            <CSIcon className="success-icon" name="success" color="#009540" /> : null
                        }
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                            onClick={this.handlePackageMemberSave}
                        />
                    </div>
                </div>
            </CSDropdown>

        return (
            <>
                <CSTabGroup variant="large" className="ppdm-tabs">
                    <CSTab
                        name="PLM"
                        onClick={() => this.handleTabClick('PLM')}
                        active={this.state.activeTab === 'PLM'}
                    />
                    <CSTab
                        name="Commercial Products"
                        onClick={() => this.handleTabClick('CPs')}
                        active={this.state.activeTab === 'CPs'}
                    />
                    <CSTab
                        name="Packages"
                        onClick={() => this.handleTabClick('Packages')}
                        active={this.state.activeTab === 'Packages'}
                    />
                </CSTabGroup>
                {this.state.activeTab !== 'PLM' &&
                    <div className="action-row">
                        <CSInputSearch
                            placeholder="Search"
                            width="20rem"
                            onChange={this.onSearchChange}
                            value={this.state.searchTerm}
                        />
                        {this.state.activeTab === 'CPs' ? (
                            <CSToggle
                                label="Show Add-Ons"
                                onClick={this.toggleShowAddons}
                                checked={this.state.showAddons}
                                labelPosition="left"
                            />
                        ) : null}
                        {this.state.activeTab === 'Packages' ? (
                            <CSToggle
                                label="Show Package Members"
                                onClick={this.toggleShowCPs}
                                checked={this.state.showCPs}
                                labelPosition="left"
                            />
                        ) : null}
                    </div>
                }
                <div className={this.state.activeTab === 'PLM' ? 'plm-wrapper' : 'plm-wrapper hidden'} id="lightning"></div>
                {this.state.activeTab === 'CPs' &&
                    <div className="ppdm-table-wrapper">
                        <CSTable>
                            {/* COMMERCIAL PRODUCT TABLE */}
                            <CSTableHeader>
                                <CSTableCell text="Image" className="col-Image"/>
                                <CSTableCell text="Name" grow={2} className="col-Name"/>
                                <CSTableCell text="Description" grow={4} className="col-Description"/>
                                <CSTableCell text="Commercial Product Code" grow={2} className="col-CommercialProductCode"/>
                                <CSTableCell text="Rating" className="col-Rating"/>
                                <CSTableCell text="Displayed One Off" className="col-OneOff"/>
                                <CSTableCell text="Displayed Recurring" className="col-Recurring"/>
                                <CSTableCell text="Actions" className="col-Actions"/>
                            </CSTableHeader>

                            <CSTableBody>
                                {this.state.CPs ? Object.values(this.state.CPs)
                                    .sort(this.rowSortCP)
                                    .map((row) => {
                                        return (
                                            <React.Fragment key={row.Id}>
                                                <>
                                                    {this.showCPAndAddons(row, true) &&
                                                    <CSTableRow>
                                                        <CSTableCell className="col-Image">
                                                            <img src={row.Image_URL__c}/>
                                                        </CSTableCell>
                                                        <CSTableCell grow={2} className="col-Name">
                                                            <button className="link-button" onClick={() => this.handleCPandPKGNameClick(row.Id)} title={row.Name}>{row.Name}</button>
                                                        </CSTableCell>
                                                        <CSTableCell text={row.cspmb__Price_Item_Description__c} grow={4}
                                                                     className="col-Description"/>
                                                        <CSTableCell text={row.cspmb__Price_Item_Code__c} grow={2}
                                                                     className="col-CommercialProductCode"/>
                                                        <CSTableCell text={row.Rating__c} className="col-Rating"/>
                                                        <CSTableCell text={row.Displayed_One_Off_Price__c}
                                                                     className="col-OneOff"/>
                                                        <CSTableCell text={row.Displayed_Recurring_Price__c}
                                                                     className="col-Recurring"/>
                                                        <CSTableCell className="col-Actions">
                                                            {chargesDropdown(row.Id)}
                                                            <CSButton
                                                                label="Manage Promotions"
                                                                className="manage-promotions"
                                                                labelHidden
                                                                iconName="tag"
                                                                iconOrigin="cs"
                                                                onClick={() => this.handleBtnPromotions(row.Id)}
                                                            />
                                                        </CSTableCell>
                                                    </CSTableRow>
                                                    }
                                                </>
                                                {this.state.showAddons && row.cspmb__Price_Item_Add_On_Price_Item_Association__r ? row.cspmb__Price_Item_Add_On_Price_Item_Association__r
                                                    .sort(this.rowSortAddon)
                                                    .filter((addonAssociation) => {
                                                        if (this.state.searchTerm) {
                                                            if (
                                                                this.showCPAndAddons(row, false) ||
                                                                (addonAssociation.cspmb__Add_On_Price_Item__r.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (addonAssociation.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (addonAssociation.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Code__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (addonAssociation.Displayed_Recurring_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (addonAssociation.Displayed_One_Off_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase())
                                                            ) {
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        } else return true;
                                                    })
                                                    .map((addonAssociation) => (
                                                        <CSTableRow
                                                            className="addon-row"
                                                            key={addonAssociation.Id}
                                                        >
                                                            <CSTableCell className="col-Image">
                                                                <img
                                                                    src={addonAssociation.cspmb__Add_On_Price_Item__r.Image_URL__c}/>
                                                            </CSTableCell>
                                                            <CSTableCell
                                                                className="col-Name"
                                                                grow={2}
                                                            >
                                                                <div className="addon-icon-wrapper">
                                                                    <CSIcon
                                                                        className="addon-icon"
                                                                        title="Add On"
                                                                        name="standard_objects"
                                                                    />
                                                                </div>
                                                                <button className="link-button" onClick={() => this.handleAddonNameClick(addonAssociation.Id)} title={addonAssociation.cspmb__Add_On_Price_Item__r.Name}>{addonAssociation.cspmb__Add_On_Price_Item__r.Name}</button>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell
                                                                text={addonAssociation.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c}
                                                                grow={4} className="col-Description"/>
                                                            <CSTableCell
                                                                text={addonAssociation.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Code__c}
                                                                grow={2} className="col-CommercialProductCode"/>
                                                            <CSTableCell className="col-Rating"/>
                                                            <CSTableCell text={addonAssociation.Displayed_One_Off_Price__c}
                                                                         className="col-OneOff"/>
                                                            <CSTableCell
                                                                text={addonAssociation.Displayed_Recurring_Price__c}
                                                                className="col-Recurring"/>
                                                            <CSTableCell className="col-Actions">
                                                                {addOnChargesDropdown(addonAssociation.Id)}
                                                                <CSButton
                                                                    label="Manage Promotions"
                                                                    className="manage-promotions"
                                                                    labelHidden
                                                                    iconName="tag"
                                                                    iconOrigin="cs"
                                                                    onClick={() => this.handleBtnAddonPromotions(addonAssociation.Id)}
                                                                />
                                                            </CSTableCell>
                                                        </CSTableRow>
                                                    )) : null
                                                }
                                            </React.Fragment>
                                        )
                                    }) : null
                                }
                            </CSTableBody>
                        </CSTable>
                    </div>
                }
                {this.state.activeTab === 'Packages' &&
                    <div className="ppdm-table-wrapper">
                        <CSTable>
                            {/* PACKAGES WITH CPs TABLE */}
                            <CSTableHeader>
                                <CSTableCell text="Image" className="col-Image" />
                                <CSTableCell text="Name" grow={2} className="col-Name" />
                                <CSTableCell text="Description" grow={4} className="col-Description" />
                                <CSTableCell text="Commercial Product Code" grow={2}  className="col-CommercialProductCode" />
                                <CSTableCell text="Rating" className="col-Rating" />
                                <CSTableCell text="Displayed One Off"  className="col-OneOff" />
                                <CSTableCell text="Displayed Recurring"  className="col-Recurring" />
                                <CSTableCell text="Actions" className="col-Actions" />
                            </CSTableHeader>
                            <CSTableBody>
                                {this.state.Packages ? Object.values(this.state.Packages)
                                    .sort(this.rowSortPackage)
                                    .map((row) => {
                                        return (
                                            <React.Fragment key={row.Id}>
                                                <>
                                                    {this.showPackageAndCPs(row, true) &&
                                                        <CSTableRow>
                                                            <CSTableCell className="col-Image">
                                                                <img src={row.Image_URL__c}/>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2} className="col-Name">
                                                                <CSIcon
                                                                    className="pkg-icon"
                                                                    name="package_solid"
                                                                    origin="cs"
                                                                />
                                                                <button className="link-button" onClick={() => this.handleCPandPKGNameClick(row.Id)} title={row.Name}>{row.Name}</button>
                                                            </CSTableCell>
                                                            <CSTableCell text={row.cspmb__Price_Item_Description__c} grow={4} className="col-Description"/>
                                                            <CSTableCell text={row.cspmb__Price_Item_Code__c} grow={2} className="col-CommercialProductCode"/>
                                                            <CSTableCell text={row.Rating__c} className="col-Rating"/>
                                                            <CSTableCell text={row.Displayed_One_Off_Price__c} className="col-OneOff"/>
                                                            <CSTableCell text={row.Displayed_Recurring_Price__c} className="col-Recurring"/>
                                                            <CSTableCell className="col-Actions">
                                                                {chargesDropdownMock(row.Displayed_One_Off_Price__c, row.Displayed_Recurring_Price__c)}
                                                                {/*<CSButton*/}
                                                                {/*    label="Manage Promotions"*/}
                                                                {/*    className="manage-promotions"*/}
                                                                {/*    labelHidden*/}
                                                                {/*    iconName="tag"*/}
                                                                {/*    iconOrigin="cs"*/}
                                                                {/*    onClick={() => this.handleBtnPromotions()}*/}
                                                                {/*/>*/}
                                                            </CSTableCell>
                                                        </CSTableRow>
                                                    }
                                                </>
                                                {this.state.showCPs && row.cspmb__member_commercial_product_associations__r ? row.cspmb__member_commercial_product_associations__r
                                                    .sort(this.rowSortCP)
                                                    .filter((CPAssociation) => {
                                                        if (this.state.searchTerm) {
                                                            if (
                                                                this.showPackageAndCPs(row, false) ||
                                                                (CPAssociation.cspmb__member_commercial_product__r.Displayed_One_Off_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (CPAssociation.cspmb__member_commercial_product__r.Displayed_Recurring_Price__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (CPAssociation.cspmb__member_commercial_product__r.Name ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (CPAssociation.cspmb__member_commercial_product__r.Rating__c ||'').toString().toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (CPAssociation.cspmb__member_commercial_product__r.cspmb__Price_Item_Code__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                                                                (CPAssociation.cspmb__member_commercial_product__r.cspmb__Price_Item_Description__c ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                                                            ) {
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        } else return true;
                                                    })
                                                    .map((cpAssociation) => (
                                                        <CSTableRow
                                                            className="package-cp-row"
                                                            key={cpAssociation.Id}
                                                        >
                                                            <CSTableCell className="col-Image">
                                                                <img src={cpAssociation.cspmb__member_commercial_product__r.Image_URL__c}/>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2} className="col-Name">
                                                                <span></span>
                                                                <button className="link-button" onClick={() => this.handleCPandPKGNameClick(cpAssociation.Id)} title={cpAssociation.cspmb__member_commercial_product__r.Name}>{cpAssociation.cspmb__member_commercial_product__r.Name}</button>
                                                            </CSTableCell>
                                                            <CSTableCell grow={4} className="col-Description">
                                                                <span>{cpAssociation.cspmb__member_commercial_product__r.cspmb__Price_Item_Description__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2} className="col-CommercialProductCode">
                                                                <span>{cpAssociation.cspmb__member_commercial_product__r.cspmb__Price_Item_Code__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell className="col-Rating">
                                                                <span>{cpAssociation.cspmb__member_commercial_product__r.Rating__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell className="col-OneOff">
                                                                <span>{cpAssociation.Displayed_One_Off_Price__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell className="col-Recurring">
                                                                <span>{cpAssociation.Displayed_Recurring_Price__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell className="col-Actions">
                                                                {chargesPackageMemberDropdown(cpAssociation.Id)}
                                                                {/*<CSButton*/}
                                                                {/*    label="Manage Promotions"*/}
                                                                {/*    className="manage-promotions"*/}
                                                                {/*    labelHidden*/}
                                                                {/*    iconName="tag"*/}
                                                                {/*    iconOrigin="cs"*/}
                                                                {/*    onClick={() => this.handleBtnPromotions()}*/}
                                                                {/*/>*/}
                                                            </CSTableCell>
                                                        </CSTableRow>
                                                    )) : null
                                                }
                                            </React.Fragment>
                                        )
                                    }) : null
                                }
                            </CSTableBody>
                        </CSTable>
                    </div>
                }

                {/* MANAGE PROMOTIONS MODAL */}
                <CSModal
                    visible={this.state.showManagePromotionsModal}
                    size="medium"
                    animated
                    closeButton
                    onClose={this.closeModal}
                    className="manage-promotions-modal"
                >
                    <CSModalHeader
                        title="Manage Promotions"
                        subtitle={this.state.activeProduct === 'AddOn' ? `${this.state.Promotions.name} • ${this.state.Promotions.addOnName}` : this.state.Promotions.name}
                    />
                    <CSModalBody padding="1rem 1.5rem 1rem 1.5rem" minHeight="40vh">
                        <CSButton
                            label="Create new promotion"
                            onClick={() => this.createNewPromotionHandler()}
                            className="create-new-promotion-btn"
                        />
                        {this.state.Promotions.pricingElementWrappers ? this.state.Promotions.pricingElementWrappers.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.coppraWrappers?.length ? item.coppraWrappers.map((coppra, index) => (
                                    <CSSection key={index} title={coppra.pricingRuleName} collapsible>
                                        <div className="field-wrapper">
                                            <CSLabel label="Pricing Rule Record"/>
                                            <button className="link-button" onClick={() => this.handlePRRClick(coppra.pricingRuleId)}>{coppra.pricingRuleName}</button>
                                        </div>
                                        <div className="field-wrapper">
                                            <CSLabel label="Pricing Rule Association Record"/>
                                            <button className="link-button" onClick={() => this.handlePRARClick(coppra.id)}>{coppra.name}</button>
                                        </div>
                                        <CSInputText label="Pricing Rule Code" readOnly value={coppra.pricingRuleCode} />
                                        <CSInputText label="Pricing Rule Description" readOnly value={coppra.pricingRuleDescription} />
                                        <CSInputText label="Association Type" readOnly value={coppra.associationType} />
                                        <div className="placeholder"></div>
                                        {item.type === 'Recurring Charge' &&
                                            <>
                                                <CSInputText label="Recurring Adjustment Type" readOnly value={coppra.RecurringAdjustmentType} />
                                                <CSInputText label="Recurring Adjustment" readOnly value={coppra.recurringAdjustment} />
                                            </>
                                        }
                                        {item.type === 'One-off Charge' &&
                                            <>
                                                <CSInputText label="One Off Adjustment Type" readOnly value={coppra.OneOffAdjustmentType} />
                                                <CSInputText label="One Off Adjustment" readOnly value={coppra.oneOffAdjustment} />
                                            </>
                                        }

                                    </CSSection>
                                )) :
                                    <div className="no-promotions-msg">No promotions to show</div>
                                }
                            </React.Fragment>
                        )) :
                            <div className="no-promotions-msg">No promotions to show</div>
                        }
                    </CSModalBody>

                    <CSModalFooter align="right">
                        <CSButton
                            label="Close"
                            onClick={this.closeModal}
                        />
                    </CSModalFooter>
                </CSModal>

                {/* CREATE NEW PROMOTION MODAL */}
                <CSModal
                    visible={this.state.showNewPromotionModal}
                    size="small"
                    animated
                    closeButton
                    onClose={() => this.closeNewPromotionModal()}
                    className="new-promotion-modal"
                >
                    <CSModalHeader
                        title="Create New Promotion"
                        subtitle={this.state.activeProduct === 'AddOn' ? `${this.state.Promotions.name} • ${this.state.Promotions.addOnName}` : this.state.Promotions.name}
                    />
                    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                        <div className="column-wrapper">
                            <div className="field-wrapper">
                                <CSLabel required label="Pricing Rule Group" />
                                <div className="lookup-btn-wrapper">
                                    <CSLookup
                                        fieldToBeDisplayed="Name"
                                        label="Pricing Rule Group"
                                        labelHidden
                                        className="ppdm-lookup"
                                        value={this.state.newPromotionPricingRuleGroup.Id}
                                        lookupColumns={this.state.pricingRuleGroupLookup ? (this.state.pricingRuleGroupLookup.columns ? this.state.pricingRuleGroupLookup.columns : []) : []}
                                        lookupOptions={this.state.pricingRuleGroupLookup ? (this.state.pricingRuleGroupLookup.data ? this.state.pricingRuleGroupLookup.data : []) : []}
                                        borderRadius="0.25rem 0 0 0.25rem"
                                        mode="client"
                                        onSelectChange={lookupResult => this.onChangeLookup(lookupResult)}
                                        required
                                    />
                                    <CSButton
                                        className="open-modal-btn"
                                        label="New"
                                        borderRadius="0 0.25rem 0.25rem 0"
                                        onClick={() => this.setState({showCreateNewPRG: true})}
                                    />
                                </div>
                            </div>
                            <CSInputText label="Pricing Rule" readOnly value={this.state.newPromotionPricingRule}/>
                            <CSInputText label="Priority" readOnly value={this.state.newPromotionPricingPriority} />
                            <CSInputText label="Code" readOnly value={this.state.newPromotionPricingRuleGroup.cspmb__pricing_rule_group_code__c} />
                            <CSSelect label="Charge Type" value={this.state.newPromotionPricingType} onChange={option => this.onChangeNewPromotionPricingType(option)}>
                                <option>Recurring Charge</option>
                                <option>One Off Charge</option>
                            </CSSelect>
                            <CSSelect label="Association Type" value={this.state.newPromotionAssociationType} onChange={option => this.onChangeNewPromotionAssociationType(option)}>
                                <option>Pricing change</option>
                                <option>Predicate</option>
                                <option>Promotional item</option>
                            </CSSelect>
                            <CSSelect
                                label={`${this.state.newPromotionPricingType === 'Recurring Charge' ? 'Recurring' : 'One Off'} Adjustment Type`}
                                value={this.state.newPromotionAdjustmentType}
                                onChange={option => this.onChangeNewPromotionAdjustmentType(option)}
                            >
                                <option>Absolute Discount</option>
                                <option>Relative Discount</option>
                                <option>Price Override</option>
                                <option>Initial Price</option>
                            </CSSelect>
                            <CSInputText required label="Amount" onChange={this.onChangeNewPromotionPricingAmount} value={this.state.newPromotionPricingAmount} />

                        </div>
                    </CSModalBody>
                    <CSModalFooter align="right">
                        <CSButton
                            label="Cancel"
                            onClick={this.closeNewPromotionModal}
                        />
                        <CSButton
                            label="Save"
                            disabled={!this.state.newPromotionPricingAmount || !this.state.newPromotionPricingRuleGroup}
                            btnStyle="brand"
                            onClick={this.saveNewPromotion}
                        />
                    </CSModalFooter>
                </CSModal>

                {/* CREATE NEW PRICING RULE GROUP */}
                <CSModal
                    visible={this.state.showCreateNewPRG}
                    size="xsmall"
                    animated
                    closeButton
                    onClose={this.closeNewPRGModal}
                    className="create-new-prg-modal"
                >
                    <CSModalHeader title="Create New Price Rule Group"/>
                    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                        {/*<CSButton*/}
                        {/*    className="prepopulate-btn"*/}
                        {/*    label="prepopulate data"*/}
                        {/*    labelHidden*/}
                        {/*    iconName="edit"*/}
                        {/*    size="small"*/}
                        {/*    btnType="transparent"*/}
                        {/*    btnStyle="brand"*/}
                        {/*    onClick={this.prepopulateCreateNewPriceGroupRule}*/}
                        {/*/>*/}
                        <CSInputText required label="Pricing Rule Group Name" onChange={this.onChangeNewPRGName} value={this.state.newPRGName} />
                        <CSInputText required label="Pricing Rule Group Code" onChange={this.onChangeNewPRGCode} value={this.state.newPRGCode} />
                        <CSInputText label="Priority" onChange={this.onChangeNewPRGPriority} value={this.state.newPRGPriority} />
                        <CSInputText label="Description" onChange={this.onChangenewPRGDescription} value={this.state.newPRGDescription} />
                    </CSModalBody>
                    <CSModalFooter align="right">
                        <CSButton
                            label="Cancel"
                            onClick={this.closeNewPRGModal}
                        />
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                            disabled={!this.state.newPRGName || !this.state.newPRGCode}
                            onClick={this.saveNewPRG}
                        />
                    </CSModalFooter>
                </CSModal>

                {/*<CSModal*/}
                {/*    visible={this.state.visibleModal === 'commercial-product-details'}*/}
                {/*    size="medium"*/}
                {/*    animated*/}
                {/*    closeButton*/}
                {/*    onClose={this.closeModal}*/}
                {/*    className="cp-details-modal"*/}
                {/*>*/}
                {/*    <CSModalHeader*/}
                {/*        title="Set List Price of Existing Commercial Product"*/}
                {/*        subtitle={getProductNameValue()}*/}
                {/*    />*/}
                {/*    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">*/}
                {/*        <div className="column-wrapper">*/}
                {/*            <CSInputText label="Commercial Product" value={getProductNameValue()} onChange={this.handleInputOnChange} />*/}
                {/*            <div className="placeholder"></div>*/}
                {/*            <div className="input-wrapper">*/}
                {/*                <CSInputText label="Recurring Price" readOnly={!this.state.recurringPriceEditable} value={this.state.detailsRecurringCharge} onChange={this.onChangeRecurring}/>*/}
                {/*                {!this.state.recurringPriceEditable &&*/}
                {/*                    <CSButton*/}
                {/*                        size="small"*/}
                {/*                        label="edit"*/}
                {/*                        labelHidden*/}
                {/*                        iconName="edit"*/}
                {/*                        iconColor="rgba(0, 0, 0, 0.25)"*/}
                {/*                        onClick={() => this.setState({recurringPriceEditable: true})}*/}
                {/*                    />*/}
                {/*                }*/}
                {/*            </div>*/}
                {/*            <div className="input-wrapper">*/}
                {/*                <CSInputText label="One-Off Price" readOnly={!this.state.oneOffPriceEditable} value={this.state.detailsOneOffCharge} onChange={this.onChangeOneOff}/>*/}
                {/*                {!this.state.oneOffPriceEditable &&*/}
                {/*                    <CSButton*/}
                {/*                        size="small"*/}
                {/*                        label="edit"*/}
                {/*                        labelHidden*/}
                {/*                        iconName="edit"*/}
                {/*                        iconColor="rgba(0, 0, 0, 0.25)"*/}
                {/*                        onClick={() => this.setState({oneOffPriceEditable: true})}*/}
                {/*                    />*/}
                {/*                }*/}
                {/*            </div>*/}
                {/*            <div className="field-wrapper">*/}
                {/*                <label>Pricing Rule Group</label>*/}
                {/*                <div className="lookup-btn-wrapper">*/}
                {/*                    <CSLookup*/}
                {/*                        fieldToBeDisplayed="Account"*/}
                {/*                        label="Account"*/}
                {/*                        labelHidden*/}
                {/*                        lookupColumns={sampleLookup.columns}*/}
                {/*                        lookupOptions={sampleLookup.data}*/}
                {/*                        borderRadius="0.25rem 0 0 0.25rem"*/}
                {/*                        mode="client"*/}
                {/*                    />*/}
                {/*                    <CSButton*/}
                {/*                        className="open-modal-btn"*/}
                {/*                        label="New"*/}
                {/*                        borderRadius="0 0.25rem 0.25rem 0"*/}
                {/*                        onClick={() => this.setState({thirdModalVisible: true})}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </CSModalBody>*/}
                {/*    <CSModalFooter align="right">*/}
                {/*        <CSButton*/}
                {/*            label="Cancel"*/}
                {/*            onClick={this.closeModal}*/}
                {/*        />*/}
                {/*        <CSButton*/}
                {/*            label="Save"*/}
                {/*            btnStyle="brand"*/}
                {/*            onClick={this.handleSave}*/}
                {/*        />*/}
                {/*    </CSModalFooter>*/}
                {/*</CSModal>*/}

                {/*<CSModal*/}
                {/*    visible={this.state.secondModalVisible}*/}
                {/*    size="small"*/}
                {/*    animated*/}
                {/*    closeButton*/}
                {/*    onClose={() => this.setState({secondModalVisible: false})}*/}
                {/*    className="cp-details-modal-second"*/}
                {/*>*/}
                {/*    <CSModalHeader title="New Price Rule"/>*/}
                {/*    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">*/}
                {/*        <CSButton*/}
                {/*            className="prepopulate-btn"*/}
                {/*            label="prepopulate data"*/}
                {/*            labelHidden*/}
                {/*            iconName="edit"*/}
                {/*            size="small"*/}
                {/*            btnType="transparent"*/}
                {/*            btnStyle="brand"*/}
                {/*        />*/}
                {/*        <div className="column-wrapper">*/}
                {/*            <div className="col">*/}
                {/*                <CSInputText label="Pricing Rule Name"/>*/}
                {/*                <CSInputText label="Pricing Rule Code"/>*/}
                {/*            </div>*/}
                {/*            <div className="col">*/}
                {/*                <CSInputText label="Context"/>*/}
                {/*                <CSInputText label="Description"/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </CSModalBody>*/}
                {/*    <CSModalFooter align="right">*/}
                {/*        <CSButton*/}
                {/*            label="Cancel"*/}
                {/*            onClick={() => this.setState({secondModalVisible: false})}*/}
                {/*        />*/}
                {/*        <CSButton*/}
                {/*            label="Save and New"*/}
                {/*            btnStyle="brand"*/}
                {/*            onClick={() => this.setState({secondModalVisible: false})}*/}
                {/*        />*/}
                {/*        <CSButton*/}
                {/*            label="Save"*/}
                {/*            btnStyle="brand"*/}
                {/*            onClick={() => this.setState({secondModalVisible: false})}*/}
                {/*        />*/}
                {/*    </CSModalFooter>*/}
                {/*</CSModal>*/}

                {/*<CSModal*/}
                {/*    visible={this.state.thirdModalVisible}*/}
                {/*    size="small"*/}
                {/*    animated*/}
                {/*    closeButton*/}
                {/*    onClose={() => this.setState({thirdModalVisible: false})}*/}
                {/*    className="cp-details-modal-second"*/}
                {/*>*/}
                {/*    <CSModalHeader title="New Price Rule"/>*/}
                {/*    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">*/}
                {/*        <CSButton*/}
                {/*            className="prepopulate-btn"*/}
                {/*            label="prepopulate data"*/}
                {/*            labelHidden*/}
                {/*            iconName="edit"*/}
                {/*            size="small"*/}
                {/*            btnType="transparent"*/}
                {/*            btnStyle="brand"*/}
                {/*        />*/}
                {/*        <div className="column-wrapper">*/}
                {/*            <div className="col">*/}
                {/*                <CSInputText label="Pricing Rule Group Name"/>*/}
                {/*                <CSInputText label="Pricing Rule Group Code"/>*/}
                {/*            </div>*/}
                {/*            <div className="col">*/}
                {/*                <CSInputText label="Priority"/>*/}
                {/*                <CSInputText label="Description"/>*/}
                {/*            </div>*/}
                {/*            <div className="col">*/}
                {/*                <CSInputText label="Rule Group Compounding Type"/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </CSModalBody>*/}
                {/*    <CSModalFooter align="right">*/}
                {/*        <CSButton*/}
                {/*            label="Cancel"*/}
                {/*            onClick={() => this.setState({thirdModalVisible: false})}*/}
                {/*        />*/}
                {/*        <CSButton*/}
                {/*            label="Save and New"*/}
                {/*            btnStyle="brand"*/}
                {/*            onClick={() => this.setState({thirdModalVisible: false})}*/}
                {/*        />*/}
                {/*        <CSButton*/}
                {/*            label="Save"*/}
                {/*            btnStyle="brand"*/}
                {/*            onClick={() => this.setState({thirdModalVisible: false})}*/}
                {/*        />*/}
                {/*    </CSModalFooter>*/}
                {/*</CSModal>*/}
            </>
        );
    }
}

export default CPGrid;
