(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('AboutController', AboutController);
        
    function AboutController(){
        var vm = this;
        //Hello
        vm.developers = [
            {name: 'Homer', bio: 'The father figure of the group', imageUrl: 'assets/img/homer.jpg'},
            {name: 'Barty', bio: 'Young buck who does most of the work', imageUrl: 'assets/img/bart.png'}
        ]
    }
    
})();