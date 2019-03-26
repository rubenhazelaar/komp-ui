import constructMultipanel, { slideTo, slide } from './multiPanel/multiPanel'
import panel from './multiPanel/panel';

import constructTable, { tableActions } from './table/table';
import accordionTable from './table/accordionTable';
import selectTable from './table/selectTable';
import infiniteTable, { resetSpacers, multiSelect } from './table/infiniteTable';

import datePicker, { outputSelectedDate, isolatedReact, setSelectedDate } from './date/datePicker';
import dateRange from './date/dateRange';

import constructAutocomplete, { reset as empty } from './autocomplete/autocomplete';

import constructTab, { Tab } from './tab/tab';

import constructRadio, { getKey, getValue, setOption } from './form/radio';
import constructCheck, { isChecked, setCheck } from './form/check';

import constructOrderList from './orderList/orderList';

const multiPanel = {
    constructMultipanel
    , slideTo
    , slide
    , panel
};

const table = {
    constructTable
    , tableActions
    , accordionTable
    , selectTable
    , infiniteTable
    , resetSpacers
    , multiSelect
};

const date = {
    datePicker
    , outputSelectedDate
    , setSelectedDate
    , isolatedReact
    , dateRange
};

const autocomplete = {
    constructAutocomplete,
    empty
};

const tab = {
    constructTab
    , Tab
};

const radio = {
    constructRadio
    , getKey
    , getValue
    , setOption
};

const check = {
    constructCheck
    , isChecked
    , setCheck
};

const orderList = {
    constructOrderList
};

export {
    multiPanel
    , table
    , date
    , autocomplete
    , tab
    , radio
    , check
    , orderList
};