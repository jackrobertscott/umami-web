(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('Auth', Auth);

  Auth.$inject = ['$location', '$rootScope', '$http', 'ResourceUser', '$cookieStore', '$q'];

  function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = User.get();
    }

    var service = {
      login: login,
      logout: logout,
      createUser: createUser,
      changePassword: changePassword,
      getCurrentUser: getCurrentUser,
      isLoggedIn: isLoggedIn,
      isLoggedInAsync: isLoggedInAsync,
      isAdmin: isAdmin,
      getToken: getToken,
      getRole: getRole,
      reloadUser: reloadUser,
      promote: promote,
      demote: demote
    };

    return service;

    function login(user, cb) {
      cb = cb || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).
      success(function(data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get();
        deferred.resolve(data);
        return cb();
      }).
      error(function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    }

    function logout() {
      $cookieStore.remove('token');
      currentUser = {};
    }

    function createUser(user) {
      return User.save(user, function(data) {
        $cookieStore.put('token', data.token);
        currentUser = User.get();
      }, function() {
        this.logout();
      }.bind(this)).$promise;
    }

    function changePassword(oldPassword, newPassword) {
      return User.changePassword({ id: currentUser._id }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }).$promise;
    }

    function getCurrentUser() {
      return currentUser;
    }

    function isLoggedIn() {
      return currentUser.hasOwnProperty('role');
    }

    function isLoggedInAsync(cb) {
      if (currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise.then(function() {
          cb(true);
        }).catch(function() {
          cb(false);
        });
      } else if (currentUser.hasOwnProperty('role')) {
        cb(true);
      } else {
        cb(false);
      }
    }

    function isAdmin() {
      return currentUser.role === 'admin';
    }

    function getToken() {
      return $cookieStore.get('token');
    }

    function getRole() {
      return currentUser.role;
    }

    function reloadUser() {
      if ($cookieStore.get('token')) {
        currentUser = User.get();
      }
      return currentUser;
    }

    function promote(role, user) {
      user = user || currentUser;
      return User.promote({ id: user._id }, {
        role: role
      }).$promise;
    }

    function demote(role, user) {
      user = user || currentUser;
      return User.demote({ id: user._id }, {
        role: role
      }).$promise;
    }
  }
})();
