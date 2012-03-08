<?php

class Controller_core_dialog extends CI_Controller {
 
    public function __construct() {
		parent::__construct();
		$this->em = $this->doctrine->em;
	}
 
	public function template($template){
		$this->load->view("dialog/".$template);
	}
 
    public function addTable(){
        $sm = $this->em->getConnection()->getSchemaManager();
        $data = array(
            'tables' => $sm->listTables()
             );
		$this->load->view("dialog/addTable", $data);
	}
 
} //end class

?>