(function(){
    'use strict';
    
    angular.module('app')
        .controller('AboutController', function(){
            var vm = this;
            //Hello
            vm.developers = [
                {name: 'Homer', bio: 'The father figure of the group', imageUrl: 'assets/img/homer.jpg'},
                {name: 'Bart', bio: 'Young buck who does most of the work', imageUrl: 'assets/img/bart.png'}
            ]
        })
    
})();