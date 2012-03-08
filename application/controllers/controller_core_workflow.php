<?php
 
class Controller_core_workflow extends CI_Controller {
 
    public function __construct() {
        parent::__construct();
        $this->em = $this->doctrine->em;
		$this->load->model("Model_core_workflow");
        $this->load->library('phpblocks');
        $this->load->helper('file');
    }
 
 
    public function deleteDefinition()
    {
        if( is_null( $id ) ) {
           echo 'ERROR: Id not provided.';
           return;
        }
        $obj= $this->em->find("Model_core_workflow",$id);
        $this->em->remove($obj);
        $this->em->flush();
 
        echo json_encode("Records deleted successfully");
    }      
 
    public function saveDefinition()
    {
		if( !empty( $_POST ) ) {
		}
    }
 
 
    public function getDefinition()
    {
	    try{
			$emitter_id =  $_GET["xml"];
	//        $event =  $_POST["event"];
	 
			$this->output->set_header('Content-type: text/xml');
	 
			$qb = $this->em->createQueryBuilder();
			$qb->select('f')
				->from("Model_core_workflow", 'f')
				->where('f.emitter_id = :id')
				->setParameter("id",$emitter_id);
	   //         ->andWhere('f.event = :event')
	   //         ->setParameter("event",$event); 
	 
			$workflows = $qb->getQuery()->getResult();
			if(is_null($workflows) || count($workflows)==0){
				$xmlFileId = "configuration/template.xml";
				echo file_get_contents(APPPATH."libraries/Phpblocks/".$xmlFileId);
			}
			else{
				 echo $workflows[0]->definition;
			}
		}
		catch(Exception $e){
		    echo $e;
		}
   }
 
    public function workflow()
    {
       $numargs  = func_num_args();
       $arg_list = func_get_args();
       $file ="";
       for ($i = 0; $i < $numargs; $i++) {
          $file = $file. "/".$arg_list[$i] ;
       }
 
       if(endsWith($file,"gif")){
            $file_name = realpath(APPPATH."libraries/Phpblocks".$file);
			switch(strtolower(substr(strrchr($file_name,'.'),1)))
			{
					case 'pdf': $mime = 'application/pdf'; break;
					case 'zip': $mime = 'application/zip'; break;
					case 'jpeg':
					case 'jpg': $mime = 'image/jpg'; break;
					case 'gif': $mime = 'image/gif'; break;
					default: $mime = 'application/force-download';
			}
			header('Pragma: public');   // required
			header('Expires: 0');    // no cache
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header('Last-Modified: '.gmdate ('D, d M Y H:i:s', filemtime ($file_name)).' GMT');
			header('Cache-Control: private',false);
			header('Content-Type: '.$mime);
			header('Content-Transfer-Encoding: binary');
			header('Content-Length: '.filesize($file_name));  // provide file size
			header('Connection: close');
			readfile($file_name);    // push it out
			exit();
       }
       else  if($file === "/editor/index"){
			$data["plugins"] =  $this->phpblocks->plugins();
			$this->load->view("view_phpblocks.php", $data);
       }
       else{
			echo file_get_contents(APPPATH."libraries/Phpblocks".$file);
	   }
	}

	public function execute( $eventEmitterId, $action ) {
		try{
		   $this->phpblocks->run();
		   echo json_encode("action called");
		}
		catch(Exception $e){
		  echo json_encode($e);
		}
	}
 
} //end class
 
