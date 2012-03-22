<?php

abstract class Controller_generated extends Controller_core_secure {
 

    abstract public function getModelName();
    abstract public function getTableName();
    abstract public function getRepresentativeFieldName();
    abstract public function getPrimaryFieldName();
    
    public function __construct() {
		parent::__construct();

		$this->load->model("Model_formelement");
		$this->load->model("Model_filterentry");
		$this->load->model("generated/".$this->getModelName());

        $this->output->set_header('Last-Modified: '.gmdate('D, d M Y H:i:s', time()).' GMT');
        $this->output->set_header('Expires: '.gmdate('D, d M Y H:i:s', time()).' GMT');
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0");
        $this->output->set_header('Content-type: application/json');
	}
	 
	public function update($id =null) {
	    try {
	    	if( !empty( $_POST ) ) {
	    	    $crud_operation = "update";
	    	   // if the id==null we try to save a new object in the DB
	    	   // First of all create a new Doctrine record
		       $obj = null;
		       if(is_null($id)){
                  $clazz = $this->getModelName();
                  $obj = new $clazz;
                  $this->emExternal->persist($obj);
                  $crud_operation = "create";
		       }
		       else{
                 $obj= $this->emExternal->find($this->getModelName(),$id);
		       }
		   
               foreach($_POST as $field => $val){
                  $obj->$field = $val;
               }
               $this->emExternal->flush();
        
               $id = $obj->getIdFieldName();
               $id = $obj->$id;
 	           if($id instanceof DateTime)
	              $id =$id->format( 'd-m-Y' );
               $result['pkey'] = $id;
               $result['crud'] = $crud_operation;
		       $result['record'] = $obj;
		       echo json_encode($result);
		    }
	   }
	   catch (PDOException $err) {
	        echo $err->getMessage();
	   }
	}
	
	public function delete( $id = null ) {
		if( is_null( $id ) ) {
			echo 'ERROR: Id not provided.';
			return;
		}
        $obj= $this->emExternal->find($this->getModelName(),$id);
        $this->emExternal->remove($obj);
        $this->emExternal->flush();
        
		echo json_encode('Records deleted successfully');
	}	
	 
	public function load() {
		// render the view with an empty object
		//
		$this->getFormData();
    }
	 
	public function create() {
		// render the view with an empty object
		//
		$this->getFormData();
    }

	public function count() {
	    $field = $this->getRepresentativeFieldName();
	    $qb = $this->emExternal->createQueryBuilder();
        $qb->select("COUNT(f.".$field.")")
           ->from($this->getModelName(), 'f');
        $this->addFilter($qb);
        echo $qb->getQuery()->getSingleScalarResult();
    }

	public function navigate( $parentId ) {
	    $field = $this->getRepresentativeFieldName();

	    $qb = $this->emExternal->createQueryBuilder();
        $qb->select('f')
            ->from($this->getModelName(), 'f');
        $this->addFilter($qb);
        $qb->orderBy('f.'.$field);  
           
        $result = $qb->getQuery()->getResult();
        $objects = array();

		// enrich the navigation entries with the count of the children
		//
		foreach ( $result as $object){
		    $nav = new stdClass();
            
            $id = $object->getIdFieldName();
            $id = $object->$id;
 	        if($id instanceof DateTime)
	          $id =$id->format( 'd-m-Y' );
	         
	        $field = $object->getRepresentativeFieldName();
            $label = $object->$field; 
	        if($label instanceof DateTime)
	          $label =$label->format( 'd-m-Y' );
			
			$nav->id    = $id;
			$nav->label = $label;
            $nav->table = $object->getTableName();
			$nav->model = $this->getModelName();
	        $nav->field = $field; 
  		    $nav->childCount = 0;
			$nav->controller = "generated/".strtolower(get_class($this));
			$nav->parent_id  = $parentId;
	        
	        $objects[] = $nav;
		}
    	$data['parent_id'] = $parentId;
		$data['objects'] = $objects;
		echo json_encode($data);
	}


