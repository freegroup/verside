<?php
/**
* @Entity @HasLifecycleCallbacks
* @Table(name="country")
*/
class Model_lnder_4ebfe72a57f3f  {
 
   /**
    * @Id
    * @Column(name="`id`", type="integer", nullable=false)
    * @GeneratedValue(strategy="AUTO")
    */
    public $id;

   /**
    * @Column(name="`iso`", type="string", length=2, nullable=false)
    */
    public $iso;

   /**
    * @Column(name="`name`", type="string", length=80, nullable=false)
    */
    public $name;

   /**
    * @Column(name="`printable_name`", type="string", length=80, nullable=false)
    */
    public $printable_name;

   /**
    * @Column(name="`iso3`", type="string", length=3, nullable=true)
    */
    public $iso3;

   /**
    * @Column(name="`numcode`", type="smallint", nullable=true)
    */
    public $numcode;

    public function getIdFieldName(){ return 'id';}

    public function getRepresentativeFieldName(){ return 'printable_name';}

    public function getTableName(){ return 'country';}

} //end class


?>