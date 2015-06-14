(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeCtrl', ThemeCtrl);

  ThemeCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeCtrl($state, Auth, menu) {
    var vm = this;

    vm.isActive = isActive;
    vm.isBeforeOrEqual = Auth.isBeforeOrEqual;
    vm.isAfterOrEqual = Auth.isAfterOrEqual;
    vm.menu = [];

    ////////////

    activate();

    function activate() {
      vm.menu = createMenu();
    }

    ////////////

    function isActive(route, exact) {
      if (exact) {
        return $state.is(route);
      } else {
        return $state.includes(route);
      }
    }

    function createMenu() {
      menu.reset();
      menu.addItem({
        label: 'Profile',
        minRole: 'user',
        direction: 'app.user',
        data: {
          glyphicon: 'user'
        },
        children: [{
          label: 'Settings',
          direction: 'app.user.settings'
        }, {
          label: 'Change Password',
          direction: 'app.user.password'
        }, {
          label: 'New Vehicle',
          direction: 'app.user.register'
        }]
      });
      menu.addItem({
        label: 'Company',
        minRole: 'company',
        direction: 'app.company',
        data: {
          glyphicon: 'briefcase'
        },
        children: [{
          label: 'Settings',
          direction: 'app.company.settings'
        }]
      });
      menu.addItem({
        label: 'Locations',
        minRole: 'company',
        direction: 'app.location',
        data: {
          glyphicon: 'globe'
        },
        children: [{
          label: 'Register',
          direction: 'app.location.register'
        }]
      });
      menu.addItem({
        label: 'Infringements',
        minRole: 'company',
        direction: 'app.infringement',
        data: {
          glyphicon: 'exclamation-sign'
        },
        children: [{
          label: 'Register',
          direction: 'app.infringement.register',
        }]
      });
      menu.addItem({
        label: 'Sessions',
        minRole: 'user',
        direction: 'app.session',
        data: {
          glyphicon: 'calendar'
        }
      });
      menu.addItem({
        label: 'Inspections',
        minRole: 'inspector',
        direction: 'app.inspection',
        data: {
          glyphicon: 'eye-open'
        }
      });
      menu.addItem({
        label: 'Logout',
        direction: 'logout',
        minRole: 'user',
        data: {
          glyphicon: 'off'
        }
      });
      return menu.getItems();
    }
  }
})();
