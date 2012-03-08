<?php
class Controller_lnder_4ebfe72a57f3f extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_lnder_4ebfe72a57f3f";
	}
	
    public function getTableName(){
	    return "country";
	}
	
	public function getRepresentativeFieldName(){ 
        return "printable_name";
    }
	
    public function getPrimaryFieldName(){ 
        return "id";
    }

} //end class

?>