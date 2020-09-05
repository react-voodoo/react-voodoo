/*
 *   The MIT License (MIT)
 *   Copyright (c) 2020. Nathanael Braun
 *
 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 *
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
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