[![Build Status](https://travis-ci.org/storytimesolutions/CI-POC.svg?branch=master)](https://travis-ci.org/storytimesolutions/CI-POC)

# CI-POC
This project is meant to be a proof of concept of how to use GitHub + TravisCI to have a Contintuous Integration environment.  For fun, we use newer technologies as well because we just like to :)

## Getting Started
You will need Git and Node.js installed on your machine.  For Git, I recommended downloading the [GitHub Desktop tool](https://desktop.github.com/) which is OSX and Windows compatible.   

```Powershell
# Clone source code to local computer
git clone https://github.com/storytimesolutions/CI-POC CI-POC
cd CI-POC

# Install project dev dependencies
npm install 

# Start dev server (with tests running)!
gulp
```

## Gulp commands
`gulp`: Default command.  Same as `gulp serve-dev`

`gulp serve-dev`: Serve local dev source with BrowserSync and run unit tests and jshint with each change

`gulp serve-prod`: Packages the code to `/dist/` folder and serves from that dist directory

`gulp tdd`: Runs unit tests every changes in a much faster, more efficient manner (sorry, two servers running at same time I have not mastered but maybe you can :) )

`gulp test`: Runs unit tests and e2e tests once

### Less Common Gulp Commands
`gulp unit-test` - Runs unit tests once

`gulp e2e` - Runs end-to-end test once
