<?php

class Controller_core_navigation extends CI_Controller {
 
    public $emExternal;
    public $emInternal;
  
   public function __construct() {
		parent::__construct();
		$this->emExternal = $this->doctrine->emExternal;
		$this->emInternal = $this->doctrine->emInternal;

		$this->load->model($this->getModelName());
		$this->load->library('curl'); 
	}
 
    public function getModelName(){
	    return "Model_core_navigation";
	}

    public function getViewNameList(){
	    return "view_core_navigation";
	}

    public function getViewNameDetail(){
	    return 'view_application';
	}
	
    public function getRepresentativeFieldName(){ 
        return "name";
    }

	
    public function getPrimaryFieldName(){ 
        return "id";
    }

	public function index(){
		$this->load->view( $this->getViewNameDetail() );
	}
 
 	public function delete( $id = null ) {
		if( is_null( $id ) ) {
			echo 'ERROR: Id not provided.';
			return;
		}
		
        $u = $this->emInternal->find($this->getModelName(),$id);
	    // delete the model  and controller class as well
	    //
	    if($u->type=="table"){
             unlink("./application/models/".$u->model.".php");
             unlink("./application/controllers/".$u->controller.".php");
	    }

        // find all children of this record and delete this before
        // foreignKey violation
        $qb = $this->emInternal->createQueryBuilder();
        $qb->select('u')
             ->from($this->getModelName(), 'u')
             ->where('u.parent_id = :pid')
             ->setParameter('pid', $id);
 
        foreach ( $qb->getQuery()->getResult() as $child){
  	        $this->delete($child->id);
        }
        
        // now we can delete the parent node
  	    $this->emInternal->remove($u);
  	    $this->emInternal->flush();
  	    
  	    // delete the controller and model as well
  	    //
  	    
		echo 'Records deleted successfully';
	}	
	
	public function sort() {
		if( !empty( $_POST ) ) {
		    $ids = count($_POST["navigation"]);
            for ($i = 0; $i < $ids; $i++)
            {
              $entryId= $_POST["navigation"][$i];
          	  $entry= $this->emInternal->find($this->getModelName(),$entryId);
			  $entry->order=$i;
            }
            $this->emInternal->flush();
			echo 'Records sorted successfully!';
		}
	}

	public function navigate( $id ) {
		if( isset( $id ) ){
            $qb = $this->emInternal->createQueryBuilder();
            $qb->select('u')
                ->from($this->getModelName(), 'u')
                ->where('u.parent_id = :pid')
                ->setParameter('pid', $id)
                ->orderBy('u.order', 'ASC');
 
            $data['objects'] = $qb->getQuery()->getResult();
			$data['parent_id'] = $id;
			
			// enrich the navigation entries with the count of the children
			//
			foreach ( $data['objects'] as $object){
			   if($object->controller=="controller_core_navigation"){
                  $qb = $this->emInternal->createQueryBuilder();
                  $qb->select('count(u.id)')
                   ->from($this->getModelName(), 'u')
                   ->where('u.parent_id = :pid')
                   ->setParameter('pid', $object->id);
				  $object->childCount = $qb->getQuery()->getSingleScalarResult();
				}
				else{
                  $object->childCount = 1;//intval($this->curl->simple_get($object->controller."/count"));
                }
                $object->model = "Model_core_formelement";
                $object->table = $this->getModelName();
                $object->field = "name";
                $object->label = $object->name;
			}
			echo json_encode($data);
		}
	}

	public function count() {
	    $id = $this->getRepresentativeFieldName();
        $query= $this->emInternal->createQuery("SELECT COUNT(u.".$id.") FROM ".$this->getModelName()." u");
        echo $query->getSingleScalarResult();
    }


	 
	public function update($id) {
		if( !empty( $_POST ) ) {
            $obj= $this->emInternal->find($this->getModelName(),$id);
            foreach($_POST as $field => $val){
                $obj->$field = $val;
            }
            $this->emInternal->flush();
        
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
                $this->emInternal->persist($obj);
                $this->emInternal->flush();
		  
                echo 'Record created successfully!';
			}
		}
		catch(Exception $ex){
		    echo 'Exception abgefangen: ',  $ex->getMessage(), "\n";
        }
    }


} //end class

?>