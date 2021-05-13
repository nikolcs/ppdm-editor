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

const sampleLookup = {
    columns: [
        { key: 'Account', label: 'Account' },
        { key: 'Industry', label: 'Industry' }
    ],
    data: [
        { Id: 1, Account: 'Acme', Industry: 'Manufacturing' },
        { Id: 2, Account: 'Global Media', Industry: 'Industry' },
        { Id: 3, Account: 'Salesforce', Industry: 'Software' },
        { Id: 4, Account: 'Elisa', Industry: 'Telecommunications' },
        { Id: 5, Account: 'Facebook', Industry: 'Social media' },
        { Id: 6, Account: 'Google', Industry: 'Technology' },
        { Id: 7, Account: 'Spotify', Industry: 'Streaming and media' },
        { Id: 8, Account: 'British Gas', Industry: 'Energy' },
        { Id: 9, Account: 'Columbia Pictures', Industry: 'Film' },
        { Id: 10, Account: 'Rimac', Industry: 'Car manufacturing' },
        { Id: 11, Account: 'News Corp', Industry: 'Mass media' },
        { Id: 12, Account: 'Telstra', Industry: 'Telecommunications' },
        { Id: 13, Account: 'Netflix', Industry: 'Production' },
        { Id: 14, Account: 'Instagram', Industry: 'Social media' },
        { Id: 15, Account: 'Vodafone', Industry: 'Telecommunications' },
        { Id: 16, Account: 'Apple', Industry: 'Software' },
        { Id: 17, Account: 'Amazon', Industry: 'E-commerce' },
        { Id: 18, Account: 'Ikea', Industry: 'Furniture retail' },
        { Id: 19, Account: 'Microsoft', Industry: 'Software' },
        { Id: 20, Account: 'Visa', Industry: 'Finance' },
        { Id: 21, Account: 'IBM', Industry: 'Software' },
        { Id: 22, Account: 'eBay', Industry: 'E-commerce' },
        { Id: 23, Account: 'Oracle', Industry: 'Software' },
        { Id: 24, Account: 'Tesla', Industry: 'Car manufacturing' },
        { Id: 25, Account: 'YouTube', Industry: 'Streaming and media' },
        { Id: 26, Account: 'O2', Industry: 'Telecommunications' },
        { Id: 27, Account: 'Warner Bros. Pictures', Industry: 'Film' }
    ]
};

class CPGrid extends React.Component {
    state = {
        visibleModal: undefined,
        secondModalVisible: false,
        thirdModalVisible: false
    };

    openModal = (modalId) => {
        this.setState({ visibleModal: modalId });
    }
    closeModal = () => {
        this.setState({ visibleModal: undefined });
    }

    render() {
        return (
            <div className="table-wrapper">

                <CSModal
                    visible={this.state.visibleModal === 'commercial-product-details'}
                    size="medium"
                    animated
                    outerClickClose
                    closeButton
                    onClose={this.closeModal}
                    className="cp-details-modal"
                >
                    <CSModalHeader title="Set List Price of Existing Commercial Product">

                    </CSModalHeader>
                    <CSModalBody padding="1.5rem 1.5rem 1rem 1.5rem">
                        <div className="column-wrapper">
                            <CSInputText label="Commercial Product" />
                            <div className="placeholder"></div>
                            <CSInputText label="List Recurring Charge" />
                            <CSInputText label="List One Off Charge" />
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
                                        onClick={() => this.setState({ secondModalVisible: true })}
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
                                        onClick={() => this.setState({ thirdModalVisible: true })}
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
                    outerClickClose
                    closeButton
                    onClose={() => this.setState({ secondModalVisible: false })}
                    className="cp-details-modal-second"
                >
                    <CSModalHeader title="New Price Rule" />
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
                                <CSInputText label="Pricing Rule Name" />
                                <CSInputText label="Pricing Rule Code" />
                            </div>
                            <div className="col">
                                <CSInputText label="Context" />
                                <CSInputText label="Description" />
                            </div>
                        </div>
                    </CSModalBody>
                    <CSModalFooter align="right">
                        <CSButton
                            label="Cancel"
                            onClick={() => this.setState({ secondModalVisible: false })}
                        />
                        <CSButton
                            label="Save and New"
                            btnStyle="brand"
                            onClick={() => this.setState({ secondModalVisible: false })}
                        />
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                            onClick={() => this.setState({ secondModalVisible: false })}
                        />
                    </CSModalFooter>
                </CSModal>
                <CSModal
                    visible={this.state.thirdModalVisible}
                    size="small"
                    animated
                    outerClickClose
                    closeButton
                    onClose={() => this.setState({ thirdModalVisible: false })}
                    className="cp-details-modal-second"
                >
                    <CSModalHeader title="New Price Rule" />
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
                                <CSInputText label="Pricing Rule Group Name" />
                                <CSInputText label="Pricing Rule Group Code" />
                            </div>
                            <div className="col">
                                <CSInputText label="Priority" />
                                <CSInputText label="Description" />
                            </div>
                            <div className="col">
                                <CSInputText label="Rule Group Compounding Type" />
                            </div>
                        </div>
                    </CSModalBody>
                    <CSModalFooter align="right">
                        <CSButton
                            label="Cancel"
                            onClick={() => this.setState({ thirdModalVisible: false })}
                        />
                        <CSButton
                            label="Save and New"
                            btnStyle="brand"
                            onClick={() => this.setState({ thirdModalVisible: false })}
                        />
                        <CSButton
                            label="Save"
                            btnStyle="brand"
                            onClick={() => this.setState({ thirdModalVisible: false })}
                        />
                    </CSModalFooter>
                </CSModal>

                <div className="action-row">
                    <CSButton label="Create New Product" onClick={() => this.openModal('commercial-product-details')} />
                    <CSInputSearch placeholder="Search" width="20rem" />
                </div>
                <CSTable>
                    <CSTableHeader>
                        <CSTableCell text="Details" maxWidth="4rem" />
                        <CSTableCell text="Commercial Product Description" grow={2} />
                        <CSTableCell text="List Recurring Charge" />
                        <CSTableCell text="Pricing Rule" />
                        <CSTableCell text="List One Off Charge" />
                        <CSTableCell text="Pricing Rule Group" />
                    </CSTableHeader>
                    <CSTableBody>
                        <CSTableRow>
                            <CSTableCell maxWidth="4rem">
                                <CSButton
                                    label="label"
                                    labelHidden
                                    btnType="default"
                                    iconName="apps"
                                    size="xsmall"
                                    onClick={() => this.openModal('commercial-product-details')}
                                />
                            </CSTableCell>
                            <CSTableCell text="First Row Item 1" grow={2} />
                            <CSTableCell text="First Row Item 2" />
                            <CSTableCell text="First Row Item 3" />
                            <CSTableCell text="First Row Item 4" />
                            <CSTableCell text="First Row Item 5" />
                        </CSTableRow>
                    </CSTableBody>
                </CSTable>
            </div>
        );
    }
}

export default CPGrid;
