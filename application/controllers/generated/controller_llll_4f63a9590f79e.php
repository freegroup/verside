<?php
class Controller_llll_4f63a9590f79e extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_llll_4f63a9590f79e";
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