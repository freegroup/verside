<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="company")
*/
class Model_llll_4f63a9590f79e  {
 
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