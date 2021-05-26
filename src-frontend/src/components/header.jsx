import React from 'react';
import {
    CSButton,
    CSMainHeader,
    CSMainHeaderLeft,
    CSMainHeaderRight,
    CSMainHeaderIcon,
    CSIcon,
    CSImage,
    CSSpinner
} from '@cloudsense/cs-ui-components';

import {VFRemotingService} from '../remote'

class Header extends React.Component {

    state = {
        showSpinner: false
    }

    handleSyncInvoker = () => {
        console.log("syncInvoker call")
        this.setState({
            showSpinner: true
        })
        VFRemotingService.syncInvoker().then(
            () => {
                console.log("syncInvoker finished")
                this.setState({
                    showSpinner: false
                })
            }
        );
    }

    render() {
        return (
            <>
                <CSMainHeader className="demo-main-header">
                    <CSMainHeaderIcon>
                        <CSIcon name="lead" origin="cs" frame color="#3cdbc0" />
                    </CSMainHeaderIcon>
                    <CSMainHeaderLeft
                        title="Product and Pricing Manager"
                    />
                    <CSMainHeaderRight>
                        <CSButton
                            label="Sync All"
                            onClick={() => this.handleSyncInvoker()}
                        />
                        <CSImage type="logo" height="2rem" />
                    </CSMainHeaderRight>
                </CSMainHeader>
                {this.state.showSpinner &&
                    <CSSpinner size="xlarge" label="Syncing..."/>
                }
            </>
        );
    }
}

export default Header;
