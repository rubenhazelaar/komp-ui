import constructMultipanel, {slideTo, slide} from './multiPanel/multiPanel'
import panel from './multiPanel/panel';

import constructTable, {tableActions} from './table/table';
import accordionTable from './table/accordionTable';
import selectTable from './table/selectTable';
import infiniteTable, {resetSpacers} from './table/infiniteTable';

import datePicker, {outputSelectedDate, isolatedReact} from './date/datePicker';
import dateRange from './date/dateRange';

const multiPanel = {
    constructMultipanel
    ,slideTo
    ,slide
    ,panel
};


const table = {
    constructTable
    ,tableActions
    ,accordionTable
    ,selectTable
    ,infiniteTable
    ,resetSpacers
};

const date = {
    datePicker
    ,outputSelectedDate
    ,isolatedReact
    ,dateRange
};

export {
    multiPanel
    ,table
    ,date
}