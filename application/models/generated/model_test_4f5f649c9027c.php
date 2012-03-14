<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="core_filterentry")
*/
class Model_test_4f5f649c9027c  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

   /**
    * @Column(name="`model_class`", type="string", length=400, nullable=true)
    */
    public $model_class;

   /**
    * @Column(name="`column`", type="string", length=200, nullable=true)
    */
    public $column;

   /**
    * @Column(name="`constraint`", type="string", length=400, nullable=true)
    */
    public $constraint;

   /**
    * @Column(name="`operation`", type="string", length=20, nullable=true)
    */
    public $operation;

    public function getIdFieldName(){ return 'id';}

    public function getRepresentativeFieldName(){ return 'column';}

    public function getTableName(){ return 'core_filterentry';}

} //end class


?>