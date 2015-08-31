'use strict'

class XmlEditor {

	get xml () {
		let domParser = new DOMParser();
		return domParser.parseFromString(this.xmlText, 'text/xml');
	}

	get xslt () {
		let domParser = new DOMParser();
		return domParser.parseFromString(this.xsltText, 'text/xml');
	}

	constructor (){
		this.xmlText = '';
		this.xsltText = '';
		self = this;
		$('input[type=file]').on('change', function (ev) {
			let file = ev.target.files[0];
			let parent = $(ev.target).parent();
			self.loadFile(file, parent[0].id, parent.find('form juicy-ace-editor'));
			
		});

		// compile
		$('#compile').on('click', function (ev){
			let xsltProcessor = new XSLTProcessor();
		  xsltProcessor.importStylesheet(self.xslt);
		  const resultDocument = xsltProcessor.transformToDocument(self.xml, document);
		  let serializer = new XMLSerializer;
		  $('#output juicy-ace-editor')[0].editor.setValue(vkbeautify.xml(serializer.serializeToString(resultDocument)),-1);	
		});
	}


	loadFile (file, type, textarea) {
		let reader = new FileReader();
		let self = this;
		reader.onload = function(text){
			textarea[0].editor.setValue( vkbeautify.xml(text.target.result), -1);
			self[`${type}Text`] = text.target.result
		}
		reader.readAsText(file);
	}
}

$(function () {
	
	// on file load
	let xmlEditor = new XmlEditor();

	
})