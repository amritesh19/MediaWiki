/**
 * Task 3 :  Userscript making query using MediaWiki API and showing it using OOUI Custom Widget
 * 
 * Develop a UserScript/Gadget tutorial on MediaWiki.org similar to Wikipedia:The_Wikipedia_Adventure
 * 
 * By A.Amritesh
 */
 $( document ).ready( function () {
	mw.loader.using( 'oojs-ui-core' ).done( function () {
		var str1 = '',
			str2 = '',
			count1 = 0,
			count2 = 0;
		
		/**
		 * This is a custom class for making widget with special functionality.
		 * It contains two buttons for making different queries.
		 */ 
		var Query = function ( config ) {
			// Configuration object
			config = config || {};
			// Calling parent constructor
			Query.parent.call( this, config );

			this.button1 = new OO.ui.ButtonWidget( {
				label: ' Editors ',
				
			} );

			this.button2 = new OO.ui.ButtonWidget( {
				label: ' Mostviewed Pages ',
				
			} );
			
			// When 'click' is emitted from button1, revision method method will be invoked.
			this.button1.connect( this, { click: 'revision' } );
			// When 'click' is emitted from button2, mostViewed method method will be invoked.
			this.button2.connect( this, { click: 'mostViewed' } );

			// Object of this class will append button1 and button2.
			this.$element.append(
				this.button1.$element
					.css( { 
						padding: '5px 5px',
						margin: '5px 18px' 
					} ),
				this.button2.$element
					.css( {
						padding: '5px 5px',
						margin: '5px 18px' 
					} )
			);
		};

		OO.inheritClass( Query, OO.ui.Widget );
    
    	/**
    	 * This method is responsible for making query about the revisions of the current page
    	 * using MediaWiki Action API.
    	 * It fetches the name of first and last editor of the current page.
    	 * The name of editors also lead to their respective introduction page.
    	 */ 
    	Query.prototype.revision = function () {
    		// count1 keeps track of result widget. 
    		// It ensures that more than one such widget will not be appended.
			count1++;
			if ( count1 == 1 ) {
				// It disables button2 when button1 is in action. 
				this.button2.setDisabled( true );
        		
        		// Query about revisions of the current page
				var url = 'https://www.mediawiki.org/w/api.php';
				
				var params = {
					action: 'query',
					prop: 'revisions',
        			titles: mw.config.get( "wgPageName" ),
        			rprop: 'user',
        			rvlimit: '1',
        			rvslots: "main",
					format: 'json',
					formatversion: '2'
				};

				url = url + '?origin=*';
				Object.keys( params ).forEach( function ( key ) {
					url += '&' + key + '=' + params[ key ];
				} );
				
				var urllast = url + '&rvdir=older'; 
        		var urlfirst = url + '&rvdir=newer';
        	  
        		// This function fetches the name of first editor of the current page using urlfirst.
				fetch( urlfirst )
					.then( function ( response ) {
						return response.json();
					} )
					.then( function ( response ) {
						str1 = 'First Editor : ';
						for ( var page in response.query.pages ) {
							for ( var rev in response.query.pages[page].revisions ) {
								var user = response.query.pages[page].revisions[rev].user;
								str1 += "<a href=https://www.mediawiki.org/wiki/User:" + user.replaceAll( " ", "_" )
										+ ">" + user + "</a>" + "<br>";
							}
						}
					} )
					.catch( function ( error ) {
						console.log( error );
					} );
        		
        		
        		// This function fetches the name of last editor of the current page using urllast.
        		fetch( urllast )
					.then( function ( response ) {
						return response.json();
					} )
					.then( function ( response ) {
						str1 +='Last Editor : ';
						for ( var page in response.query.pages ) {
							for ( var rev in response.query.pages[page].revisions ) {
									var user = response.query.pages[page].revisions[rev].user;
									str1 += "<a href=https://www.mediawiki.org/wiki/User:" + user.replaceAll( " ", "_" )
											+ ">" + user + "</a>";
							}
						}
					} )
					.catch( function ( error ) {
						console.log( error );
					} );
				
				// This ensures empty string is not returned.
				if(str1 == '' ){
					str1 = 'Please try again.';
				}
				
				// The string is converted to HTML snippet and set as the label of result widget.
				this.result = new OO.ui.LabelWidget( {
					label : new OO.ui.HtmlSnippet( str1 ),
					classes: [ 'result' ]
				} );

				this.backButton = new OO.ui.ButtonWidget( {
					label: 'Back...',
					classes: [ 'back' ]
				} );
				
				// When 'click' is emitted from button1, backClick method method will be invoked.
				this.backButton.connect( this, { click: 'onBackClick' } );
				
				this.$element.append(
					this.result.$element
						.css( {
							display: 'block',
							border: '1px solid',
							backgroundColor: '#eaecf0',
							margin: '10px 0',
							padding: '15px'
						} ),
					this.backButton.$element
				);
			}
		};

    	/**
    	 * This method is responsible for making query about the mostviewed pages of MediaWiki
    	 * using MediaWiki Action API.
    	 * It fetches the names of five mostviewed pages and their views count.
    	 * The name of pages will lead to their respective MediaWiki pages.
    	 */ 
		Query.prototype.mostViewed = function () {
			// count2 keeps track of result widget. 
    		// It ensures that more than one such widget will not be appended.
			count2++;
			if ( count2 == 1 ) {
				// It disables button1 when button2 is in action.
				this.button1.setDisabled( true );
				
				// Query about five mostviewed pages
				var url = 'https://www.mediawiki.org/w/api.php';
				
				var params = {
					action: 'query',
					list: 'mostviewed',
        			pvimlimit: '5',
        			pvimmetric: 'pageviews',
					format: 'json'
				};

				url = url + '?origin=*';
				Object.keys( params ).forEach( function ( key ) {
					url += '&' + key + '=' + params[ key ];
				} );

				fetch( url )
					.then( function ( response ) {
						return response.json();
					} )
					.then( function ( response ) {
						var pages = response.query.mostviewed;
					    str2 = '';
					    var title ='';
					
						for ( var page in pages ) {
							title = pages[ page ].title;
            				str2 += "<a href=https://www.mediawiki.org/wiki/" + title.replaceAll( " ", "_" ) + ">" + 
            					title + "</a>" + '  :  ' + pages[ page ].count + "<br>";
						}
					} )
					.catch( function ( error ) {
						console.log( error );
					} );
				
				// This ensures empty string is not returned.
				if(str2 == '' ){
					str2 = 'Please try again.';
				}
				
				// The string is converted to HTML snippet and set as the label of result widget.
				this.result = new OO.ui.LabelWidget( {
					label: new OO.ui.HtmlSnippet( str2 ),
					classes: [ 'result' ]
				} );
				
				this.backButton = new OO.ui.ButtonWidget( {
					label: 'Back...',
					classes: [ 'back' ]
				} );
				
				// When 'click' is emitted from button1, backClick method method will be invoked.
				this.backButton.connect( this, { click: 'onBackClick' } );

				this.$element.append(
					this.result.$element
						.css( {
							display: 'block',
							border: '1px solid',
							backgroundColor: '#eaecf0',
							margin: '10px 0',
							padding: '15px'
						} ),
					this.backButton.$element
				);
			}
		};
		

		/**
		 * This method is responsible for taking the custom widget to previous state.
		 * It disable both buttons, remove result lable and back button and set counters to zero. 
		 */ 
		Query.prototype.onBackClick = function () {
			this.button1.setDisabled( false );
    		this.button2.setDisabled( false );
    		
			$( '.result' ).remove();
			$( '.back' ).remove();
		
			count1 = 0;
			count2 = 0;
		};

		/**
		 * This creates an object of our Query class.
		 * popUpButton will popup the queryWidget when clicked.
		 */ 
		var queryWidget = new Query();

		var popUpButton = new OO.ui.PopupButtonWidget( {
			label: 'Query',
			popup: {
				$content: queryWidget.$element,
				padded: true
			}
		} );

		// popUpButton will be shown on personal Navigation menu.
		$( '#p-personal ul' )
			.prepend( $( '<li>' ).append( popUpButton.$element ) );
	} );
} );
