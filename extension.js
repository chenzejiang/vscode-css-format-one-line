const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('activate ========================================================');
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		insertCloseTag();
	});
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// 停止插件触发
function deactivate() {}

function insertCloseTag(){
	var editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	var selection = editor.selection;
	// let originalPosition = selection.start; // 开始匹配位置
	var text = editor.document.getText(selection);
	var code = new cssCodeFormat(text);
	var singleLine = code.singleLine();

	editor.edit((editBuilder) => {
		// editBuilder.insert(originalPosition, 'webJ');
		editBuilder.replace(selection, singleLine);
		// vscode.window.showInformationMessage('css格式化单行成功');
	});
}

function cssCodeFormat(_str){
	this.S= function(){
		var code = _str;
		code=code.replace(/(\n|\t|\s)*/ig,'$1');
		code=code.replace(/\n|\t|\s(\{|\}|\,|\:|\;)/ig,'$1');
		code=code.replace(/(\{|\}|\,|\:|\;)\s/ig,'$1');
		return code;
	}
	this.multipleLines=function(){
		var code=this.S();
		code=code.replace(/(\{)/ig,' $1');
		code=code.replace(/(\{|\;)/ig,'$1\n\t');
		code=code.replace(/\t*(\})/ig,'$1\n');
		code=code.replace(/(\*\/)/ig,'$1\n');
		return code;
	}
	this.singleLine=function(){
		var code=this.S();
		code=code.replace(/(\})/ig,'$1\n');
		code=code.replace(/(\*\/)/ig,'$1\n');
		return code;
	}
}

module.exports = {
	activate,
	deactivate
}