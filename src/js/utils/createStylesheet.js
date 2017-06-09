import {addAttributes} from 'kompo-util';

export default function(attributes = {}) {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add a media (and/or media query) here if you'd like!
    if(attributes) addAttributes(style, attributes);

    // WebKit hack :(
    style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
};