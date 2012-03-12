<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_formelement")
*/
class Model_core_formelement  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;
	
   /**
    * @Column(name="`css`", type="string", length=400, nullable=true)
    */
    public $css;
	
   /**
    * @Column(name="`tag`", type="string", length=50, nullable=true)
    */
    public $tag;
	
   /**
    * @Column(name="`type`", type="string", length=50, nullable=true)
    */
    public $type;

   /**
    * @Column(name="`parent_id`", type="integer", nullable=true)
    */
    public $parent_id;
	
   /**
    * @Column(name="`innerHTML`", type="text", nullable=true)
    */
    public $innerHTML;
	
   /**
    * @Column(name="`model_class`", type="string", length=400, nullable=false)
    */
    public $model_class;
	
   /**
    * @Column(name="`extra_attributes`", type="string", length=400, nullable=true)
    */
    public $extra_attributes;
    
   /**
    * @Column(name="`column`", type="string", length=200, nullable=false)
    */
    public $column;
    
    public function toHTML($dataRecord=null, $innerHTML=null){
       $result = "<".$this->tag." autocomplete=\"off\" class=\"core_formelement\" style=\"".$this->css."\" ";
       $value ="";
       
       if(!is_null($this->extra_attributes))
         $result = $result. $this->extra_attributes." ";
         
	   if(!is_null($this->column)&& ($this->column !="")){
	     $result = $result."name=\"".$this->column."\" ";
	     if(is_null($dataRecord)){
	         $result =$result."value=\"\" ";
	         $result =$result."data-value=\"\" ";
	     }
	     else{
	        $value = $dataRecord->{$this->column};
	        if($value instanceof DateTime)
	           $value =$value->format( 'd-m-Y' );
	        if($this->tag=="textarea")
	           $result = $result." ";
	        else
	           $result = $result."value=\"".htmlspecialchars($value)."\" ";
	        $result = $result."data-value=\"".htmlspecialchars($value)."\" ";
	     }
	   }
	   
	   $result = $result."id=\"".$this->id."\" ";
	   $result = $result."data-pkey=\"".$this->id."\" ";
	   $result = $result."data-column=\"".$this->column."\" ";
	   $result = $result."data-draggable=\"true\" ";
	   if(is_null($this->innerHTML))
	      $result = $result. ">";
	   else
	      $result = $result. ">".$this->innerHTML;
	      
	   if(!is_null($innerHTML)) 
	      $result = $result.$innerHTML;

       if($this->tag=="textarea")
          $result = $result.htmlspecialchars($value);

	   $result = $result."</".$this->tag.">\n";

       
       return $result;
       
    }
    
} //end class


?>