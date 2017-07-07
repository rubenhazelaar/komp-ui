// Component and content creation classes and functions
import component, {state} from 'kompo';

// import datePicker from  '../../../src/js/date/datePicker';
import dateRange from '../../../src/js/date/dateRange';

// Create root component
const root = component.construct('div', function ({}) {
    const dr = dateRange();
    component.mount(this, dr);

    // const dp = datePicker({notBefore: '2017-07-11'});
    // component.mount(this, dp);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    date: '2017-07-05 23:59:59',
    from: '2017-06-05 23:59:59',
    to: '2017-07-05 23:59:59'
}).start());

