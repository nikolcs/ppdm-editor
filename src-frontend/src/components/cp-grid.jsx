import React from 'react';
import {
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
} from '@cloudsense/cs-ui-components';

import {VFRemotingService} from '../remote'

class CPGrid extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
    }

    state = {
        visibleModal: undefined,
        secondModalVisible: false,
        thirdModalVisible: false,

        searchTerm: '',
        activeTab: 0,
        showAddons: true,

        Packages: '',
        CPs: '',

        activeProduct: '',

        oneOffPriceEditable: true,
        recurringPriceEditable: true,

        detailsName: '',
        detailsId: '',
        detailsRecurringCharge: '',
        detailsOneOffCharge: '',

        chargesSaving: false
    };

    handleInputOnChange = (event) => {
        this.setState({ detailsName: event.target.value});
    }
    onChangeRecurring = (event) => {
        this.setState({ detailsRecurringCharge: event.target.value});
    }
    onChangeOneOff = (event) => {
        this.setState({ detailsOneOffCharge: event.target.value});
    }

    openModal = (modalId) => {
        this.setState({visibleModal: modalId});
    }
    closeModal = () => {
        this.setState({
            visibleModal: undefined,
            activeProduct: '',

            detailsName: '',
            detailsId: '',
            detailsRecurringCharge: '',
            detailsOneOffCharge: '',
        });
        setTimeout(() => {
            this.setState( {
                oneOffPriceEditable: true,
                recurringPriceEditable: true,
            })
        }, 150);
    }

    handleSave = () => {
        console.log("handleSave");
        this.setState({chargesSaving : true});
        Promise.all([VFRemotingService.updateRecurringPricing(this.state.detailsId, this.state.detailsRecurringCharge || null).then()],
            [VFRemotingService.updateOneOffPricing(this.state.detailsId, this.state.detailsOneOffCharge || null).then()]
        ).then( () => {
            VFRemotingService.getCPs().then(
                result => {
                    this.setState({CPs: result});
                    console.log("getCPs");
                    console.log(result);
                    this.setState({chargesSaving : false})
                }
            )
        })
    }

    /* Popup save button handler */
    handlePopupSave = () => {
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
    rowSort(ob1, ob2) {
        return -1;
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

    showCP = (cp, byAddons, byCPs) => {
        if (this.state.searchTerm) {
            if (
                (cp.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                || (byAddons && cp.cspmb__Price_Item_Add_On_Price_Item_Association__r && cp.cspmb__Price_Item_Add_On_Price_Item_Association__r.filter(x => (x.cspmb__Add_On_Price_Item__r.Name ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase())).length > 0)
                || (byCPs && cp.cspmb__member_commercial_product_associations__r && cp.cspmb__member_commercial_product_associations__r.filter(x => (x.cspmb__member_commercial_product__r.Name ||'').toLowerCase().includes(this.state.searchTerm.toLowerCase())).length > 0)
            ) {
                return true;
            } else {
                return false;
            }
        } else return true;
    }

    toggleShowAddons = () => {
        this.setState({showAddons: !this.state.showAddons});
    }

    render() {
        const sampleLookup = {
            columns: [
                {key: 'Account', label: 'Account'},
                {key: 'Industry', label: 'Industry'}
            ],
            data: [
                {Id: 1, Account: 'Acme', Industry: 'Manufacturing'},
                {Id: 2, Account: 'Global Media', Industry: 'Industry'},
                {Id: 3, Account: 'Salesforce', Industry: 'Software'},
                {Id: 4, Account: 'Elisa', Industry: 'Telecommunications'},
                {Id: 5, Account: 'Facebook', Industry: 'Social media'},
                {Id: 6, Account: 'Google', Industry: 'Technology'},
                {Id: 7, Account: 'Spotify', Industry: 'Streaming and media'},
                {Id: 8, Account: 'British Gas', Industry: 'Energy'},
                {Id: 9, Account: 'Columbia Pictures', Industry: 'Film'},
                {Id: 10, Account: 'Rimac', Industry: 'Car manufacturing'},
                {Id: 11, Account: 'News Corp', Industry: 'Mass media'},
                {Id: 12, Account: 'Telstra', Industry: 'Telecommunications'},
                {Id: 13, Account: 'Netflix', Industry: 'Production'},
                {Id: 14, Account: 'Instagram', Industry: 'Social media'},
                {Id: 15, Account: 'Vodafone', Industry: 'Telecommunications'},
                {Id: 16, Account: 'Apple', Industry: 'Software'},
                {Id: 17, Account: 'Amazon', Industry: 'E-commerce'},
                {Id: 18, Account: 'Ikea', Industry: 'Furniture retail'},
                {Id: 19, Account: 'Microsoft', Industry: 'Software'},
                {Id: 20, Account: 'Visa', Industry: 'Finance'},
                {Id: 21, Account: 'IBM', Industry: 'Software'},
                {Id: 22, Account: 'eBay', Industry: 'E-commerce'},
                {Id: 23, Account: 'Oracle', Industry: 'Software'},
                {Id: 24, Account: 'Tesla', Industry: 'Car manufacturing'},
                {Id: 25, Account: 'YouTube', Industry: 'Streaming and media'},
                {Id: 26, Account: 'O2', Industry: 'Telecommunications'},
                {Id: 27, Account: 'Warner Bros. Pictures', Industry: 'Film'}
            ]
        };

        const handleOnPackageClick = (id) => {
            VFRemotingService.getCommercialProduct(id).then(
                result => {
                    console.log("getCommercialProduct in handleOnPackageClick")
                    console.log(result);
                    this.setState({detailsName: result.Name, visibleModal: 'commercial-product-details', activeProduct: 'Package'});
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
                                    if (coppra.targetPrice === 'List') {
                                        oneOffHelper = coppra.oneOffAdjustment;
                                    }
                                })
                            }
                            if (pe.type === 'Recurring Charge') {
                                pe.coppraWrappers?.map((coppra) => {
                                    if (coppra.targetPrice === 'List') {
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

        const handleOnAddonClick = (id) => {
            VFRemotingService.getCPAOAssociation(id).then(
                result => {
                    this.setState({detailsName: result.cspmb__Add_On_Price_Item__r.Name, visibleModal: 'commercial-product-details', activeProduct: 'Addon'});
                    console.log("getCPAOAssociation in handleOnAddonClick");
                    console.log(result);
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

        let chargesDropdown = (id) => <CSDropdown
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
                                        { this.state.chargesSaving && <CSSpinner color="brand" size="small" inline />}
                                        <CSButton
                                            label="Save"
                                            btnStyle="brand"
                                            onClick={this.handlePopupSave}
                                        />
                                    </div>
                                </div>
                            </CSDropdown>

        return (
            <>
                <CSTabGroup>
                    <CSTab
                        name="Commercial Products"
                        onClick={() => this.setState({activeTab: 0})}
                        active={this.state.activeTab === 0}
                    />
                    <CSTab
                        name="Packages"
                        onClick={() => this.setState({activeTab: 1})}
                        active={this.state.activeTab === 1}
                    />
                </CSTabGroup>

                <div className="action-row">
                    <CSInputSearch
                        placeholder="Search"
                        width="20rem"
                        onChange={this.onSearchChange}
                        value={this.props.searchTerm}
                    />
                    {this.state.activeTab === 0 ? (
                        <CSToggle
                            label="Show Add-Ons"
                            onClick={this.toggleShowAddons}
                            checked={this.state.showAddons}
                            labelPosition="left"
                        />
                    ) : null
                    }
                </div>

                <div className="table-wrapper">
                    {this.state.activeTab === 0 ? (
                        <CSTable>
                            {/* COMMERCIAL PRODUCT TABLE */}
                            <CSTableHeader>
                                <CSTableCell text="Image"/>
                                <CSTableCell text="Name"  grow={2}/>
                                <CSTableCell text="Description" grow={4}/>
                                <CSTableCell text="Commercial Product Code" grow={2}/>
                                <CSTableCell text="Rating"/>
                                <CSTableCell text="Displayed One off"/>
                                <CSTableCell text="Displayed Recurring"/>
                                <CSTableCell text="Edit charges" maxWidth="6rem" grow={2} />
                            </CSTableHeader>

                            <CSTableBody>
                                {this.state.CPs ? Object.values(this.state.CPs)
                                    .sort(this.rowSort)
                                    .map((row) => {
                                        return (
                                            <React.Fragment key={row.Id}>
                                                <>
                                                    {this.showCP(row, true) &&
                                                        <CSTableRow>
                                                            <CSTableCell>
                                                                <img src={row.Image_URL__c}/>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span>{row.Name}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={4}>
                                                                <span>{row.cspmb__Price_Item_Description__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span>{row.SKU__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span>{row.Rating__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span>{row.Displayed_One_Off_Price__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span>{row.Displayed_Recurring_Price__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell maxWidth="6rem" grow={2}>
                                                                {chargesDropdown(row.Id)}
                                                            </CSTableCell>
                                                        </CSTableRow>
                                                    }
                                                </>
                                                {this.state.showAddons && row.cspmb__Price_Item_Add_On_Price_Item_Association__r ? row.cspmb__Price_Item_Add_On_Price_Item_Association__r
                                                    .filter(addonAssociation => {
                                                        if (this.state.searchTerm) {
                                                            if (
                                                                this.showCP(row, false) ||
                                                                (addonAssociation.cspmb__Add_On_Price_Item__r.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
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
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span>{addonAssociation.cspmb__Add_On_Price_Item__r.Name}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={4}>
                                                                <span>{addonAssociation.cspmb__Add_On_Price_Item__r.cspmb__Add_On_Price_Item_Description__c}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell maxWidth="6rem" grow={2}>
                                                                {chargesDropdown(addonAssociation.Id)}
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
                    ) :
                        <CSTable>
                            {/* PACKAGES WITH CPS PRODUCT TABLE */}
                            <CSTableHeader>
                                <CSTableCell text="Image " />
                                <CSTableCell text="Name" grow={2}/>
                                <CSTableCell text="Description" grow={4}/>
                                <CSTableCell text="SKU code" grow={2} />
                                <CSTableCell text="Rating"/>
                                <CSTableCell text="One off" />
                                <CSTableCell text="recurring" />
                                <CSTableCell text="Edit charges" maxWidth="6rem" grow={2}/>
                            </CSTableHeader>
                            <CSTableBody>
                                {this.state.Packages ? Object.values(this.state.Packages)
                                    .sort(this.rowSort)
                                    .map((row) => {
                                        return (
                                            <React.Fragment key={row.Id}>
                                                <>
                                                    {this.showCP(row, false, true) &&
                                                        <CSTableRow>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span>{row.Name}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={4}>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell maxWidth="6rem" grow={2}>
                                                                {chargesDropdown(row.Id)}
                                                            </CSTableCell>
                                                        </CSTableRow>
                                                    }
                                                </>
                                                {row.cspmb__member_commercial_product_associations__r ? row.cspmb__member_commercial_product_associations__r
                                                    .filter(cpAssociation => {
                                                        if (this.state.searchTerm) {
                                                            if (
                                                                this.showCP(row, false, true) ||
                                                                (cpAssociation.cspmb__member_commercial_product__r.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
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
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span>{cpAssociation.cspmb__member_commercial_product__r.Name}</span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={4}>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell grow={2}>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell>
                                                                <span></span>
                                                            </CSTableCell>
                                                            <CSTableCell maxWidth="6rem" grow={2}>
                                                                {chargesDropdown(cpAssociation.Id)}
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
                    }
                </div>

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
                {/*                <label>Pricing Rule</label>*/}
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
                {/*                        onClick={() => this.setState({secondModalVisible: true})}*/}
                {/*                    />*/}
                {/*                </div>*/}
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
