

const path       = require('path'),
      packageCfg = JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json')),
      TIMEOUT    = 5000;

import React from 'react';


describe(packageCfg.name + "@" + packageCfg.version + " : ", () => {
    
    let VoodooTweener;
    before(function () {
        this.timeout(TIMEOUT);
        return require('./.setup.js')();
    });
    
    it('should import voodoo fine', function () {
        VoodooTweener = require('../..').default;
        require('./all/describe.css')(VoodooTweener);
        //require('./all/describe.anims')(VoodooTweener);
    });
    
});