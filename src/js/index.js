import constructMultipanel, {slideTo, slide} from './multiPanel/multiPanel'
import panel from './multiPanel/panel';

import constructTable, {tableActions} from './table/table';
import accordionTable from './table/accordionTable';
import selectTable from './table/selectTable';
import infiniteTable, {resetSpacers} from './table/infiniteTable';

import datePicker, {outputSelectedDate, isolatedReact} from './date/datePicker';
import dateRange from './date/dateRange';

import constructAutocomplete from './autocomplete/autocomplete';

import constructTab, {Tab} from './tab/tab';

import constructRadio, {getKey, getValue} from './radio/radio';

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

const autocomplete = {
    constructAutocomplete
};

const tab = {
    constructTab
    ,Tab
};

const radio = {
    constructRadio
    ,getKey
    ,getValue
};

export {
    multiPanel
    ,table
    ,date
    ,autocomplete
    ,tab
    ,radio
};