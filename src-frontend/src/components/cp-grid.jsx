import React from 'react';
import {
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
    CSLookup
} from '@cloudsense/cs-ui-components';

import {VFRemotingService} from '../remote'

class CPGrid extends React.Component {
    state = {
        visibleModal: undefined,
        secondModalVisible: false,
        thirdModalVisible: false,
        searchTerm: '',
        Accounts: '',
        CPs: '',
        CPAOAs: '',
        CPAs: '',
        activeCP: ''
    };

    openModal = (modalId) => {
        this.setState({visibleModal: modalId});
    }
    closeModal = () => {
        this.setState({visibleModal: undefined});
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
        VFRemotingService.getCPs().then(console.log);

        VFRemotingService.getAccount("GenePoint").then(
            result => {
                this.setState({Account: result});
            }
        );
        VFRemotingService.getCPs().then(
            result => {
                this.setState({CPs: result});
            }
        );
        VFRemotingService.getCPAOAs().then(
            result => {
                this.setState({CPAOAs: result});
            }
        );
        VFRemotingService.getCPAs().then(
            result => {
                this.setState({CPAs: result});
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

        const tableMockData = {
            "columnHeaders": [
                {"key": "Details", "label": "Details", "width": "4rem"},
                {"key": "CommercialProductDescription", "label": "Commercial Product Description", "grow": 2},
                {"key": "ListRecurringCharge", "label": "List Recurring charge"},
                {"key": "PricingRule", "label": "Pricing Rule"},
                {"key": "ListOneOffCharge", "label": "List One Off Charge"},
                {"key": "PricingRuleGroup", "label": "Pricing Rule Group"}
            ],
            "rows": [
                {
                    "Id": 1,
                    "Details": "Acme",
                    "CommercialProductDescription": "Manufacturing",
                    "ListRecurringCharge": 11,
                    "PricingRule": "test1",
                    "ListOneOffCharge": 21,
                    "PricingRuleGroup": "test2"
                },
                {
                    "Id": 2,
                    "Details": "Acme2",
                    "CommercialProductDescription": "Manufacturing",
                    "ListRecurringCharge": 12,
                    "PricingRule": "test2",
                    "ListOneOffCharge": 22,
                    "PricingRuleGroup": "test2"
                },
                {
                    "Id": 3,
                    "Details": "Acme3",
                    "CommercialProductDescription": "Manufacturing",
                    "ListRecurringCharge": 13,
                    "PricingRule": "test3",
                    "ListOneOffCharge": 23,
                    "PricingRuleGroup": "test2"
                },
                {
                    "Id": 4,
                    "Details": "Acme4",
                    "CommercialProductDescription": "Manufacturing",
                    "ListRecurringCharge": 14,
                    "PricingRule": "test4",
                    "ListOneOffCharge": 24,
                    "PricingRuleGroup": "test2"
                },
                {
                    "Id": 5,
                    "Details": "Acme5",
                    "CommercialProductDescription": "Manufacturing",
                    "ListRecurringCharge": 15,
                    "PricingRule": "test5",
                    "ListOneOffCharge": 25,
                    "PricingRuleGroup": "test2"
                }
            ]
        };
        // VFRemotingService.getCommercialProduct("a1P4L000008rke0UAA").then(console.log);

        const handleOnCPClick = (id) => {
            VFRemotingService.getCommercialProduct(id).then(
                result => {
                    this.setState({activeCP: result, visibleModal: 'commercial-product-details'});
                }
            );
        }

        return (
            <div className="table-wrapper">

                <CSButton label="save new cp" onClick={this.handleOnClick}/>
                <CSModal
                    visible={this.state.visibleModal === 'commercial-product-details'}
                    size="medium"
                    animated
                    closeButton
                    onClose={this.closeModal}
                    className="cp-details-modal"
                >
                    <CSModalHeader title="Set List Price of Existing Commercial Product"/>
                    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                        <div className="column-wrapper">
                            <CSInputText label="Commercial Product"/>
                            <div className="placeholder"></div>
                            <CSInputText label="List Recurring Charge"/>
                            <CSInputText label="List One Off Charge"/>
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
                    <CSInputSearch
                        placeholder="Search"
                        width="20rem"
                        onChange={this.onSearchChange}
                        value={this.props.searchTerm}
                    />
                </div>
                <CSTable>
                    {/*
                    {this.state.CPs ? this.state.CPs[0].Object.getOwnPropertyNames : null}
                    */}
                    <CSTableHeader>
                        <CSTableCell maxWidth="4rem"/>
                        <CSTableCell text="Name"/>
                    </CSTableHeader>
                    <CSTableBody>
                        {Object.values(this.state.CPs)
                            .sort(this.rowSort)
                            .filter(item => {
                                if (this.state.searchTerm) {
                                    if (
                                        (item.Name || '').toLowerCase().includes(this.state.searchTerm.toLowerCase())
                                    ) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else return true;
                            })
                            .map((row) => {
                                return (
                                    <>
                                        <CSTableRow key={row.Id}>
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
                                                        label={addonAssociation.Id}
                                                        labelHidden
                                                        btnType="default"
                                                        iconName="apps"
                                                        size="xsmall"
                                                        onClick={() => this.openModal('commercial-product-details')}
                                                    />
                                                </CSTableCell>
                                                <CSTableCell>
                                                    <span>{addonAssociation.cspmb__Add_On_Price_Item__r.Name}</span>
                                                </CSTableCell>
                                            </CSTableRow>
                                        )) : null}
                                    </>
                                )
                            })
                        }
                    </CSTableBody>
                </CSTable>
            </div>
        );
    }
}

export default CPGrid;
