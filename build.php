<?php

$application = "verside";
$sourcefolder = './'; 
try {
	$targetname = 'installer.php';
	$zipfilename = md5(time()).'archive.zip'; 		// replace with tempname()

	// create a archive from the submitted folder
	$zipfile = new ZipArchive();
	$zipfile->open($zipfilename,ZipArchive::CREATE);
	addFiles2Zip($zipfile,$sourcefolder,true);
	$zipfile->close();

	// compile the selfextracting php-archive
	$fp_dest =fopen($targetname,'w');
	$fp_cur = fopen(__FILE__, 'r');
	fseek($fp_cur, __COMPILER_HALT_OFFSET__);
	$i=0;
	while($buffer = fgets($fp_cur)) {
		fwrite($fp_dest,$buffer);
	}
	fclose($fp_cur);
	$fp_zip = fopen($zipfilename,'r');
	while($buffer = fread($fp_zip,10240)) {
		fwrite($fp_dest,$buffer);
	}
	fclose($fp_zip);
	fclose($fp_dest);
	unlink($zipfilename);

} catch (Exception $e) {

	printf("Error:<br/>%s<br>%s>",$e->getMessage(),$e->getTraceAsString());
}

function addFiles2Zip(ZipArchive $zip,$path,$removeFirstFolder=false) {
    global $application;
    global $sourcefolder;
	$d = opendir($path);
	while($file = readdir($d)) {
		if ($file == "." || $file == ".."|| $file == ".git") 
		   continue;
		$curfile=($removeFirstFolder==true)?str_replace($sourcefolder, "./".$application."/", $path.$file):$path.$file;
		if(is_dir($path.$file)) {
			$zip->addEmptyDir($curfile);
			addFiles2Zip($zip,$path.$file.'/',$removeFirstFolder);
		} else {
			$zip->addFile($path.$file,$curfile);
		}
	}
	closedir($d);
}


__HALT_COMPILER();<?php

try {
   $file = realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR; 
   if(!is_writeable($file)){
      echo "Need write permission for directory: ".$file;
      return;
   }
   
   if(!is_readable($file)){
     echo "Need read permission for directory: ".$file;
      return;
   }

	$zipfilename = md5(time()).'archive.zip'; //remove with tempname()
	$fp_tmp = fopen($zipfilename,'w');
	$fp_cur = fopen(__FILE__, 'r');
	fseek($fp_cur, __COMPILER_HALT_OFFSET__);
	$i=0;
	while($buffer = fread($fp_cur,10240)) {
		fwrite($fp_tmp,$buffer);
	}
	fclose($fp_cur);
	fclose($fp_tmp);
	$zipfile = new ZipArchive();
	if($zipfile->open($zipfilename)===true) { 
		if(!$zipfile->extractTo('.')) throw new Exception('extraction failed...');
	} else throw new Exception('reading archive failed');
	$zipfile->close();
	unlink($zipfilename);
} catch (Exception $e) {
	printf("Error:<br/>%s<br>%s>",$e->getMessage(),$e->getTraceAsString());
};
?>
<html>
<head>
<meta http-equiv="REFRESH" content="0;url=./verside/installer/step_license.php">
</head>
</html>
		
<?php
__HALT_COMPILER();