import * as React from 'react';
import './styles.css';
import '../../css/grid.css';

import Button from 'react-uwp/Button';

const Header = ({title, subheader}: {title: string, subheader: string}) => {
    return(
        <div className="header">
            <h1 className="white">
                {title}
            </h1>
            <h2 className="white">
                {subheader}
            </h2>
            <Button>
                Start
            </Button>
        </div>
    )
}

export default Header;