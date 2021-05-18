import React from 'react';
import {
    CSIcon,
    CSTable,
    CSTableHeader,
    CSTableBody,
    CSTableRow,
    CSTableCell,
    CSButton,
    CSInputSearch,
    CSModal,
    CSModalHeader,
    CSModalBody,
    CSModalFooter,
    CSInputText,
    CSLookup,
    CSTabGroup,
    CSTab
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
        Packages: '',
        CPs: '',
        activeCP: {Id: '', Name: ''},
        activeAddon: '',
        activePackage: '',
        activeProduct: '',
        oneOffPriceReadonly: true,
        recurringPriceReadonly: true
    };

    handleInputOnChange = (event) => {
        switch (this.state.activeProduct) {
            case ('CP'):
                this.setState({ activeCP: { ...this.state.activeCP, Name: event.target.value} });
                return;
            case ('Addon'):
                /* this gives error */
                this.setState({ activeAddon: { ...this.state.activeAddon.cspmb__Add_On_Price_Item__r, Name: event.target.value} });
                return;
            case ('Package'):
                this.setState({ activePackage: { ...this.state.activePackage, Name: event.target.value} });
                return;
        }
    }

    openModal = (modalId) => {
        this.setState({visibleModal: modalId});
    }
    closeModal = () => {
        this.setState({visibleModal: undefined });
        setTimeout(() => {
            this.setState( {
                oneOffPriceReadonly: true, recurringPriceReadonly: true
            })
        }, 150);
    }

    onSearchChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    rowSort(ob1, ob2) {
        return 0;
    }

    componentDidMount() {
        // VFRemotingService.getAccount("GenePoint").then(
        //     result => {
        //         this.setState({Account: result});
        //         console.log("getAccount");
        //         console.log(result);
        //     }
        // )
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

    handleOnClick = () => {
        console.log('handle on click called!');
        VFRemotingService.saveNew('New Master product from React3', 'Master');
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
                    this.setState({activePackage: result, visibleModal: 'commercial-product-details', activeProduct: 'Package'});
                    console.log("getCommercialProduct in handleOnPackageClick")
                    console.log(result);
                }
            );
        }

        const handleOnCPClick = (id) => {
            VFRemotingService.getCommercialProduct(id).then(
                result => {
                    this.setState({activeCP: result, visibleModal: 'commercial-product-details', activeProduct: 'CP'});
                    console.log("getCommercialProduct in handleOnCPClick")
                    console.log(result);
                }
            );
        }

        const handleOnAddonClick = (id) => {
            VFRemotingService.getCPAOAssociation(id).then(
                result => {
                    this.setState({activeAddon: result, visibleModal: 'commercial-product-details', activeProduct: 'Addon'});
                    console.log("getCPAOAssociation in handleOnAddonClick")
                    console.log(result);
                }
            );
        }

        const getProductNameValue = () => {
            switch (this.state.activeProduct) {
                case ('CP'):
                    return this.state.activeCP.Name
                case ('Addon'):
                    return this.state.activeAddon.cspmb__Add_On_Price_Item__r.Name;
                case ('Package'):
                    return this.state.activePackage.Name;
            }
        };

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

                <div className="table-wrapper">
                    <CSModal
                        visible={this.state.visibleModal === 'commercial-product-details'}
                        size="medium"
                        animated
                        closeButton
                        onClose={this.closeModal}
                        className="cp-details-modal"
                    >
                        <CSModalHeader
                            title="Set List Price of Existing Commercial Product"
                            subtitle={getProductNameValue()}
                        />
                        <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                            <div className="column-wrapper">
                                <CSInputText label="Commercial Product" value={getProductNameValue()} onChange={this.handleInputOnChange} />
                                <div className="placeholder"></div>
                                <div className="input-wrapper">
                                    <CSInputText label="Recurring Price" readOnly={this.state.recurringPriceReadonly} />
                                    {this.state.recurringPriceReadonly &&
                                        <CSButton
                                            size="small"
                                            label="edit"
                                            labelHidden
                                            iconName="edit"
                                            iconColor="rgba(0, 0, 0, 0.25)"
                                            onClick={() => this.setState({recurringPriceReadonly: false})}
                                        />
                                    }
                                </div>
                                <div className="input-wrapper">
                                    <CSInputText label="One-Off Price" readOnly={this.state.oneOffPriceReadonly} />
                                    {this.state.oneOffPriceReadonly &&
                                        <CSButton
                                            size="small"
                                            label="edit"
                                            labelHidden
                                            iconName="edit"
                                            iconColor="rgba(0, 0, 0, 0.25)"
                                            onClick={() => this.setState({oneOffPriceReadonly: false})}
                                        />
                                    }
                                </div>
                                <div className="field-wrapper">
                                    <label>Pricing Rule</label>
                                    <div className="lookup-btn-wrapper">
                                        <CSLookup
                                            fieldToBeDisplayed="Account"
                                            label="Account"
                                            labelHidden
                                            lookupColumns={sampleLookup.columns}
                                            lookupOptions={sampleLookup.data}
                                            borderRadius="0.25rem 0 0 0.25rem"
                                            mode="client"
                                        />
                                        <CSButton
                                            className="open-modal-btn"
                                            label="New"
                                            borderRadius="0 0.25rem 0.25rem 0"
                                            onClick={() => this.setState({secondModalVisible: true})}
                                        />
                                    </div>
                                </div>
                                <div className="field-wrapper">
                                    <label>Pricing Rule Group</label>
                                    <div className="lookup-btn-wrapper">
                                        <CSLookup
                                            fieldToBeDisplayed="Account"
                                            label="Account"
                                            labelHidden
                                            lookupColumns={sampleLookup.columns}
                                            lookupOptions={sampleLookup.data}
                                            borderRadius="0.25rem 0 0 0.25rem"
                                            mode="client"
                                        />
                                        <CSButton
                                            className="open-modal-btn"
                                            label="New"
                                            borderRadius="0 0.25rem 0.25rem 0"
                                            onClick={() => this.setState({thirdModalVisible: true})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CSModalBody>
                        <CSModalFooter align="right">
                            <CSButton
                                label="Cancel"
                                onClick={this.closeModal}
                            />
                            <CSButton
                                label="Save and Deploy"
                                btnStyle="brand"
                                onClick={this.closeModal}
                            />
                            <CSButton
                                label="Save"
                                btnStyle="brand"
                                onClick={this.closeModal}
                            />
                        </CSModalFooter>
                    </CSModal>

                    <CSModal
                        visible={this.state.secondModalVisible}
                        size="small"
                        animated
                        closeButton
                        onClose={() => this.setState({secondModalVisible: false})}
                        className="cp-details-modal-second"
                    >
                        <CSModalHeader title="New Price Rule"/>
                        <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                            <CSButton
                                className="prepopulate-btn"
                                label="prepopulate data"
                                labelHidden
                                iconName="edit"
                                size="small"
                                btnType="transparent"
                                btnStyle="brand"
                            />
                            <div className="column-wrapper">
                                <div className="col">
                                    <CSInputText label="Pricing Rule Name"/>
                                    <CSInputText label="Pricing Rule Code"/>
                                </div>
                                <div className="col">
                                    <CSInputText label="Context"/>
                                    <CSInputText label="Description"/>
                                </div>
                            </div>
                        </CSModalBody>
                        <CSModalFooter align="right">
                            <CSButton
                                label="Cancel"
                                onClick={() => this.setState({secondModalVisible: false})}
                            />
                            <CSButton
                                label="Save and New"
                                btnStyle="brand"
                                onClick={() => this.setState({secondModalVisible: false})}
                            />
                            <CSButton
                                label="Save"
                                btnStyle="brand"
                                onClick={() => this.setState({secondModalVisible: false})}
                            />
                        </CSModalFooter>
                    </CSModal>

                    <CSModal
                        visible={this.state.thirdModalVisible}
                        size="small"
                        animated
                        closeButton
                        onClose={() => this.setState({thirdModalVisible: false})}
                        className="cp-details-modal-second"
                    >
                        <CSModalHeader title="New Price Rule"/>
                        <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                            <CSButton
                                className="prepopulate-btn"
                                label="prepopulate data"
                                labelHidden
                                iconName="edit"
                                size="small"
                                btnType="transparent"
                                btnStyle="brand"
                            />
                            <div className="column-wrapper">
                                <div className="col">
                                    <CSInputText label="Pricing Rule Group Name"/>
                                    <CSInputText label="Pricing Rule Group Code"/>
                                </div>
                                <div className="col">
                                    <CSInputText label="Priority"/>
                                    <CSInputText label="Description"/>
                                </div>
                                <div className="col">
                                    <CSInputText label="Rule Group Compounding Type"/>
                                </div>
                            </div>
                        </CSModalBody>
                        <CSModalFooter align="right">
                            <CSButton
                                label="Cancel"
                                onClick={() => this.setState({thirdModalVisible: false})}
                            />
                            <CSButton
                                label="Save and New"
                                btnStyle="brand"
                                onClick={() => this.setState({thirdModalVisible: false})}
                            />
                            <CSButton
                                label="Save"
                                btnStyle="brand"
                                onClick={() => this.setState({thirdModalVisible: false})}
                            />
                        </CSModalFooter>
                    </CSModal>

                    <div className="action-row">
                        <CSButton label="Create New Product" onClick={() => this.openModal('commercial-product-details')}/>
                        <CSButton label="save new cp" onClick={this.handleOnClick}/>
                        <CSInputSearch
                            placeholder="Search"
                            width="20rem"
                            onChange={this.onSearchChange}
                            value={this.props.searchTerm}
                        />
                    </div>

                    {this.state.activeTab === 0 ? (
                        <CSTable>
                            {/*
                            {this.state.CPs ? this.state.CPs[0].Object.getOwnPropertyNames : null}
                            */}
                            <CSTableHeader>
                                <CSTableCell maxWidth="4rem"/>
                                <CSTableCell text="Name"/>
                            </CSTableHeader>
                            {/* (row.cspmb__Price_Item_Add_On_Price_Item_Association__r || '').toLowerCase().includes(this.state.searchTerm.toLowerCase()) */}
                            {/* COMMERCIAL PRODUCT TABLE */}
                            <CSTableBody>
                                {this.state.CPs ? Object.values(this.state.CPs)
                                    .sort(this.rowSort)
                                    .filter(row => {
                                        if (this.state.searchTerm) {
                                            if (
                                                (row.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                                            ) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else return true;
                                    })
                                    .map((row) => {
                                        return (
                                            <React.Fragment key={row.Id}>
                                                <CSTableRow>
                                                    <CSTableCell maxWidth="4rem">
                                                        <CSButton
                                                            label={row.Id}
                                                            labelHidden
                                                            btnType="default"
                                                            iconName="apps"
                                                            size="xsmall"
                                                            onClick={() => handleOnCPClick(row.Id)}
                                                        />
                                                    </CSTableCell>
                                                    <CSTableCell>
                                                        <span>{row.Name}</span>
                                                    </CSTableCell>
                                                </CSTableRow>
                                                {row.cspmb__Price_Item_Add_On_Price_Item_Association__r ? row.cspmb__Price_Item_Add_On_Price_Item_Association__r.map((addonAssociation) => (
                                                    <CSTableRow className="addon-row" key={addonAssociation.Id}>
                                                        <CSTableCell maxWidth="4rem">
                                                            <CSButton
                                                                label="Edit"
                                                                labelHidden
                                                                btnType="default"
                                                                iconName="apps"
                                                                size="xsmall"
                                                                onClick={() => handleOnAddonClick(addonAssociation.Id)}
                                                            />
                                                        </CSTableCell>
                                                        <CSTableCell>
                                                            <span>{addonAssociation.cspmb__Add_On_Price_Item__r.Name}</span>
                                                        </CSTableCell>
                                                    </CSTableRow>
                                                )) : null}
                                            </React.Fragment>
                                        )
                                    }) : null
                                }
                            </CSTableBody>
                        </CSTable>
                    ) :
                        <CSTable>
                            <CSTableHeader>
                                <CSTableCell maxWidth="4rem"/>
                                <CSTableCell text="Name"/>
                            </CSTableHeader>
                            <CSTableBody>
                                {this.state.Packages ? Object.values(this.state.Packages)
                                    .sort(this.rowSort)
                                    .filter(row => {
                                        if (this.state.searchTerm) {
                                            if (
                                                (row.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                                            ) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        } else return true;
                                    })
                                    .map((row) => {
                                        return (
                                            <React.Fragment key={row.Id}>
                                                <CSTableRow>
                                                    <CSTableCell maxWidth="4rem">
                                                        <CSButton
                                                            label={row.Id}
                                                            labelHidden
                                                            btnType="default"
                                                            iconName="apps"
                                                            size="xsmall"
                                                            onClick={() => handleOnPackageClick(row.Id)}
                                                        />
                                                    </CSTableCell>
                                                    <CSTableCell>
                                                        <CSIcon className="pkg-icon" name="package_outline" origin="cs" />
                                                        <span>{row.Name}</span>
                                                    </CSTableCell>
                                                </CSTableRow>
                                                {row.cspmb__member_commercial_product_associations__r ? row.cspmb__member_commercial_product_associations__r.map((cpAssociation) => (
                                                    <CSTableRow className="package-cp-row" key={cpAssociation.Id}>
                                                        <CSTableCell maxWidth="4rem">
                                                            <CSButton
                                                                label="Edit"
                                                                labelHidden
                                                                btnType="default"
                                                                iconName="apps"
                                                                size="xsmall"
                                                                onClick={() => handleOnCPClick(cpAssociation.cspmb__member_commercial_product__r.Id)}
                                                            />
                                                        </CSTableCell>
                                                        <CSTableCell>
                                                            <span>{cpAssociation.cspmb__member_commercial_product__r.Name}</span>
                                                        </CSTableCell>
                                                    </CSTableRow>
                                                )) : null}
                                            </React.Fragment>
                                        )
                                    }) : null
                                }
                            </CSTableBody>
                        </CSTable>
                    }
                </div>
            </>
        );
    }
}

export default CPGrid;
