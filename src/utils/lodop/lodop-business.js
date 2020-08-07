import common from '@/utils/common.js'
import {getLodop} from './LodopFuncs.js'
import {
    Message,
    MessageBox
} from 'element-ui'

/**
 * 通用打印方法-不支持表格
 * 
 * @param printConfigBean:  数据来源  主要是 printConfigBean.config  printConfigBean.itemList
 * @param pageNumber: 打印份数
 * @param isPreview:  预览打印
 * @param strPName:   打印目标-机器
 * 
 */
const commonPrint = function(printConfigBean, pageNumber,isPreview,strPName) {
	let config = printConfigBean.config;// 打印配置信息
	let itemList = printConfigBean.itemList;// 打印项  key value 都在 itemList 每个列表里面
	if (common.isBlank(printConfigBean) || common.isBlank(config) || common.isBlank(itemList) || itemList.length == 0) {
		Message('无法获取需要打印的信息');
		return;
	}
	
	let taskName = getObjectFieldValue(config, 'bizName', '打印任务');// 任务名称
	if (common.isBlank(pageNumber) || pageNumber <= 0)
		pageNumber = 1;

	// 处理打印项
	// var printItmes = parsePrintItem(itemList, dataSource);
	let printItmes = itemList;
	if (common.isBlank(printItmes) || printItmes.length == 0) {
		Message('无法获取需要打印的信息');
		return;
	}
	
	LODOP = getLodop();
	LODOP.PRINT_INITA(convertPrintUnit(config.topOffset), convertPrintUnit(config.leftOffset), convertPrintUnit(config.editableWidth), convertPrintUnit(config.editableHeight), taskName);
	LODOP.SET_PRINT_PAGESIZE(config.intOrient, convertPrintUnit(config.pageWidth), convertPrintUnit(config.pageHeight), config.pageName);
	if (common.isNotBlank(config.bkimgName) && common.isNotBlank(config.bkimgPrint) && config.bkimgPrint == 1) {
		// 存在打印预览背景图片
		let imageFullPath = getRootPath() + '/image/' + config.bkimgName;
		LODOP.ADD_PRINT_SETUP_BKIMG('<img border="0" src="' + imageFullPath + '">');
		LODOP.SET_SHOW_MODE("BKIMG_WIDTH", convertPrintUnit(config.bkimgWidth));
		LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", convertPrintUnit(config.bkimgHeight));
		LODOP.SET_SHOW_MODE("BKIMG_TOP", convertPrintUnit(config.bkimgTop));	
		LODOP.SET_SHOW_MODE("BKIMG_LEFT", convertPrintUnit(config.bkimgLeft));
		LODOP.SET_SHOW_MODE('BKIMG_IN_PREVIEW', config.bkimgPrint);
		LODOP.SET_SHOW_MODE("BKIMG_PRINT",0);
	}
	LODOP.SET_SHOW_MODE("NP_NO_RESULT", true);// 解决谷歌浏览器长时间无反应是提示弹出框的问题
	LODOP.SET_PRINT_COPIES(pageNumber);// 打印页数
    for (let i = 0;i < printItmes.length; i++) {
		let item = printItmes[i];
		LODOP.SET_PRINT_STYLE('FontSize', item.fontSize);
		LODOP.SET_PRINT_STYLE('Bold', item.fontBold);
		let itemWidth = item.itemWidth;
        let itemHeight = item.itemHeight;
        let topOffset = item.topOffset;
        let leftOffset = item.leftOffset;
         // TODO 不知干啥用
        if(common.isNotBlank(item.angle) && item.angle > 0){
			// 旋转打印
            if(item.angle == 90 || item.angle==270){
                itemWidth = item.itemHeight;
                itemHeight = item.itemWidth;
                topOffset = topOffset + (item.itemHeight-item.itemWidth) / 2
                leftOffset = leftOffset + (item.itemWidth-item.itemHeight) / 2
            }
		}

        if(item.itemType == "91"){
			// 打印条形码
            LODOP.ADD_PRINT_BARCODE(convertPrintUnit(topOffset), convertPrintUnit(leftOffset), convertPrintUnit(itemWidth), convertPrintUnit(itemHeight),"128B", item.fieldValue);
        }else if(item.itemType=="92"){
			// 打印二维码 
            LODOP.ADD_PRINT_BARCODE(convertPrintUnit(topOffset), convertPrintUnit(leftOffset), convertPrintUnit(itemWidth), convertPrintUnit(itemHeight),"QRCode", item.fieldValue);
		}else{
			// 默认打印文本
            LODOP.ADD_PRINT_TEXT(convertPrintUnit(topOffset), convertPrintUnit(leftOffset), convertPrintUnit(itemWidth), convertPrintUnit(itemHeight), item.fieldValue);
		}

		if(common.isNotBlank(item.angle) && item.angle>0){
            LODOP.SET_PRINT_STYLEA(0,"Angle",-item.angle);
		}
	}
    // if(common.isNotBlank(strPName)){
    // 	LODOP.SET_PRINTER_INDEXA(strPName);
	// }
    // if(common.isBlank(isPreview) || isPreview){
	// 	// 预览打印
    //     LODOP.PREVIEW();
    // }else{
    //     LODOP.PRINT();
	// }
	doPrint(LODOP,isPreview,strPName);

}
/**
 * 最终执行打印方法
 * @param  LODOP
 * @param isPreview:  预览打印
 * @param strPName:   打印目标-机器
 * 
 */
