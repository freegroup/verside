<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_workflow")
*/
class Model_core_workflow  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;
	
   /**
    * @Column(name="`emitter_id`", type="string", length=400, nullable=false)
    */
    public $emitter_id;
	
   /**
    * @Column(name="`event`", type="string", length=200, nullable=false)
    */
    public $event;
    
   
   /**
    * @Column(name="`definition`", type="string", length=4000, nullable=false)
    */
    public $definition;

} //end class


?>