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

const path    = require('path'),
      TIMEOUT = 5000;

import {expect}        from 'chai';
import {mount, render} from 'enzyme';
import React           from 'react';

module.exports = function ( VoodooTweener ) {
	
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
			expect(wrapper.find('.card')[0].attribs.style).to.include('width:calc(50% + 50px)');
		});
		it('should support switching styles', function ( done ) {
			this.timeout(TIMEOUT);
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {
					initial: {
						width    : "50px",
						transform: {
							rotateX: 20
						}
					}
				};
				
				componentDidMount() {
					setTimeout(
						tm => this.setState({
							                    initial: {
								                    height   : "50px",
								                    transform: {
									                    rotateY: 20
								                    }
							                    }
						                    }), 10
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
						expect(wrapper.find('.card').getDOMNode(0).style.transform).to.equal("rotateY(20deg)");
						expect(wrapper.find('.card').getDOMNode(0).style).to.not.have.any.keys('width');
						done();
					} catch ( e ) {
						done(e)
					}
				},
				600
			)
		});
		it('should support switching styles 2', function ( done ) {
			this.timeout(TIMEOUT);
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {
					initial: {
						width    : "50px",
						boxShadow: {
							blurRadius  : 30,
							color       : "rgba(0, 0, 255, .5)",
							inset       : false,
							offsetX     : -20,
							offsetY     : -20,
							spreadRadius: 1
						},
					}
				};
				
				componentDidMount() {
					setTimeout(
						tm => this.setState({
							                    initial: {
								                    height: "50px",
							                    }
						                    }), 10
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
						console.log(wrapper.find('.card').html())
						expect(wrapper.find('.card').getDOMNode(0).style.height).to.equal("50px");
						//expect(wrapper.find('.card').getDOMNode(0).style.transform).to.equal("rotateY(20deg)");
						expect(wrapper.find('.card').getDOMNode(0).style).to.not.have.any.keys('box-shadow');
						done();
					} catch ( e ) {
						done(e)
					}
				},
				600
			)
		});
		it('should support switching styles & anims ', function ( done ) {
			this.timeout(TIMEOUT);
			
			
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
						//console.log(wrapper.find('.container').html())
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
		it('should support switching scrollAxis', function ( done ) {
			this.timeout(TIMEOUT);
			let redrawTm;
			
			@VoodooTweener.asTweener
			class MyComp extends React.Component {
				state = {
					initial   : {
						height: ["100%", "0px", "-16vh"],
					},
					scrollLine: [{
						apply   : {
							height: ["-100%", "200px", "16vh"]
						},
						duration: 100,
						from    : 0,
						target  : "card"
					}]
				};
				
				componentDidMount() {
					
					setTimeout(
						tm => this.setState({
							                    initial   : {
								                    height: ["100%", "0px", "0vh"],
							                    },
							                    scrollLine: [{
								                    apply   : {
									                    height: ["-100%", "100px", "16vh"]
								                    },
								                    duration: 100,
								                    from    : 0,
								                    target  : "card"
							                    }]
						                    }),
						50
					);
					setTimeout(
						tm => this.props.tweener.scrollTo(0, 100)
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
								{this.props.value}
							</div>
						</VoodooTweener.TweenRef>
					</div>;
				}
			}
			
			const wrapper = mount(<MyComp/>);
			setTimeout(
				tm => {
					console.log(wrapper.find('.container').html())
					//expect(wrapper.find('.card').getDOMNode(0).style.transform).to.equal('translateY(500px)');
					done();
				},
				600
			)
			
		});
		
	});
	
};