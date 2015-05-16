'use strict';

angular.module('webApp')
  .controller('CompanyAdminCtrl', function ($scope, tracto, Company, $state, Auth) {
    $scope.tracto = tracto;
    $scope.companies = [];

    $scope.find = function() {
      Company.query(function(companies) {
        $scope.companies = companies;
      }, $scope.tracto.handle);
    };
  });
