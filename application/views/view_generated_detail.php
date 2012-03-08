<form action="" id="content_formular" 
      style="position:absolute;top:0px;left:0px;" 
      data-controller="<?php echo $controller?>"
      data-table="<?php echo $table?>"
      data-model="<?php echo $model?>"
      data-recordpkey="<?php if(is_null($object)){echo "";}else{ $id = $object->getIdFieldName();echo $object->$id;}?>"
      data-recordcontainer="true"
>
    <?php echo $html?>
</form>
