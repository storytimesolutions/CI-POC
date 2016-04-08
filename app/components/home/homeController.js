(function(){
    'use strict';
    
    angular.module('app')
        .controller('AboutController', function(){
            var vm = this;
            vm.developers = [
                {name: 'Homer', description: 'The father of the group', imageUrl: 'assets/img/homer.png'},
                {name: 'Barty Boy', description: 'Young buck who does most of the work', imageUrl: 'assets/img/bart.png'}
            ]
        })
    
})();