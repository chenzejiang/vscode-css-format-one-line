const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let cssFormatSingleLine = vscode.commands.registerCommand('extension.cssFormatSingleLine', function () {
		cssFormatSingleLineFun();
	});
	let cssFormatMultipleLine = vscode.commands.registerCommand('extension.cssFormatMultipleLine', function () {
		cssFormatMultipleLineFun();
	});
	context.subscriptions.push(cssFormatSingleLine);
	context.subscriptions.push(cssFormatMultipleLine);
}
exports.activate = activate;

function deactivate() {}

function cssFormatSingleLineFun(){
	var editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	var selection = editor.selection;
	var text = editor.document.getText(selection);
	var code = new cssCodeFormat(text);
	var singleLine = code.singleLine();

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, singleLine);
		// vscode.window.showInformationMessage('css格式化单行成功');
	});
}

function cssFormatMultipleLineFun(){
	var editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}
	var selection = editor.selection;
	var text = editor.document.getText(selection);
	var code = new cssCodeFormat(text);
	var multipleLine = code.multipleLine();

	editor.edit((editBuilder) => {
		editBuilder.replace(selection, multipleLine);
		// vscode.window.showInformationMessage('css格式化多行成功');
	});
}


function cssCodeFormat(_str) {
	this.S = function(){
		var code = _str;
		code=code.replace(/(\n|\t|\s)*/ig,'$1');
		code=code.replace(/\n|\t|\s(\{|\}|\,|\:|\;)/ig,'$1');
		code=code.replace(/(\{|\}|\,|\:|\;)\s/ig,'$1');
		return code;
	}
	this.multipleLine = function() {
		var code=this.S();
		code=code.replace(/(\{)/ig,' $1');
		code=code.replace(/(\{|\;)/ig,'$1\n\t');
		code=code.replace(/\t*(\})/ig,'$1\n');
		code=code.replace(/(\*\/)/ig,'$1\n');
		return code;
	}
	this.singleLine = function(){
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