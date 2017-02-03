var app = angular.module("app", ['ngRoute']);

// =====================================
// configure the route navigation
// =====================================
app.config(function ($routeProvider) {
    $routeProvider
    .when('/',
    {
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
    .when('/about',
    {
        templateUrl: 'about.html',
        controller: 'AboutController'
    })
    .when('/contact',
    {
        templateUrl: 'contact.html',
        controller: 'ContactController'
    })
    .when('/pd',
    {
        templateUrl: '/spa/pd/index.html',
        controller: "pdController"
    })
    .when('/pd/Create',
    {
        templateUrl: '/spa/pd/create.html',
        controller: "pdControllerCreate"
    })
    .when('/pd/Edit/:id',
    {
        templateUrl: '/spa/pd/edit.html',
        controller: "pdControllerEdit"
    })
    .when('/pd/Details/:id',
    {
        templateUrl: '/spa/pd/details.html',
        controller: "pdControllerDetails"
    })
    .when('/pd/Delete/:id',
    {
        templateUrl: '/spa/pd/delete.html',
        controller: "pdControllerDelete"
    })
    .otherwise({
        templateUrl: '/spa/redirectError.html',
        controller: "pdControllerError"
    });
});


// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
app.factory("pdService", function ($http) {
    var thispdService = {};

    // get all data from database
    thispdService.GetAll = function () {
        var promise = $http({
            method: 'GET',
            url: '/api/PersonalDetails'
        })
            .then(function (response) {
                return response.data;
            },
            function (response) {
                return response.data;
            });
        return promise;
    };


    // get single record from database
    thispdService.GetSingle = function (id) {

        var promise = $http({
            method: 'GET',
            url: '/api/PersonalDetails/' + id
        })
            .then(function (response) {
                return response.data;
            },
            function (response) {
                return response.data;
            });
        return promise;
    };


    // post the data from database
    thispdService.Insert = function (firstName, lastName, age, active) {
        var personalDetail = {
            FirstName: firstName,
            LastName: lastName,
            Age: age,
            Active: active,
        };

        var promise = $http({
            method: 'POST',
            url: '/api/PersonalDetails',
            data: personalDetail
        })
        .then(function (response) {
            return response.statusText;
        },
        function (response) {
            return response.statusText;
        });

        return promise;
    };

    // put the data from database
    thispdService.Update = function (autoId, firstName, lastName, age, active) {
        var personalDetail = {
            AutoId: autoId,
            FirstName: firstName,
            LastName: lastName,
            Age: age,
            Active: active,
        };

        var promise = $http({
            method: 'PUT',
            url: '/api/PersonalDetails/' + autoId,
            data: personalDetail
        })
        .then(function (response) {
            return "Updated";
            // return response.statusText + ' ' + response.status + ' ' + response.data;
        },
        function (response) {
            return response.statusText + ' ' + response.status + ' ' + response.data;
        });

        return promise;
    };

    // delete the data from database
    thispdService.Remove = function (autoId) {
        var promise = $http({
            method: 'DELETE',
            url: '/api/PersonalDetails/' + autoId
        })
        .then(function (response) {
            // return "Deleted";
            return response.statusText + ' ' + response.status + ' ' + response.data;
        },
        function (response) {
            return response.statusText + ' ' + response.status + ' ' + response.data;
        });

        return promise;
    };

    return thispdService;
});


// ===================================================
// CRUD - Create respective controllers for each view
// ===================================================
// pd - Index - PersonalDetails controller
app.controller("pdController", function ($scope, pdService, $rootScope) {
    $scope.Title = "Personal Details List";
    $rootScope.loading = true;
    $scope.GetPersonalDetails = pdService.GetAll().then(function (d) {
        $scope.PersonalDetails = d;
        $rootScope.loading = false;
    });
});

// pd - Create - PersonalDetails controller
app.controller("pdControllerCreate", function ($scope, pdService, $rootScope) {
    $scope.Title = "Create - Personal Details";

    $scope.Create = function () {
        $rootScope.loading = true;
        pdService.Insert($scope.firstName, $scope.lastName, $scope.age, $scope.active).then(function (d) {
            $scope.CreateMessage = d;
            $rootScope.loading = false;
        });
    };
});

// pd - Edit - PersonalDetails controller
app.controller("pdControllerEdit", function ($scope, pdService, $routeParams, $rootScope) {
    $scope.Title = "Edit - Personal Details";
    $scope.RecordToEdit = $routeParams.id; // get the parameter

    $rootScope.loading = true;
    $scope.GetSingle = pdService.GetSingle($routeParams.id).then(function (d) {
        $scope.firstName = d.FirstName;
        $scope.lastName = d.LastName;
        $scope.age = d.Age;
        $scope.active = d.Active;
        $rootScope.loading = false;
    });

    $scope.Update = function () {
        $rootScope.loading = true;
        pdService.Update($scope.RecordToEdit, $scope.firstName, $scope.lastName, $scope.age, $scope.active).then(function (d) {
            $scope.UpdateMessage = d;
            $rootScope.loading = false;
        });
    };
});

// pd - Details/Delete - PersonalDetails controller
app.controller("pdControllerDetails", function ($scope, pdService, $routeParams, $rootScope) {
    $scope.Title = "Details - Personal Details";
    $rootScope.loading = true;
    $scope.GetSingle = pdService.GetSingle($routeParams.id).then(function (d) {
        $scope.Person = d;
        $rootScope.loading = false;
    });

    $scope.Delete = function () {
        var v = confirm('Are you sure to delete?');
        if (v) {
            $rootScope.loading = true;
            pdService.Remove($routeParams.id).then(function (d) {
                $scope.DeleteMessage = d;
                $rootScope.loading = false;
            });
        }
    };
});


// ===================================================
// Create other controllers for respective pages
// ===================================================
// default controller
app.controller("spaController", function ($scope, $rootScope) {
    $scope.Title = "Single Page Application";
    $rootScope.loading = false;
});

// Home controller
app.controller("HomeController", function ($scope) {
    $scope.Title = "Single Page Application (spa)";
});

// About controller
app.controller("AboutController", function ($scope) {
    $scope.Title = "About us";
});

// Contact controller
app.controller("ContactController", function ($scope) {
    $scope.Title = "Contact us";
});

// Contact controller
app.controller("pdControllerError", function ($scope) {
    $scope.Title = "Redirect Error";
});