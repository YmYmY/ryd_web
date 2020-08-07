/*
    treedata    树控件数据对象
    label       节点展示名称对应的字段
*/
export default {
    name: 'mapDialog',
    props:["map",'isShowMap','mapPoint'],
    data() {
        return {            
            mapObj:{    //地图信息
                center: {lng: 116.404, lat: 39.915},
                zoom: 15
            },
            isShow:false,    //是否展示地图弹窗
            mapText:"",     //地图检索
        }
    },
    mounted(){
        
    },
    methods:{
        mapHandler({BMap, map}){
            this.$nextTick(()=>{
                this.BMap = BMap;
                this.map = map;
                this.initMap(BMap,map);
            })
        },
        initMap(BMap,map){
            let _this = this;
            map.enableScrollWheelZoom();    //启动鼠标滚轮操作
            //根据入参定位到当前位置
            let mapPoint = this.mapPoint;
            if(this.common.isNotBlank(mapPoint)){
                this.mapText = mapPoint.mapText;
                let pp = {lat:mapPoint.lat,lng:mapPoint.lng};
                map.clearOverlays();    //清除地图上所有覆盖物
                map.centerAndZoom(pp, 15);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            //获取当前位置
            this.getLocation(BMap,map)
            // 百度地图API功能
            function G(id) {
                return document.getElementById(id);
            }
            const ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                {"input" : "suggestId"
                ,"location" : map
            });
            ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
                let str = "";
                let _value = e.fromitem.value;
                let value = "";
                if (e.fromitem.index > -1) {
                    value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                }    
                str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
                
                value = "";
                if (e.toitem.index > -1) {
                    _value = e.toitem.value;
                    value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                }    
                str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                G("searchResultPanel").innerHTML = str;
            });

            let myValue;
            ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
                let _value = e.item.value;
                myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
                _this.mapText = myValue;
                G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
                _this.setPlace(map,BMap,myValue);
            });
        },
        setPlace(map,BMap,address){
            let _this = this;
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                let res = local.getResults().getPoi(0);
                _this.mapInfo = {
                    address:res.address,
                    lng:res.point.lng,
                    lat:res.point.lat,
                }
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 15);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            let local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(address);
        },
        getLocation(BMap,map){
            let _this = this;
            // const geolocation = new BMap.Geolocation();
            const gc = new BMap.Geocoder();//创建地理编码器            
            map.addEventListener("click",function(e){
                let point = new BMap.Point(e.point.lng,e.point.lat);
                gc.getLocation(point,function(res){
                    _this.mapText = res.address;
                    _this.mapInfo = {
                        address:res.address,
                        lng:res.point.lng,
                        lat:res.point.lat,
                    }
                });
            });
            // 开启SDK辅助定位
            // geolocation.enableSDKLocation();
            // geolocation.getCurrentPosition(function(r){
            //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //         let mk = new BMap.Marker(r.point);
            //         map.addOverlay(mk);
            //         map.panTo(r.point);//移动地图中心点
        
            //         gc.getLocation(r.point, function(rs){    
            //             let addComp = rs.addressComponents;
            //             console.log(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);    
            //         });  

            //     }
            //     else {
            //         alert('failed'+this.getStatus());
            //     }        
            // });
        },
        cleanMap(){
            this.mapText = "";
        },
        sureMapSite(){
            this.mapInfo.mapText = this.mapText;
            this.$emit("sureCallback",this.mapInfo)
            this.cancelMap();
        },
        cancelMap(){
            this.cleanMap();
            this.isShow = false;
            this.$emit("hideMapBack",this.mapInfo)            
        },
    },
    watch:{
        isShowMap:{
            handler(n,o){
                if(n){
                    this.isShow = true;
                }
            }
        }
    }
}