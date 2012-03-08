
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="<?php echo $table;?>")
*/
class <?php echo $modelClass;?>  {
 
<?php 

// we need the unique key as name for some low "introspection" features
//
$primaryId=null;

foreach ($columns as $column){
    echo "   /**\n";

    
    foreach ($indexes as $index){
	   if(in_array($column->getName(),$index->getColumns()) && $index->isPrimary())  {
	      echo "    * @Id\n";
	      $primaryId=$column->getName();
	      break;
	   }
	}   

    echo "    * @Column(name=\"`".$column->getName()."`\", type=\"".strtolower($column->getType())."\",";
	
	if(strtolower($column->getType())=="string")
	   echo " length=".$column->getLength().",";
	
	if($column->getNotnull()==1)
	  echo " nullable=false)\n";
	else
	  echo " nullable=true)\n";
	if($column->getAutoincrement()==1 || (strtolower($column->getType())=="integer" && $primaryId==$column->getName()))  
	   echo "    * @GeneratedValue(strategy=\"AUTO\")\n";
	   
    echo "    */\n";
    
    echo "    public $".$column->getName().";\n\n";
}
    
if($primaryId!=null){
   echo "    public function getIdFieldName(){ return '".$primaryId."';}\n\n";
}
echo "    public function getRepresentativeFieldName(){ return '".$representative_field."';}\n\n";
echo "    public function getTableName(){ return '".$table."';}\n\n";
?>
} //end class


