# Project Dashboard

A set of dashboards making managing your projects easier. You have to implement your own API.

# Installation

- clone project by running ```git clone https://github.com/martyhora/project-dashboard.git```
- run ```npm i``` in the project root
- edit ```app/project-dashboard.js``` and set your API URL in ```API_URL_BASE``` constant
- edit ```app/IssueGridRow.vue``` and set optional links in computed methods editIssueLink, projectLink, lastCommentProjectLink and copyIssueLinkLink
- run ```npm run build``` to recompile JS bundles so the setting changes above take effect
- optionally you can run ```npm start``` to watch changes and compile JS
- open the project in the browser
