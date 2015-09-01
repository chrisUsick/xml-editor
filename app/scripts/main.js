'use strict'
/**
 * Main application class
 */
class XmlEditor {
	/**
	 * computed property returning the XML document based on the xml text
	 * @return {XMLDocument} XML document based on the xml text
	 */
	get xml () {
		let domParser = new DOMParser();
		let ace = $('#xml juicy-ace-editor')[0];
		return domParser.parseFromString(ace.editor.getValue(), 'text/xml');
	}

	/**
	 * computed property: XML document based on the XSLT text
	 * @return {XMLDocument} XSLT document
	 */		
	get xslt () {
		let domParser = new DOMParser();
		let ace = $('#xslt juicy-ace-editor')[0];
		return domParser.parseFromString(ace.editor.getValue(), 'text/xml');
	}

	/**
	 * instantiate event listeners
	 * @return {XmlEditor} return new XmlEditor object
	 */
	constructor (){
		this.xmlFile = null;
		this.xsltFile = null;
		self = this;

		// upload file 
		$('input[type=file]').on('change', function (ev) {
			let file = ev.target.files[0];
			let parents = $(ev.target).parents();
			console.log('input change', ev.target, parents);
			self.loadFile(file, parents.filter('.editor').find('juicy-ace-editor'));
			// keep reference to the file object
			if (parents.filter('.editor').attr('id')=='xml'){
				self.xmlFile = file;
			} else {
				self.xsltFile = file;
			}
		});

		// compile
		$('#compile').on('click', function (ev){
			let xsltProcessor = new XSLTProcessor();
		  xsltProcessor.importStylesheet(self.xslt);
		  const resultDocument = xsltProcessor.transformToDocument(self.xml, document);
		  let serializer = new XMLSerializer;
		  $('#output juicy-ace-editor')[0].editor.setValue(vkbeautify.xml(serializer.serializeToString(resultDocument)),-1);	
		});

		// download files
		$('juicy-ace-editor').each(function(i, ace){
			ace.editor.on('input', function() {
				let parents = $(ace).parents();
				let anchor = parents.filter('.editor').find('.download')[0];
				// see http://stackoverflow.com/a/18197341 for explanation
				let text = encodeURIComponent(ace.editor.getValue());
				anchor.setAttribute('href', `data:text/plain;charset=utf-8,${text}`);
				var fileName;
				if (i == 0) fileName = self.xmlFile.name;
				else if (i == 1) fileName = self.xsltFile.name;
				else fileName = 'output.html';
				anchor.setAttribute('download', fileName);
			})
		})
	}


	/**
	 * read a file as text and put it in an editor
	 * @param  {File} file     file to read
	 * @param  {JQuery<juicy-ace-editor>} jquery object containing juicy-ace-editor 
	 * @return {void}          
	 */
	loadFile (file, textarea) {
		let reader = new FileReader();
		let self = this;
		reader.onload = function(text){
			console.log(textarea);
			textarea[0].editor.setValue( vkbeautify.xml(text.target.result), -1);
		}
		reader.readAsText(file);
	}
}

$(function () {
	
	// on file load
	let xmlEditor = new XmlEditor();

	
})