var app=angular.module("app",["ui.bootstrap","ngRoute","ui.mask","ngMaterial"]);
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
app.directive('fileInput',["$parse",function ($parse) {
    return{
        restrict:'A',
        link:function (scope,elm,attrs) {
            elm.bind('change',function () {
                $parse(attrs.fileinput).assign(scope,elm[0].files);
                scope.$apply();
            });
        }
    }
}]);
