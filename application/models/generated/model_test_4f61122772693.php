<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="company")
*/
class Model_test_4f61122772693  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

   /**
    * @Column(name="`name`", type="text", nullable=true)
    */
    public $name;

   /**
    * @Column(name="`phone`", type="text", nullable=true)
    */
    public $phone;

   /**
    * @Column(name="`email`", type="text", nullable=true)
    */
    public $email;

    public function getIdFieldName(){ return 'id';}

    public function getRepresentativeFieldName(){ return 'name';}

    public function getTableName(){ return 'company';}

} //end class


?>