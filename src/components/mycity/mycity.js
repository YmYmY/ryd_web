export default {
    name: 'mycity',
    props: ["selectType", "disabled", "placeholder"],
    data() {
        return {
            selectAreaType: 4,
            areaValue: "",
            selectArea: false,
            tabShowIndex: 1,
            province: [],
            cityData: [],
            districtData: [],
            streetData: [],
            chooseProvinceName: "",
            chooseCityName: "",
            chooseDistrictName: "",
            chooseStreetName: "",
            chooseProvinceId: "",
            chooseCityId: "",
            chooseDistrictId: "",
            chooseStreetId: ""
        }
    },
    mounted() {
        this.getProvince();
        if (this.common.isNotBlank(this.selectType)) {
            this.selectAreaType = this.selectType
        }
    },
    methods: {
        // 初始化数据
        async initData(provinceId, cityId, districtId, streetId) {
            let province = [];
            let citys = [];
            let district = [];
            let street = [];
            //初始化省
            if (this.common.isNotBlank(provinceId)) {
                province = await this.getProvince();
                for (let el of province) {
                    if (el.id == provinceId) {
                        citys = await this.selectProvince(el.id, el.name);
                        break;
                    }
                }
            } else {
                return;
            }
            // 初始化市
            if (this.common.isNotBlank(cityId)) {
                for (let el of citys) {
                    if (el.id == cityId) {
                        district = await this.selectCity(el.id, el.name);
                        break;
                    }
                }
            } else {
                return;
            }
            // 初始化区
            if (this.common.isNotBlank(districtId)) {
                for (let el of district) {
                    if (el.id == districtId) {
                        street = await this.selectDistrict(el.id, el.name);
                        break;
                    }
                }
            } else {
                return;
            }
            // 初始化街道
            if (this.common.isNotBlank(streetId)) {
                for (let el of street) {
                    if (el.id == streetId) {
                        this.selectStreet(el.id, el.name);
                        break;
                    }
                }
            } else {
                return;
            }

        },
        cleanData() {
            this.areaValue = '';
            this.chooseProvinceId = '';
            this.chooseProvinceName = '';
            this.chooseCityName = "";
            this.chooseCityId = "";
            this.chooseDistrictName = "";
            this.chooseDistrictId = "";
            this.chooseStreetName = "";
            this.chooseStreetId = "";
        },
        //获取省数据
        async getProvince() {
            let {
                items
            } = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectProvince", "");
            this.province = items;
            return items;
        },
        //创建地市数据
        async getCitys(provinceId) {
            let {
                items
            } = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectCity&provinceId=" + provinceId, "");
            this.cityData = items;
            return items;
        },
        //获取县区数据
        async getDistrict(cityId) {
            let {
                items
            } = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectDistrict&cityId=" + cityId, "");
            this.districtData = items;
            return items;
        },
        async getStreet(districtId) {
            let {
                items
            } = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectStreet&districtId=" + districtId, "");
            this.streetData = items;
            return items;
        },
        async selectProvince(id, name) {
            this.chooseProvinceId = id;
            this.chooseProvinceName = name;
            this.areaValue = name;
            let citys = await this.getCitys(id);
            this.changeTab("2");
            this.chooseCityName = ""
            this.chooseCityId = ""
            this.chooseDistrictName = ""
            this.chooseDistrictId = ""
            this.chooseStreetName = ""
            this.chooseStreetId = ""
            if (this.selectAreaType == 1){
                this.selectArea = false;
                this.$emit('selectCallback',this.getData());
            };
            return citys;
        },
        async selectCity(id, name) {
            this.chooseCityName = name
            this.chooseCityId = id
            this.areaValue = this.chooseProvinceName + name;
            let district = await this.getDistrict(id);
            this.changeTab("3");
            this.chooseDistrictName = ""
            this.chooseDistrictId = ""
            this.chooseStreetName = ""
            this.chooseStreetId = ""
            if (this.selectAreaType == 2){
                this.selectArea = false;
                this.$emit('selectCallback',this.getData());
            };
            return district;
        },
        async selectDistrict(id, name) {
            this.chooseDistrictName = name
            this.chooseDistrictId = id
            this.areaValue = this.chooseProvinceName + this.chooseCityName + name;
            let street = await this.getStreet(id);
            this.changeTab("4");
            this.chooseStreetName = ""
            this.chooseStreetId = ""
            if (this.selectAreaType == 3){
                this.selectArea = false;
                this.$emit('selectCallback',this.getData());
            };
            return street;
        },
        selectStreet(id, name) {
            this.chooseStreetName = name
            this.chooseStreetId = id
            this.areaValue = this.chooseProvinceName + this.chooseCityName + this.chooseDistrictName + name;
            this.selectArea = false;
            this.$emit('selectCallback',this.getData());
        },
        changeTab(index) {
            this.tabShowIndex = index;
        },
        showSelectArea() {
            this.changeTab("1");
            this.chooseProvinceId = "";
            this.chooseCityName = ""
            this.chooseCityId = ""
            this.chooseDistrictName = ""
            this.chooseDistrictId = ""
            this.chooseStreetName = ""
            this.chooseStreetId = ""
            this.selectArea = true;
        },
        close() {
            this.selectArea = false;
            this.$emit('selectCallback',this.getData());
        },
        getData() {
            return {
                ProvinceName: this.chooseProvinceName,
                CityName: this.chooseCityName,
                DistrictName: this.chooseDistrictName,
                StreetName: this.chooseStreetName,
                ProvinceId: this.chooseProvinceId,
                CityId: this.chooseCityId,
                DistrictId: this.chooseDistrictId,
                StreetId: this.chooseStreetId,
            }
        }
    },
    watch: {
        selectType() {
            this.selectAreaType = this.selectType;
        }
    }
}