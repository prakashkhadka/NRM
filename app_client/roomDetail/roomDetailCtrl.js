/*
 * Created by Prakash Khadka
 * contact me on ocnprakash@gmail.com
 * copyright: sproutTech Australia
 */
(function () {
    angular
            .module("roomApp")
            //.controller("roomDetailCtrl", roomDetailCtrl);
            .controller("roomDetailCtrl", ['$http', '$routeParams', '$scope', 'roomData', '$anchorScroll', '$location', '$timeout', roomDetailCtrl]);

    //roomDetailCtrl.$inject = ['$http', '$routeParams', '$scope', 'roomData', '$anchorScroll'];
    function roomDetailCtrl($http, $routeParams, $scope, roomData, $anchorScroll, $location, $timeout) {
        $anchorScroll();
        //$scope.currentPath = $location.path();
        $scope.roomid = $routeParams.roomid;
        roomData.roomDetail($scope.roomid)
                .success(function (data) {
                    $scope.oneRoomDetails = data;
                    $scope.ORD = $scope.oneRoomDetails;
                    //console.log($scope.ORD);
                    //console.log("images length is : ");
                    //console.log($scope.ORD.images);
                    //console.log($scope.ORD.images.length);
                    //console.log("First image is : ");
                    //console.log($scope.ORD.images[0]);
                })
                .error(function (e) {
                    //console.log(e);
                });

        $scope.sendEmailToOwner = function (emailToOwner) {
            var ownerEmail = $scope.ORD.email;
            var roomId = $scope.ORD._id;
            //console.log("Owner email is : " + ownerEmail);
            var emailData = {
                emailToOwner: emailToOwner,
                roomId: roomId,
                ownerEmail: ownerEmail
            };
            //console.log(emailData);
            $http({
                method: 'POST',
                url: "/api/sendEmailToOwner",
                data: emailData
            }).then(function (response) {
                //console.log("Success : " + response.data);
                $scope.isSent=true;
                $scope.feedbackMessage="Your message is sent to the owner.";
                $('#feedback-modal').modal('show');
                $timeout(function(){
                    $('.modal-backdrop').remove();
                    $location.path("/");
                },2000);
            }, function (response){
                //console.log("Error: " + response.data);
            });
        };
    }
})();