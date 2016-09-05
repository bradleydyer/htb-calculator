'use strict';
/**
 * Help To Buy App
 *
 * @author Kris Rybak <kris.rybak@bradleydyer.com>
 */
var htb = angular.module('htbApp', []);

htb.config(['$httpProvider', function($httpProvider) {
    // Add the default X-Requested-With header
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Enable cross domain calls (Used for document uploads)
    $httpProvider.defaults.useXDomain = true;
}]);
