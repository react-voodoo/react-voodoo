/*
 * The MIT License (MIT)
 * Copyright (c) 2019. Wise Wild Web
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author : Nathanael Braun
 *  @contact : n8tz.js@gmail.com
 */

import React                 from "react";
import {asTweener, TweenRef} from "Comp";
import "./samples.scss";
import ReactDom              from "react-dom";


var easingFn = require('d3-ease');

let pushIn = function ( target ) {
	return {
		anims: [
			{
				type    : "Tween",
				target  : target,
				from    : 0,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
				apply   : {
					_z: -.2,
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 500,
				duration: 500,
				easeFn  : easingFn.easeCircleIn,
				apply   : {
					_z: .2,
				}
			},
			{
				type    : "Tween",
				target  : target,
				from    : 250,
				duration: 500,
				easeFn  : easingFn.easeCircle,
				apply   : {
					rotateY: 180,
				}
			}
		]
	};
};


class Header extends React.Component {
	render() {
		return <TweenRef
			id={ "header" }
			initial={ { height: "250px" } }
		>
			<header>
				<TweenRef
					id={ "logo" }
					initial={ {
						_z         : 0,
						rotateY    : 0,
						left       : "50%",
						bottom     : "60px",
						height     : "100px",
						perspective: "200px",
						marginLeft : "-100px"
					} }
					onClick={ ( e, tweener ) => {
						tweener.pushAnim(pushIn("logo"));
					} }>
					<div className={ "logo" }/>
				</TweenRef>
			</header>
		</TweenRef>;
	}
	
}

@asTweener
export default class Sample extends React.Component {
	static scrollableAnim = [
		{
			type    : "Tween",
			target  : "body",
			from    : 0,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				paddingTop: -130,
			}
		},
		{
			type    : "Tween",
			target  : "header",
			from    : 0,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				height: -130,
			}
		},
		{
			type    : "Tween",
			target  : "logo",
			from    : 0,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				left      : -50,
				height    : -50,
				marginLeft: 110,
			}
		},
		
		{
			type    : "Tween",
			target  : "body",
			from    : 50,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				paddingTop: -50,
			}
		},
		{
			type    : "Tween",
			target  : "header",
			from    : 50,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				height: -50,
			}
		},
		{
			type    : "Tween",
			target  : "logo",
			from    : 50,
			duration: 50,
			easeFn  : easingFn.easePolyOut,
			apply   : {
				bottom: -50
			}
		},
	];
	state                 = {};
	
	shouldApplyScroll( newPos, oldPos ) {
		let node = ReactDom.findDOMNode(this);
		
		if ( (newPos > oldPos) )
			this.scrollTo(100, 250);
		else if ( !node.scrollTop )
			this.scrollTo(0, 250);
		else
			this.scrollTo(50, 250);
		
		//return oldPos < 50
	}
	
	render() {
		return <TweenRef
			id={ "body" }
			initial={ { paddingTop: "250px" } }
		>
			<div className={ "SimpleHeader" } style={ {
				width : "100%",
				height: "100%"
			} }>
				<Header/>
				<div className={ "content" }>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut placerat dapibus erat et commodo.
					Integer pretium vitae lorem at molestie. Donec tincidunt sollicitudin velit eget elementum. Sed
					interdum non dolor et auctor. Aenean fermentum ipsum in efficitur varius. Quisque sagittis justo a
					mi finibus, non mattis mauris tempor. Donec ullamcorper gravida fringilla. Proin sed lacus eget nisl
					venenatis pharetra at nec sapien. Vestibulum imperdiet libero eu est mattis convallis.
					Nulla ornare orci convallis, tincidunt ligula vitae, vulputate purus. Praesent porta magna a augue
					lacinia convallis. Nullam ornare semper mauris, a varius erat maximus nec. Pellentesque ultrices
					commodo
					risus a blandit. Etiam rutrum urna eu turpis rhoncus dictum. Class aptent taciti sociosqu ad litora
					torquent per conubia nostra, per inceptos himenaeos. Praesent ullamcorper lectus risus, in placerat
					eros
					commodo sed. Proin in nisl in elit dictum lacinia. Donec malesuada arcu metus, sed convallis sapien
					maximus non. Etiam ullamcorper pretium purus vel mattis.
					<br/>
					Nullam vel arcu viverra, ornare ipsum id, eleifend velit. Integer commodo gravida mollis.
					Pellentesque
					nec elit quam. Proin molestie elementum nisl. Interdum et malesuada fames ac ante ipsum primis in
					faucibus. Cras imperdiet semper dignissim. Duis tristique ut ex et tempor. Mauris quis tempor ipsum.
					Vivamus et lorem pulvinar, volutpat libero vitae, lobortis ante. Ut vitae laoreet massa. Curabitur
					at
					convallis purus. Integer at lacus eu diam cursus pretium. Sed maximus risus et nulla consectetur
					semper.
					Donec in tellus eros.<br/>
					<br/>
					Cras iaculis rutrum ex, sed vulputate nisl porta at. Donec neque ante, interdum quis pulvinar at,
					scelerisque a odio. In nibh quam, blandit ac nulla vitae, molestie ultricies mi. Fusce quis ornare
					nulla, ut mattis turpis. Nunc sodales, metus in egestas blandit, nisl odio rutrum orci, id suscipit
					nibh
					lectus sit amet magna. Curabitur sagittis et libero vel pellentesque. Vivamus est diam, aliquet eu
					condimentum cursus, vestibulum id ex. Aenean maximus et risus in tempor. Etiam et placerat tortor.
					Phasellus ac malesuada est, sed gravida risus. Maecenas arcu eros, pharetra quis volutpat quis,
					facilisis consectetur tellus. Duis ut auctor nibh, hendrerit volutpat massa.<br/>
					<br/>
					Morbi ornare bibendum magna non fringilla. In a dictum diam. Quisque pharetra urna eu sapien
					dignissim
					malesuada. Ut et pulvinar nibh. Integer in dui nec metus dignissim ultricies. Nulla tellus sapien,
					elementum et auctor non, porta sed nulla. Pellentesque facilisis eros vitae urna posuere
					ullamcorper.
					Mauris nec nibh facilisis lacus interdum gravida vitae placerat arcu. Aliquam enim nulla, congue non
					est
					sed, dapibus eleifend metus. In imperdiet egestas nibh sed hendrerit. Maecenas tempus erat congue
					dapibus iaculis. Curabitur libero lacus, commodo eget dignissim vitae, sagittis eu mauris.
					Suspendisse
					tincidunt, dolor quis elementum congue, magna tortor sollicitudin nulla, eu eleifend ex magna vitae
					magna.<br/>
					<br/>
					Pellentesque eu dui sit amet risus posuere malesuada vitae in nisl. Vivamus malesuada gravida diam,
					eu
					aliquam arcu cursus sed. Vestibulum non erat eu nisl lacinia lobortis. Fusce eget porta quam.
					Praesent
					hendrerit, purus eget posuere feugiat, dui purus rhoncus orci, a fringilla libero nibh id dolor.
					Vivamus
					tristique laoreet aliquet. Suspendisse potenti. Nullam dictum mauris sed eros dictum finibus. Sed
					placerat, ipsum eget lobortis tristique, magna sem placerat tortor, et ullamcorper orci neque at
					ante.
					In quis justo non nunc pretium porta. Aliquam congue posuere mi, id aliquet nisi rhoncus nec. In et
					scelerisque purus, a cursus urna. Integer condimentum tortor et ligula pretium posuere. Nunc
					molestie
					consequat maximus. Aliquam aliquam, purus a imperdiet aliquet, enim metus sodales dui, in porttitor
					felis erat in felis.<br/>
					<br/>
					Nullam sodales ante eu eros aliquet, vel pellentesque mi imperdiet. Nam a augue a lectus aliquet
					convallis sit amet et sapien. Morbi nec nibh et libero scelerisque finibus. Sed lectus libero,
					vulputate
					in sollicitudin a, tincidunt sit amet urna. Nam nec ornare ante, at accumsan ipsum. Ut sit amet arcu
					leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris bibendum, erat vel blandit
					scelerisque, nisl ipsum congue tellus, sed feugiat metus erat congue sem.<br/>
					<br/>
					Nunc imperdiet massa ipsum, eget faucibus quam volutpat at. Donec sed nibh arcu. Maecenas urna
					lorem,
					finibus eu dapibus sed, ultrices eget ex. Aenean rutrum vestibulum mauris, sed facilisis metus
					hendrerit
					eget. Maecenas rhoncus et lorem non faucibus. Quisque quis hendrerit mauris, at varius mauris. In
					eget
					tempus ex.<br/>
					<br/>
					Quisque vel consequat ex. Nullam elit nunc, scelerisque fermentum enim ullamcorper, dapibus viverra
					nunc. Morbi vel ligula ut ligula porta ullamcorper nec ac quam. Etiam arcu orci, efficitur sit amet
					volutpat sit amet, sollicitudin id purus. Interdum et malesuada fames ac ante ipsum primis in
					faucibus.
					Fusce dictum nisi sit amet libero porttitor accumsan. Integer vel leo felis. Sed est ipsum,
					consectetur
					vitae elementum vitae, varius nec lorem. Nullam quis sem et augue interdum dignissim a et erat.
					Etiam
					risus turpis, ultrices eget odio in, imperdiet elementum velit. Pellentesque non scelerisque ex, vel
					aliquet nulla. Mauris commodo orci in ipsum ornare, ut ultricies velit efficitur. Class aptent
					taciti
					sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vulputate mattis metus,
					sit
					amet imperdiet lacus molestie ut. Vivamus at porttitor augue, posuere posuere nulla.<br/>
					<br/>
					Nulla facilisi. Integer non ex eros. Duis ut eros est. Vestibulum id semper arcu, ac pellentesque
					mi.
					Etiam facilisis quam ut purus sagittis malesuada eget ut lectus. Praesent at porttitor diam. Fusce
					neque
					ipsum, dictum sed felis at, egestas tristique nisl.<br/>
					<br/>
					Ut sagittis leo odio, vitae pellentesque dui finibus eget. Aliquam sed diam at justo tincidunt
					congue.
					Morbi ultrices mollis mollis. Aenean blandit, magna non hendrerit varius, dui nulla malesuada leo,
					sit
					amet consectetur nisi eros quis lacus. Integer dignissim quis eros ac hendrerit. Nam id blandit
					lacus.
					Nullam a ullamcorper eros.<br/>
					<br/>
					Fusce malesuada odio sed erat pharetra scelerisque. Nullam vehicula diam tempor lacus rutrum, nec
					feugiat orci suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
					turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ac metus
					orci. Pellentesque at fringilla lorem. Donec dictum dignissim malesuada. Morbi malesuada mi eget
					dolor
					bibendum feugiat. Praesent hendrerit augue ac nisi dignissim scelerisque sit amet eget diam.<br/>
					<br/>
					Fusce non dui auctor, auctor elit quis, lacinia nunc. Duis tempor urna id libero imperdiet,
					ultricies
					convallis quam viverra. Aliquam erat volutpat. Duis ut congue sem. Nullam et faucibus dui, sed
					fringilla
					nisi. Mauris a semper dolor. Sed in tempor velit. Quisque vel ligula eleifend lacus luctus mattis.
					Aliquam fringilla arcu ac est posuere, at molestie dolor tempus. Praesent a sapien commodo, dapibus
					purus non, tristique nisi.<br/>
					<br/>
					Integer a massa ut dui commodo ullamcorper. Duis et quam eu neque tempus interdum id vitae ligula.
					Aliquam ut ullamcorper libero. Integer a lectus vitae libero lacinia accumsan. Etiam at varius
					magna.
					Mauris et purus tincidunt neque mollis dapibus a eu enim. In at pulvinar ipsum. Duis imperdiet diam
					accumsan, convallis ex eu, placerat tellus. Aliquam imperdiet eget ex a finibus. Sed hendrerit urna
					eu
					ultrices congue. Aliquam vestibulum metus sit amet mi volutpat tristique. Integer laoreet magna non
					pellentesque pretium.<br/>
					<br/>
					Aenean felis lacus, pharetra quis bibendum nec, hendrerit ut lorem. Suspendisse potenti. Aenean
					sapien
					tellus, ultrices quis purus sed, ornare dictum erat. Vivamus tristique, risus eu tristique mattis,
					urna
					est faucibus est, a placerat augue lectus gravida eros. Proin malesuada, tortor eu cursus lacinia,
					orci
					risus ullamcorper neque, rutrum lobortis dolor neque non est. Cras libero tellus, egestas sit amet
					magna
					ut, tristique accumsan purus. Sed eu ipsum ultrices, maximus metus et, faucibus diam. Proin ut
					faucibus
					est.<br/>
					<br/>
					Aenean id neque id justo mollis vehicula. Donec placerat pharetra arcu, quis iaculis lectus viverra
					rutrum. Aenean lorem enim, consequat cursus urna eget, rutrum volutpat justo. Nullam a arcu aliquam,
					egestas urna non, vehicula sem. Duis vel ligula non odio aliquet porta sit amet ac lorem. Mauris eu
					ornare sapien, id rutrum erat. Vestibulum vestibulum pellentesque erat, pulvinar pellentesque quam
					vestibulum sit amet. Proin molestie nisl nec orci tempor, ut consequat dui finibus. Duis faucibus ex
					at
					justo efficitur euismod. Mauris volutpat elit nec enim congue, ut dignissim est consectetur.
					Praesent
					sagittis, felis id rutrum dignissim, libero nisi interdum mi, at porta dui nibh sit amet nunc. Etiam
					consequat euismod orci eu convallis. In enim neque, rhoncus id maximus quis, pulvinar sit amet
					ligula.
					Ut gravida, dui eu laoreet porttitor, urna ante auctor lorem, non consectetur libero turpis quis
					purus.
					Cras porttitor lectus a lectus tristique malesuada.<br/>
					<br/>
					Cras sagittis nibh eget hendrerit accumsan. Phasellus convallis rhoncus purus, posuere viverra
					lectus
					condimentum sit amet. Pellentesque sem massa, pretium eget enim sed, vehicula eleifend ex. Etiam a
					ante
					vel mi venenatis pulvinar vel non dui. Phasellus lectus ex, condimentum at porttitor eget, congue
					sit
					amet sem. Sed id vehicula urna, eu ultrices nisl. Aenean mattis ipsum imperdiet nisi tincidunt
					laoreet.
					Duis volutpat ante eu semper sollicitudin. Donec tempor vel arcu at sagittis. Aliquam lacinia
					lacinia
					felis in dapibus. Quisque sollicitudin sem eget ornare sodales. Vivamus venenatis commodo fringilla.
					Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur lobortis sollicitudin nunc
					eu
					ultricies. Donec eget pharetra nisl, ut vehicula orci.<br/>
					<br/>
					Fusce tristique massa a quam laoreet vestibulum. Suspendisse potenti. Aliquam lobortis fermentum
					lacus,
					eget egestas quam euismod ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
					posuere
					cubilia Curae; Cras suscipit purus est, a rhoncus eros molestie ac. Proin eleifend lobortis tellus
					eu
					varius. Praesent a elit aliquet, ornare quam nec, ullamcorper ipsum. Sed at turpis et mi iaculis
					molestie ut eget augue. Nulla eu urna tristique, faucibus urna vel, euismod dolor.<br/>
					<br/>
					Vestibulum eu justo nisl. Mauris nisi odio, gravida at dolor eget, commodo dapibus ante. Ut at
					malesuada
					erat, in tincidunt orci. Curabitur porta scelerisque posuere. Quisque laoreet scelerisque enim ac
					dictum. Maecenas vitae nulla lorem. Etiam varius ut ante eget dignissim. Mauris congue lectus eget
					nisi
					auctor, a scelerisque quam dictum. Donec id dignissim leo. Aenean posuere vel justo nec posuere.
					Vivamus
					non facilisis velit, a ultrices ipsum.<br/>
					<br/>
					Aliquam erat volutpat. Nullam sodales tempor sem, id pharetra ante venenatis euismod. Morbi blandit
					quam
					sem, at lacinia eros venenatis ut. Nulla imperdiet fringilla leo, sed maximus metus aliquam vitae.
					In
					nisl sem, sodales in eleifend eget, laoreet eget urna. Mauris mattis sit amet elit id pellentesque.
					Suspendisse non nisi laoreet turpis venenatis luctus. Fusce quis pulvinar purus, at tempor tellus.
					Suspendisse eleifend tristique lectus iaculis sodales. Mauris tellus massa, tempus a imperdiet at,
					tincidunt sit amet enim. Maecenas massa orci, dictum eget ipsum molestie, tempus mattis mi. Quisque
					gravida at ante et pretium.<br/>
					<br/>
					20 paragraphes, 1707 mots, 11366 caractères de Lorem Ipsum généré<br/>
				</div>
			</div>
		</TweenRef>;
	}
}