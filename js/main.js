var app=angular.module("app",["ui.bootstrap","ngRoute","ui.mask"]);
app.config(["$routeProvider",function ($routeProvider) {
    $routeProvider
        .when('/',{
            title:'Iniciar sesión',
            templateUrl:'html/login.html',
            controller:'loginCtrl'
        })
        .when('/home',{
            resolve:{
                check:function ($location,sessionService) {
                    if(sessionService.getSesion()==null){
                        $location.path('/');
                    }
                }
            },
            title:'Plexo Building',
            templateUrl:'html/home.html',
            controller: 'homeCtrl',
        })
        .when('/home_admin',{
            resolve:{
                check:function ($location,sessionService) {
                    if(sessionService.getSesion()==null){
                        $location.path('/');
                    }
                }
            },
            title:'Plexo Building',
            templateUrl:'html/home_admin.html',
            controller:'homeAdminCtrl'
        });
}]);
