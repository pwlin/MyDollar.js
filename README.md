MyDollar.js
===========

An alternative to essential functions of jQuery.

Current functions
=========

###.ready()###

    $( document ).ready( handler );

###.on()###

    $( selector ).on( event, handler, eventName );
    
###.off()###

    $( selector ).off( event, eventName );
    
###.attr()###

    $( selector ).attr( attributeName );
    $( selector ).attr( attributeName, value );
    $( selector ).attr( attributes );
    $( selector ).attr( attributeName, function(index, attr) );
    
###.removeAttr()###

    $( selector ).removeAttr( attributeName );
    $( selector ).removeAttr( attributes );

###.hasClass()###

    $( selector ).hasClass( className );

###.addClass()###

    $( selector ).addClass( className );
    $( selector ).addClass( function(index, currentClass) );

###.removeClass()###
    
    $( selector ).removeClass();
    $( selector ).removeClass( className );
    $( selector ).removeClass( function(index, class) );

###.data()###

    $( selector ).data( key, value );
    $( selector ).data( obj );
    $( selector ).data( key );
    $( selector ).data();

###.removeData()###

    $( selector ).removeData( name );
    $( selector ).removeData( list );

###.html()###

    $( selector ).html();
    $( selector ).html( htmlString );
    $( selector ).html( function(index, oldhtml) );

###.empty()###

    $( selector ).empty();

###.val()###
    
    $( selector ).val();
    $( selector ).val( value );
    $( selector ).val( function(index, value) );
    
###.append()###

    $( selector ).append( String );
    $( selector ).append( DOMElement );
    $( selector ).append( $.el() );
    // TODO:
    $( selector ).append( function(index, html) );

###.prepend()###

    $( selector ).prepend( String );
    $( selector ).prepend( DOMElement );
    $( selector ).prepend( $.el() );
    // TODO:
    $( selector ).prepend( function(index, html) );

###.before()###

    $( selector ).before( String );
    $( selector ).before( DOMElement );
    $( selector ).before( $.el() );
    // TODO:
    $( selector ).before( function(index) );

###.after()###

    $( selector ).after( String );
    $( selector ).after( DOMElement );
    $( selector ).after( $.el() );
    // TODO:
    $( selector ).after( function(index) );

###.remove()###
    
    $( selector ).remove();
    $( selector ).remove( anotherSelector );

###.hide()###

    $( selector ).hide();

###.show()###
    
    $( selector ).show();
    $( selector ).show( displayType );

###.toggle()###
    
    $( selector ).toggle();
    $( selector ).toggle( displayType );    

###.click()###
   
   $( selector ).click( handler(eventObject), eventName ); 
   $( selector ).click( handler(eventObject) );
   // TODO:
   $( selector ).click( eventData, handler(eventObject) );
   $( selector ).click();
   
###.css()###

    $( selector ).css( propertyName );
    $( selector ).css( propertyNames );
    $( selector ).css( propertyName, value );
    $( selector ).css( propertyName, function(index, value) );
    $( selector ).css( properties );
    
