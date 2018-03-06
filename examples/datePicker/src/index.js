// Component and content creation classes and functions
import component, {state} from 'kompo';

// import datePicker, {outputSelectedDate, isolatedReact} from  '../../../src/js/date/datePicker';
import dateRange from '../../../src/js/date/dateRange';
import {setSelectedDate} from  '../../../src/js/date/datePicker';

// Create root component
const root = component.construct('div', function ({}) {
    /**
     * More advanced dateRangePicker
     */
    const dr = dateRange({
        resetCallback(reset) {
            const toDate = new Date(),
                fromDate = new Date();

            fromDate.setMonth(fromDate.getMonth() - 1);

            reset(fromDate, toDate);
        }
    });
    component.mount(this, dr);
    this.appendChild(dr);

    /**
     * Simple implementation of a side by side dateRangePicker
     */
    // const fromDatePicker = datePicker({
    //     notAfter: '2017-07-12 23:59:59',
    //     key: 'from',
    //     showRange: true,
    //     noFuture: true,
    //     selectCallback: e => {
    //         const toProps = toDatePicker.kompo.props;
    //
    //         toProps.resetWorkingDate = true;
    //         toProps.notBefore = outputSelectedDate(fromDatePicker);
    //
    //         isolatedReact(fromDatePicker);
    //         isolatedReact(toDatePicker);
    //     }
    // });
    // component.mount(this, fromDatePicker);
    //
    // const toDatePicker = datePicker({
    //     notBefore: '2017-06-05 23:59:59',
    //     key: 'to',
    //     noFuture: true,
    //     showRange: true,
    //     selectCallback: e => {
    //         const fromProps = fromDatePicker.kompo.props;
    //
    //         fromProps.resetWorkingDate = true;
    //         fromProps.notAfter = outputSelectedDate(toDatePicker);
    //
    //         isolatedReact(fromDatePicker);
    //         isolatedReact(toDatePicker);
    //     }
    // });
    // component.mount(this, toDatePicker);
});

// Create instance of root and
// append table to body
document.body.appendChild(state.app(root(), {
    date: '2017-07-05 23:59:59',
    from: '2017-06-05 23:59:59',
    to: '2017-07-12 23:59:59'
}).start());

