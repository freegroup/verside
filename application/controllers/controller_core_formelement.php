<?php

class Controller_core_formelement extends CI_Controller {

    public $emInternal;
  
    public function __construct() {
		parent::__construct();
		$this->emInternal = $this->doctrine->emInternal;
		$this->load->model("Model_formelement");
		$this->load->helper(array('form', 'url'));
    }

	public function count() {
        $query= $this->emInternal->createQuery("SELECT COUNT(u.id) FROM Model_formelement u");
        echo $query->getSingleScalarResult();
    }

	public function delete( $id = null ) {
		if( is_null( $id ) ) {
			echo 'ERROR: Id not provided.';
			return;
		}
        $obj= $this->emInternal->find("Model_formelement",$id);
        $this->emInternal->remove($obj);
        $this->emInternal->flush();
        
		echo 'Records deleted successfully';
	}	

	public function update($id) {
		if( !empty( $_POST ) ) {
            $obj= $this->emInternal->find("Model_formelement",$id);
            foreach($_POST as $field => $val){
                $obj->$field = $val;
            }
            $this->em->flush();
        
            // return the updated object. This is required because in the db can exists some trigger
            // which has modified the object
		    echo json_encode($obj);
		}
	}


    function upload()
	{
	    $left = $_POST["left"];  
	    $top = $_POST["top"];  
	    $model = $_POST["model"];  
	    $uid = uniqid();
		
	    //     Designers Upload Folder
        $dir = './assets/images/'.$model.'/';
        if (!is_dir($dir)) { 
            $theupload_path = mkdir('./assets/images/'.$model.'/', 0777,true);
        }
 
        $config['upload_path'] = $dir;
		$config['allowed_types'] = 'jpg|gif|png';
		$config['max_size']	= '100';
		$config['max_width']  = '1024';
		$config['max_height']  = '768';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload("userfile"))
		{
			echo $this->upload->display_errors();
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());
            $file = $data['upload_data']['file_name']; // set the file variable
		    $newFileName = $dir.$uid."_".$file;
            rename($dir . $file, $newFileName);
            
