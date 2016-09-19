/**
 * Created by huangsong on 2016/4/11.
 */

mainModule.controller('mainCtrl', function($scope,$ionicSlideBoxDelegate,$log) {
  $scope.allImages = ['img/main/lunbo1.png','http://img.iyookee.cn/20150714/20150714_172952_955_22.jpg','http://img.iyookee.cn/20150619/20150619_100607_883_670.png'];
  $scope.picHeight = {
    height: (window.innerHeight * 0.32 + 'px')
  };
  $log.debug($scope.picHeight)

  $scope.partHeight = {
    height: (window.screen.height * 0.6 - 44 + 'px')
  }
  //图片轮播
  //$ionicSlideBoxDelegate.$getByHandle("slideimgs").update();
  //$ionicSlideBoxDelegate.$getByHandle("slideimgs").loop(true);
  $scope.slideHasChanged = function($index){
    //alert($index);
    //$log.debug("轮播第几页",$index );
    $scope.circleNum = $index;
  };
  $scope.message = [{
    message_time:"2015-10-10",
    order_num:"WH9779696",
    order_status:"已经发货成功"
  },{
    message_time:"2015-11-10",
    order_num:"SO9779696",
    order_status:"已经审核成功"
  },{
    message_time:"2015-11-10",
    order_num:"SO97796",
    order_status:"需要审核"
  }
  ];

});
