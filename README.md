<h2 align='center'>Atos J&J AWS 1 Template</h3>



###Quick Start
After clone the repo to local

`npm install` to install all dependencies

`parcel index.html` to preview the changes

`parcel build index.html --public-url ./` to build the dist package, the final files are stored in the 'dist' folder.

#### tools used
[![npm version](https://img.shields.io/badge/Vue-v2.5.17-green.svg)](https://www.npmjs.com/package/vue) [![npm version](https://img.shields.io/badge/Parcel-v1.9.7-yellowgreen.svg)](https://www.npmjs.com/package/parcel) [![npm version](https://img.shields.io/badge/Ssas-v1.13.1-orange.svg)](https://www.npmjs.com/package/node-sass)


#### style-guide

__common style for table__


wrap the `.table` class with `.table-wrap` for responsive feature

__common style for button__

`.btn`

<button style="padding: 10px 13px;
    border: none;
    box-shadow: 2px 2px 5px 0 rgba(120, 120, 120, 0.3);
    cursor: pointer;">button</button>


`.btn .btn-normal`

<button style="padding: 10px 13px;
    border: none;
    box-shadow: 2px 2px 5px 0 rgba(120, 120, 120, 0.3);
    cursor: pointer;background: #fff; color: #333333;">button</button>


`.btn .btn-primary`

<button style="padding: 10px 13px;
    border: none;
    box-shadow: 2px 2px 5px 0 rgba(120, 120, 120, 0.3);
    cursor: pointer; background: #3187DC; color: #f4f4f4;">button</button>


__common style for title__
`.title`

`.title-decoration` this refers to the badge line under the title



#### table data manipulation in Vue

__callHistory__
After obtaining the table data via Ajax, just insert them in `index.js`'s Vue instance - the `callHistory` objects, in the following format:

```
callHistory: [
            {
                time: '09:58:57 AM',
                wwid: '3456123',
                number: '+1 214 4032 2355',
                queue: 'English',
                topic: 'hardware problem',
                snow: 'url...',
            },
            {
                time: '09:58:57 AM',
                wwid: '3456123',
                number: '+1 214 4032 2355',
                queue: 'English',
                topic: 'hardware problem',
                snow: 'url...',
            },
            ...
        ],
```
