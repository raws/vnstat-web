<?php
$xml_file_path = 'vnstat.xml';
if (file_exists($xml_file_path)) {
	$xml = simplexml_load_file($xml_file_path);
	require_once('lib/xml2json.php');
	
	if ($xml_as_array = xml2json::convertSimpleXmlElementObjectIntoArray($xml)) {
		if ($json = json_encode($xml_as_array)) {
			header('Content-type: application/json');
			echo $json;
		} else {
			exit("Could not convert array to JSON.");
		}
	} else {
		exit("Could not convert XML to array for conversion to JSON.");
	}
} else {
	exit("Failed to load $xml_file_path.");
}
?>
