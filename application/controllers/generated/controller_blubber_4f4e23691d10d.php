<?php
class Controller_blubber_4f4e23691d10d extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_blubber_4f4e23691d10d";
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