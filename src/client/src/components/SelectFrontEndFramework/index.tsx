import * as React from 'react';

import SelectOption from '../SelectOption';

import options from './optionsData';

class SelectFrontEndFramework extends React.Component {
    public render() {
        return (
            <div>
                <SelectOption multiSelect={false} title="Select a front-end framework for your project." options={options} />
            </div>
        )
    }
}

export default SelectFrontEndFramework;