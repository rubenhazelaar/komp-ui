// Component and content creation classes and functions
import component, {state, router} from 'kompo';

const { construct, react, getRouter, getState} = component;
const {route, indexRoute, swap} = router;

import leaf from './components/leaf'
import branch from './components/branch'
import panel from '../../../src/js/multiPanel/panel';

const root = construct('div', function({}) {
    const h1 = document.createElement('h1'),
        nav = document.createElement('nav'),
        links = [
            '',
            'simple',
            'param/123',
            'branch',
            'branch/simple',
            'rooted_nested',
            'nonexisting'
        ],
        r = getRouter(this);

    h1.textContent = 'Router example';

    for (let i = 0, l = links.length; i < l; ++i) {
        const a = document.createElement('a');
        a.addEventListener('click', () => {
            r.goTo(links[i]);

            // Dispatch change to state
            const state = getState(this);
            state.url = links[i];
        });
        a.setAttribute('href', 'javascript:void(0);');
        a.textContent = links[i];
        nav.appendChild(a);
    }

    this.appendChild(h1);
    this.appendChild(nav);

    // On update swap the new
    // routed construct
    react(this, () => {
        console.log("LEVEL ONE SWAP ");
        swap(this, r);
    });
});


// Create route structure
const routes = route('/', root(), [
    // Each route array needs a IndexRoute
    indexRoute(leaf({
        heading: 'Index construct'
    }))
    , route('simple', leaf({
        heading: 'Simple construct'
    }))
    , route('param/:param', leaf({
        heading: 'Route with a param, shown in Component'
    }))
    , route('branch', branch()
        , [
            indexRoute(panel({
                basis: {
                    default: 60,
                    600: 90
                },
                component: leaf({
                        heading: 'Nested'
                    })
                }))
            , route('simple', panel({
                slideBack: true,
                component: leaf({
                        heading: 'Nested simple construct'
                    })
                }))
            // Url is very simple, although it is a nested construct
            , route('/rooted_nested', panel({
                basis: 80,
                component: leaf({
                    heading: 'Rooted nested construct'
                    })
                }))
        ])
]);

// An empty state for this example.
// A state is needed because it contains the router
const st = {url: '/'};

// Create router and set a not found Callback
const r = router.construct({
    routes,
    base: 'multipanel',
    notFoundCallback: function (url) {
        alert('Url: ' + url + ' not found');
        // Always throw an error to interrupt the update cycle
        throw new Error('Url: ' + url + ' not found');
    }
});

// Get the root construct from the router
const ro = r.get();

// Append to body
document.body.appendChild(ro);

// Set the state (including the router) to the root construct
state.app(ro, st, r).start();

window.addEventListener('popstate', ()=>{
    // Just update the whole tree from the root up.
    if(r.setTo(window.location.pathname)) {
        const state = getState(ro);
        state.url = r.getUrl()
    }
});