	public function getFormData( $id= null ) {
       // add form related basic informations
        //
		$data['controller'] = "generated/".strtolower(get_class($this));
		$data['table'] = $this->getTableName();
		$data['model'] = $this->getModelName();
		
		// add the backfilled reocrd
		//
		if(is_null($id)){
		   $data['recordPkey'] =  "";
		   $data['record'] =  "";
		}
		else{
		   $object = $this->emExternal->find($this->getModelName(),$id);
		   $data['record'] =  $object;
		   $field = $object->getIdFieldName();
		   $data['recordPkey'] =  $object->$field;
	    }
		   
		// add each form element as JSON structure
		//
	    $qb = $this->emInternal->createQueryBuilder();
        $qb->select('f')
            ->from("Model_formelement", 'f')
            ->where('f.model_class = :name')
			->setParameter("name",$this->getModelName())
			->orderBy('f.id');
 
        $uiElements = array();
        $formelements = $qb->getQuery()->getResult();
        foreach($formelements as $f){
          $uiElements[] = $f;
        }
 	    $data['form'] =  $uiElements;

		echo json_encode($data);
	}

	public function getElementData($elementId, $id= null ) {
        $this->output->set_header('Content-type: application/json');

        // add form related basic informations
        //
		$data['controller'] = "generated/".strtolower(get_class($this));
		$data['table'] = $this->getTableName();
		$data['model'] = $this->getModelName();
		
		// add the backfilled reocrd
		//
		if(is_null($id)){
		   $data['recordPkey'] =  "";
		   $data['record'] =  "";
		}
		else{
		   $object = $this->emExternal->find($this->getModelName(),$id);
		   $data['record'] =  $object;
		   $field = $object->getIdFieldName();
		   $data['recordPkey'] =  $object->$field;
	    }
		   
		// add each form element as JSON structure
		//
	    $qb = $this->emInternal->createQueryBuilder();
        $qb->select('f')
            ->from("Model_formelement", 'f')
            ->where('f.id = :id')
			->setParameter("id",$elementId)
			->orderBy('f.id');
 
        $uiElements = array();
        $formelements = $qb->getQuery()->getResult();
        foreach($formelements as $f){
          $uiElements[] = $f;
        }
 	    $data['form'] =  $uiElements;

		echo json_encode($data);
	}
   
    /**
     * Add user defined filter criteria
     *     
     **/
    protected function addFilter( &$qb ){
	    $qbFilter = $this->emInternal->createQueryBuilder();
        $qbFilter->select('f')
            ->from("Model_filterentry", 'f')
            ->where('f.model_class = :name')
			->setParameter("name",$this->getModelName());  

        $entries = $qbFilter->getQuery()->getResult();

        $counter=1;
        foreach($entries as $entry){
           if(empty($entry->constraint))
             continue;
             
           if($entry->operation == "greater"){
              $qb->andWhere('f.'.$entry->column.' > :'.$entry->column.$counter);
  	          $qb->setParameter($entry->column.$counter,$entry->constraint);
           }
           else if($entry->operation == "less"){
              $qb->andWhere('f.'.$entry->column.' < :'.$entry->column.$counter);
  	          $qb->setParameter($entry->column.$counter,$entry->constraint);
           }
           else if($entry->operation == "equals"){
              $qb->andWhere('f.'.$entry->column.' = :'.$entry->column.$counter);
  	          $qb->setParameter($entry->column.$counter,$entry->constraint);
           }
           else if($entry->operation == "contains"){
              $qb->andWhere('f.'.$entry->column.' LIKE :'.$entry->column.$counter);
  	          $qb->setParameter($entry->column.$counter,"%".$entry->constraint."%");
           }
           else if($entry->operation == "startsWith"){
              $qb->andWhere('f.'.$entry->column.' LIKE :'.$entry->column.$counter);
  	          $qb->setParameter($entry->column.$counter,$entry->constraint."%");
           }
           else if($entry->operation == "endsWith"){
              $qb->andWhere('f.'.$entry->column.' LIKE :'.$entry->column.$counter);
  	          $qb->setParameter($entry->column.$counter,"%".$entry->constraint);
           }
           $counter++;
        }
    }

} //end class

?>