const doPrint = function(LODOP,isPreview,strPName) {
    if(common.isNotBlank(strPName)){
    	LODOP.SET_PRINTER_INDEXA(strPName);
	}
	if(common.isBlank(isPreview) || isPreview){
		// 预览打印
        LODOP.PREVIEW();
    }else{
        LODOP.PRINT();
    }
}
/** 获取任务名称 */
const getObjectFieldValue = function(object, field, defaultVale) {
	let fieldValue = undefined;
	if(field.indexOf('.') > 0) {
		let subFields = field.split('.');
		let subObject = undefined;
		for(let i = 0; i < subFields.length - 1; i++) {
			if (i == 0) {
				subObject = object[subFields[i]];
			} else {
				subObject = subObject[subFields[i]];
			}
			if (common.isBlank(subObject) || typeof(subObject) != 'object')
				break;
		}
		if (!common.isBlank(subObject)) 
			fieldValue = subObject[subFields[subFields.length - 1]];
	} else {
		fieldValue = object[field];
	}
	if (common.isBlank(fieldValue) && !common.isBlank(defaultVale))
		return defaultVale;
	return fieldValue;
}

/**
 * 
 *获取电脑所有打印设备列表 
 * 
 */
const  queryPrintDevices = function (){
	const LODOP = getLodop();
	if(common.isBlank(LODOP)){
		Message({"type":"success", message: "未加载到打印插件，请先安装插件信息"});   
		return undefined;
	}
	let printNames = [];
	let count = LODOP.GET_PRINTER_COUNT();
	if(common.isBlank(count) || count < 0){
		Message({"type":"success", message: "未加载到打印驱动，请先安装驱动以后重启电脑"});   
		return undefined;
	}
	for(let i = 0; i< count;i++){
		let temps = {};
		let printerName = LODOP.GET_PRINTER_NAME(i);//获取 i 号设备的打印机名称。
		temps.printerName = printerName;
		temps.printerSerialNum = i+"";
		printNames.push(temps);
	}
	return printNames;
}

/**
 * 
 * 校验打印设备是否存在
 * @param deviceName  打印设备
 * 
 */
const checkPrintDevice = function(printerName){
	var isExistDevice = false;
    var printNames = queryPrintDevices();
    for(let i in printNames){
        var temps = printNames[i];
        if(temps.printerName == printerName){
           isExistDevice = true;
           break;
        }
    }
    return isExistDevice;
}
/**
 * 转换打印单位，默认为毫米(mm)
 * @param printField
 * @param unit
 */
const convertPrintUnit = function(printField, unit) {
	if (common.isBlank(unit))
		unit = 'mm';
	if (common.isBlank(printField))
		printField = 0;
	return printField + unit;
}
export default {
	commonPrint, //打印方法
	doPrint,// 执行最终打印
	queryPrintDevices, // 查询所有打印机列表
	checkPrintDevice, // 校验是否存在该打印机
}