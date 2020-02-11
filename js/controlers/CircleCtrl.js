app.controller("circleCtrl",["$timeout", "$q", "$log",function ($timeout, $q, $log) {
    this.loading = false;
    this.simulateLoading = function () {
        this.loading = true;
        $timeout(function () {
            this.loading = false;
        }.bind(this), 5000);
    };
}]);
