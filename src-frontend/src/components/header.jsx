import React from 'react';
import {
    CSButton,
    CSMainHeader,
    CSMainHeaderLeft,
    CSMainHeaderRight,
    CSMainHeaderIcon,
    CSIcon,
    CSImage,
} from '@cloudsense/cs-ui-components';

import {VFRemotingService} from '../remote'

class Header extends React.Component {

    handleSyncInvoker = () => {
        console.log("syncInvoker call")
        VFRemotingService.syncInvoker().then(
            () => {
                console.log("syncInvoker finished")
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
            </>
        );
    }
}

export default Header;
