/*
 *
 * Copyright (C) 2019 Nathanael Braun
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const path       = require('path'),
      packageCfg = JSON.parse(require('fs').readFileSync(__dirname + '/../../package.json'));

import {expect} from 'chai';
import {mount, render}  from 'enzyme';
import React    from 'react';


describe(packageCfg.name + "@" + packageCfg.version + " : ", () => {
	
	let VoodooTweener;
	before(function () {
		this.timeout(Infinity);
		return require('./.setup.js')();
	});
	
	it('should import voodoo fine', function () {
		VoodooTweener = require('../..');
	});
	describe("Css styles : ", () => {
		
		it('should support multiple css units', function () {
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				render() {
					return <div className={"container"}>
						<VoodooTweener.TweenRef id="card"
						                        initial={{
							                        width: ["50%", "50px"]
						                        }}>
							<div className={"card"} style={{ height: '100px' }}>
								test
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			const wrapper = render(<MyComp/>);
			debugger;
			console.log(':::57: ', wrapper.find('.card')[0]);
			//console.log(':::57: ', wrapper.html());
			expect(wrapper.find('.card').get(0).style).to.have.property('width', 'calc(50.000% + 50.000px)');
		});
	});
	
});