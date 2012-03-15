<?php
class Controller_wert_4f61900a91d3c extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "Model_wert_4f61900a91d3c";
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