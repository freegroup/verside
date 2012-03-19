<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="company")
*/
class Model_vvvvvvvv_4f62245981751  {
 
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

    public function getRepresentativeFieldName(){ return 'email';}

    public function getTableName(){ return 'company';}

} //end class


?>