<?php

abstract class Controller_generic extends CI_Controller {
 
    //Doctrine EntityManager
    public $em;
    
    abstract public function getModelName();
    abstract public function getViewNameList();
    abstract public function getViewNameDetail();
    abstract public function getRepresentativeFieldName();
    abstract public function getPrimaryFieldName();

    public function getPath(){return "";}

    public function __construct() {
		parent::__construct();
		$this->em = $this->doctrine->em;
		$this->load->model($this->getPath().$this->getModelName());
	}
 
	public function count() {
	    $id = $this->getRepresentativeFieldName();
        $query= $this->em->createQuery("SELECT COUNT(u.".$id.") FROM ".$this->getModelName()." u");
        echo $query->getSingleScalarResult();
    }

	public function delete( $id = null ) {
		if( is_null( $id ) ) {
			echo 'ERROR: Id not provided.';
			return;
		}
		
		//cleanup duplicate entry
        $qb = $this->em->createQueryBuilder();
        $qb->delete()
            ->from($this->getModelName(), 'f')    
			->where('f.'.$this->getPrimaryFieldName().' = :id')
			->setParameter("id",$id);
		$qb->getQuery()->execute();

		echo 'Records deleted successfully';
	}	
	 
	public function update($id) {
		if( !empty( $_POST ) ) {
            $obj= $this->em->find($this->getModelName(),$id);
            foreach($_POST as $field => $val){
                $obj->$field = $val;
            }
            $this->em->flush();
        
            // return the updated object. This is required because in the db can exists some trigger
            // which has modified the object
		    echo json_encode($obj);
		}
	}

	public function create() {
	    try {
            if( !empty( $_POST ) ) {
                $clazz = $this->getModelName();
		   
                $obj = new $clazz;
                foreach($_POST as $field => $val){
                    $obj->$field = $val;
                }
                $this->em->persist($obj);
                $this->em->flush();
		  
                echo 'Record created successfully!';
			}
		}
		catch(Exception $ex){
		    echo 'Exception abgefangen: ',  $ex->getMessage(), "\n";
        }
    }

	public function navigate( $id ) {
        $q = $this->em->createQuery("select u from ".$this->getModelName()." u");
		$data['objects'] = $q->getResult();
    	$data['parent_id'] = $id;
		$this->load->view($this->getPath().$this->getViewNameList(), $data);
	}
	
	public function detail( $id ) {
		$data['parent_id'] = $id;
		$data['object'] =  $this->em->find($this->getModelName(),$id);
		$this->load->view($this->getPath().$this->getViewNameDetail(), $data);
	}

} //end class

?>