/*
 *
 * Copyright (C) 2020 Nathanael Braun
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
 *
 *
 *   @author : Nathanael Braun
 *   @contact : n8tz.js@gmail.com
 */

const path    = require('path'),
      TIMEOUT = 5000;

import {expect} from 'chai';
import {mount}  from 'enzyme';
import React    from 'react';


module.exports = function ( VoodooTweener ) {
	
	describe("Simple anims : ", ( done ) => {
		
		it('should play simple anim well', function ( done ) {
			this.timeout(TIMEOUT);
			
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
			this.timeout(TIMEOUT);
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
			this.timeout(TIMEOUT);
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
	
};