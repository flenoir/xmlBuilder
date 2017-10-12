import xml.etree.cElementTree as ET
import uuid
import datetime
import os
import re

# génération d'UUID
u = uuid

# array des nom des fichiers trouvés
listed_files = []


# fonction de listage du dossier IMP
def list_files(path):
    for fileName in os.listdir(path):
        filePath = path+'/'+fileName
        if (os.access(filePath, os.F_OK) and fileName[-3:] == 'mxf' or fileName[:3] == 'CPL'):
        	fileSize = os.popen("C:/code/MediaInfo/MediaInfo.exe --Inform=General;%FileSize% " +filePath).read() # http://manpages.ubuntu.com/manpages/precise/man1/mediainfo.1.html
        	fileDuration = os.popen("C:/code/MediaInfo/MediaInfo.exe --Inform=General;%Duration% " +filePath).read()
        	fileHash = os.popen("openssl sha1 -binary "+ filePath + " | openssl base64").read()
        	print(fileName+" -> "+re.sub("\n", "", fileSize)+" size")
        	print(fileSize, fileDuration, fileHash)
        	temp_obj = {}
        	temp_obj['title'] = fileName
        	temp_obj['size'] = re.sub("\n", "", fileSize)
        	temp_obj['hash'] = fileHash
        	listed_files.append(temp_obj)
list_files("C:/TESTZONE_SUPPORT/Video_Samples/IMF")


print(listed_files)



# definiion de la balise principale
root = ET.Element("PackingList", xmlns="http://www.smpte-ra.org/schemas/429-8/2007/PKL")

# definiion de la balise secondaire incluse dans root
Id = ET.SubElement(root, "Id").text = "urn:uuid:"+str(u.uuid1())
AnnotationText = ET.SubElement(root, "AnnotationText").text = "le titre"
IssueDate = ET.SubElement(root, "IssueDate").text = str(datetime.datetime.now())
Issuer = ET.SubElement(root, "Issuer").text = "Videomenthe"
Creator = ET.SubElement(root, "Creator").text = "Fabien Lenoir"
AssetList = ET.SubElement(root, "AssetList")

# definition des balises Asset
index = 0
for item in listed_files:
	Asset = ET.SubElement(AssetList, "Asset")
	ET.SubElement(Asset, "Id").text = "urn:uuid:"+str(u.uuid1())
	ET.SubElement(Asset, "AnnotationText").text = listed_files[index]['title']
	ET.SubElement(Asset, "Hash").text = listed_files[index]['hash']
	ET.SubElement(Asset, "Size").text = listed_files[index]['size']
	ET.SubElement(Asset, "Type").text = "le type de ficher => application/mxf"
	ET.SubElement(Asset, "OriginalFileName").text = listed_files[index]['title']
	index+=1

tree = ET.ElementTree(root)
tree.write("filename.xml")

print(ET.tostring(root))
