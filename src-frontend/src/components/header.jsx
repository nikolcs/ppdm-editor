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
    render() {
        return (
            <>
                <CSMainHeader className="demo-main-header">
                    <CSMainHeaderIcon>
                        <CSIcon name="lead" origin="cs" frame color="#3cdbc0" />
                    </CSMainHeaderIcon>
                    <CSMainHeaderLeft
                        title="Pricing service ppdm support component"
                    />
                    <CSMainHeaderRight>
                        <CSButton
                            label="Sync All"
                        />
                        <CSImage type="logo" height="2rem" />
                    </CSMainHeaderRight>
                </CSMainHeader>
            </>
        );
    }
}

export default Header;
