<?php
class Controller_users_4f1fe8ebbd5c1 extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_users_4f1fe8ebbd5c1";
	}
	
    public function getTableName(){
	    return "users";
	}
	
	public function getRepresentativeFieldName(){ 
        return "email";
    }
	
    public function getPrimaryFieldName(){ 
        return "id";
    }

} //end class

?>