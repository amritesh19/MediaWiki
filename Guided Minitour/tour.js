/**
 * Task 1 : Guided Minitour for Basic Introduction to UserScript
 * 
 * Develop a UserScript/Gadget tutorial on MediaWiki.org similar to Wikipedia:The_Wikipedia_Adventure
 *
 * By A.Amritesh
 */
 
( function ( window, document, $, mw, gt ) {
	var tour;
  
	tour = new gt.TourBuilder({
		/**
		 * This is a minitour to introduce users to UserScripts.
		 * To take this tour append the url with '?tour=minitour'
		 * after saving this code in MediaWiki:Guidedtour-tour-minitour.js page.
		 */
		name: 'minitour'
	} );
  
	tour.firstStep( {
		/**
		 * This is the introduction step.
		 */
		name: 'intro',
		title: 'Want to personalise your wiki?',
		description: '<br>You can personalise your wiki using UserScripts.<br><b>Excited?</b>',
		overlay: true,
		closeOnClickOutside: false,
	} )
	.next( 'login' );
  
	tour.step( {
		/**
		 * This step contains Login options.
		 */
		name: 'login',
		title: 'Login or create an account',
		description: '<br>Having an account is essential for this tour. It also provides you a lot more bebefits.<br>Go for it.',
		overlay: true,
		closeOnClickOutside: false,
		buttons: [ {
			// This button leads users back to 'intro' step. 
			name: '<big>←</big>',
			action: 'externalLink',
			url: mw.util.getUrl( 'Main Page' ) + '?tour=minitour&step=intro'
		}, {
			// This button leads users to proceed to 'commonjs' step. 
			name: 'I\'m logged in',
			action: 'externalLink',
			type: 'progressive',
			url: mw.util.getUrl( 'Main Page' ) + '?tour=minitour&step=commonjs'
		}, {
			// This button leads users to Special:UserLogin page.
			name: 'I need to login',
			action: 'externalLink',
			url: mw.util.getUrl( 'Special:UserLogin' ) + '?tour=minitour&step=login'
		}, {
			// This button leads users to Special:CreateAccount page. 
			name: 'Register!',
			action: 'externalLink',
			url: mw.config.get( 'wgServer' ) + mw.config.get( 'wgScriptPath' ) + '/index.php?title=Special:CreateAccount'
		} ],
		allowAutomaticOkay: false,
	} );

	tour.step( {
		/**
		 * This step introduces users to Special:MyPage/common.js page.
		 */
		name: 'commonjs',
		title: 'What\'s Next ...',
		description: '<br>Personalisation of your wiki can be through your <b>Special:MyPage/common.js</b> page. It contains your personal JavaScript code to do so.<br><br><b>*</b>If you are using wiki in Local host, first follow the second button.',
		overlay: true,
		closeOnClickOutside: false,
		buttons: [ {
			// This button leads to Special:MyPage/common.js page.
			name: 'Special:MyPage/common.js',
			action: 'externalLink',
			type: 'progressive',
			url: mw.util.getUrl( 'Special:MyPage/common.js' ) + '?tour=minitour&step=create'
		}, {
			// This button leads to 'wgAllowUserJs' step.
			name: 'Using Local host?',
			action: 'externalLink',
			url: mw.util.getUrl( 'Main Page' ) + '?tour=minitour&step=wgAllowUserJs'
		} ],
		allowAutomaticOkay: false,
	} );
  
	tour.step( {
		/**
		 * This step tells users about $wgAllowUser variable.
		 */ 
		name: 'wgAllowUserJs',
		title: 'One more thing ...',
		description: '<br>If you are using wiki through Local host, <b>$wgAllowUser variable</b> in the <b>configuration file</b> needs to be set as true.<br>Only this would allow user scripts on a wiki to work.<br><br>Append the following line to your <b>LocalSettings.php</b> file:<br><b>$wgAllowUserJs = true;</b>',
		overlay: true,
		closeOnClickOutside: false,
		buttons: [ {
			// This button opens Manual:$wgAllowUserJs page in new tab.
			name: 'Know more about it',
			onclick: function() {
				window.open( 'https://www.mediawiki.org/wiki/Manual:$wgAllowUserJs', '_blank' );
			},
			type: 'neutral'
		}, {
			// This button leads back to 'commonjs' step.
			name: 'If done, back...',
			action: 'externalLink',
			type: 'progressive',
			url: mw.util.getUrl( 'Main Page' ) + '?tour=minitour&step=commonjs'
		} ],
		allowAutomaticOkay: false,
	} );
  
	tour.step( {
		/**
		 * This step shows Edit/Create button in Special:MyPage/common.js page.
		 */
		name: 'create',
		description: '<br>"<b>Create</b>" the page, if not created otherwise click "<b>Edit</b>" button',
		// This positions the guider next to Edit/Create menu section.
		attachTo: '#ca-edit',
		position: 'bottom',
		allowAutomaticOkay: false,
	} )
	.next( 'userscript' );
  
	tour.step( {
		/**
		 * This step leads users to examples of UserScript.
		 */ 
		name: 'userscript',
		description: 'Here is an example of basic UserScript, that you can import to your <b>Special:MyPage/common.js</b> page. Proceed to see the code which display the word count of an article.',
		overlay: true,
		closeOnClickOutside: false,
		allowAutomaticOkay: false,
		buttons: [ {
			// This button opens examples in new tab.
			name: 'Other examples',
			onclick: function() {
				window.open( 'https://www.mediawiki.org/wiki/ChickTech_High_School_Kickoff_2017/Tasks#', '_blank' );
			},
			type: 'neutral'
		} ],
	} )
	.next( 'import' );
  
	tour.step( {
		/**
		 * This step contains UserScript to show word count.
		 */ 
		name: 'import',
		description: 'To import the following code in your Special:MyPage/common.js page, copy the block of code in the Edit section :<br><br><code> var a = $("#bodyContent").text();<br>&nbsp;var wCount = a.split(" ").length;<br>&nbsp;var $wordOutput = $("&lt;p&gt;Word Count: " + wCount + "&lt;/p&gt;").css("font-size", "large");<br>&nbsp;$( "#bodyContent" ).prepend($wordOutput);<code>',
		closeOnClickOutside: false,
		allowAutomaticOkay: false,
	} )
	.next( 'save' );
  
	tour.step( {
		/**
		 * This step directs the users to save the changes done in Special:MyPage/common.js.
		 */ 
		name: 'save',
		description: 'Now, save it to see changes',
		// This positions the guider next to Save button. 
		attachTo: '#wpSave',
		position: 'bottomRight',
		closeOnClickOutside: false,
		allowAutomaticOkay: false,
		buttons: [ {
			// This button leads to 'done' step.
			name: 'Done!',
			action: 'externalLink',
			type: 'progressive',
			url: mw.util.getUrl( 'Special:MyPage/common.js' ) + '?tour=minitour&step=done'
		} ],
	} );
    
	tour.step( {
		/**
		 * This step congrats the user and the journey of this tour ends.
		 */ 
		name:'done',
		title: 'You did it :)',
		description: 'Wow, you did it. <b>Congratulation!</b>',
		overlay: true,
		closeOnClickOutside: false,
		buttons: [ {
			// This button ends the tour.
			name: 'Congrats!',
			action: 'end'      
		} ],
	} );
	
} ( window, document, jQuery, mediaWiki, mediaWiki.guidedTour ) );
