<?php

class Controller_core_model extends CI_Controller {
 
    //Doctrine EntityManager
    public $emExternal;
    public $emInternal;
    
    protected static $datatypes = array("integer"=>"number",
                                        "string"=>"text",
                                        "smallint"=>"number"
                                       );
    
    public function __construct() {
		parent::__construct();
		$this->emInternal = $this->doctrine->emInternal;
		$this->emExternal = $this->doctrine->emExternal;
		
		$this->load->model("Model_formelement");
		$this->load->model("Model_navigation");
		$this->load->library('parser');

        $this->output->set_header('Last-Modified: '.gmdate('D, d M Y H:i:s', time()).' GMT');
        $this->output->set_header('Expires: '.gmdate('D, d M Y H:i:s', time()).' GMT');
        $this->output->set_header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0");
        $this->output->set_header('Content-type: application/json');
    }
 
	public function getTables(){
        $sm = $this->emExternal->getConnection()->getSchemaManager();
        $tables = $sm->listTables();
        $first=true;
        echo "[\n";
        foreach ($tables as $table) {
           if($first==false)
             echo ",";
           echo '{ "name":';
           echo '"'.$table->getName() . '"';
           echo "}\n";
           $first=false;
        }	
        echo "]\n";
    }
    
	public function getTableColumns($tableName, $modelName){
        $sm = $this->emExternal->getConnection()->getSchemaManager();
        $columns = $sm->listTableColumns($tableName);
        $indexes = $sm->listTableIndexes($tableName);
        $primaryId ="";
 
        foreach ($indexes as $index){
	      if($index->isPrimary())  {
	         $column = $index->getColumns();
  	         $primaryId=$column[0];
  	         break;
	      }
	    }   

        $first=true;
        echo '{"modelName":"'.$modelName . '",';
        echo ' "tableName":"'.$tableName . '",';
        echo ' "fields":[';
        foreach ($columns as $column) {
           if($first==false)
             echo ",";
           echo '{ ';
           echo '"name":"'.$column->getName() . '",';
           
           $typeName = $column->getType()->getName();
           if(array_key_exists($typeName, self::$datatypes))
             $typeName = self::$datatypes[$typeName];
            else
              $typeName = "text";
             
           echo '"type":"'.$typeName. '",';
           if(strcmp($column->getName(),$primaryId)==0)
              echo '"readonly":true';
           else
              echo '"readonly":false';
           echo "}\n";
           $first=false;
        }	
        echo "]}\n";
    }
 
} //end class

?>