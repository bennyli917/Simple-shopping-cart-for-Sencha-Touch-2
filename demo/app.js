Ext.Loader.setPath({
    'Ext.ux': 'src/ux'
});

Ext.application({
    name: 'Cart',

    viewport: {
        autoMaximize: true
    },

    requires: [
        'Ext.MessageBox',
        'Ext.ux.Cart.src.Cart'
    ],

    views: [
        'Main'
    ],

    models: [
        'Categories',
        'Item'
    ],

    stores: [
        'Categories'
    ],
    
    controllers: [
        'Ext.ux.Cart.controller.Indicator',
        'Ext.ux.Cart.controller.Panel',
        'Ext.ux.Cart.controller.Archive'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize shopping cart products store
        Cart.setProductsStore('Categories');

        // Setup currency
        Cart.setCurrency('USD');

        // Setup cart submit callback
        Cart.setCallback(function(encData) {
			
            /**
             * You can use cart data as you want
             */

            console.log('Cart data submited', Ext.decode(encData));

            // For now we show message only
            Ext.Msg.alert(
                null,
                Ext.String.ellipsis(encData, 16, true) +
                ' more in console'
            );
		});

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Cart.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    localStorage.clear();
                    window.location.reload();
                }
            }
        );
    }
});
