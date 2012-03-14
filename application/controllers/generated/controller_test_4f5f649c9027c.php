<?php
class Controller_test_4f5f649c9027c extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_test_4f5f649c9027c";
	}
	
    public function getTableName(){
	    return "core_filterentry";
	}
	
	public function getRepresentativeFieldName(){ 
        return "column";
    }
	
    public function getPrimaryFieldName(){ 
        return "id";
    }

} //end class

?>