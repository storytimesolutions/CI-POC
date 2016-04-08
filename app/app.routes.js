(function(){
    'use strict';
    
    angular.module('app')
        .config(function($routeProvider){
            $routeProvider
                .when('/' , {
                    templateUrl: 'app/components/home/homeView.html'
                })
                .when('/about', {
                    templateUrl: 'app/components/about/aboutView.html',
                    controller: 'AboutController',
                    controllerAs: 'aboutCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
    
})();