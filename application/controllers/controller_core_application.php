<?php

class Controller_core_application extends Controller_core_secure {
 
    
    public function __construct() {
		parent::__construct();
		
		$this->load->model("Model_formelement");
		$this->load->model("Model_navigation");
		$this->load->library('parser');
	}

    public function addTableView($parentId){
	    $tablename = $_POST["tablename"];
	    $alias = $_POST["alias"];
	    $representative_field = $_POST["representative_field"];
	    
	    $name = strtolower(preg_replace('/[^0-9a-z\_\-]/i','',$alias));
	    $uid = uniqid();
	    
	    $controllerClass = "Controller_".$name."_".$uid;
	    $controllerFile = strtolower($controllerClass); 
	    $controllerUrl = "generated/".strtolower($controllerClass); 
	    
		$modelClass = "Model_".$name."_".$uid;
		$modelFile = strtolower($modelClass);
	    $modelUrl = "generated/".strtolower($modelClass);
	    
        $sm = $this->emExternal->getConnection()->getSchemaManager();
		$columns = $sm->listTableColumns($tablename);
        $indexes = $sm->listTableIndexes($tablename);
        $primaryId ="";
 
        foreach ($indexes as $index){
	      if($index->isPrimary())  {
	         $column = $index->getColumns();
  	         $primaryId=$column[0];
  	         break;
	      }
	    }   

        $data = array(
            'table' => strtolower($tablename),
            'name' => $name,
            'modelClass' => $modelClass,
            'controllerClass' => $controllerClass,
			'columns' => $columns,
			'representative_field' => $representative_field,
			'primaryId' => $primaryId,
			'indexes' => $indexes
            );
            
        // Generate the Controller for the new View
		//
        $txt= "<?php".$this->parser->parse('codetemplates/template_controller', $data, TRUE)."?>";
        write_file("./application/controllers/".$controllerUrl.".php", $txt, "w+");

		// And the model as well
		//
        $txt= "<?php".$this->parser->parse('codetemplates/template_model', $data, TRUE)."?>";
        write_file("./application/models/".$modelUrl.".php", $txt, "w+");

		// Generate the menu entrie with the handsover parent_id
		//
		//cleanup duplicate entry
        $qb = $this->emInternal->createQueryBuilder();
        $qb->delete()
            ->from("Model_navigation", 'f')    
			->where('f.parent_id = :parent')
			->andWhere("f.name = :name")
			->setParameter("parent",$parentId)
			->setParameter("name",$alias);
		$qb->getQuery()->execute();

		$menu = new Model_navigation();
		$menu->parent_id = $parentId;
		$menu->order =0;
		$menu->name = $alias;
		$menu->type = "table";
		$menu->controller = $controllerUrl;
		$menu->model = $modelUrl;
        $this->emInternal->persist($menu);
        
        
		//////////////////////////////////////////////////////////////////////
	    // generate a simple input form
		//////////////////////////////////////////////////////////////////////

		// cleanup/remove the old form
        $qb = $this->emInternal->createQueryBuilder();
        $qb->delete()
            ->from("Model_formelement", 'f')    
			->where('f.model_class = :name')
			->setParameter("name",$modelClass);  
		$qb->getQuery()->execute();

        $x= 70;
		$y= 30;

		// Generate the header
		//
        $header = $this->createTitle($modelClass, 0,$x,$y,$alias);
		$y+=70;

		$readonly = strcmp($representative_field,$primaryId)==0;
		
		// generate the major representative Field more present
	    $input = $this->createMajorInput($modelClass, $readonly,  $representative_field,0,$x,$y+25);
	    $label = $this->createMajorLabel($modelClass, 0,$x,$y,$representative_field,$input->id);
		$y+=105;

		// generate all input fields for the table
		//
		foreach($columns as $column){
		    if(strcmp($column->getName(), $representative_field)!=0){
		       $readonly = strcmp($column->getName(),$primaryId)==0;
		       $input = $this->createInput($modelClass,$readonly, $column->getName(),0,$x,$y+25,120,20);
		       $label = $this->createLabel($modelClass, 0,$x,$y,$column->getName(),$input->id);
		       $y+=60;
		    }
		}
	}
	
	protected function createInput($modelClass, $readonly, $column, $parentId,$x, $y, $width, $height){
		$obj = new Model_formelement();
		$obj->css = "position:absolute;top:".$y."px;left:".$x."px;width:".$width."px;height:".$height."px;";
		$obj->type = "input";
		$obj->tag = "input";
		if($readonly)
			$obj->extra_attributes = "readonly=\"readonly\"";
		$obj->column = $column;
		$obj->model_class = $modelClass;
		$obj->parent_id = $parentId;
		$this->emInternal->persist($obj);
        $this->emInternal->flush();
        
        return $obj;
	}
	
	protected function createLabel($modelClass, $parentId, $x, $y, $text, $for){
		
		// Generate the header
        $obj = new Model_formelement();
		$obj->css = "white-space:nowrap;position:absolute;top:".$y."px;left:".$x."px;height:16px;font-size:14px";
		$obj->type = "label";
		$obj->tag = "label";
		$obj->extra_attributes = "data-editable=\"true\" data-relatedinput=\"".$for."\"";
		$obj->column = null;
		$obj->model_class = $modelClass;
		$obj->innerHTML = $text;
		$obj->parent_id = $parentId;
        $this->emInternal->persist($obj);
        $this->emInternal->flush();
        
        return $obj;
	}
	
	
	protected function createMajorInput($modelClass, $readonly,  $column, $parentId,$x, $y){
       $obj = new Model_formelement();
	   $obj->css = "position:absolute;top:".$y."px;left:".$x."px;width:300px;height:33px;font-size:20px";
	   $obj->type = "input";
	   $obj->tag = "input";
	   $obj->column = $column;
	   
	   if($readonly)
  	      $obj->extra_attributes = "readonly=\"readonly\"";
		  
	   $obj->model_class = $modelClass;
	   $obj->parent_id = $parentId;
       $this->emInternal->persist($obj);
       $this->emInternal->flush();
       
       return $obj;
	}
	
	protected function createMajorLabel($modelClass, $parentId, $x, $y, $text, $for){
		
		// Generate the header
        $obj = new Model_formelement();
		$obj->css = "white-space:nowrap;position:absolute;top:".$y."px;left:".$x."px;height:16px;font-size:14px";
		$obj->type = "label";
		$obj->tag = "label";
		$obj->extra_attributes = "data-editable=\"true\"  data-relatedinput=\"".$for."\"";
		$obj->column = null;
		$obj->model_class = $modelClass;
		$obj->innerHTML = $text;
		$obj->parent_id = $parentId;
        $this->emInternal->persist($obj);
        $this->emInternal->flush();
        
        return $obj;
	}
	
	protected function createTitle($modelClass, $parentId, $x, $y, $text){
		
		// Generate the header
        $obj = new Model_formelement();
		$obj->css = "white-space:nowrap;position:absolute;top:".$y."px;left:".$x."px;height:50px;font-size:40px";
		$obj->type = "title";
		$obj->tag = "label";
		$obj->extra_attributes = "data-editable=\"true\"";
		$obj->column = null;
		$obj->model_class = $modelClass;
		$obj->innerHTML = $text;
		$obj->parent_id = $parentId;
        $this->emInternal->persist($obj);
        $this->emInternal->flush();
        
        return $obj;
	}

} //end class

?>