    angular.module('app').controller('dashboardController',[ '$scope', '$http', '$stateParams',
        function($scope, $http, $stateParams) {
            $scope.hatQuery = $stateParams.query || '';
            $scope.queryFlag = $stateParams.query;
            $scope.loaderVariable = false;


            $scope.queryParser = function (keyword) {
                $scope.loaderVariable = true;
                $http({
                    method : "GET",
                    url : '/toQueryParser?keyword=' + $scope.hatQuery + '&pretty=true'
                }).then(function mySucces(response) {
                    $scope.pageFlag = true;
                    $scope.loaderVariable = false;
                    $scope.elasticQueryParser = response.data.hits.hits;
                    $scope.totalPages = response.data.hits.total;
                }, function myError(response) {
                    $scope.pageFlag = true;
                    $scope.loaderVariable = false;
                    $scope.elasticQueryParser = response;
                });

            };

            if($scope.queryFlag) {
                $scope.queryParser();
            }
        }
    ]);

