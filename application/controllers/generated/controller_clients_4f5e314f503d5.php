<?php
class Controller_clients_4f5e314f503d5 extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_clients_4f5e314f503d5";
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