import * as React from 'react';
import './styles.css';

import Button from 'react-uwp/Button';

const SelectPreference = ({ title, buttons }: { title: string, buttons: Array<string> }) => {
    return (
        <div className="preference">
            <div className="white">
                {title}
            </div>
            <div>
                {buttons.map((button, idx) => <Button className="button" key={idx}>{button}</Button>)}
            </div>
        </div>
    )
}

export default SelectPreference;