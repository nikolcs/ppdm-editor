import React from 'react';
import {
    CSMainHeader,
    CSMainHeaderLeft,
    CSMainHeaderRight,
    CSMainHeaderIcon,
    CSIcon,
    CSImage,
} from '@cloudsense/cs-ui-components';

class Header extends React.Component {
    render() {
        return (
            <>
                <CSMainHeader>
                    <CSMainHeaderIcon>
                        <CSIcon name="lead" origin="cs" frame color="#3cdbc0" />
                    </CSMainHeaderIcon>
                    <CSMainHeaderLeft
                        title="Pricing service ppdm support component"
                    />
                    <CSMainHeaderRight>
                        <CSImage type="logo" height="2rem" />
                    </CSMainHeaderRight>
                </CSMainHeader>
            </>
        );
    }
}

export default Header;
