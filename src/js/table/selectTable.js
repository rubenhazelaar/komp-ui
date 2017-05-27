import component, {state} from 'kompo';
import {merge, delegate} from 'kompo-util';

import table from './table';

export default component.compose(table, {
    on(table) {
        const tableProps = component.getProps(table),
            selector = tableProps.rowClass?
                '.' + tableProps.rowClass:
                'tr';

        delegate(table, selector, 'click', function(e) {
            state.dispatch(this, s => {
                Object.defineProperty(s, 'selected', {
                    writable: true
                });

                s.selected = !s.selected;
            });
        });
    },
    rowClass: '',
    selectedClass: '',
    selectOne: false
});