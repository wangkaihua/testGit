/**
 * Created by huangsong on 2016/4/11.
 */
loginModule.controller('loginCtrl',function($scope,$state,$log,$ionicLoading,$http){

  $scope.loginData = {
    username: window.localStorage.empno,
    password: window.localStorage.password
  };
  $scope.checkbox_savePwd = false;//保存密码默认为false
  var passwordString = window.localStorage.password;
  $scope.password = passwordString;
  if ($scope.loginData.password !== "") { //如果下一次密码输入框的值不为空，选中记住密码选框
    $scope.checkbox_savePwd = true;
  }

  $scope.savePassword = function () {
    $scope.checkbox_savePwd = !$scope.checkbox_savePwd;//取反 记住密码框的状态
    console.log("此时密码框的状态为 :", angular.toJson($scope.checkbox_savePwd));
  }
  $scope.doLogin = function(){
    $log.debug("用户名", angular.toJson($scope.loginData.username, true))
    window.localStorage.empno = $scope.loginData.username;
    if($scope.checkbox_savePwd){
      window.localStorage.password = $scope.loginData.password;
    }else{
      window.localStorage.password = "";
    }
    $ionicLoading.show({
      template:'loading...'
    });
    var param = {
      "userName":$scope.loginData.username,
      "password":$scope.loginData.password
    }
    $ionicLoading.hide();
    var url="http://hlm:port/tknUserToken/login";
    $http.post(url,param).success(function(response){
    if(response){
      $log.debug("response =",angular.toJson(response));
    }
    });
    $state.go('tab.main');


  };
});
