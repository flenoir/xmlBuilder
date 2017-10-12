const fs = require('fs'); // appel au module qui opermet d'écriture du XML
const xml2js = require('xml2js');
const uuid1 = require('uuid/v4'); // appel du module de génération uuid
const issuer = 'Fabien Lenoir';
const creator = 'IMF_Videomenthe_creator';

 //créer un fichier JSON au lieu d'utiliser Builder.create afin de mieux manipuler le avec xml2js
 //ce sera plus facile pour faire des boucles.

const pklFile = {
    "PackingList": {
        "$": {
            "xmlns": "http://www.smpte-ra.org/schemas/429-8/2007/PKL"
        },
        "Id": [
            "urn:uuid:" + uuid1()
        ],
        "AnnotationText": [
            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV"
        ],
        "IssueDate": [
            "2016-09-09T18:32:24-00:00"
        ],
        "Issuer": [
            issuer
        ],
        "Creator": [
            creator
        ],
        "AssetList": [
            {
                "Asset": [
                    {
                        "Id": [
                            "urn:uuid:f8b3b48b-e804-4408-ddd6-303a6d43f566"
                        ],
                        "AnnotationText": [
                            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV_01.mxf"
                        ],
                        "Hash": [
                            "jneiLzYHvlX+s1VZH06NdHs3TU0="
                        ],
                        "Size": [
                            "95063260382"
                        ],
                        "Type": [
                            "application/mxf"
                        ],
                        "OriginalFileName": [
                            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV_01.mxf"
                        ]
                    },
                    {
                        "Id": [
                            "urn:uuid:2c60c799-88c7-4d63-7bf3-daf44d43fc1b"
                        ],
                        "AnnotationText": [
                            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV_01_EN_51_A.mxf"
                        ],
                        "Hash": [
                            "IJhLMQYahtAicbzqju67t646L2o="
                        ],
                        "Size": [
                            "621170869"
                        ],
                        "Type": [
                            "application/mxf"
                        ],
                        "OriginalFileName": [
                            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV_01_EN_51_A.mxf"
                        ]
                    },
                    {
                        "Id": [
                            "urn:uuid:ae2179bc-93e2-4600-c471-12668d9e21fb"
                        ],
                        "AnnotationText": [
                            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV_01_EN_20_B.mxf"
                        ],
                        "Hash": [
                            "iLmzPDeNcttYiQwgLz//0n8erF0="
                        ],
                        "Size": [
                            "207074013"
                        ],
                        "Type": [
                            "application/mxf"
                        ],
                        "OriginalFileName": [
                            "MERIDIAN_SHR_C_EN-XX_US-NR_51_LTRT_UHD_20160909_OV_01_EN_20_B.mxf"
                        ]
                    },
                    {
                        "Id": [
                            "urn:uuid:04bba735-2daa-4c39-be44-d7b50f037b6c"
                        ],
                        "AnnotationText": [
                            "CPL_04bba735-2daa-4c39-be44-d7b50f037b6c.xml"
                        ],
                        "Hash": [
                            "oulTO+KhFkQTDYIv1kxtyXPQrwI="
                        ],
                        "Size": [
                            "4969"
                        ],
                        "Type": [
                            "text/xml"
                        ],
                        "OriginalFileName": [
                            "CPL_04bba735-2daa-4c39-be44-d7b50f037b6c.xml"
                        ]
                    }
                ]
            }
        ]
    }
}
/*var pkl = builder.create('PackingList') // on crée la structure du XML
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
  .end({ pretty: true});*/
 
// console.log(pkl);
 console.log(pklFile);

const builder = new xml2js.Builder();
const pkl = builder.buildObject(pklFile);

fs.writeFile('PKL_'+ uuid1() +'.xml', pkl, function(err){ //on écrit le Xml produit dans un fichier
	if(err)throw err;
	console.log('PKL file is saved !');
});