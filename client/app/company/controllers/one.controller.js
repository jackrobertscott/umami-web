(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneCompanyCtrl', OneCompanyCtrl);

  OneCompanyCtrl.$inject = ['dataCompany', 'tracto', '$state'];

  function OneCompanyCtrl(dataCompany, tracto, $state) {
    var vm = this;

    vm.item = {};
    vm.tracto = tracto;
    vm.submitted = false;
    vm.findOne = findOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function findOne(id) {
      vm.tracto.reset();
      dataCompany.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(form) {
      vm.tracto.reset();
      if (form.$valid) {
        invalid();
      } else {
        dataCompany.create(vm.item).then(function(item) {
          $state.go('main');
        }).catch(vm.tracto.handle);
      }
    }

    function update(form) {
      vm.tracto.reset();
      if (form.$valid) {
        invalid();
      } else {
        return dataCompany.update(vm.item).then(function(item) {
          vm.tracto.good = 'Successfully updated';
        }).catch(vm.tracto.handle);
      }
    }

    function remove(form) {
      vm.tracto.reset();
      if (form.$valid) {
        invalid();
      } else {
        dataCompany.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('main');
        }).catch(vm.tracto.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.tracto.bad = 'Form is invalid';
    }
  }
})();
