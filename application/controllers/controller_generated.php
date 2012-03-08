<?php

abstract class Controller_generated extends CI_Controller {
 
    public $em;
    
    abstract public function getModelName();
    abstract public function getTableName();
    abstract public function getRepresentativeFieldName();
    abstract public function getPrimaryFieldName();
    
    public function __construct() {
		parent::__construct();
		$this->em = $this->doctrine->em;
		$this->load->model("Model_core_formelement");
		$this->load->model("Model_core_filterentry");
		$this->load->model("generated/".$this->getModelName());
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
                  $this->em->persist($obj);
                  $crud_operation = "create";
		       }
		       else{
                 $obj= $this->em->find($this->getModelName(),$id);
		       }
		   
               foreach($_POST as $field => $val){
                  $obj->$field = $val;
               }
               $this->em->flush();
        
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
        $obj= $this->em->find($this->getModelName(),$id);
        $this->em->remove($obj);
        $this->em->flush();
        
		echo 'Records deleted successfully';
	}	
	 
	public function load() {
		// render the view with an empty object
		//
		$this->renderFilledForm();
    }
	 
	public function create() {
		// render the view with an empty object
		//
		$this->renderFilledForm();
    }

	public function count() {
	    $field = $this->getRepresentativeFieldName();
	    $qb = $this->em->createQueryBuilder();
        $qb->select("COUNT(f.".$field.")")
           ->from($this->getModelName(), 'f');
        $this->addFilter($qb);
        echo $qb->getQuery()->getSingleScalarResult();
    }

	public function navigate( $parentId ) {
	    $field = $this->getRepresentativeFieldName();

	    $qb = $this->em->createQueryBuilder();
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

	public function renderFilledForm( $id= null ) {
		$data['controller'] = "generated/".strtolower(get_class($this));
		$data['table'] = $this->getTableName();
		$data['model'] = $this->getModelName();
		if(is_null($id))
		   $data['object'] =  null;
		else
		   $data['object'] =  $this->em->find($this->getModelName(),$id);
		$data['html'] =  $this->render($data['object']);
		$this->load->view("view_generated_detail", $data);
	}

	public function renderFilledElement($elementId, $id= null ) {
		if(is_null($id))
		   $record =  null;
		else
		   $record =  $this->em->find($this->getModelName(),$id);
		
		echo  $this->render($record, null, $elementId);
	}

	public function render( $dataRecord, $parentFormelement=null, $uiElementId=null ) {
	    $result ="";
	    $parentId =0;
	    if(!is_null($parentFormelement))
	      $parentId= $parentFormelement->id;

	    $qb = $this->em->createQueryBuilder();
        $qb->select('f')
            ->from("Model_core_formelement", 'f')
            ->where('f.model_class = :name')
			->setParameter("name",$this->getModelName())
            ->andWhere('f.parent_id = :parent')
			->setParameter("parent",$parentId);
			
		// constraint on a single UI-Element if required
		//
		if(!is_null($uiElementId)){
			$qb->andWhere('f.id = :id')
			   ->setParameter("id",$uiElementId);
		}

        $qb ->orderBy('f.id');
 
	    $innerHTML = null;
        $formelements = $qb->getQuery()->getResult();
        foreach($formelements as $f){
          $childrenHTML = $this->render($dataRecord, $f );
          $result = $result.$f->toHTML($dataRecord, $childrenHTML);
        }
        return $result;
	}
    
    /**
     * Add user defined filter criteria
     *     
     **/
    protected function addFilter( &$qb ){
	    $qbFilter = $this->em->createQueryBuilder();
        $qbFilter->select('f')
            ->from("Model_core_filterentry", 'f')
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