var fs = require('fs'); // appel au module qui opermet d'écriture du XML
var builder = require('xmlbuilder');
var uuid1 = require('uuid/v4'); // appel du module de génération uuid


 //créer un fichier JSON au lieu d'utiliser Builder.create afin de mieux manipuler le avec xml2js
 //ce sera plus facile pour faire des boucles.
var pkl = builder.create('PackingList') // on crée la structure du XML
.att('xmlns', 'http://www.smpte-ra.org/schemas/429-8/2007/PKL')
  .ele('Id','urn:uuid:' + uuid1())
  .up()
  .ele('AnnotationText')
  .up()
  .ele('IssueDate')
  .up()
  .ele('Issuer')
  .up()
  .ele('Creator')
  .up()
  .ele('AssetList')
  .ele('Asset')
  .end({ pretty: true});
 
// console.log(pkl);
// console.log(uuid1());

fs.writeFile('PKL_'+ uuid1() +'.xml', pkl, function(err){ //on écrit le Xml produit dans un fichier
	if(err)throw err;
	console.log('PKL file is saved !');
});