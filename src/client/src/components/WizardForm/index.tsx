import * as React from 'react';
import preferences from './preferences';

import SelectPreference from '../SelectPreference';

class WizardForm extends React.Component {
    public render() {
        return (
            <div>
                {preferences.map((preference, idx) => {
                    return (
                        <SelectPreference
                            key={idx}
                            title={preference.title}
                            buttons={preference.buttons}
                        />
                    )
                })}
            </div>
        )
    }
}

export default WizardForm;