			$size = getimagesize($newFileName);
			$label = $this->_createImage($model,$newFileName,0,$left,$top, $size[0], $size[1]);
			echo $label->toHTML(null);
		}
	}
	
	public function createLine() {
        if(!empty( $_POST ) ) {
            $x =  $_POST["left"];
            $y =  $_POST["top"];
            $model =  $_POST["model"];
            $table =  $_POST["table"];
            $controller =  $_POST["controller"];
            $recordId =  $_POST["recordId"];
            
  		    $this->load->model("generated/".$model);

            $obj = $this->_createHr($model, 0,$x,$y,200);
            $obj->type = "line";
            $this->emInternal->flush();
  
            echo $this->_toJSON($controller, $table, $model, array($obj), $recordId );
        }
    }
    
	public function createTitle() {
        if(!empty( $_POST ) ) {
            $x =  $_POST["left"];
            $y =  $_POST["top"];
            $model =  $_POST["model"];
            $table =  $_POST["table"];
            $controller =  $_POST["controller"];
            $recordId =  $_POST["recordId"];
            
  		    $this->load->model("generated/".$model);

            $label = $this->_createHeader($model, "Caption", 0, $x, $y);
            $label->type = "title";
            $this->emInternal->flush();
            echo $this->_toJSON($controller, $table, $model, array($label), $recordId );
        }
    }

	public function createArea() {
        if(!empty( $_POST ) ) {
            $x =  $_POST["left"];
            $y =  $_POST["top"];
            $model =  $_POST["model"];
            $table =  $_POST["table"];
            $controller =  $_POST["controller"];
            $recordId =  $_POST["recordId"];
            $column =  $_POST["column"];
            $readonly =  $_POST["readonly"];
            
  		    $this->load->model("generated/".$model);
            $obj= null;
            if(!is_null($recordId))
               $obj = $this->emExternal->find($model, $recordId);

            $readonly = strcmp($readonly,"true")==0;
            $input = $this->_createArea($model,$readonly, $column,0,$x,$y,120);
            $input->type = "textarea";

            $label = $this->_createLabel($model, $column,0,$x,$y-20, $input->id);
            $label->type = "label";
            $this->emInternal->flush();

            // don't change the order of the rendering. The Client expect this order.
            //
            echo $this->_toJSON($controller, $table, $model, array($label, $input), $recordId );
        }
    }

	public function createInput() {
        if(!empty( $_POST ) ) {
            $x =  $_POST["left"];
            $y =  $_POST["top"];
            $model =  $_POST["model"];
            $table =  $_POST["table"];
            $controller =  $_POST["controller"];
            $recordId =  $_POST["recordId"];
            $column =  $_POST["column"];
            $readonly =  $_POST["readonly"];
            
  		    $this->load->model("generated/".$model);
            $obj= null;
            if(!is_null($recordId))
               $obj = $this->emExternal->find($model, $recordId);

            $readonly = strcmp($readonly,"true")==0;
            $input = $this->_createInput($model,$readonly, $column,0,$x,$y,120);
            $input->type = "input";

            $label = $this->_createLabel($model, $column,0,$x,$y-20, $input->id);
            $label->type = "label";
            $this->emInternal->flush();

            // don't change the order of the rendering. The Client expect this order.
            //
            echo $this->_toJSON($controller, $table, $model, array($label, $input), $recordId );
        }
    }

    protected function _createImage($modelClass, $filename, $parentId, $x, $y, $width, $height){
		// Generate the header
        $obj = new Model_formelement();
		$obj->css = "position:absolute;top:".$y."px;left:".$x."px;height:".$height."px;width:".$width."px";
        $obj->type = "image";
		$obj->tag = "img";
		$obj->extra_attributes = "src=\"".$filename."\"";
		$obj->column = null;
		$obj->model_class = $modelClass;
		$obj->innerHTML = "";
		$obj->parent_id = $parentId;
        $this->emInternal->persist($obj);
        $this->emInternal->flush();
        
        return $obj;
	}
		
	protected function _createHeader($modelClass, $text, $parentId, $x, $y){
		
		// Generate the header
        $obj = new Model_formelement();
		$obj->css = "white-space:nowrap;position:absolute;top:".$y."px;left:".$x."px;height:50px;font-size:40px";
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
	
    protected function _createLabel($modelClass, $title, $parentId, $x, $y, $relatedinput){
        if($title =="")
          $title ="caption";
          
		// Generate the header
        $obj = new Model_formelement();
		$obj->css = "white-space:nowrap;position:absolute;top:".$y."px;left:".$x."px;height:16px;font-size:14px";
		$obj->tag = "label";
		$obj->extra_attributes = "data-editable=\"true\" data-relatedinput=\"".$relatedinput."\"";
		$obj->column = null;
		$obj->model_class = $modelClass;
		$obj->innerHTML = ucfirst(strtolower($title));
		$obj->parent_id = $parentId;
        $this->emInternal->persist($obj);
        $this->emInternal->flush();
        
        return $obj;
	}
	
	protected function _createInput($modelClass, $readonly, $column, $parentId,$x, $y, $width){
       $obj = new Model_formelement();
	   $obj->css = "position:absolute;top:".$y."px;left:".$x."px;width:".$width."px;height:25px;font-size:17px";
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
	
	
	protected function _createArea($modelClass, $readonly, $column, $parentId,$x, $y, $width){
       $obj = new Model_formelement();
	   $obj->css = "position:absolute;top:".$y."px;left:".$x."px;width:".$width."px;height:50px;font-size:17px";
	   $obj->tag = "textarea";
	   if($readonly)
  	      $obj->extra_attributes = "readonly=\"readonly\"";
	   $obj->column = $column;
	   $obj->model_class = $modelClass;
	   $obj->parent_id = $parentId;
       $this->emInternal->persist($obj);
       $this->emInternal->flush();
       
       return $obj;
	}


	protected function _createHr($modelClass, $parentId,$x, $y, $width){
       $obj = new Model_formelement();
	   $obj->css = "position:absolute;top:".$y."px;left:".$x."px;width:".$width."px;height:20px;";
	   $obj->tag = "div";
	   $obj->model_class = $modelClass;
	   $obj->parent_id = $parentId;
	   $obj->innerHTML = "<hr></hr>";
       $this->emInternal->persist($obj);
       $this->emInternal->flush();
       	
       return $obj;
	}
	
	
	protected function _toJSON( $controller, $table, $model, $formelements, $recordId=null ){
        // add form related basic informations
        //
		$data['controller'] = $controller;
		$data['table'] = $table;
		$data['model'] = $model;
		
		// add the backfilled record
		//
		if(is_null($recordId) || $recordId==""){
		   $data['recordPkey'] =  "";
		   $data['record'] =  "";
		}
		else{
  		   $this->load->model($model);
		   $object = $this->em->find($model,$recordId);
		   $data['record'] =  $object;
		   $field = $object->getIdFieldName();
		   $data['recordPkey'] =  $object->$field;
	    }
		   
 	    $data['form'] =  $formelements;

		echo json_encode($data);
	}
	
} //end class

?>