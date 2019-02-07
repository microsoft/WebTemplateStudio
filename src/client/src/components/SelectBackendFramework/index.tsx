import * as React from 'react';

import SelectOption from '../SelectOption';

import options from './optionsData';

class SelectBackEndFramework extends React.Component {
    public render() {
        return (
            <div>
                <SelectOption multiSelect={false} title="Select a back-end framework for your project." options={options} />
            </div>
        )
    }
}

export default SelectBackEndFramework;