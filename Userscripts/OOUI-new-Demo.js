/**
 * Task 2 : Userscript using Custom OOUI Widget
 * 
 * Develop a UserScript/Gadget tutorial on MediaWiki.org similar to Wikipedia:The_Wikipedia_Adventure
 *
 * By A.Amritesh
 */
$( document ).ready( function () {
	mw.loader.using( 'oojs-ui-core' ).done( function () {
		/**
		 * This is a Custom Widget designed around a story.
		 * Story: The user finds an ancient scroll in a Cryptex.
		 * It contains the message of an ancient civilization. 
		 * Cryptex is an instrument that takes care of its safety.
		 * To unlock it, the user has to decode the ancient text in a single attempt otherwise,
		 * it will be destroyed and humanity will never be able to know that message.
		 */
		 
		 //This is a custom class for Cryptex.
		var Cryptex = function ( config ) {
			config = config || {};

			Cryptex.parent.call( this, config );
			
			var str = "Here lies the <b>ancient scroll</b>. For its saftey, it is in a <b>Cryptex</b>. As cryptex give only <b>one chance</b>, mind your answer. Otherwise it get in <b>self-distruction mode</b>, and humanity will be unaware of this message.<br>";

			this.info = new OO.ui.LabelWidget( {
				label: new OO.ui.HtmlSnippet( str )
			} );

			this.button1 = new OO.ui.ButtonWidget( {
				label: 'Explore...',
				flags: [ 'progressive', 'primary' ],
				classes: [ 'button' ]
			} );
			
			// When 'click' is emitted from button1, onClick method will be invoked.
			this.button1.connect( this, { click: 'onClick' } );
			
			// Object of this class will append info and button1.
			this.$element
				.append(
					this.info.$element.css( {
						display: 'block',
						margin: '25px'
					} ),
					this.button1.$element
				);
		};

		OO.inheritClass( Cryptex, OO.ui.Widget );
		
		/**
		 * This method is responsible for showing the ancient text and taking input.
		 * It also contains reference to ancient language.
		 */ 
		Cryptex.prototype.onClick = function () {
			// It removes button1 as it is no longer needed.
			$( '.button' ).remove();
			
			// The image used here is hosted on A. Amritesh Google Drive.
			// To see image properly, please use your local setup.
			var str = "You got to see the word. Now, you have to decode it. This is the only way forward...<br>Learn the alphabets of <a href = https://en.wikipedia.org/wiki/Atlantean_language#/media/File:Atlantean.svg>Atlantean language</a><br><br><img src= 'http://www.gdurl.com/Eb3H' heigth='260px' width='180px'>";
			this.info.setLabel( new OO.ui.HtmlSnippet( str ) );
		
			this.input = new OO.ui.TextInputWidget( {
				placeholder: 'Enter to unlock...',
				classes: [ 'input' ]
			} );
		
			this.button2 = new OO.ui.ButtonWidget( {
				label: 'Submit...',
				flags: [ 'progressive', 'primary' ],
				classes: [ 'submit' ]
			} );
		
			// When 'enter' is emitted from input or 'click' is emitted from button2,
			// onSubmit method will be invoked.
			this.input.connect( this, { enter: 'onSubmit' } );
			this.button2.connect( this, { click: 'onSubmit' } );
		
			this.$element
				.append(
					this.input.$element
						.css( {
							width: '70%',
							display: 'inline-block'
						} ),
					this.button2.$element.css( {
						float: 'right'
					} )
				);
		};
	
		/**
		 * This method is responsible for showing the verdict.
		 * If it matches to the answer, message will be shown and if not
		 * message will be destroyed.
		 */ 
		Cryptex.prototype.onSubmit = function () {
			var str;
			var inputValue = this.input.getValue().toLowerCase();
			
			if( inputValue === "wonder" ) {
				str = '<b>Amazing!</b> Matched...<br>Here is the message on scroll:<br><b>"Prosperity lies in collaboration."</b>';
			}
			else {
				str = '<b>Self-Destruction</b> mode on....<br>Human kind will never know this message.<br>';
			}
			
			// It sets new label of info. 
			this.info.setLabel( new OO.ui.HtmlSnippet( str ) );
			
			$( '.input' ).remove();
			$( '.submit' ).remove();
		};
		
		// This creates an object of our Cryptex class.
		var cryptexWidget = new Cryptex();
		
		// popUpButton will popup the cryptexWidget when clicked.
		var popUpButton = new OO.ui.PopupButtonWidget( {
			label: 'Cryptex',
			popup: {
				$content: cryptexWidget.$element,
				padded: true
			}
		} );
		
		// popUpButton will be shown on personal Navigation menu. 
		$( '#p-personal ul' )
			.prepend( $( '<li>' ).append( popUpButton.$element ) );
	} );
} );
