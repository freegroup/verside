
class <?php echo $controllerClass;?> extends Controller_generated {
 
    public function __construct() {
		parent::__construct();
	}

    public function index(){
        echo "index called";
    }
    
    public function getModelName(){
	    return "<?php echo $modelClass;?>";
	}
	
    public function getTableName(){
	    return "<?php echo $table;?>";
	}
	
	public function getRepresentativeFieldName(){ 
        return "<?php echo $representative_field;?>";
    }
	
    public function getPrimaryFieldName(){ 
        return "<?php echo $primaryId;?>";
    }

} //end class

