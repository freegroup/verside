<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_workflow")
*/
class Model_vvvvvvvvvvvv_4f4cdf1bd9504  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

   /**
    * @Column(name="`emitter_id`", type="string", length=200, nullable=false)
    */
    public $emitter_id;

   /**
    * @Column(name="`event`", type="string", length=200, nullable=true)
    */
    public $event;

   /**
    * @Column(name="`definition`", type="text", nullable=true)
    */
    public $definition;

    public function getIdFieldName(){ return 'id';}

    public function getRepresentativeFieldName(){ return 'emitter_id';}

    public function getTableName(){ return 'core_workflow';}

} //end class


?>