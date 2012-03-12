<?php
class Controller_formelements_4f5e2bf93b1d0 extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_formelements_4f5e2bf93b1d0";
	}
	
    public function getTableName(){
	    return "core_formelement";
	}
	
	public function getRepresentativeFieldName(){ 
        return "id";
    }
	
    public function getPrimaryFieldName(){ 
        return "id";
    }

} //end class

?>