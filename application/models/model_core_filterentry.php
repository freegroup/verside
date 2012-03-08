<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_filterentry")
*/
class Model_core_filterentry  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;
	
   /**
    * @Column(name="`model_class`", type="string", length=400, nullable=false)
    */
    public $model_class;
	
   /**
    * @Column(name="`column`", type="string", length=200, nullable=false)
    */
    public $column;
    
   
   /**
    * @Column(name="`operation`", type="string", length=20, nullable=false)
    */
    public $operation;
    
   
   /**
    * @Column(name="`constraint`", type="string", length=400, nullable=false)
    */
    public $constraint;
} //end class


?>