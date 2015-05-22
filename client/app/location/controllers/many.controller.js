(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyLocationsCtrl', ManyLocationsCtrl);

  ManyLocationsCtrl.$inject = ['dataLocation', 'tracto', 'socket', '$state', 'Auth', 'dataCompany'];

  function ManyLocationsCtrl(dataLocation, tracto, socket, $state, Auth, dataCompany) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFew = getFew;
    vm.toSettings = toSettings;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.tracto.reset();
      dataLocation.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataLocation.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function getFew() {
      dataCompany.getCompanyLocations(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function toSettings(item) {
      $state.go('locationSettings', {
        id: item._id
      });
    }
  }
})();
