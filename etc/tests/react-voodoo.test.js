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

import {expect}        from 'chai';
import {mount, render} from 'enzyme';
import React           from 'react';


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
			console.log(wrapper.find('.card').html())
			expect(wrapper.find('.card')[0].attribs.style).to.include('width:calc(50% + 50px)');
		});
		it('should support switching styles', function ( done ) {
			this.timeout(Infinity);
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {
					initial: {
						width: "50px"
					}
				};
				
				componentDidMount() {
					setTimeout(
						tm => this.setState({ initial: { height: "50px" } }), 200
					);
				}
				
				render() {
					return <div className={"container"}>
						<VoodooTweener.TweenRef id="card"
						                        initial={this.state.initial}>
							<div className={"card"}>
								test
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			const wrapper = mount(<MyComp/>);
			setTimeout(
				tm => {
					try {
						//console.log(wrapper.find('.card').html())
						expect(wrapper.find('.card').getDOMNode(0).style.height).to.equal("50px");
						expect(wrapper.find('.card').getDOMNode(0).style).to.not.have.any.keys('width');
						done();
					} catch ( e ) {
						done(e)
					}
				},
				600
			)
		});
		it('should support switching styles & anims ', function ( done ) {
			this.timeout(Infinity);
			
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {
					initial: {
						width: "50px"
					},
					
					scrollLine: [{
						apply   : { transform: { translateY: "50px" } },
						duration: 100,
						from    : 0,
						target  : "card"
					}]
				};
				
				componentDidMount() {
					setTimeout(
						tm => this.setState(
							{
								initial   : { height: "50px" },
								scrollLine: [{
									duration: 100,
									from    : 0,
									apply   : { width: "50px" },
									target  : "card"
								}]
							}), 200
					);
				}
				
				render() {
					return <div className={"container"}>
						<VoodooTweener.TweenAxis
							axe={"scrollY"}
							items={this.state.scrollLine}
							defaultPosition={100}
						/>
						<VoodooTweener.TweenRef id="card"
						                        initial={this.state.initial}>
							<div className={"card"}>
								test
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			const wrapper = mount(<MyComp/>);
			setTimeout(
				tm => {
					try {
						console.log(wrapper.find('.container').html())
						expect(wrapper.find('.card').getDOMNode(0).style.height).to.equal("50px");
						expect(wrapper.find('.card').getDOMNode(0).style.width).to.equal("50px");
						done();
					} catch ( e ) {
						done(e)
					}
				},
				2000
			)
		});
	});
	describe("Simple anims : ", ( done ) => {
		
		it('should play simple anim well', function ( done ) {
			this.timeout(Infinity);
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				
				render() {
					setTimeout(
						tm => this.props.tweener.pushAnim([{
							apply   : { width: "50px" },
							duration: 50,
							from    : 0,
							target  : "card"
						}])
					);
					return <div className={"container"}>
						<VoodooTweener.TweenRef id="card"
						                        initial={{
							                        width: "50px"
						                        }}>
							<div className={"card"}>
								test
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			const wrapper = mount(<MyComp/>);
			setTimeout(
				tm => {
					//console.log(':::57: ', wrapper.find('.card').getDOMNode(0).style.width);
					expect(wrapper.find('.card').getDOMNode(0).style.width).to.include('100px');
					done();
				},
				100
			)
			
		});
		it('should play simple anim well even if theres redraws', function ( done ) {
			this.timeout(Infinity);
			let redrawTm;
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {};
				
				componentDidMount() {
					
					setTimeout(
						tm => this.props.tweener.pushAnim([{
							apply   : { width: "50px" },
							duration: 500,
							from    : 0,
							target  : "card"
						}])
					);
					redrawTm = setInterval(
						tm => this.setState({ value: Math.random() }),
						10
					);
				}
				
				render() {
					return <div className={"container"}>
						<VoodooTweener.TweenRef id="card"
						                        initial={{
							                        width: "50px"
						                        }}>
							<div className={"card"}>
								{this.state.value}
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			const wrapper = mount(<MyComp/>);
			setTimeout(
				tm => {
					clearInterval(redrawTm);
					expect(wrapper.find('.card').getDOMNode(0).style.width).to.include('100px');
					done();
				},
				600
			)
			
		});
		it('should play simple anim well even if theres props change, redraws & scroll', function ( done ) {
			this.timeout(Infinity);
			let redrawTm,
			    scrollLine = [{
				    apply   : { width: "50px" },
				    duration: 100,
				    from    : 0,
				    target  : "card"
			    }];
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {};
				
				componentDidMount() {
					
					setTimeout(
						tm => this.props.tweener.pushAnim([{
							apply   : { width: "50px" },
							duration: 500,
							from    : 0,
							target  : "card"
						}])
					);
					setTimeout(
						tm => this.props.tweener.scrollTo(100, 300)
					);
				}
				
				render() {
					return <div className={"container"}>
						<VoodooTweener.TweenAxis
							axe={"scrollY"}
							defaultPosition={0}
						/>
						<VoodooTweener.TweenRef id="card"
						                        tweenAxis={scrollLine}
						                        initial={{
							                        width: "50px"
						                        }}>
							<div className={"card"}>
								{this.props.value}
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			class MyApp extends React.Component {
				state = {};
				
				componentDidMount() {
					redrawTm = setInterval(
						tm => {
							this.setState({ value: Math.random() })
						},
						10
					);
				}
				
				render() {
					return <div className={"container"}>
						<MyComp value={this.state.value}/>
					</div>;
				}
			}
			
			const wrapper = mount(<MyApp/>);
			setTimeout(
				tm => {
					clearInterval(redrawTm);
					expect(wrapper.find('.card').getDOMNode(0).style.width).to.equal('150px');
					done();
				},
				600
			)
			
		});
	});
	
});