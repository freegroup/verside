<?php
class Controller_bldsinn_4f6a5cd826181 extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_bldsinn_4f6a5cd826181";
	}
	
    public function getTableName(){
	    return "company";
	}
	
	public function getRepresentativeFieldName(){ 
        return "name";
    }
	
    public function getPrimaryFieldName(){ 
        return "id";
    }

} //end class

?>