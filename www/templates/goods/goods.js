goodsModule.controller('goodsCtrl',
  ['$scope','$state', '$ionicModal','Prompter','$cordovaToast','$cordovaDatePicker',
    function ($scope,$state, $ionicModal,Prompter,$cordovaToast,$cordovaDatePicker) {
      $scope.orderData = {};
      $scope.adit = false;
      $scope.ifWait=false;//初始发货是否等通知
      $scope.good = [];
      //初始化自提选择
      $scope.ifSelf=false;//初始化自提
      $scope.orderData.self_pick= $scope.ifSelf;
      $scope.orderData.ship_notify= $scope.ifWait;
      if ($scope.ifSelf == false) {
        $scope.imgSelfChoose = "img/goods/choose2.png";
      } else {
        $scope.imgSelfChoose = "img/goods/choose1.png";
      }
      if ($scope.ifWait == false) {
        $scope.imgWaitChoose = "img/goods/choose2.png";
      } else {
        $scope.imgWaitChoose = "img/goods/choose1.png";
      }
      $scope.ifchoose = false;//初始化是否选择编辑
      //初始化选择
      if ($scope.ifchoose == false) {
        $scope.imgChoose = "img/goods/nochoose.png";
      } else {
        $scope.imgChoose = "img/goods/choose.png";
      }
      $scope.chooseMetho=function(){
        $scope.ifSelf = !$scope.ifSelf;
        if ($scope.ifSelf == false) {
          $scope.imgSelfChoose = "img/goods/choose2.png";
        } else {
          $scope.imgSelfChoose = "img/goods/choose1.png";
        }
        $scope.orderData.self_pick= $scope.ifSelf;
      };

      $scope.chooseWait=function(){
        $scope.ifWait = !$scope.ifWait;
        if ($scope.ifWait == false) {
          $scope.imgWaitChoose = "img/goods/choose2.png";
        } else {
          $scope.imgWaitChoose = "img/goods/choose1.png";
        }
        $scope.orderData.ship_notify= $scope.ifWait;
      };
      //编辑
      $scope.goAditList = function () {
        console.log($scope.orderData.contractor_number);
        if($scope.orderData.contractor_number!=undefined){
          $scope.adit = true;
        }

      };
      //完成编辑
      $scope.goFinishList = function () {
        $scope.adit = false;
      }
      //选择

      $scope.choose = function () {
        $scope.ifchoose = !$scope.ifchoose;
        if ($scope.ifchoose == false) {
          $scope.imgChoose = "img/goods/nochoose.png";
        } else {
          $scope.imgChoose = "img/goods/choose.png";
        }
      };
      //打开合同选择
      $ionicModal.fromTemplateUrl('templatePage/goods/model/contrack.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (close) {
        $scope.close = close;
      });
      $scope.openContrack = function () {
        $scope.close.show();
      };
     //选择时间
      $scope.chooseDate = function () {
        var options = {
          date: new Date(),
          mode: 'datetime',
          titleText: '请选择时间',
          okText: '确定',
          cancelText: '取消',
          doneButtonLabel: '确认',
          cancelButtonLabel: '取消',
          locale: 'zh_cn',
          androidTheme: window.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
        };
        $cordovaDatePicker.show(options).then(function (date) {
          if (date) {
            if (date > $scope.schedule_item.maxDate) {
              Prompter.showPopup("需求送达时间不能晚于 " + $scope.schedule_item.maxString);
            }else{
              $scope.formData.requireDate = date;
              $scope.formData.requireDateStr = HmsDateFormat.getDateTimeString(date);
            }
          }
        });
      };


      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      $scope.selectContact = function (x) {
        $scope.modal.hide();
        $scope.orderData.contractor_number = x.contractor_number;
        console.log(x);
        console.log($scope.orderData);
        $scope.good = [];
        for (var i = 0; i < $scope.goodList.length; i++) {
          if ($scope.orderData.contractor_number == $scope.goodList[i].contractor_number) {
            console.log($scope.goodList[i]);
            for (var j = 0; j < $scope.goodList[i].good.length; j++) {
              console.log($scope.goodList[i].good[j]);
              var temGood = {
                "item_id": $scope.goodList[i].good[j].item_id,
                "item_desc": $scope.goodList[i].good[j].item_desc,//--描述
                "item_spec": $scope.goodList[i].good[j].item_spec,//--规格,
                "item_width": $scope.goodList[i].good[j].item_width,//--幅宽,
                "item_length": $scope.goodList[i].good[j].item_length,//--长度,
                "item_uom": $scope.goodList[i].good[j].item_uom,//--单位
                "comment": $scope.goodList[i].good[j].comment,//--备注
                "order_qty_unit": $scope.goodList[i].good[j].order_qty_unit,//--件数量
                "order_qty_dun": $scope.goodList[i].good[j].order_qty_dun,//--吨数量
                "item_level": $scope.goodList[i].good[j].item_level,//--等级
                "contractor_qty": $scope.goodList[i].good[j].contractor_qty//合同余量
              }
              $scope.good.push(temGood);
            }
          }
        }
      };
      //提交订单
      $scope.submitOrder = function () {
        $scope.submitData = {
          customer_number:  $scope.orderData.contractor_number,// 客户编码,
          demand_date:  $scope.orderData.demand_date,//需求日期,
          self_pick:  $scope.orderData.self_pick,//自提标记，
          ship_notify:  $scope.orderData.ship_notify,//发货通知标记，
          logistics_id:  $scope.orderData.logistics_id,//收货地址，
          ship_from_loc:  $scope.orderData.ship_from_loc, //发货地，
          order_source: "app",//订单来源，
          comment:  $scope.orderData.comment,//备注，
          items: $scope.good
        };
        console.log($scope.submitData);
        if ($scope.orderData.contractor_number == undefined) {
          console.log(1);
          $cordovaToast.showShortCenter("")
        }else if ($scope.orderData.demand_date == undefined) {
          console.log(1);
          Prompter.showShortCenterToast("需求时间不能为空，请选择！");
        }else if ($scope.orderData.self_pick == undefined) {
          console.log(1);
          Prompter.showShortCenterToast("是否自提不能为空，请选择！");
        }else if ($scope.orderData.ship_notify == undefined) {
          console.log(1);
          Prompter.showShortCenterToast("发货是否通知不能为空，请选择！");
        }else if ($scope.orderData.logistics_id == undefined) {
          $cordovaToast.showShortCenter("发货地址不能为空")
        }else if ($scope.orderData.ship_from_loc == undefined) {
          Prompter.showShortCenterToast("发货地址不能为空，请选择！");
        }else {
          Prompter.showShortCenterToast("提交成功");
        }

      };


      //测试数据
      $scope.contract = [
        {
          contractor_id: 1,
          contractor_number: "210629009"
        },
        {
          contractor_id: 2,
          contractor_number: "2012328747"
        }
      ];
      $scope.goodList = [
        {
          "contractor_id": 1,
          "contractor_number": "210629009",

          "good": [{
            "item_id": "1",
            "item_desc": "金桂白面涂布牛卡纸1",//--描述
            "item_spec": "111",//--规格,
            "item_width": "233",//--幅宽,
            "item_length": "11",//--长度,
            "item_uom": "1",//--单位
            "comment": "嘿嘿",//--备注
            "order_qty_unit": "1",//--件数量
            "order_qty_dun": "2",//--吨数量
            "item_level": "A",//--等级
            "contractor_qty": "12"//合同余量
          },
            {
              "item_id": "2",
              "item_desc": "金桂白面涂布牛卡纸2",//--描述
              "item_spec": "232",//--规格,
              "item_width": "11",//--幅宽,
              "item_length": "120",//--长度,
              "item_uom": "平",//--单位
              "comment": "呵呵",//--备注
              "order_qty_unit": "2",//--件数量
              "order_qty_dun": "1",//--吨数量
              "item_level": "B",//--等级
              "contractor_qty": "100"//合同余量
            }]


        },
        {
          contractor_id: 2,
          contractor_number: "2012328747",

          "good": [{
            "item_id": "1",
            "item_desc": "金桂白面涂布牛卡纸3",//--描述
            "item_spec": "111",//--规格,
            "item_width": "233",//--幅宽,
            "item_length": "11",//--长度,
            "item_uom": "1",//--单位
            "comment": "嘿嘿",//--备注
            "order_qty_unit": "1",//--件数量
            "order_qty_dun": "2",//--吨数量
            "item_level": "A",//--等级
            "contractor_qty": "12"//合同余量
          },
            {
              "item_id": "1",
              "item_desc": "测试纸张",//--描述
              "item_spec": "111",//--规格,
              "item_width": "233",//--幅宽,
              "item_length": "11",//--长度,
              "item_uom": "1",//--单位
              "comment": "嘿嘿",//--备注
              "order_qty_unit": "1",//--件数量
              "order_qty_dun": "2",//--吨数量
              "item_level": "A",//--等级
              "contractor_qty": "12"//合同余量
            }]
        }
      ];
    }]);
