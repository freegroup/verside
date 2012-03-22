<?php

class Controller_core_filterentry extends CI_Controller {
    public $emInternal;
 
    public function __construct() {
		parent::__construct();
		$this->emInternal = $this->doctrine->emInternal;
		$this->load->model("Model_filterentry");
        $this->output->set_header('Last-Modified: '.gmdate('D, d M Y H:i:s', time()).' GMT');
        $this->output->set_header('Expires: '.gmdate('D, d M Y H:i:s', time()).' GMT');
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0");
        $this->output->set_header('Content-type: application/json');
     }
    
    
	public function delete( $id = null ) {
		if( is_null( $id ) ) {
			echo 'ERROR: Id not provided.';
			return;
		}
        $obj= $this->emInternal->find("Model_filterentry",$id);
        $this->em->remove($obj);
        $this->em->flush();
        
		echo json_encode("Records deleted successfully");
	}	

	public function update($id) {
		if( !empty( $_POST ) ) {
            $obj= $this->emInternal->find("Model_filterentry",$id);
            foreach($_POST as $field => $val){
                $obj->$field = $val;
            }
            $this->emInternal->flush();
        
            // return the updated object. 
		    echo json_encode($obj);
		}
	}

	public function create() {
	    try {
            if( !empty( $_POST ) ) {
                $obj = new Model_filterentry;
                foreach($_POST as $field => $val){
                    $obj->$field = $val;
                }
                $this->emInternal->persist($obj);
                $this->emInternal->flush();
		  
 		        echo json_encode($obj);
			}
		}
		catch(Exception $ex){
   		    echo json_encode($ex->getMessage());
        }
    }
    
	public function get( $modelClass ) {
	    $qb = $this->emInternal->createQueryBuilder();
        $qb->select('f')
            ->from("Model_filterentry", 'f')
            ->where('f.model_class = :name')
			->setParameter("name",$modelClass)
            ->orderBy('f.id');  
 
        $result = $qb->getQuery()->getResult();
		echo json_encode($result);
	}

} //end class

?>