(function(){
    'use strict';
    
    angular
        .module('app')
        .controller('AboutController', AboutController);
        
    function AboutController(){
        var vm = this;
        vm.developers = [
            {name: 'Homer Man', bio: 'The father figure of the group', imageUrl: 'assets/img/homer.jpg'},
            {name: 'Bart', bio: 'Young buck who does most of the work', imageUrl: 'assets/img/bart.png'}
        ];
    }
    
})();