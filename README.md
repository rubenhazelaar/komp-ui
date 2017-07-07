# TODO
- CRUD
 - form handling
- !!!Table
    - ~~Adding selected does not rerender table, should be~~
        >>> Now added length of selected rows to state to force rerender
    - !!!callback, (~~unique/~~)key callback
        - Research possible smart updating instead of whole table
    - animated:
        - minimize
        - Accordion toggle
    - multiple versions
        - Accordion
            - all possibly open & only one
                - maintain open state (for multiple and one)
        - ~~Action~~ >> on prop 
    ~~- responsive~~
    - ~~row filter column filter~~
    - ~~limit, offset for pagination~~
    
    ~~- selectedRows to state instead of props~~
    ~~- Hide certain columns~~
    - ~~Render with initial limit & then grow triggered from outside~~
        ~~- Make actions from it~~
    ~~- Allow use of components in table cells
              - Not only text~~
    ~~- dynamic rowFilter for search~~
- Pagination
    - Work with table as well
- DatePicker
- Toolbar
- Loader (topbar)
- MultiPanel >>> page
    >>> for navigation animations/transitions
    - Decoupled from router
- Menu
- FilterList
- Searchbar
- MultiSelect
- Multi Input
- multi key value
- accordion
    - all possibly open & only one
    
# NO
- Get selected rows >>> tableHelper > based on keys in state get data

# DONE
- DatePicker
    - No future, no past, custom < or >
- DateRange
